import { useState, useEffect, useRef, ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Session } from '@supabase/supabase-js'
import { supabase, Gift, GiftPurchase } from '../lib/supabase'

const C = {
  cream: '#F5F0EA', green: '#2D4A3E', greenMid: '#4A7A65',
  gold: '#C9A86C', border: '#D4E6DC', text: '#6B7563',
  white: '#fff', red: '#b33',
}

const fmtBRL = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)
const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })

const inputSt: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  border: `1px solid ${C.border}`, background: C.white,
  fontFamily: 'Montserrat, sans-serif', fontSize: '0.88rem',
  color: C.green, outline: 'none', boxSizing: 'border-box',
}
const labelSt: React.CSSProperties = {
  fontFamily: 'Montserrat, sans-serif', fontSize: '0.62rem',
  letterSpacing: '0.28em', textTransform: 'uppercase',
  color: C.text, display: 'block', marginBottom: 7,
}

// ═══════════════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════════════
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Email ou senha incorretos.')
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: C.cream, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ width: '100%', maxWidth: 420 }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 44, textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', border: `1px solid ${C.green}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: C.green, fontWeight: 500 }}>L&G</span>
          </div>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', color: C.text, marginBottom: 10 }}>Área de Gestão</span>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.4rem', fontWeight: 500, color: C.green, margin: 0, letterSpacing: '0.04em' }}>Lista de Presentes</h1>
          <div style={{ width: 40, height: 1, background: C.gold, marginTop: 20 }} />
        </div>

        {/* Formulário */}
        <div style={{ background: C.white, border: `1px solid ${C.border}`, padding: '2.5rem' }}>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={labelSt}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputSt} autoComplete="email" />
            </div>
            <div>
              <label style={labelSt}>Senha</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={inputSt} autoComplete="current-password" />
            </div>
            {error && (
              <p style={{ fontFamily: 'Montserrat', fontSize: '0.78rem', color: C.red, textAlign: 'center', margin: 0 }}>{error}</p>
            )}
            <button type="submit" disabled={loading} style={{
              marginTop: 6, padding: '14px',
              background: loading ? 'rgba(45,74,62,0.5)' : C.green,
              color: C.cream, fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.35em',
              textTransform: 'uppercase', border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s',
            }}>
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>
        </div>

        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', color: 'rgba(107,117,99,0.5)', textAlign: 'center', marginTop: 20, letterSpacing: '0.1em' }}>
          Luisa & Gabriel · 21 · 04 · 2027
        </p>
      </motion.div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// MODAL ADD / EDIT
// ═══════════════════════════════════════════════════════════════════
interface GiftForm {
  name: string; description: string; price: string
  type: 'fixed' | 'free'; quantity: string; active: boolean; sort_order: string
}
const defaultForm: GiftForm = { name: '', description: '', price: '', type: 'fixed', quantity: '1', active: true, sort_order: '0' }

