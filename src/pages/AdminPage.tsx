import { useState, useEffect, useRef, ChangeEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase, Gift, GiftPurchase } from '../lib/supabase'

const C = {
  cream: '#F5F0EA',
  green: '#2D4A3E',
  greenMid: '#4A7A65',
  gold: '#C9A86C',
  border: '#D4E6DC',
  text: '#6B7563',
  white: '#fff',
  red: '#c0392b',
}

const fmtBRL = (v: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v)

const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  border: `1px solid ${C.border}`,
  background: C.white,
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.88rem',
  color: C.green,
  outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.65rem',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color: C.text,
  display: 'block',
  marginBottom: 6,
}

// ─── LOGIN ──────────────────────────────────────────────────────────────────

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Email ou senha incorretos.')
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', border: `1px solid ${C.green}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', color: C.green, fontWeight: 500 }}>L&G</span>
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', fontWeight: 500, color: C.green, margin: '0 0 6px' }}>Lista de Presentes</h1>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: C.text, margin: 0 }}>Área de Gestão</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Senha</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
          </div>
          {error && <p style={{ fontFamily: 'Montserrat', fontSize: '0.8rem', color: C.red, textAlign: 'center', margin: 0 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: 8, padding: '14px', background: C.green, color: C.cream, fontFamily: 'Montserrat', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── MODAL ADD/EDIT ─────────────────────────────────────────────────────────

interface GiftForm {
  name: string
  description: string
  price: string
  type: 'fixed' | 'free'
  quantity: string
  active: boolean
  sort_order: string
}

const defaultForm: GiftForm = {
  name: '',
  description: '',
  price: '',
  type: 'fixed',
  quantity: '1',
  active: true,
  sort_order: '0',
}

interface ModalProps {
  gift: Gift | null
  onClose: () => void
  onSaved: () => void
}

function GiftModal({ gift, onClose, onSaved }: ModalProps) {
  const [form, setForm] = useState<GiftForm>(
    gift
      ? {
          name: gift.name,
          description: gift.description ?? '',
          price: gift.price?.toString() ?? '',
          type: gift.type,
          quantity: gift.quantity.toString(),
          active: gift.active,
          sort_order: gift.sort_order.toString(),
        }
      : defaultForm
  )
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>(gift?.photo_url ?? '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoFile(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      let photo_url = gift?.photo_url ?? null

      if (photoFile) {
        const ext = photoFile.name.split('.').pop()
        const filename = `${Date.now()}.${ext}`
        const { error: upErr } = await supabase.storage
          .from('gift-photos')
          .upload(filename, photoFile, { upsert: true })
        if (upErr) throw upErr
        const { data } = supabase.storage.from('gift-photos').getPublicUrl(filename)
        photo_url = data.publicUrl
      }

      const payload = {
        name: form.name.trim(),
        description: form.description.trim() || null,
        price: form.type === 'fixed' ? parseFloat(form.price.replace(',', '.')) : null,
        type: form.type,
        photo_url,
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

      onSaved()
      onClose()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar.')
    } finally {
      setSaving(false)
    }
  }

  const set = (field: keyof GiftForm, value: string | boolean) =>
    setForm(f => ({ ...f, [field]: value }))

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: C.white, width: '100%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto', padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 500, color: C.green, margin: 0 }}>
            {gift ? 'Editar Presente' : 'Novo Presente'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.text, fontSize: '1.4rem', lineHeight: 1 }}>×</button>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={labelStyle}>Nome *</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} required style={inputStyle} placeholder="Ex: Jogo de Panelas" />
          </div>

          <div>
            <label style={labelStyle}>Descrição</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'Montserrat, sans-serif' }}
              placeholder="Descrição opcional do presente"
            />
          </div>

          <div>
            <label style={labelStyle}>Tipo</label>
            <div style={{ display: 'flex', gap: 12 }}>
              {(['fixed', 'free'] as const).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set('type', t)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: `1px solid ${form.type === t ? C.green : C.border}`,
                    background: form.type === t ? C.green : C.white,
                    color: form.type === t ? C.cream : C.text,
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  {t === 'fixed' ? 'Preço Fixo' : 'Valor Livre'}
                </button>
              ))}
            </div>
          </div>

          {form.type === 'fixed' && (
            <div>
              <label style={labelStyle}>Preço (R$) *</label>
              <input
                value={form.price}
                onChange={e => set('price', e.target.value)}
                required
                type="number"
                min="0"
                step="0.01"
                style={inputStyle}
                placeholder="0,00"
              />
            </div>
          )}

          <div>
            <label style={labelStyle}>Quantidade</label>
            <input
              value={form.quantity}
              onChange={e => set('quantity', e.target.value)}
              type="number"
              min="1"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Ordem de exibição</label>
            <input
              value={form.sort_order}
              onChange={e => set('sort_order', e.target.value)}
              type="number"
              min="0"
              style={inputStyle}
              placeholder="0 = primeiro"
            />
          </div>

          <div>
            <label style={labelStyle}>Foto</label>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {photoPreview && (
                <img src={photoPreview} alt="" style={{ width: 80, height: 60, objectFit: 'cover', border: `1px solid ${C.border}` }} />
              )}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                style={{ padding: '10px 20px', border: `1px solid ${C.border}`, background: C.white, fontFamily: 'Montserrat', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.text, cursor: 'pointer' }}
              >
                {photoPreview ? 'Trocar foto' : 'Selecionar foto'}
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <label style={{ ...labelStyle, margin: 0 }}>Visível para convidados</label>
            <button
              type="button"
              onClick={() => set('active', !form.active)}
              style={{
                width: 48, height: 26, borderRadius: 13,
                background: form.active ? C.green : C.border,
                border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s',
              }}
            >
              <span style={{
                position: 'absolute', top: 3, left: form.active ? 24 : 4,
                width: 20, height: 20, borderRadius: '50%', background: C.white, transition: 'left 0.2s',
              }} />
            </button>
          </div>

          {error && <p style={{ fontFamily: 'Montserrat', fontSize: '0.8rem', color: C.red, margin: 0 }}>{error}</p>}

          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button
              type="button"
              onClick={onClose}
              style={{ flex: 1, padding: '12px', border: `1px solid ${C.border}`, background: C.white, fontFamily: 'Montserrat', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: C.text, cursor: 'pointer' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{ flex: 2, padding: '12px', background: C.green, color: C.cream, fontFamily: 'Montserrat', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}
            >
              {saving ? 'Salvando…' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── GIFT CARD (admin) ───────────────────────────────────────────────────────

interface GiftCardProps {
  gift: Gift
  purchases: GiftPurchase[]
  onEdit: (g: Gift) => void
  onDelete: (id: string) => void
}

function GiftCard({ gift, purchases, onEdit, onDelete }: GiftCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [confirmDel, setConfirmDel] = useState(false)
  const myPurchases = purchases.filter(p => p.gift_id === gift.id)
  const available = gift.quantity - gift.quantity_bought

  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, marginBottom: 12 }}>
      <div style={{ padding: '1.2rem 1.5rem', display: 'flex', gap: 16, alignItems: 'center' }}>
        {gift.photo_url ? (
          <img src={gift.photo_url} alt={gift.name} style={{ width: 80, height: 60, objectFit: 'cover', flexShrink: 0, border: `1px solid ${C.border}` }} />
        ) : (
          <div style={{ width: 80, height: 60, background: C.cream, border: `1px solid ${C.border}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.5rem' }}>🎁</span>
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', fontWeight: 500, color: C.green, margin: 0 }}>{gift.name}</h3>
            {!gift.active && (
              <span style={{ fontFamily: 'Montserrat', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.text, background: C.cream, border: `1px solid ${C.border}`, padding: '2px 8px' }}>Oculto</span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Montserrat', fontSize: '0.8rem', color: C.gold, fontWeight: 600 }}>
              {gift.type === 'free' ? 'Valor livre' : fmtBRL(gift.price ?? 0)}
            </span>
            <span style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', color: C.text }}>
              {available > 0 ? `${available} disponível${available > 1 ? 'is' : ''}` : '✓ Comprado'}
              {gift.quantity > 1 && ` de ${gift.quantity}`}
            </span>
            {myPurchases.length > 0 && (
              <button
                onClick={() => setExpanded(e => !e)}
                style={{ fontFamily: 'Montserrat', fontSize: '0.7rem', color: C.greenMid, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
              >
                {myPurchases.length} compra{myPurchases.length > 1 ? 's' : ''} {expanded ? '▲' : '▼'}
              </button>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          <button
            onClick={() => onEdit(gift)}
            style={{ padding: '8px 16px', border: `1px solid ${C.green}`, background: C.white, fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.green, cursor: 'pointer' }}
          >
            Editar
          </button>
          {confirmDel ? (
            <button
              onClick={() => onDelete(gift.id)}
              style={{ padding: '8px 16px', border: 'none', background: C.red, fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.white, cursor: 'pointer' }}
            >
              Confirmar
            </button>
          ) : (
            <button
              onClick={() => setConfirmDel(true)}
              onBlur={() => setTimeout(() => setConfirmDel(false), 200)}
              style={{ padding: '8px 16px', border: `1px solid ${C.border}`, background: C.white, fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.text, cursor: 'pointer' }}
            >
              Excluir
            </button>
          )}
        </div>
      </div>

      {expanded && myPurchases.length > 0 && (
        <div style={{ borderTop: `1px solid ${C.border}`, background: C.cream }}>
          {myPurchases.map(p => (
            <div key={p.id} style={{ padding: '0.8rem 1.5rem', display: 'flex', gap: 16, alignItems: 'center', borderBottom: `1px solid ${C.border}`, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Montserrat', fontSize: '0.82rem', color: C.green, fontWeight: 600, minWidth: 140 }}>{p.buyer_name}</span>
              <span style={{ fontFamily: 'Montserrat', fontSize: '0.82rem', color: C.gold }}>{fmtBRL(p.amount)}</span>
              <span style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', color: C.text, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {p.payment_method === 'pix' ? 'PIX' : 'Cartão'}
              </span>
              <span style={{
                fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                padding: '3px 10px',
                background: p.payment_status === 'paid' ? '#d4edda' : p.payment_status === 'pending' ? '#fff3cd' : '#f8d7da',
                color: p.payment_status === 'paid' ? '#155724' : p.payment_status === 'pending' ? '#856404' : C.red,
              }}>
                {p.payment_status === 'paid' ? 'Pago' : p.payment_status === 'pending' ? 'Pendente' : p.payment_status === 'failed' ? 'Falhou' : 'Cancelado'}
              </span>
              <span style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', color: C.text, marginLeft: 'auto' }}>{fmtDate(p.created_at)}</span>
              {p.buyer_message && (
                <span style={{ width: '100%', fontFamily: 'Cormorant Garamond, serif', fontSize: '0.95rem', fontStyle: 'italic', color: C.text }}>"{p.buyer_message}"</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── DASHBOARD ──────────────────────────────────────────────────────────────

interface DashboardProps {
  session: Session
}

function Dashboard({ session }: DashboardProps) {
  const [gifts, setGifts] = useState<Gift[]>([])
  const [purchases, setPurchases] = useState<GiftPurchase[]>([])
  const [loading, setLoading] = useState(true)
  const [modalGift, setModalGift] = useState<Gift | null | undefined>(undefined)

  const load = async () => {
    setLoading(true)
    const [{ data: g }, { data: p }] = await Promise.all([
      supabase.from('gifts').select('*').order('sort_order').order('created_at'),
      supabase.from('gift_purchases').select('*').order('created_at', { ascending: false }),
    ])
    setGifts(g ?? [])
    setPurchases(p ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string) => {
    await supabase.from('gifts').delete().eq('id', id)
    load()
  }

  const handleLogout = () => supabase.auth.signOut()

  const totalListValue = gifts.reduce((sum, g) => sum + (g.price ?? 0) * g.quantity, 0)
  const totalCollected = purchases
    .filter(p => p.payment_status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0)
  const totalBought = gifts.reduce((sum, g) => sum + g.quantity_bought, 0)
  const totalAvailable = gifts.reduce((sum, g) => sum + g.quantity, 0)

  return (
    <div style={{ minHeight: '100vh', background: C.cream }}>
      {/* Header */}
      <div style={{ background: C.green, padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', border: `1px solid rgba(201,168,108,0.5)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: C.gold, fontWeight: 500 }}>L&G</span>
          </div>
          <div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', fontWeight: 500, color: C.cream, margin: 0 }}>Lista de Presentes</h1>
            <p style={{ fontFamily: 'Montserrat', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(245,240,234,0.6)', margin: 0 }}>Gestão</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: 'Montserrat', fontSize: '0.75rem', color: 'rgba(245,240,234,0.6)' }}>{session.user.email}</span>
          <button
            onClick={handleLogout}
            style={{ padding: '8px 20px', border: '1px solid rgba(245,240,234,0.3)', background: 'none', fontFamily: 'Montserrat', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: C.cream, cursor: 'pointer' }}
          >
            Sair
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'Total de presentes', value: gifts.length.toString() },
            { label: 'Comprados', value: `${totalBought} / ${totalAvailable}` },
            { label: 'Valor total da lista', value: fmtBRL(totalListValue) },
            { label: 'Total arrecadado', value: fmtBRL(totalCollected) },
          ].map(stat => (
            <div key={stat.label} style={{ background: C.white, border: `1px solid ${C.border}`, padding: '1.2rem 1.5rem' }}>
              <p style={{ fontFamily: 'Montserrat', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: C.text, margin: '0 0 8px' }}>{stat.label}</p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem', fontWeight: 500, color: C.green, margin: 0 }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Ações */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 500, color: C.green, margin: 0 }}>
            Presentes {gifts.length > 0 && `(${gifts.length})`}
          </h2>
          <button
            onClick={() => setModalGift(null)}
            style={{ padding: '10px 24px', background: C.green, color: C.cream, fontFamily: 'Montserrat', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
          >
            + Novo Presente
          </button>
        </div>

        {/* Lista */}
        {loading ? (
          <p style={{ fontFamily: 'Montserrat', fontSize: '0.85rem', color: C.text, textAlign: 'center', padding: '3rem' }}>Carregando…</p>
        ) : gifts.length === 0 ? (
          <div style={{ background: C.white, border: `1px solid ${C.border}`, padding: '3rem', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.3rem', color: C.text, margin: '0 0 16px', fontStyle: 'italic' }}>Nenhum presente cadastrado ainda.</p>
            <button
              onClick={() => setModalGift(null)}
              style={{ padding: '12px 32px', background: C.green, color: C.cream, fontFamily: 'Montserrat', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
            >
              Adicionar primeiro presente
            </button>
          </div>
        ) : (
          gifts.map(g => (
            <GiftCard
              key={g.id}
              gift={g}
              purchases={purchases}
              onEdit={setModalGift}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {modalGift !== undefined && (
        <GiftModal
          gift={modalGift ?? null}
          onClose={() => setModalGift(undefined)}
          onSaved={load}
        />
      )}
    </div>
  )
}

// ─── ENTRY POINT ─────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setChecking(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', background: C.cream, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.2rem', color: C.text, fontStyle: 'italic' }}>Carregando…</p>
      </div>
    )
  }

  return session ? <Dashboard session={session} /> : <LoginForm />
}
