import { useState } from 'react'
import { useOrder } from '../state/OrderContext'
import Modal from './Modal'
import form from './forms.module.css'

export default function AddMemberModal({ onClose }: { onClose: () => void }) {
  const { dispatch } = useOrder()
  const [name, setName] = useState('')

  const add = () => {
    if (!name.trim()) return
    dispatch({ type: 'ADD_MEMBER', name })
    onClose()
  }

  return (
    <Modal
      title="인원 추가"
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
            onClick={add}
            disabled={!name.trim()}
          >
            추가
          </button>
        </>
      }
    >
      <label htmlFor="member-name" style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        프로젝트 인원의 이름을 입력하세요.
      </label>
      <input
        id="member-name"
        className={form.input}
        style={{ marginTop: 8 }}
        value={name}
        autoFocus
        placeholder="예: 김커피"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') add()
        }}
      />
    </Modal>
  )
}
