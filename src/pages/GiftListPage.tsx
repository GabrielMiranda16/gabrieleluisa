import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase, Gift, GiftPurchase } from '../lib/supabase'

const C = {
  cream: '#F5F0EA',
  green: '#2D4A3E',
  greenMid: '#4A7A65',
  gold: '#C9A86C',
  border: '#D4E6DC',
  text: '#6B7563',
  white: '#fff',
}

const fmtBRL = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

// ─── BUY MODAL ──────────────────────────────────────────────────────────────

interface BuyModalProps {
  gift: Gift
  onClose: () => void
}

function BuyModal({ gift, onClose }: BuyModalProps) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [amount, setAmount] = useState(gift.price ? fmtBRL(gift.price).replace('R$ ', '') : '')
  const [method, setMethod] = useState<'pix' | 'credit_card'>('pix')

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(45,74,62,0.7)', zIndex: 1000, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ background: C.white, width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem 2rem 3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.6rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: C.greenMid }}>Presentear</span>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 500, color: C.green, margin: '4px 0 0' }}>{gift.name}</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.text, fontSize: '1.5rem', lineHeight: 1, flexShrink: 0 }}>×</button>
        </div>

        {gift.photo_url && (
          <img src={gift.photo_url} alt={gift.name} style={{ width: '100%', height: 180, objectFit: 'cover', marginBottom: 20, display: 'block' }} />
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: C.text, display: 'block', marginBottom: 6 }}>Seu nome *</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Como quer ser identificado"
              style={{ width: '100%', padding: '10px 14px', border: `1px solid ${C.border}`, fontFamily: 'Montserrat', fontSize: '0.88rem', color: C.green, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: C.text, display: 'block', marginBottom: 6 }}>Mensagem (opcional)</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={3}
              placeholder="Deixe uma mensagem para o casal…"
              style={{ width: '100%', padding: '10px 14px', border: `1px solid ${C.border}`, fontFamily: 'Montserrat', fontSize: '0.88rem', color: C.green, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
            />
          </div>

          {gift.type === 'free' && (
            <div>
              <label style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: C.text, display: 'block', marginBottom: 6 }}>Valor (R$) *</label>
              <input
                value={amount}
                onChange={e => setAmount(e.target.value)}
                type="number"
                min="1"
                step="0.01"
                placeholder="0,00"
                style={{ width: '100%', padding: '10px 14px', border: `1px solid ${C.border}`, fontFamily: 'Montserrat', fontSize: '0.88rem', color: C.green, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          )}

          {gift.type === 'fixed' && (
            <div style={{ background: C.cream, padding: '12px 16px', border: `1px solid ${C.border}` }}>
              <span style={{ fontFamily: 'Montserrat', fontSize: '0.7rem', color: C.text, letterSpacing: '0.1em' }}>Valor: </span>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: C.gold, fontWeight: 500 }}>{fmtBRL(gift.price ?? 0)}</span>
            </div>
          )}

          <div>
            <label style={{ fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: C.text, display: 'block', marginBottom: 10 }}>Forma de pagamento</label>
            <div style={{ display: 'flex', gap: 12 }}>
              {(['pix', 'credit_card'] as const).map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: `1px solid ${method === m ? C.green : C.border}`,
                    background: method === m ? C.green : C.white,
                    color: method === m ? C.cream : C.text,
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                  }}
                >
                  {m === 'pix' ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill={method === m ? C.cream : C.text}>
                        <path d="M12 2L4 7l8 5 8-5-8-5zM4 12l8 5 8-5M4 17l8 5 8-5" stroke={method === m ? C.cream : C.text} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      PIX
                    </>
                  ) : (
                    <>
                      <svg width="16" height="12" viewBox="0 0 24 16" fill="none" stroke={method === m ? C.cream : C.text} strokeWidth="1.5" strokeLinecap="round">
                        <rect x="1" y="1" width="22" height="14" rx="2"/>
                        <line x1="1" y1="6" x2="23" y2="6"/>
                      </svg>
                      Cartão
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              disabled
              style={{
                padding: '16px',
                background: 'rgba(45,74,62,0.15)',
                color: 'rgba(45,74,62,0.4)',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                border: `1px solid rgba(45,74,62,0.15)`,
                cursor: 'not-allowed',
              }}
            >
              Finalizar pagamento
            </button>
            <p style={{ fontFamily: 'Montserrat', fontSize: '0.7rem', color: C.text, textAlign: 'center', margin: 0, fontStyle: 'italic' }}>
              Pagamento em breve via Asaas · PIX e Cartão
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── GIFT CARD ───────────────────────────────────────────────────────────────

interface CardProps {
  gift: Gift
  paidPurchases: GiftPurchase[]
  onBuy: (g: Gift) => void
}

function GiftCard({ gift, paidPurchases, onBuy }: CardProps) {
  const myPurchases = paidPurchases.filter(p => p.gift_id === gift.id)
  const available = gift.quantity - gift.quantity_bought
  const isSoldOut = available <= 0

  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {gift.photo_url ? (
        <div style={{ width: '100%', paddingTop: '66.67%', position: 'relative', overflow: 'hidden' }}>
          <img
            src={gift.photo_url}
            alt={gift.name}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {isSoldOut && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(45,74,62,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Montserrat', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: C.cream, background: C.green, padding: '8px 20px' }}>Presenteado ✓</span>
            </div>
          )}
        </div>
      ) : (
        <div style={{ width: '100%', paddingTop: '50%', position: 'relative', background: C.cream, border: `0 0 1px 0 solid ${C.border}` }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '2.5rem' }}>🎁</span>
          </div>
          {isSoldOut && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(45,74,62,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Montserrat', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: C.cream, background: C.green, padding: '8px 20px' }}>Presenteado ✓</span>
            </div>
          )}
        </div>
      )}

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 500, color: C.green, margin: 0 }}>{gift.name}</h3>

        {gift.description && (
          <p style={{ fontFamily: 'Montserrat', fontSize: '0.8rem', color: C.text, lineHeight: 1.7, margin: 0 }}>{gift.description}</p>
        )}

        <div style={{ marginTop: 'auto', paddingTop: 8 }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', color: C.gold, fontWeight: 500, margin: '0 0 6px' }}>
            {gift.type === 'free' ? 'Você decide o valor' : fmtBRL(gift.price ?? 0)}
          </p>

          {gift.quantity > 1 && !isSoldOut && (
            <p style={{ fontFamily: 'Montserrat', fontSize: '0.7rem', color: C.text, margin: '0 0 10px', letterSpacing: '0.1em' }}>
              {available} de {gift.quantity} disponíve{available > 1 ? 'is' : 'l'}
            </p>
          )}

          {myPurchases.length > 0 && (
            <div style={{ marginBottom: 12 }}>
              {myPurchases.map(p => (
                <p key={p.id} style={{ fontFamily: 'Montserrat', fontSize: '0.72rem', color: C.greenMid, margin: '0 0 2px' }}>
                  ✓ {p.buyer_name}
                </p>
              ))}
            </div>
          )}

          <button
            onClick={() => !isSoldOut && onBuy(gift)}
            disabled={isSoldOut}
            style={{
              width: '100%',
              padding: '12px',
              background: isSoldOut ? 'transparent' : C.green,
              color: isSoldOut ? C.text : C.cream,
              border: `1px solid ${isSoldOut ? C.border : C.green}`,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              cursor: isSoldOut ? 'default' : 'pointer',
            }}
          >
            {isSoldOut ? 'Presenteado' : 'Presentear'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function GiftListPage() {
  const navigate = useNavigate()
  const [gifts, setGifts] = useState<Gift[]>([])
  const [purchases, setPurchases] = useState<GiftPurchase[]>([])
  const [loading, setLoading] = useState(true)
  const [buyingGift, setBuyingGift] = useState<Gift | null>(null)

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

  const totalItems = gifts.length
  const totalBought = gifts.reduce((s, g) => s + g.quantity_bought, 0)
  const totalAvailable = gifts.reduce((s, g) => s + g.quantity, 0)

  return (
    <div style={{ minHeight: '100vh', background: C.cream }}>
      {/* Header */}
      <div style={{ background: C.green, padding: '3rem 1.5rem 4rem', textAlign: 'center' }}>
        <button
          onClick={() => navigate('/')}
          style={{ position: 'absolute', left: '1.5rem', top: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,240,234,0.6)', fontFamily: 'Montserrat', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}
        >
          ← Voltar
        </button>

        <div style={{ width: 72, height: 72, borderRadius: '50%', border: '1px solid rgba(201,168,108,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: C.gold, fontWeight: 500 }}>L&G</span>
        </div>

        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(201,168,108,0.8)', display: 'block', marginBottom: 12 }}>
          Nos abençoe com um presente
        </span>

        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, color: C.cream, letterSpacing: '0.04em', margin: '0 0 20px' }}>
          Lista de Presentes
        </h1>

        <div className="diamond-divider" style={{ '--line-color': 'rgba(201,168,108,0.3)' } as React.CSSProperties}><span style={{ background: C.green }} /></div>

        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.85rem', color: 'rgba(245,240,234,0.65)', lineHeight: 1.9, marginTop: 20 }}>
          Se desejar nos presentear, escolha um item abaixo<br />
          e utilize o link de pagamento para concluir.
        </p>

        {!loading && totalItems > 0 && (
          <p style={{ fontFamily: 'Montserrat', fontSize: '0.72rem', color: 'rgba(201,168,108,0.7)', letterSpacing: '0.15em', marginTop: 16 }}>
            {totalBought} de {totalAvailable} presente{totalAvailable > 1 ? 's' : ''} já escolhido{totalAvailable > 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '4rem 1.5rem 6rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: C.text, fontStyle: 'italic' }}>Carregando presentes…</p>
          </div>
        ) : gifts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: C.white, border: `1px solid ${C.border}` }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: C.text, fontStyle: 'italic', margin: 0 }}>A lista de presentes estará disponível em breve.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {gifts.map(g => (
              <GiftCard
                key={g.id}
                gift={g}
                paidPurchases={purchases}
                onBuy={setBuyingGift}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: '2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.2em', color: C.text, margin: 0 }}>
          Luisa & Gabriel · 21 · 04 · 2027
        </p>
      </div>

      {buyingGift && <BuyModal gift={buyingGift} onClose={() => setBuyingGift(null)} />}
    </div>
  )
}
