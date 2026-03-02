// CNY to VND exchange rate utilities

const DEFAULT_RATE = 3500 // 1 CNY \u2248 3,500 VND (approximate)

export async function fetchExchangeRate(): Promise<number> {
    try {
        const res = await fetch('https://open.er-api.com/v6/latest/CNY')
        if (!res.ok) return DEFAULT_RATE
        const data = await res.json()
        return Math.round(data.rates?.VND || DEFAULT_RATE)
    } catch {
        return DEFAULT_RATE
    }
}

export function convertCNYtoVND(cny: number, rate: number): number {
    return Math.round(cny * rate)
}

export function convertVNDtoCNY(vnd: number, rate: number): number {
    return Math.round((vnd / rate) * 100) / 100
}

export function formatCNY(amount: number): string {
    return `\u00a5${amount.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
