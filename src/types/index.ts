export type UserRole = 'admin' | 'employee' | 'ctv'

export interface Profile {
    id: string
    full_name: string
    email: string | null
    role: UserRole
    phone: string | null
    avatar_url: string | null
    created_at: string
    updated_at: string
}

export interface Customer {
    id: string
    name: string
    phone: string | null
    address: string | null
    notes: string | null
    created_by: string | null
    created_at: string
    updated_at: string
}

export interface Category {
    id: string
    name: string
    created_at: string
}

export interface Product {
    id: string
    name: string
    category_id: string | null
    image_url: string | null
    purchase_price: number
    selling_price: number
    description: string | null
    low_stock_threshold: number
    created_at: string
    updated_at: string
    category?: Category
    variants?: ProductVariant[]
}

export interface ProductVariant {
    id: string
    product_id: string
    variant_name: string
    quantity: number
    created_at: string
}

export interface OrderOrder {
    id: string
    order_date: string
    customer_id: string | null
    product_name: string
    quantity: number
    order_price: number
    deposit: number
    remaining: number
    ctv_id: string | null
    ctv_commission: number
    deal_finder_id: string | null
    deal_commission: number
    weight_fee: number
    extra_cost: number
    is_ordered: boolean
    is_arrived: boolean
    notes: string | null
    created_by: string | null
    created_at: string
    updated_at: string
    customer?: Customer
    ctv?: Profile
    deal_finder?: Profile
}

export interface AvailableOrder {
    id: string
    order_date: string
    customer_id: string | null
    product_id: string | null
    variant_id: string | null
    quantity: number
    selling_price: number
    amount_paid: number
    remaining: number
    notes: string | null
    created_by: string | null
    created_at: string
    updated_at: string
    customer?: Customer
    product?: Product
    variant?: ProductVariant
}

export interface OrderBatch {
    id: string
    batch_date: string
    total_before_order: number
    total_after_order: number
    total_commission: number
    total_fees: number
    profit: number
    notes: string | null
    created_at: string
    items?: OrderBatchItem[]
}

export interface OrderBatchItem {
    id: string
    batch_id: string
    order_id: string
    order?: OrderOrder
}

export interface Transaction {
    id: string
    type: 'income' | 'expense'
    category: string
    amount: number
    description: string | null
    reference_type: string | null
    reference_id: string | null
    transaction_date: string
    created_at: string
}

export interface Setting {
    id: string
    key: string
    value: Record<string, unknown>
    updated_at: string
}

export interface CTVPayment {
    id: string
    ctv_id: string
    month: number
    year: number
    total_commission: number
    total_deal_commission: number
    total_amount: number
    is_paid: boolean
    paid_at: string | null
    notes: string | null
    created_at: string
    ctv?: Profile
}

export interface StoreInfo {
    name: string
    phone: string
    address: string
}

export interface ExchangeRate {
    cny_to_vnd: number
    auto_update: boolean
}

// Navigation
export interface NavItem {
    title: string
    href: string
    icon: string
    roles: UserRole[]
    children?: NavItem[]
}
