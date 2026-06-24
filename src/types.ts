export type BrandId =
  | 'starbucks'
  | 'mega'
  | 'compose'
  | 'banapresso'
  | 'paik'
  | 'blueshark'
  | 'mammoth'

export interface Brand {
  id: BrandId
  name: string
  /** 헤더/카드 강조 색상 */
  color: string
}

export type MenuCategory = 'coffee' | 'beverage' | 'tea'

export interface MenuItem {
  id: string
  name: string
  category: MenuCategory
  /** 가격 (원) */
  price: number
}

export interface Member {
  id: string
  name: string
}

/** 멤버 1명의 한 브랜드에 대한 주문 */
export interface MemberOrder {
  /** 체크박스: 이번 주문에 포함 여부 */
  selected: boolean
  /** 오전(1순위) */
  firstChoiceId: string | null
  /** 오후(2순위, 1순위 품절 시 대체) */
  secondChoiceId: string | null
}

export interface AppState {
  /** 주문자 (최초 사용자가 기재) */
  orderer: string | null
  /** 프로젝트 인원 */
  members: Member[]
  /** 현재 선택된 브랜드 (null이면 브랜드 선택 화면) */
  selectedBrandId: BrandId | null
  /** 브랜드별로 분리 저장: orders[brandId][memberId] */
  orders: Record<BrandId, Record<string, MemberOrder>>
}
