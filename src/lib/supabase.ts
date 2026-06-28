import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export interface Gift {
  id: string
  created_at: string
  name: string
  description: string | null
  price: number | null
  type: 'fixed' | 'free'
  photo_url: string | null
  quantity: number
  quantity_bought: number
  active: boolean
  sort_order: number
}

export interface GiftPurchase {
  id: string
  created_at: string
  gift_id: string
  buyer_name: string
  buyer_message: string | null
  amount: number
  payment_method: 'pix' | 'credit_card'
  payment_status: 'pending' | 'paid' | 'failed' | 'cancelled'
  asaas_payment_id: string | null
  asaas_payment_url: string | null
  asaas_pix_qr_code: string | null
  asaas_pix_key: string | null
}
