import { useOrder, getMemberOrder } from '../state/OrderContext'
import { MENU_ITEM_MAP } from '../data/menus'
import type { Member } from '../types'
import styles from './MemberCard.module.css'

interface MemberCardProps {
  member: Member
  deleteMode: boolean
  onOpenOrder: (member: Member) => void
  onRequestDelete: (member: Member) => void
}

export default function MemberCard({
  member,
  deleteMode,
  onOpenOrder,
  onRequestDelete,
}: MemberCardProps) {
  const { state, dispatch } = useOrder()
  const order = getMemberOrder(state, state.selectedBrandId, member.id)

  const firstName = order.firstChoiceId
    ? MENU_ITEM_MAP[order.firstChoiceId]?.name
    : null
  const secondName = order.secondChoiceId
    ? MENU_ITEM_MAP[order.secondChoiceId]?.name
    : null

  // 카드 전체가 선택 토글(또는 삭제) 영역 — 모바일 터치 타깃 확대
  const handleCardClick = () => {
    if (deleteMode) {
      onRequestDelete(member)
    } else {
      dispatch({ type: 'TOGGLE_MEMBER_SELECTED', memberId: member.id })
    }
  }

  return (
    <div
      className={`${styles.card} ${order.selected ? styles.selected : ''} ${
        deleteMode ? styles.deleteMode : ''
      }`}
      onClick={handleCardClick}
      role="button"
      aria-pressed={!deleteMode ? order.selected : undefined}
      aria-label={
        deleteMode
          ? `${member.name} 삭제`
          : `${member.name} 주문 ${order.selected ? '선택됨' : '선택'}`
      }
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleCardClick()
        }
      }}
    >
      <span
        className={`${styles.indicator} ${
          deleteMode ? styles.indicatorDelete : ''
        }`}
        aria-hidden
      >
        {deleteMode ? '−' : order.selected ? '✓' : ''}
      </span>

      <span className={styles.name}>{member.name}</span>

      <span className={styles.menu}>
        {firstName ? (
          <>
            <span className={styles.first}>① {firstName}</span>
            {secondName && <span className={styles.second}>② {secondName}</span>}
          </>
        ) : (
          <span className={styles.empty}>메뉴 미선택</span>
        )}
      </span>

      {!deleteMode && (
        <button
          type="button"
          className={styles.menuBtn}
          onClick={(e) => {
            e.stopPropagation()
            onOpenOrder(member)
          }}
        >
          {firstName ? '메뉴 변경' : '메뉴 선택'}
        </button>
      )}
    </div>
  )
}
