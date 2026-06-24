/** 숫자를 원화 표기로 (예: 4500 -> "4,500원") */
export function won(amount: number): string {
  return `${amount.toLocaleString('ko-KR')}원`
}
