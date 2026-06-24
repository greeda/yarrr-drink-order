import type { Brand } from '../types'

export const BRANDS: Brand[] = [
  { id: 'starbucks', name: '스타벅스', color: '#00704a' },
  { id: 'mega', name: '메가커피', color: '#ffce00' },
  { id: 'compose', name: '컴포즈커피', color: '#1a1a1a' },
  { id: 'banapresso', name: '바나프레소', color: '#ffd400' },
  { id: 'paik', name: '빽다방', color: '#ffe400' },
  { id: 'blueshark', name: '블루샥', color: '#0066b3' },
  { id: 'mammoth', name: '매머드커피', color: '#3b2c25' },
]

export const BRAND_MAP: Record<string, Brand> = Object.fromEntries(
  BRANDS.map((b) => [b.id, b]),
)
