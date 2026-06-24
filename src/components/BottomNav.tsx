import styles from './BottomNav.module.css'

interface BottomNavProps {
  deleteMode: boolean
  onMembers: () => void
  onAdd: () => void
  onToggleDelete: () => void
}

export default function BottomNav({
  deleteMode,
  onMembers,
  onAdd,
  onToggleDelete,
}: BottomNavProps) {
  return (
    <nav className={styles.nav}>
      <button
        type="button"
        className={`${styles.item} ${!deleteMode ? styles.active : ''}`}
        onClick={onMembers}
      >
        <span className={styles.icon}>👥</span>
        <span>프로젝트 인원</span>
      </button>
      <button type="button" className={styles.item} onClick={onAdd}>
        <span className={styles.icon}>➕</span>
        <span>인원 추가</span>
      </button>
      <button
        type="button"
        className={`${styles.item} ${deleteMode ? styles.activeDanger : ''}`}
        onClick={onToggleDelete}
      >
        <span className={styles.icon}>🗑️</span>
        <span>{deleteMode ? '삭제 완료' : '인원 삭제'}</span>
      </button>
    </nav>
  )
}
