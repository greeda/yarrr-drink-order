import type { AppState, BrandId, MemberOrder } from '../types'
import { BRANDS } from '../data/brands'

export const EMPTY_ORDER: MemberOrder = {
  selected: false,
  firstChoiceId: null,
  secondChoiceId: null,
}

/** 모든 브랜드에 대해 빈 주문 맵을 만든다. */
function emptyOrders(): AppState['orders'] {
  return Object.fromEntries(
    BRANDS.map((b) => [b.id, {}]),
  ) as AppState['orders']
}

export const initialState: AppState = {
  orderer: null,
  members: [],
  selectedBrandId: null,
  orders: emptyOrders(),
}

export type Action =
  | { type: 'SET_ORDERER'; name: string }
  | { type: 'SELECT_BRAND'; brandId: BrandId }
  | { type: 'BACK_TO_BRANDS' }
  | { type: 'ADD_MEMBER'; name: string }
  | { type: 'REMOVE_MEMBER'; memberId: string }
  | { type: 'TOGGLE_MEMBER_SELECTED'; memberId: string }
  | {
      type: 'SET_MEMBER_ORDER'
      memberId: string
      patch: Partial<Pick<MemberOrder, 'firstChoiceId' | 'secondChoiceId'>>
    }

function newId(): string {
  // 브라우저 런타임에서 동작 (crypto.randomUUID 미지원 시 fallback)
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `m-${Date.now()}-${Math.floor(Math.random() * 1e6)}`
}

/** 한 브랜드의 특정 멤버 주문을 갱신한 새 orders를 만든다. */
function updateOrder(
  state: AppState,
  brandId: BrandId,
  memberId: string,
  updater: (prev: MemberOrder) => MemberOrder,
): AppState['orders'] {
  const brandOrders = state.orders[brandId] ?? {}
  const prev = brandOrders[memberId] ?? EMPTY_ORDER
  return {
    ...state.orders,
    [brandId]: { ...brandOrders, [memberId]: updater(prev) },
  }
}

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_ORDERER':
      return { ...state, orderer: action.name.trim() || null }

    case 'SELECT_BRAND':
      return { ...state, selectedBrandId: action.brandId }

    case 'BACK_TO_BRANDS':
      return { ...state, selectedBrandId: null }

    case 'ADD_MEMBER': {
      const name = action.name.trim()
      if (!name) return state
      return {
        ...state,
        members: [...state.members, { id: newId(), name }],
      }
    }

    case 'REMOVE_MEMBER': {
      const members = state.members.filter((m) => m.id !== action.memberId)
      // 모든 브랜드의 주문에서 해당 멤버 제거
      const orders = Object.fromEntries(
        Object.entries(state.orders).map(([brandId, byMember]) => {
          const next = { ...byMember }
          delete next[action.memberId]
          return [brandId, next]
        }),
      ) as AppState['orders']
      return { ...state, members, orders }
    }

    case 'TOGGLE_MEMBER_SELECTED': {
      if (!state.selectedBrandId) return state
      const orders = updateOrder(
        state,
        state.selectedBrandId,
        action.memberId,
        (prev) => ({ ...prev, selected: !prev.selected }),
      )
      return { ...state, orders }
    }

    case 'SET_MEMBER_ORDER': {
      if (!state.selectedBrandId) return state
      const orders = updateOrder(
        state,
        state.selectedBrandId,
        action.memberId,
        (prev) => ({ ...prev, ...action.patch }),
      )
      return { ...state, orders }
    }

    default:
      return state
  }
}

/**
 * 저장된 상태가 현재 브랜드 목록을 모두 포함하도록 보정한다.
 * (브랜드가 추가/변경되어도 안전하게 로드)
 */
export function hydrate(saved: Partial<AppState> | null): AppState {
  if (!saved) return initialState
  return {
    orderer: saved.orderer ?? null,
    members: saved.members ?? [],
    selectedBrandId: saved.selectedBrandId ?? null,
    orders: { ...emptyOrders(), ...(saved.orders ?? {}) },
  }
}
