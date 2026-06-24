import { useState } from 'react'
import { useOrder, getMemberOrder } from '../state/OrderContext'
import { MENUS } from '../data/menus'
import type { Member } from '../types'
import Modal from './Modal'
import form from './forms.module.css'
import styles from './OrderModal.module.css'

type Slot = 'first' | 'second'

export default function OrderModal({
  member,
  onClose,
}: {
  member: Member
  onClose: () => void
}) {
  const { state, dispatch } = useOrder()
  const brandId = state.selectedBrandId!
  const menu = MENUS[brandId]
  const order = getMemberOrder(state, brandId, member.id)

  const [first, setFirst] = useState<string | null>(order.firstChoiceId)
  const [second, setSecond] = useState<string | null>(order.secondChoiceId)
  const [slot, setSlot] = useState<Slot>('first')

  const pick = (menuId: string) => {
    if (slot === 'first') {
      setFirst(menuId)
      setSlot('second') // 1순위 고르면 자동으로 2순위 선택으로 이동
    } else {
      setSecond(menuId)
    }
  }

  const save = () => {
    dispatch({
      type: 'SET_MEMBER_ORDER',
      memberId: member.id,
      patch: { firstChoiceId: first, secondChoiceId: second },
    })
    // 메뉴를 골랐으면 자동으로 주문 포함 처리
    if (first && !order.selected) {
      dispatch({ type: 'TOGGLE_MEMBER_SELECTED', memberId: member.id })
    }
    onClose()
  }

  const selectedId = slot === 'first' ? first : second

  return (
    <Modal
      title={`${member.name} 님의 주문`}
      onClose={onClose}
      footer={
        <>
          <button
            type="button"
            className={`${form.btn} ${form.secondary}`}
            onClick={onClose}
          >
            취소
          </button>
          <button
            type="button"
            className={`${form.btn} ${form.primary}`}
            onClick={save}
          >
            저장
          </button>
        </>
      }
    >
      <div className={styles.slots}>
        <button
          type="button"
          className={`${styles.slot} ${slot === 'first' ? styles.active : ''}`}
          onClick={() => setSlot('first')}
        >
          <span className={styles.slotLabel}>오전 · 1순위</span>
          <span className={styles.slotValue}>
            {first ? menuName(brandId, first) : '메뉴 선택'}
          </span>
        </button>
        <button
          type="button"
          className={`${styles.slot} ${slot === 'second' ? styles.active : ''}`}
          onClick={() => setSlot('second')}
        >
          <span className={styles.slotLabel}>오후 · 2순위(대체)</span>
          <span className={styles.slotValue}>
            {second ? menuName(brandId, second) : '메뉴 선택'}
          </span>
        </button>
      </div>

      <p className={styles.hint}>
        1순위가 품절이거나 없을 경우 2순위로 대체합니다.
      </p>

      <ul className={styles.menuList}>
        {menu.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={`${styles.menuItem} ${
                selectedId === item.id ? styles.menuItemActive : ''
              }`}
              onClick={() => pick(item.id)}
            >
              <span>{item.name}</span>
              {selectedId === item.id && <span className={styles.check}>✓</span>}
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  )
}

function menuName(brandId: keyof typeof MENUS, menuId: string): string {
  return MENUS[brandId].find((m) => m.id === menuId)?.name ?? '-'
}
