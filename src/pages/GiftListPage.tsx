import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase, Gift, GiftPurchase } from '../lib/supabase'

const fmtBRL = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

// ─── BUY MODAL ──────────────────────────────────────────────────────────────

function BuyModal({ gift, onClose, onPaid: _onPaid }: { gift: Gift; onClose: () => void; onPaid: () => void }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState<'pix' | 'credit_card'>('pix')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pix, setPix] = useState<{ qr: string; key: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const inputSt: React.CSSProperties = {
    width: '100%', padding: '12px 16px',
    border: '1px solid #D4E6DC', background: '#fff',
    fontFamily: 'Montserrat, sans-serif', fontSize: '0.88rem',
    color: '#2D4A3E', outline: 'none', boxSizing: 'border-box',
  }

  const finalAmount = gift.type === 'fixed' ? (gift.price ?? 0) : parseFloat(amount.replace(',', '.'))
  const canSubmit = name.trim().length > 0 && (gift.type === 'fixed' || (parseFloat(amount) > 0))

  const handleSubmit = async () => {
    if (!canSubmit) return
    setLoading(true); setError('')
    try {
      const r = await fetch('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gift_id: gift.id, buyer_name: name.trim(), buyer_message: message.trim(), amount: finalAmount, payment_method: method }),
      })
      const data = await r.json()
      if (!r.ok) { setError(data.error ?? 'Erro ao processar pagamento.'); return }

      if (method === 'pix' && data.pix_qr_code) {
        setPix({ qr: data.pix_qr_code, key: data.pix_key })
      } else if (data.payment_url) {
        window.open(data.payment_url, '_blank')
        onClose()
      }
    } catch {
      setError('Erro de conexão. Tente novamente.')
    } finally { setLoading(false) }
  }

  const copyKey = () => {
    if (pix?.key) { navigator.clipboard.writeText(pix.key); setCopied(true); setTimeout(() => setCopied(false), 2500) }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, background: 'rgba(45,74,62,0.75)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          style={{ background: '#F5F0EA', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}
        >
          {/* Header */}
          <div style={{ background: '#2D4A3E', padding: '2rem 2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.6rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: '#C9A86C', display: 'block', marginBottom: 8 }}>
                {pix ? 'Pagamento PIX' : 'Presentear'}
              </span>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 500, color: '#F5F0EA', margin: 0, lineHeight: 1.2 }}>
                {gift.name}
              </h2>
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,240,234,0.5)', fontSize: '1.8rem', lineHeight: 1, flexShrink: 0, marginTop: -4 }}>×</button>
          </div>

          <div style={{ padding: '2rem' }}>
            {/* ── Tela PIX ── */}
            {pix ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center' }}>
                <p style={{ fontFamily: 'Montserrat', fontSize: '0.8rem', color: '#6B7563', lineHeight: 1.7, margin: 0 }}>
                  Escaneie o QR code ou copie o código PIX abaixo.<br />
                  O pagamento é confirmado automaticamente.
                </p>
                <div style={{ background: '#fff', border: '1px solid #D4E6DC', padding: 16 }}>
                  <img src={`data:image/png;base64,${pix.qr}`} alt="QR Code PIX" style={{ width: 200, height: 200, display: 'block' }} />
                </div>
                <div style={{ width: '100%', background: '#fff', border: '1px solid #D4E6DC', padding: '14px 16px', display: 'flex', gap: 10, alignItems: 'center' }}>
                  <p style={{ fontFamily: 'Montserrat', fontSize: '0.68rem', color: '#6B7563', margin: 0, flex: 1, wordBreak: 'break-all', textAlign: 'left' }}>
                    {pix.key.substring(0, 60)}…
                  </p>
                  <button onClick={copyKey} style={{ flexShrink: 0, padding: '8px 16px', background: copied ? '#2D4A3E' : '#F5F0EA', border: '1px solid #2D4A3E', fontFamily: 'Montserrat', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: copied ? '#F5F0EA' : '#2D4A3E', cursor: 'pointer', transition: 'all 0.2s' }}>
                    {copied ? 'Copiado ✓' : 'Copiar'}
                  </button>
                </div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.7rem', color: '#C9A86C', fontWeight: 500, margin: 0 }}>
                  {fmtBRL(finalAmount)}
                </p>
                <button onClick={onClose} style={{ padding: '13px 40px', border: '1px solid #2D4A3E', background: 'transparent', fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#2D4A3E', cursor: 'pointer' }}>
                  Fechar
                </button>
              </div>
            ) : (
              <>
                {gift.photo_url && (
                  <div style={{ width: '100%', height: 180, overflow: 'hidden', marginBottom: 20, border: '1px solid #D4E6DC' }}>
                    <img src={gift.photo_url} alt={gift.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                )}

                {gift.description && (
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontStyle: 'italic', color: '#6B7563', lineHeight: 1.7, margin: '0 0 20px' }}>
                    {gift.description}
                  </p>
                )}

                <div style={{ background: '#fff', border: '1px solid #D4E6DC', padding: '1rem 1.5rem', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6B7563' }}>
                    {gift.type === 'free' ? 'Você decide o valor' : 'Valor'}
                  </span>
                  {gift.type === 'fixed' && (
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#C9A86C', fontWeight: 500 }}>
                      {fmtBRL(gift.price ?? 0)}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {gift.type === 'free' && (
                    <div>
                      <label style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#6B7563', display: 'block', marginBottom: 8 }}>Valor (R$) *</label>
                      <input value={amount} onChange={e => setAmount(e.target.value)} type="number" min="1" step="0.01" placeholder="0,00" style={inputSt} />
                    </div>
                  )}
                  <div>
                    <label style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#6B7563', display: 'block', marginBottom: 8 }}>Seu nome *</label>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Como quer aparecer na lista" style={inputSt} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#6B7563', display: 'block', marginBottom: 8 }}>Mensagem (opcional)</label>
                    <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} placeholder="Deixe uma mensagem para o casal…" style={{ ...inputSt, resize: 'vertical', fontFamily: 'Montserrat, sans-serif' }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#6B7563', display: 'block', marginBottom: 10 }}>Forma de pagamento</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {(['pix', 'credit_card'] as const).map(m => (
                        <button key={m} type="button" onClick={() => setMethod(m)} style={{
                          padding: '14px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                          border: `1px solid ${method === m ? '#2D4A3E' : '#D4E6DC'}`,
                          background: method === m ? '#2D4A3E' : '#fff',
                          color: method === m ? '#F5F0EA' : '#6B7563',
                          fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', letterSpacing: '0.2em',
                          textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
                        }}>
                          {m === 'pix' ? '◆ PIX' : '▣ Cartão'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && <p style={{ fontFamily: 'Montserrat', fontSize: '0.78rem', color: '#b33', margin: 0 }}>{error}</p>}

                  <button
                    onClick={handleSubmit}
                    disabled={!canSubmit || loading}
                    style={{
                      marginTop: 8, padding: '16px',
                      background: (!canSubmit || loading) ? 'rgba(45,74,62,0.15)' : '#2D4A3E',
                      color: (!canSubmit || loading) ? 'rgba(45,74,62,0.4)' : '#F5F0EA',
                      fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', fontWeight: 700,
                      letterSpacing: '0.3em', textTransform: 'uppercase',
                      border: 'none', cursor: (!canSubmit || loading) ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {loading ? 'Processando…' : method === 'pix' ? 'Gerar PIX' : 'Pagar com cartão →'}
                  </button>

                  {method === 'credit_card' && (
                    <p style={{ fontFamily: 'Montserrat', fontSize: '0.68rem', color: '#6B7563', textAlign: 'center', margin: 0 }}>
                      Você será redirecionado para a página de pagamento seguro.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── GIFT CARD ───────────────────────────────────────────────────────────────

function GiftCard({ gift, buyers, onBuy, index }: {
  gift: Gift; buyers: string[]; onBuy: (g: Gift) => void; index: number
}) {
  const available = gift.quantity - gift.quantity_bought
  const soldOut = available <= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      style={{ background: '#fff', border: '1px solid #D4E6DC', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}
    >
      {/* Foto */}
      <div style={{ width: '100%', paddingTop: '66.67%', position: 'relative', overflow: 'hidden', background: '#F5F0EA' }}>
        {gift.photo_url ? (
          <img src={gift.photo_url} alt={gift.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
              <path d="M16 10V28M8 10h16M6 10h20v4H6z" stroke="#D4E6DC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 14v14h12V14" stroke="#D4E6DC" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16 10c0 0-1-5 3-5s3 3 3 5M16 10c0 0 1-5-3-5s-3 3-3 5" stroke="#C9A86C" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>
        )}
        {soldOut && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(45,74,62,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#F5F0EA', background: '#2D4A3E', padding: '8px 20px' }}>Presenteado ✓</span>
          </div>
        )}
        {gift.quantity > 1 && !soldOut && (
          <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(245,240,234,0.95)', padding: '4px 10px', border: '1px solid #D4E6DC' }}>
            <span style={{ fontFamily: 'Montserrat', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#6B7563' }}>{available}/{gift.quantity}</span>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', fontWeight: 500, color: '#2D4A3E', margin: 0, lineHeight: 1.25 }}>
          {gift.name}
        </h3>

        {gift.description && (
          <p style={{ fontFamily: 'Montserrat', fontSize: '0.8rem', color: '#6B7563', lineHeight: 1.75, margin: 0, flex: 1 }}>
            {gift.description}
          </p>
        )}

        <div style={{ marginTop: 'auto' }}>
          <div style={{ width: 32, height: 1, background: '#C9A86C', margin: '12px 0' }} />

          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: '#C9A86C', fontWeight: 500, margin: '0 0 8px' }}>
            {gift.type === 'free' ? 'Você decide o valor' : fmtBRL(gift.price ?? 0)}
          </p>

          {buyers.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              {buyers.map((name, i) => (
                <p key={i} style={{ fontFamily: 'Montserrat', fontSize: '0.72rem', color: '#4A7A65', margin: '0 0 2px', letterSpacing: '0.05em' }}>
                  ✓ {name}
                </p>
              ))}
            </div>
          )}

          <button
            onClick={() => !soldOut && onBuy(gift)}
            disabled={soldOut}
            style={{
              width: '100%', padding: '13px',
              background: soldOut ? 'transparent' : '#2D4A3E',
              color: soldOut ? '#6B7563' : '#F5F0EA',
              border: `1px solid ${soldOut ? '#D4E6DC' : '#2D4A3E'}`,
              fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem',
              fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase',
              cursor: soldOut ? 'default' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {soldOut ? 'Presenteado' : 'Presentear'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function GiftListPage() {
  const [gifts, setGifts] = useState<Gift[]>([])
  const [purchases, setPurchases] = useState<GiftPurchase[]>([])
  const [loading, setLoading] = useState(true)
  const [buying, setBuying] = useState<Gift | null>(null)

  const reload = async () => {
    const [{ data: g }, { data: p }] = await Promise.all([
      supabase.from('gifts').select('*').eq('active', true).order('sort_order').order('created_at'),
      supabase.from('gift_purchases').select('*').eq('payment_status', 'paid'),
    ])
    setGifts(g ?? [])
    setPurchases(p ?? [])
  }

  useEffect(() => {
    const load = async () => {
      const [{ data: g }, { data: p }] = await Promise.all([
        supabase.from('gifts').select('*').eq('active', true).order('sort_order').order('created_at'),
        supabase.from('gift_purchases').select('*').eq('payment_status', 'paid'),
      ])
      setGifts(g ?? [])
      setPurchases(p ?? [])
      setLoading(false)
    }
    load()
  }, [])

  const getBuyers = (giftId: string) =>
    purchases.filter(p => p.gift_id === giftId).map(p => p.buyer_name)

  const totalQ = gifts.reduce((s, g) => s + g.quantity, 0)
  const boughtQ = gifts.reduce((s, g) => s + g.quantity_bought, 0)
  const pct = totalQ > 0 ? Math.round((boughtQ / totalQ) * 100) : 0

  return (
    <>
      {/* ── Hero verde ── */}
      <section style={{ background: '#2D4A3E', padding: '6rem 1.5rem 5rem', textAlign: 'center', position: 'relative' }}>
        <a href="/?skip=1#lista-presentes" style={{ position: 'absolute', top: '1.8rem', left: '1.8rem', fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,240,234,0.5)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
          ← Voltar
        </a>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}
        >
          <div style={{ width: 72, height: 72, borderRadius: '50%', border: '1px solid rgba(201,168,108,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <path d="M16 10V28M8 10h16M6 10h20v4H6z" stroke="#C9A86C" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 14v14h12V14" stroke="#C9A86C" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M16 10c0 0-1-5 3-5s3 3 3 5M16 10c0 0 1-5-3-5s-3 3-3 5" stroke="rgba(201,168,108,0.7)" strokeWidth="1.1" strokeLinecap="round"/>
            </svg>
          </div>

          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: '#C9A86C' }}>
            Nos abençoe com um presente
          </span>

          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.8rem, 7vw, 4.5rem)', fontWeight: 500, color: '#F5F0EA', letterSpacing: '0.04em', margin: 0 }}>
            Lista de Presentes
          </h1>

          <div className="diamond-divider"><span /></div>

          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.88rem', color: 'rgba(245,240,234,0.65)', lineHeight: 1.9, maxWidth: 480 }}>
            Se desejar nos presentear, preparamos esta lista com carinho<br />
            para tornar nosso lar ainda mais especial.
          </p>

          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontStyle: 'italic', color: 'rgba(201,168,108,0.8)', margin: '4px 0 0' }}>
            Luisa & Gabriel · 21 de Abril de 2027
          </p>
        </motion.div>

        {/* Barra de progresso */}
        {!loading && totalQ > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ marginTop: 40, maxWidth: 400, margin: '40px auto 0' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,234,0.45)' }}>Presenteados</span>
              <span style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', color: 'rgba(201,168,108,0.7)' }}>{boughtQ} de {totalQ} · {pct}%</span>
            </div>
            <div style={{ height: 2, background: 'rgba(245,240,234,0.1)', borderRadius: 1 }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                style={{ height: '100%', background: '#C9A86C', borderRadius: 1 }}
              />
            </div>
          </motion.div>
        )}
      </section>

      {/* ── Grid de presentes ── */}
      <section style={{ background: '#F5F0EA', padding: '5rem 1.5rem 7rem' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem' }}>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontStyle: 'italic', color: '#6B7563' }}
              >
                Carregando…
              </motion.p>
            </div>
          ) : gifts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ background: '#fff', border: '1px solid #D4E6DC', padding: '4rem', textAlign: 'center' }}
            >
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontStyle: 'italic', color: '#6B7563', margin: 0 }}>
                A lista de presentes estará disponível em breve.
              </p>
            </motion.div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '2rem' }}>
              {gifts.map((g, i) => (
                <GiftCard
                  key={g.id}
                  gift={g}
                  buyers={getBuyers(g.id)}
                  onBuy={setBuying}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ── */}
      <div style={{ borderTop: '1px solid #D4E6DC', background: '#F5F0EA', padding: '2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#6B7563', margin: 0 }}>
          Luisa & Gabriel · 21 · 04 · 2027
        </p>
      </div>

      {buying && <BuyModal gift={buying} onClose={() => setBuying(null)} onPaid={() => { setBuying(null); reload() }} />}
    </>
  )
}
