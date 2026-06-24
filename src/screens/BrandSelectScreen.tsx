import { useState } from 'react'
import { BRANDS } from '../data/brands'
import { useOrder } from '../state/OrderContext'
import OrdererModal from '../components/OrdererModal'
import styles from './BrandSelectScreen.module.css'

export default function BrandSelectScreen() {
  const { state, dispatch } = useOrder()
  const [ordererOpen, setOrdererOpen] = useState(false)

  return (
    <div className={styles.screen}>
      <header className={styles.topbar}>
        <h1 className={styles.title}>
          음료 고르세요! <span className={styles.yarr}>Yarrrrrrr &gt;_&lt;</span>
        </h1>
        <button
          type="button"
          className={styles.orderer}
          onClick={() => setOrdererOpen(true)}
        >
          {state.orderer ? `🧾 ${state.orderer}` : '주문자 등록'}
        </button>
      </header>

      <p className={styles.guide}>커피 브랜드를 선택하세요</p>

      <div className={styles.grid}>
        {BRANDS.map((brand) => (
          <button
            key={brand.id}
            type="button"
            className={styles.card}
            style={{ borderTopColor: brand.color }}
            onClick={() => dispatch({ type: 'SELECT_BRAND', brandId: brand.id })}
          >
            <span
              className={styles.dot}
              style={{ background: brand.color }}
              aria-hidden
            />
            <span className={styles.brandName}>{brand.name}</span>
          </button>
        ))}
      </div>

      {ordererOpen && <OrdererModal onClose={() => setOrdererOpen(false)} />}
    </div>
  )
}