function GiftModal({ gift, onClose, onSaved }: { gift: Gift | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState<GiftForm>(
    gift ? { name: gift.name, description: gift.description ?? '', price: gift.price?.toString() ?? '', type: gift.type, quantity: gift.quantity.toString(), active: gift.active, sort_order: gift.sort_order.toString() } : defaultForm
  )
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [preview, setPreview] = useState(gift?.photo_url ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const set = (k: keyof GiftForm, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return
    setPhotoFile(file)
    setPreview(URL.createObjectURL(file))
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true); setError('')
    try {
      let photo_url = gift?.photo_url ?? null
      if (photoFile) {
        const ext = photoFile.name.split('.').pop()
        const fn = `${Date.now()}.${ext}`
        const { error: upErr } = await supabase.storage.from('gift-photos').upload(fn, photoFile, { upsert: true })
        if (upErr) throw upErr
        photo_url = supabase.storage.from('gift-photos').getPublicUrl(fn).data.publicUrl
      }
      const payload = {
        name: form.name.trim(),
        description: form.description.trim() || null,
        price: form.type === 'fixed' ? parseFloat(form.price.replace(',', '.')) : null,
        type: form.type, photo_url,
        quantity: parseInt(form.quantity) || 1,
        active: form.active,
        sort_order: parseInt(form.sort_order) || 0,
      }
      if (gift) {
        const { error } = await supabase.from('gifts').update(payload).eq('id', gift.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('gifts').insert({ ...payload, quantity_bought: 0 })
        if (error) throw error
      }
      onSaved(); onClose()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar.')
    } finally { setSaving(false) }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
        onClick={e => { if (e.target === e.currentTarget) onClose() }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          style={{ background: C.white, width: '100%', maxWidth: 560, maxHeight: '92vh', overflowY: 'auto' }}
        >
          {/* Modal header */}
          <div style={{ background: C.green, padding: '1.6rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 500, color: C.cream, margin: 0 }}>
              {gift ? 'Editar Presente' : 'Novo Presente'}
            </h2>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,240,234,0.5)', fontSize: '1.6rem', lineHeight: 1 }}>×</button>
          </div>

          <form onSubmit={save} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label style={labelSt}>Nome *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} required style={inputSt} placeholder="Ex: Jogo de panelas" />
            </div>
            <div>
              <label style={labelSt}>Descrição</label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} style={{ ...inputSt, resize: 'vertical' }} placeholder="Descrição do presente (opcional)" />
            </div>

            {/* Tipo */}
            <div>
              <label style={labelSt}>Tipo de valor</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {(['fixed', 'free'] as const).map(t => (
                  <button key={t} type="button" onClick={() => set('type', t)} style={{
                    padding: '11px', border: `1px solid ${form.type === t ? C.green : C.border}`,
                    background: form.type === t ? C.green : C.white,
                    color: form.type === t ? C.cream : C.text,
                    fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.2em',
                    textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
                  }}>
                    {t === 'fixed' ? 'Preço Fixo' : 'Valor Livre'}
                  </button>
                ))}
              </div>
            </div>

            {form.type === 'fixed' && (
              <div>
                <label style={labelSt}>Preço (R$) *</label>
                <input value={form.price} onChange={e => set('price', e.target.value)} required type="number" min="0" step="0.01" style={inputSt} placeholder="0,00" />
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelSt}>Quantidade</label>
                <input value={form.quantity} onChange={e => set('quantity', e.target.value)} type="number" min="1" style={inputSt} />
              </div>
              <div>
                <label style={labelSt}>Ordem</label>
                <input value={form.sort_order} onChange={e => set('sort_order', e.target.value)} type="number" min="0" style={inputSt} placeholder="0 = primeiro" />
              </div>
            </div>

            {/* Foto */}
            <div>
              <label style={labelSt}>Foto</label>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                {preview && (
                  <div style={{ width: 90, height: 68, flexShrink: 0, border: `1px solid ${C.border}`, overflow: 'hidden' }}>
                    <img src={preview} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                )}
                <button type="button" onClick={() => fileRef.current?.click()} style={{
                  padding: '10px 20px', border: `1px solid ${C.border}`, background: C.cream,
                  fontFamily: 'Montserrat', fontSize: '0.62rem', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: C.text, cursor: 'pointer',
                }}>
                  {preview ? 'Trocar foto' : 'Selecionar foto'}
                </button>
                <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
              </div>
            </div>

            {/* Ativo */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderTop: `1px solid ${C.border}` }}>
              <div>
                <label style={{ ...labelSt, marginBottom: 2 }}>Visível para convidados</label>
                <p style={{ fontFamily: 'Montserrat', fontSize: '0.72rem', color: C.text, margin: 0 }}>
                  {form.active ? 'Aparece na lista pública' : 'Oculto da lista pública'}
                </p>
              </div>
              <button type="button" onClick={() => set('active', !form.active)} style={{
                width: 52, height: 28, borderRadius: 14, flexShrink: 0,
                background: form.active ? C.green : C.border,
                border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.25s',
              }}>
                <span style={{
                  position: 'absolute', top: 4, left: form.active ? 26 : 4,
                  width: 20, height: 20, borderRadius: '50%', background: C.white, transition: 'left 0.25s',
                }} />
              </button>
            </div>

            {error && <p style={{ fontFamily: 'Montserrat', fontSize: '0.78rem', color: C.red, margin: 0 }}>{error}</p>}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 10, marginTop: 4 }}>
              <button type="button" onClick={onClose} style={{
                padding: '13px', border: `1px solid ${C.border}`, background: C.white,
                fontFamily: 'Montserrat', fontSize: '0.62rem', letterSpacing: '0.22em',
                textTransform: 'uppercase', color: C.text, cursor: 'pointer',
              }}>Cancelar</button>
              <button type="submit" disabled={saving} style={{
                padding: '13px', background: saving ? 'rgba(45,74,62,0.5)' : C.green,
                color: C.cream, fontFamily: 'Montserrat', fontSize: '0.65rem',
                fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase',
                border: 'none', cursor: saving ? 'not-allowed' : 'pointer',
              }}>
                {saving ? 'Salvando…' : gift ? 'Salvar alterações' : 'Criar presente'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ═══════════════════════════════════════════════════════════════════
// GIFT CARD (admin)
// ═══════════════════════════════════════════════════════════════════
function GiftCard({ gift, purchases, onEdit, onDelete }: {
  gift: Gift; purchases: GiftPurchase[]
  onEdit: (g: Gift) => void; onDelete: (id: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [confirmDel, setConfirmDel] = useState(false)
  const mine = purchases.filter(p => p.gift_id === gift.id)
  const available = gift.quantity - gift.quantity_bought

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ background: C.white, border: `1px solid ${C.border}`, marginBottom: 10, overflow: 'hidden' }}
    >
      <div style={{ padding: '1.2rem 1.5rem', display: 'flex', gap: 14, alignItems: 'center' }}>
        {/* Foto */}
        {gift.photo_url ? (
          <div style={{ width: 84, height: 64, flexShrink: 0, overflow: 'hidden', border: `1px solid ${C.border}` }}>
            <img src={gift.photo_url} alt={gift.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        ) : (
          <div style={{ width: 84, height: 64, flexShrink: 0, background: C.cream, border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.4rem' }}>🎁</span>
          </div>
        )}

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 3 }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 500, color: C.green, margin: 0, lineHeight: 1.2 }}>{gift.name}</h3>
            {!gift.active && <span style={{ fontFamily: 'Montserrat', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: C.text, background: C.cream, border: `1px solid ${C.border}`, padding: '2px 8px' }}>Oculto</span>}
          </div>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Montserrat', fontSize: '0.78rem', color: C.gold, fontWeight: 600 }}>
              {gift.type === 'free' ? 'Valor livre' : fmtBRL(gift.price ?? 0)}
            </span>
            <span style={{ fontFamily: 'Montserrat', fontSize: '0.72rem', color: C.text }}>
              {available > 0 ? `${available} disponível${available > 1 ? 'is' : ''}${gift.quantity > 1 ? ` de ${gift.quantity}` : ''}` : '✓ Comprado'}
            </span>
            {mine.length > 0 && (
              <button onClick={() => setExpanded(e => !e)} style={{ fontFamily: 'Montserrat', fontSize: '0.68rem', color: C.greenMid, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>
                {mine.length} compra{mine.length > 1 ? 's' : ''} {expanded ? '▲' : '▼'}
              </button>
            )}
          </div>
        </div>

        {/* Ações */}
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button onClick={() => onEdit(gift)} style={{ padding: '8px 18px', border: `1px solid ${C.green}`, background: C.white, fontFamily: 'Montserrat', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.green, cursor: 'pointer' }}>
            Editar
          </button>
          {confirmDel ? (
            <button onClick={() => onDelete(gift.id)} style={{ padding: '8px 18px', border: 'none', background: C.red, fontFamily: 'Montserrat', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.white, cursor: 'pointer' }}>
              Confirmar
            </button>
          ) : (
            <button onClick={() => setConfirmDel(true)} onBlur={() => setTimeout(() => setConfirmDel(false), 200)} style={{ padding: '8px 18px', border: `1px solid ${C.border}`, background: C.white, fontFamily: 'Montserrat', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.text, cursor: 'pointer' }}>
              Excluir
            </button>
          )}
        </div>
      </div>

      {/* Compras expandidas */}
      <AnimatePresence>
        {expanded && mine.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden', borderTop: `1px solid ${C.border}`, background: C.cream }}
          >
            {mine.map(p => (
              <div key={p.id} style={{ padding: '0.85rem 1.5rem', display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontFamily: 'Montserrat', fontSize: '0.82rem', color: C.green, fontWeight: 600, minWidth: 130 }}>{p.buyer_name}</span>
                <span style={{ fontFamily: 'Montserrat', fontSize: '0.82rem', color: C.gold }}>{fmtBRL(p.amount)}</span>
                <span style={{ fontFamily: 'Montserrat', fontSize: '0.72rem', color: C.text, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{p.payment_method === 'pix' ? 'PIX' : 'Cartão'}</span>
                <span style={{
                  fontFamily: 'Montserrat', fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 10px',
                  background: p.payment_status === 'paid' ? '#d4edda' : p.payment_status === 'pending' ? '#fff3cd' : '#f8d7da',
                  color: p.payment_status === 'paid' ? '#155724' : p.payment_status === 'pending' ? '#856404' : C.red,
                }}>
                  {p.payment_status === 'paid' ? 'Pago' : p.payment_status === 'pending' ? 'Pendente' : 'Falhou'}
                </span>
                <span style={{ fontFamily: 'Montserrat', fontSize: '0.72rem', color: C.text, marginLeft: 'auto' }}>{fmtDate(p.created_at)}</span>
                {p.buyer_message && <span style={{ width: '100%', fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem', fontStyle: 'italic', color: C.text }}>"{p.buyer_message}"</span>}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════
function Dashboard({ session }: { session: Session }) {
  const [gifts, setGifts] = useState<Gift[]>([])
  const [purchases, setPurchases] = useState<GiftPurchase[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<Gift | null | undefined>(undefined)

  const load = async () => {
    setLoading(true)
    const [{ data: g }, { data: p }] = await Promise.all([
      supabase.from('gifts').select('*').order('sort_order').order('created_at'),
      supabase.from('gift_purchases').select('*').order('created_at', { ascending: false }),
    ])
    setGifts(g ?? []); setPurchases(p ?? [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const del = async (id: string) => { await supabase.from('gifts').delete().eq('id', id); load() }

  const paidPurchases = purchases.filter(p => p.payment_status === 'paid')
  const totalListValue = gifts.reduce((s, g) => s + (g.price ?? 0) * g.quantity, 0)
  const totalCollected = paidPurchases.reduce((s, p) => s + p.amount, 0)
  const totalBought = gifts.reduce((s, g) => s + g.quantity_bought, 0)
  const totalQ = gifts.reduce((s, g) => s + g.quantity, 0)

  const stats = [
    { label: 'Presentes', value: gifts.length.toString() },
    { label: 'Presenteados', value: `${totalBought}/${totalQ}` },
    { label: 'Valor total lista', value: fmtBRL(totalListValue) },
    { label: 'Total arrecadado', value: fmtBRL(totalCollected) },
  ]

  return (
    <div style={{ minHeight: '100vh', background: C.cream }}>
      {/* Header */}
      <div style={{ background: C.green, padding: '0 2rem', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(201,168,108,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem', color: C.gold, fontWeight: 500 }}>L&G</span>
          </div>
          <div>
            <p style={{ fontFamily: 'Montserrat', fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(245,240,234,0.5)', margin: 0 }}>Gestão</p>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 500, color: C.cream, margin: 0 }}>Lista de Presentes</h1>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="/presentes" target="_blank" style={{ fontFamily: 'Montserrat', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,240,234,0.5)', textDecoration: 'none' }}>Ver página ↗</a>
          <span style={{ fontFamily: 'Montserrat', fontSize: '0.72rem', color: 'rgba(245,240,234,0.5)', display: 'none' }}>{session.user.email}</span>
          <button onClick={() => supabase.auth.signOut()} style={{ padding: '7px 18px', border: '1px solid rgba(245,240,234,0.25)', background: 'none', fontFamily: 'Montserrat', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.cream, cursor: 'pointer' }}>
            Sair
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 920, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14, marginBottom: 36 }}>
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} style={{ background: C.white, border: `1px solid ${C.border}`, padding: '1.4rem 1.5rem' }}>
              <p style={{ fontFamily: 'Montserrat', fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.text, margin: '0 0 10px' }}>{s.label}</p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem', fontWeight: 500, color: C.green, margin: 0 }}>{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Linha com título + botão */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.7rem', fontWeight: 500, color: C.green, margin: 0 }}>
            Presentes {!loading && gifts.length > 0 && <span style={{ fontSize: '1.1rem', color: C.text, fontWeight: 400 }}>({gifts.length})</span>}
          </h2>
          <button onClick={() => setModal(null)} style={{
            padding: '10px 26px', background: C.green, color: C.cream,
            fontFamily: 'Montserrat', fontSize: '0.62rem', fontWeight: 700,
            letterSpacing: '0.25em', textTransform: 'uppercase', border: 'none', cursor: 'pointer',
          }}>+ Novo presente</button>
        </div>

        {/* Lista */}
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontStyle: 'italic', color: C.text }}>Carregando…</p>
          </div>
        ) : gifts.length === 0 ? (
          <div style={{ background: C.white, border: `1px solid ${C.border}`, padding: '4rem', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontStyle: 'italic', color: C.text, margin: '0 0 20px' }}>Nenhum presente cadastrado ainda.</p>
            <button onClick={() => setModal(null)} style={{ padding: '12px 32px', background: C.green, color: C.cream, fontFamily: 'Montserrat', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}>
              Adicionar primeiro presente
            </button>
          </div>
        ) : (
          gifts.map(g => (
            <GiftCard key={g.id} gift={g} purchases={purchases} onEdit={setModal} onDelete={del} />
          ))
        )}
      </div>

      {modal !== undefined && (
        <GiftModal gift={modal ?? null} onClose={() => setModal(undefined)} onSaved={load} />
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// ENTRY POINT
// ═══════════════════════════════════════════════════════════════════
export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => { setSession(session); setChecking(false) })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  if (checking) return (
    <div style={{ minHeight: '100vh', background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', fontStyle: 'italic', color: C.text }}>Carregando…</p>
    </div>
  )

  return session ? <Dashboard session={session} /> : <LoginForm />
}
