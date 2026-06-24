import { useMemo, useState } from 'react'
import { useOrder } from '../state/OrderContext'
import { MENU_ITEM_MAP } from '../data/menus'
import { won } from '../utils/format'
import { copyText } from '../utils/clipboard'
import type { BrandId } from '../types'
import styles from './OrderSummary.module.css'

interface SummaryRow {
  menuId: string
  name: string
  unitPrice: number
  count: number
  subtotal: number
}

/** 체크된 멤버들의 1순위 메뉴를 메뉴별로 집계한다. */
export default function OrderSummary({ brandId }: { brandId: BrandId }) {
  const { state } = useOrder()

  const { rows, totalCount, totalPrice } = useMemo(() => {
    const byBrand = state.orders[brandId] ?? {}
    const map = new Map<string, SummaryRow>()
    let totalCount = 0
    let totalPrice = 0

    for (const member of state.members) {
      const order = byBrand[member.id]
      if (!order?.selected || !order.firstChoiceId) continue
      const item = MENU_ITEM_MAP[order.firstChoiceId]
      if (!item) continue

      totalCount += 1
      totalPrice += item.price

      const existing = map.get(item.id)
      if (existing) {
        existing.count += 1
        existing.subtotal += item.price
      } else {
        map.set(item.id, {
          menuId: item.id,
          name: item.name,
          unitPrice: item.price,
          count: 1,
          subtotal: item.price,
        })
      }
    }

    const rows = [...map.values()].sort((a, b) => b.count - a.count)
    return { rows, totalCount, totalPrice }
  }, [state.orders, state.members, brandId])

  const [copied, setCopied] = useState(false)

  /** 메신저 전달용 텍스트: "음료명 x갯수" 목록 + 총 갯수/가격 */
  const buildCopyText = (): string => {
    const lines = rows.map((r) => `${r.name} x${r.count}`)
    return [
      ...lines,
      '',
      `총 ${totalCount}잔`,
      `총 가격 ${won(totalPrice)}`,
    ].join('\n')
  }

  const handleCopy = async () => {
    const ok = await copyText(buildCopyText())
    if (ok) {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } else {
      window.alert('복사에 실패했습니다. 수동으로 선택해 복사해주세요.')
    }
  }

  return (
    <div className={styles.summary}>
      <div className={styles.head}>
        <span className={styles.title}>주문 요약</span>
        <span className={styles.orderer}>
          주문자 · {state.orderer ?? '미등록'}
        </span>
      </div>

      {totalCount === 0 ? (
        <p className={styles.empty}>
          체크된 주문이 없습니다. 멤버를 선택하고 메뉴를 고르세요.
        </p>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thName}>주문내역</th>
                <th className={styles.thNum}>단가</th>
                <th className={styles.thNum}>수량</th>
                <th className={styles.thNum}>금액</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.menuId}>
                  <td className={styles.tdName}>{r.name}</td>
                  <td className={styles.tdNum}>{won(r.unitPrice)}</td>
                  <td className={styles.tdNum}>{r.count}</td>
                  <td className={styles.tdNum}>{won(r.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>총 주문 갯수</span>
              <span className={styles.totalCount}>{totalCount}잔</span>
            </div>
            <div className={styles.totalRow}>
              <span>총 가격</span>
              <span className={styles.totalPrice}>{won(totalPrice)}</span>
            </div>
          </div>

          <button
            type="button"
            className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
            onClick={handleCopy}
          >
            {copied ? '✓ 복사됨!' : '📋 주문목록 복사하기'}
          </button>

          <p className={styles.note}>
            * 1순위 기준 집계 (품절 시 2순위로 대체) · 복사 시 음료명·갯수만 전달됩니다
          </p>
        </>
      )}
    </div>
  )
}
