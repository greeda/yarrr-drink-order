import { useState } from 'react'
import { useOrder } from '../state/OrderContext'
import Modal from './Modal'
import form from './forms.module.css'

export default function OrdererModal({ onClose }: { onClose: () => void }) {
  const { state, dispatch } = useOrder()
  const [name, setName] = useState(state.orderer ?? '')

  const save = () => {
    dispatch({ type: 'SET_ORDERER', name })
    onClose()
  }

  return (
    <Modal
      title="주문자 등록"
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
            disabled={!name.trim()}
          >
            등록
          </button>
        </>
      }
    >
      <label htmlFor="orderer-name" style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        커피 주문을 넣을 주문자의 이름을 입력하세요.
      </label>
      <input
        id="orderer-name"
        className={form.input}
        style={{ marginTop: 8 }}
        value={name}
        autoFocus
        placeholder="예: 홍길동"
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && name.trim()) save()
        }}
      />
    </Modal>
  )
}
