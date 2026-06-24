import type { Member } from '../types'
import MemberCard from './MemberCard'
import styles from './MemberGrid.module.css'

interface MemberGridProps {
  members: Member[]
  deleteMode: boolean
  onOpenOrder: (member: Member) => void
  onRequestDelete: (member: Member) => void
}

export default function MemberGrid({
  members,
  deleteMode,
  onOpenOrder,
  onRequestDelete,
}: MemberGridProps) {
  if (members.length === 0) {
    return (
      <div className={styles.empty}>
        <p>아직 등록된 프로젝트 인원이 없어요.</p>
        <p className={styles.emptyHint}>하단의 [인원 추가]로 멤버를 추가하세요.</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          deleteMode={deleteMode}
          onOpenOrder={onOpenOrder}
          onRequestDelete={onRequestDelete}
        />
      ))}
    </div>
  )
}
