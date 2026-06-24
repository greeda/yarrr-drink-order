import { useState } from 'react'
import { useOrder } from '../state/OrderContext'
import type { Member } from '../types'
import Header from '../components/Header'
import MemberGrid from '../components/MemberGrid'
import OrderSummary from '../components/OrderSummary'
import BottomNav from '../components/BottomNav'
import OrderModal from '../components/OrderModal'
import AddMemberModal from '../components/AddMemberModal'
import styles from './OrderScreen.module.css'

export default function OrderScreen() {
  const { state, dispatch } = useOrder()
  const brandId = state.selectedBrandId!

  const [deleteMode, setDeleteMode] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [orderMember, setOrderMember] = useState<Member | null>(null)

  const requestDelete = (member: Member) => {
    if (window.confirm(`'${member.name}' 님을 프로젝트 인원에서 삭제할까요?`)) {
      dispatch({ type: 'REMOVE_MEMBER', memberId: member.id })
    }
  }

  return (
    <div className={styles.screen}>
      <Header />

      <main className={styles.main}>
        {deleteMode && (
          <p className={styles.deleteHint}>
            삭제할 멤버를 선택하세요. 완료하면 하단 [삭제 완료]를 누르세요.
          </p>
        )}

        <MemberGrid
          members={state.members}
          deleteMode={deleteMode}
          onOpenOrder={setOrderMember}
          onRequestDelete={requestDelete}
        />

        {!deleteMode && state.members.length > 0 && (
          <OrderSummary brandId={brandId} />
        )}
      </main>

      <BottomNav
        deleteMode={deleteMode}
        onMembers={() => setDeleteMode(false)}
        onAdd={() => {
          setDeleteMode(false)
          setAddOpen(true)
        }}
        onToggleDelete={() => setDeleteMode((v) => !v)}
      />

      {orderMember && (
        <OrderModal member={orderMember} onClose={() => setOrderMember(null)} />
      )}
      {addOpen && <AddMemberModal onClose={() => setAddOpen(false)} />}
    </div>
  )
}
