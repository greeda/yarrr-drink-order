import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react'
import type { AppState, BrandId, MemberOrder } from '../types'
import { reducer, hydrate, type Action, EMPTY_ORDER } from './reducer'

const STORAGE_KEY = 'yarrr-drink-order/v1'

function loadInitial(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return hydrate(raw ? (JSON.parse(raw) as Partial<AppState>) : null)
  } catch {
    return hydrate(null)
  }
}

interface OrderContextValue {
  state: AppState
  dispatch: React.Dispatch<Action>
}

const OrderContext = createContext<OrderContextValue | null>(null)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitial)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // 저장 실패는 조용히 무시 (용량 초과 등)
    }
  }, [state])

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder(): OrderContextValue {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrder must be used within OrderProvider')
  return ctx
}

/** 현재 선택된 브랜드의 특정 멤버 주문을 안전하게 조회한다. */
export function getMemberOrder(
  state: AppState,
  brandId: BrandId | null,
  memberId: string,
): MemberOrder {
  if (!brandId) return EMPTY_ORDER
  return state.orders[brandId]?.[memberId] ?? EMPTY_ORDER
}
