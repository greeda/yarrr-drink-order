import { useState } from 'react'
import { useOrder } from '../state/OrderContext'
import { BRAND_MAP } from '../data/brands'
import { readableText } from '../utils/color'
import OrdererModal from './OrdererModal'
import styles from './Header.module.css'

export default function Header() {
  const { state, dispatch } = useOrder()
  const [ordererOpen, setOrdererOpen] = useState(false)
  const brand = state.selectedBrandId ? BRAND_MAP[state.selectedBrandId] : null

  const fg = brand ? readableText(brand.color) : '#fff'
  const soft = fg === '#ffffff' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)'
  const softBorder = fg === '#ffffff' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.25)'

  return (
    <header
      className={styles.header}
      style={
        {
          background: brand?.color,
          color: fg,
          textShadow: fg === '#ffffff' ? '0 1px 2px rgba(0,0,0,0.18)' : 'none',
          '--fg-soft': soft,
          '--fg-border': softBorder,
        } as React.CSSProperties
      }
    >
      <button
        type="button"
        className={styles.back}
        onClick={() => dispatch({ type: 'BACK_TO_BRANDS' })}
        aria-label="브랜드 선택으로"
      >
        ‹
      </button>

      <h1 className={styles.brand}>{brand?.name}</h1>

      <button
        type="button"
        className={styles.orderer}
        onClick={() => setOrdererOpen(true)}
      >
        {state.orderer ? `🧾 ${state.orderer}` : '주문자'}
      </button>

      {ordererOpen && <OrdererModal onClose={() => setOrdererOpen(false)} />}
    </header>
  )
}
