import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const ASAAS = 'https://api.asaas.com/v3'
const KEY = process.env.ASAAS_API_KEY!
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)

async function asaas(path: string, method = 'GET', body?: object) {
  const r = await fetch(`${ASAAS}${path}`, {
    method,
    headers: { 'access_token': KEY, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  return r.json()
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { gift_id, buyer_name, buyer_message, amount, payment_method } = req.body

  if (!gift_id || !buyer_name || !amount || !payment_method)
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' })

  // Buscar presente
  const { data: gift, error: giftErr } = await supabase
    .from('gifts').select('*').eq('id', gift_id).single()
  if (giftErr || !gift) return res.status(404).json({ error: 'Presente não encontrado.' })
  if (gift.quantity_bought >= gift.quantity)
    return res.status(400).json({ error: 'Presente já foi comprado.' })

  // Criar/encontrar cliente no Asaas
  const existing = await asaas(`/customers?name=${encodeURIComponent(buyer_name)}&limit=1`)
  let customerId: string
  if (existing.data?.length > 0) {
    customerId = existing.data[0].id
  } else {
    const customer = await asaas('/customers', 'POST', { name: buyer_name })
    customerId = customer.id
  }

  // Criar pagamento
  const dueDate = new Date()
  dueDate.setDate(dueDate.getDate() + 1)
  const billingType = payment_method === 'pix' ? 'PIX' : 'CREDIT_CARD'

  const payment = await asaas('/payments', 'POST', {
    customer: customerId,
    billingType,
    value: Number(amount),
    dueDate: dueDate.toISOString().split('T')[0],
    description: `Presente: ${gift.name} — Casamento Luisa & Gabriel`,
  })

  if (!payment.id) {
    const msg = payment.errors?.[0]?.description ?? payment.message ?? JSON.stringify(payment)
    return res.status(500).json({ error: `Asaas: ${msg}` })
  }

  // PIX: buscar QR code
  let pix_qr_code: string | null = null
  let pix_key: string | null = null
  if (billingType === 'PIX') {
    const pix = await asaas(`/payments/${payment.id}/pixQrCode`)
    pix_qr_code = pix.encodedImage ?? null
    pix_key = pix.payload ?? null
  }

  // Salvar compra no Supabase
  const { data: purchase } = await supabase.from('gift_purchases').insert({
    gift_id,
    buyer_name: buyer_name.trim(),
    buyer_message: buyer_message?.trim() || null,
    amount: Number(amount),
    payment_method,
    payment_status: 'pending',
    asaas_payment_id: payment.id,
    asaas_payment_url: payment.invoiceUrl ?? null,
    asaas_pix_qr_code: pix_qr_code,
    asaas_pix_key: pix_key,
  }).select().single()

  return res.status(200).json({
    purchase_id: purchase?.id,
    payment_url: payment.invoiceUrl,
    pix_qr_code,
    pix_key,
  })
}
