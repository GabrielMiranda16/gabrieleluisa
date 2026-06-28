import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!)
const WEDDING_GROUP = '120363426146161677@g.us'
const EVO_URL = process.env.EVOLUTION_API_URL!
const EVO_KEY = process.env.EVOLUTION_API_KEY!
const EVO_INST = process.env.EVOLUTION_INSTANCE!

const fmtBRL = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

async function sendWhatsApp(text: string) {
  await fetch(`${EVO_URL}/message/sendText/${EVO_INST}`, {
    method: 'POST',
    headers: { 'apikey': EVO_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ number: WEDDING_GROUP, textMessage: { text } }),
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const receivedToken = req.headers['asaas-access-token']
  if (receivedToken !== process.env.ASAAS_WEBHOOK_TOKEN) {
    return res.status(401).end()
  }

  const event = req.body
  if (!['PAYMENT_RECEIVED', 'PAYMENT_CONFIRMED'].includes(event?.event)) {
    return res.status(200).json({ ok: true })
  }

  const asaasPaymentId = event.payment?.id
  if (!asaasPaymentId) return res.status(200).json({ ok: true })

  // Buscar compra
  const { data: purchase } = await supabase
    .from('gift_purchases')
    .select('*, gifts(*)')
    .eq('asaas_payment_id', asaasPaymentId)
    .single()

  if (!purchase) return res.status(200).json({ ok: true })
  if (purchase.payment_status === 'paid') return res.status(200).json({ ok: true })

  // Atualizar status
  await supabase.from('gift_purchases').update({ payment_status: 'paid' }).eq('id', purchase.id)

  // Incrementar quantidade comprada
  await supabase
    .from('gifts')
    .update({ quantity_bought: (purchase.gifts.quantity_bought ?? 0) + 1 })
    .eq('id', purchase.gift_id)

  // Notificar WhatsApp
  const method = purchase.payment_method === 'pix' ? 'PIX' : 'Cartão de crédito'
  const msg = [
    `🎁 *Novo presente recebido!*`,
    ``,
    `*Presente:* ${purchase.gifts.name}`,
    `*De:* ${purchase.buyer_name}`,
    `*Valor:* ${fmtBRL(purchase.amount)}`,
    `*Pagamento:* ${method} ✅`,
    purchase.buyer_message ? `*Mensagem:* _"${purchase.buyer_message}"_` : null,
  ].filter(Boolean).join('\n')

  await sendWhatsApp(msg)

  return res.status(200).json({ ok: true })
}
