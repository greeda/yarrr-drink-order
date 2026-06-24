import type { BrandId, MenuItem } from '../types'

/**
 * 브랜드별 대표 메뉴 데이터.
 * id는 `${brandId}-n` 형태로 전 브랜드에서 고유하게 유지한다.
 * price는 원(₩) 단위.
 */
export const MENUS: Record<BrandId, MenuItem[]> = {
  starbucks: [
    { id: 'starbucks-1', name: '아메리카노', category: 'coffee', price: 4500 },
    { id: 'starbucks-2', name: '카페라떼', category: 'coffee', price: 5000 },
    { id: 'starbucks-3', name: '카푸치노', category: 'coffee', price: 5000 },
    { id: 'starbucks-4', name: '카라멜 마키아또', category: 'coffee', price: 5900 },
    { id: 'starbucks-5', name: '카페 모카', category: 'coffee', price: 5900 },
    { id: 'starbucks-6', name: '바닐라 라떼', category: 'coffee', price: 5600 },
    { id: 'starbucks-7', name: '돌체 콜드브루', category: 'coffee', price: 5900 },
    { id: 'starbucks-8', name: '자몽 허니 블랙티', category: 'tea', price: 5900 },
    { id: 'starbucks-9', name: '딸기 딜라이트 요거트 블렌디드', category: 'beverage', price: 6300 },
    { id: 'starbucks-10', name: '자바 칩 프라푸치노', category: 'beverage', price: 6300 },
  ],
  mega: [
    { id: 'mega-1', name: '아메리카노', category: 'coffee', price: 1500 },
    { id: 'mega-2', name: '카페라떼', category: 'coffee', price: 2500 },
    { id: 'mega-3', name: '바닐라라떼', category: 'coffee', price: 3200 },
    { id: 'mega-4', name: '카라멜 마끼아또', category: 'coffee', price: 3700 },
    { id: 'mega-5', name: '연유라떼', category: 'coffee', price: 3200 },
    { id: 'mega-6', name: '메가리아 초코', category: 'beverage', price: 3500 },
    { id: 'mega-7', name: '딸기라떼', category: 'beverage', price: 3900 },
    { id: 'mega-8', name: '복숭아 아이스티', category: 'tea', price: 2900 },
    { id: 'mega-9', name: '자몽에이드', category: 'beverage', price: 3500 },
    { id: 'mega-10', name: '녹차라떼', category: 'tea', price: 3500 },
  ],
  compose: [
    { id: 'compose-1', name: '아메리카노', category: 'coffee', price: 1500 },
    { id: 'compose-2', name: '카페라떼', category: 'coffee', price: 2500 },
    { id: 'compose-3', name: '바닐라라떼', category: 'coffee', price: 3300 },
    { id: 'compose-4', name: '카라멜라떼', category: 'coffee', price: 3500 },
    { id: 'compose-5', name: '연유라떼', category: 'coffee', price: 3300 },
    { id: 'compose-6', name: '초코라떼', category: 'beverage', price: 3500 },
    { id: 'compose-7', name: '딸기라떼', category: 'beverage', price: 3900 },
    { id: 'compose-8', name: '청포도에이드', category: 'beverage', price: 3900 },
    { id: 'compose-9', name: '복숭아 아이스티', category: 'tea', price: 2900 },
    { id: 'compose-10', name: '고구마라떼', category: 'beverage', price: 3900 },
  ],
  banapresso: [
    { id: 'banapresso-1', name: '아메리카노', category: 'coffee', price: 1500 },
    { id: 'banapresso-2', name: '카페라떼', category: 'coffee', price: 2500 },
    { id: 'banapresso-3', name: '바닐라라떼', category: 'coffee', price: 3200 },
    { id: 'banapresso-4', name: '바나프레소(바나나라떼)', category: 'beverage', price: 3900 },
    { id: 'banapresso-5', name: '카라멜마끼아또', category: 'coffee', price: 3700 },
    { id: 'banapresso-6', name: '흑당라떼', category: 'beverage', price: 3900 },
    { id: 'banapresso-7', name: '초코라떼', category: 'beverage', price: 3500 },
    { id: 'banapresso-8', name: '자몽에이드', category: 'beverage', price: 3500 },
    { id: 'banapresso-9', name: '자몽 아이스티', category: 'tea', price: 2900 },
    { id: 'banapresso-10', name: '녹차라떼', category: 'tea', price: 3500 },
  ],
  paik: [
    { id: 'paik-1', name: '아메리카노', category: 'coffee', price: 2000 },
    { id: 'paik-2', name: '빽사이즈 아메리카노', category: 'coffee', price: 2500 },
    { id: 'paik-3', name: '카페라떼', category: 'coffee', price: 3000 },
    { id: 'paik-4', name: '바닐라라떼', category: 'coffee', price: 3500 },
    { id: 'paik-5', name: '연유라떼', category: 'coffee', price: 3500 },
    { id: 'paik-6', name: '달콤한 빽다방커피', category: 'coffee', price: 3500 },
    { id: 'paik-7', name: '초코라떼', category: 'beverage', price: 3800 },
    { id: 'paik-8', name: '딸기라떼', category: 'beverage', price: 4000 },
    { id: 'paik-9', name: '워터에이드', category: 'beverage', price: 3500 },
    { id: 'paik-10', name: '복숭아 아이스티', category: 'tea', price: 3000 },
  ],
  blueshark: [
    { id: 'blueshark-1', name: '아메리카노', category: 'coffee', price: 2500 },
    { id: 'blueshark-2', name: '카페라떼', category: 'coffee', price: 3300 },
    { id: 'blueshark-3', name: '바닐라라떼', category: 'coffee', price: 3800 },
    { id: 'blueshark-4', name: '카라멜마끼아또', category: 'coffee', price: 4000 },
    { id: 'blueshark-5', name: '블루레몬에이드', category: 'beverage', price: 4300 },
    { id: 'blueshark-6', name: '청포도에이드', category: 'beverage', price: 4300 },
    { id: 'blueshark-7', name: '초코라떼', category: 'beverage', price: 3900 },
    { id: 'blueshark-8', name: '딸기라떼', category: 'beverage', price: 4300 },
    { id: 'blueshark-9', name: '복숭아 아이스티', category: 'tea', price: 3300 },
    { id: 'blueshark-10', name: '녹차라떼', category: 'tea', price: 3900 },
  ],
  mammoth: [
    { id: 'mammoth-1', name: '아메리카노', category: 'coffee', price: 1900 },
    { id: 'mammoth-2', name: '카페라떼', category: 'coffee', price: 2900 },
    { id: 'mammoth-3', name: '바닐라라떼', category: 'coffee', price: 3400 },
    { id: 'mammoth-4', name: '카라멜마끼아또', category: 'coffee', price: 3700 },
    { id: 'mammoth-5', name: '매머드라떼', category: 'beverage', price: 3900 },
    { id: 'mammoth-6', name: '흑당버블라떼', category: 'beverage', price: 4200 },
    { id: 'mammoth-7', name: '초코라떼', category: 'beverage', price: 3700 },
    { id: 'mammoth-8', name: '딸기라떼', category: 'beverage', price: 4200 },
    { id: 'mammoth-9', name: '자몽에이드', category: 'beverage', price: 3700 },
    { id: 'mammoth-10', name: '복숭아 아이스티', category: 'tea', price: 3200 },
  ],
}

/** 전 브랜드 메뉴를 id로 조회하기 위한 맵 */
export const MENU_ITEM_MAP: Record<string, MenuItem> = Object.fromEntries(
  Object.values(MENUS)
    .flat()
    .map((item) => [item.id, item]),
)
