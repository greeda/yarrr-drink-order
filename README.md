# 음료 고르세요! Yarrrrrrr >_<

커피 브랜드별로 프로젝트 인원의 음료 주문을 받아 정리하고, 메신저 전달용 주문 목록을 복사할 수 있는 모바일 웹앱.

## 개발

이 환경에는 글로벌 `pnpm`이 없어 corepack으로 실행한다.

```bash
corepack pnpm@latest-10 install   # 의존성 설치
corepack pnpm@latest-10 run dev   # 개발 서버 (http://localhost:5173)
corepack pnpm@latest-10 run build # 타입체크 + 프로덕션 빌드 (dist/)
```

> pnpm이 PATH에 있다면 `pnpm install`, `pnpm dev` 처럼 짧게 써도 된다.

## 주요 기능

- 7개 커피 브랜드 선택 → 브랜드별 메뉴로 주문
- 프로젝트 인원 그리드(4열), 카드 전체 탭으로 주문 포함 선택
- 인원별 1순위(오전)/2순위(오후 대체) 메뉴 선택
- 주문자 등록, 인원 추가/삭제
- 주문 요약: 주문자명·주문내역·단가·수량·금액·총 갯수·총 가격
- **주문목록 복사**: `음료명 x갯수` + 총 잔수/가격을 클립보드로 복사 (메신저 전달용)
- 주문 내역은 브랜드별로 분리되어 localStorage에 저장
