'use client'

import { useState, useEffect } from 'react'
import { fetchExchangeRate, convertCNYtoVND, convertVNDtoCNY, formatCNY } from '@/lib/exchange-rate'
import { formatCurrency } from '@/lib/utils'
import { RefreshCw, ArrowRightLeft } from 'lucide-react'

export default function ExchangeRateWidget() {
    const [rate, setRate] = useState(3500)
    const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState('')
    const [direction, setDirection] = useState<'cny_to_vnd' | 'vnd_to_cny'>('cny_to_vnd')
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

    useEffect(() => { loadRate() }, [])

    const loadRate = async () => {
        setLoading(true)
        const r = await fetchExchangeRate()
        setRate(r)
        setLastUpdated(new Date())
        setLoading(false)
    }

    const converted = amount ? (
        direction === 'cny_to_vnd'
            ? formatCurrency(convertCNYtoVND(parseFloat(amount), rate))
            : formatCNY(convertVNDtoCNY(parseFloat(amount), rate))
    ) : ''

    return (
        <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600 }}>\ud83d\udcb1 Quy \u0111\u1ed5i t\u1ef7 gi\u00e1</h3>
                <button onClick={loadRate} disabled={loading} style={{
                    display: 'flex', alignItems: 'center', gap: '6px', background: 'none',
                    border: '1px solid var(--color-border)', borderRadius: '8px', padding: '6px 12px',
                    fontSize: '12px', cursor: 'pointer', color: 'var(--color-text-secondary)',
                }}>
                    <RefreshCw size={14} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
                    C\u1eadp nh\u1eadt
                </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', padding: '10px 14px', background: 'var(--color-bg-hover)', borderRadius: '10px' }}>
                <span style={{ fontSize: '24px' }}>\u00a5</span>
                <span style={{ fontSize: '14px', fontWeight: 600 }}>1 CNY = {rate.toLocaleString()} VN\u0110</span>
                {lastUpdated && <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>
                    {lastUpdated.toLocaleTimeString('vi-VN')}
                </span>}
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
                <input
                    type="number" value={amount} onChange={e => setAmount(e.target.value)}
                    placeholder={direction === 'cny_to_vnd' ? 'Nh\u1eadp CNY' : 'Nh\u1eadp VN\u0110'}
                    className="input-field" style={{ flex: 1 }}
                />
                <button onClick={() => setDirection(d => d === 'cny_to_vnd' ? 'vnd_to_cny' : 'cny_to_vnd')}
                    style={{ background: 'var(--color-primary-100)', border: 'none', borderRadius: '10px', padding: '10px', cursor: 'pointer' }}>
                    <ArrowRightLeft size={18} color="var(--color-primary-500)" />
                </button>
            </div>

            {converted && (
                <div style={{ padding: '12px 16px', background: 'var(--color-primary-50)', borderRadius: '10px', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                        {direction === 'cny_to_vnd' ? 'K\u1ebft qu\u1ea3 (VN\u0110)' : 'K\u1ebft qu\u1ea3 (CNY)'}
                    </span>
                    <p style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-primary-600)', marginTop: '4px' }}>
                        {converted}
                    </p>
                </div>
            )}
            <style jsx>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}
