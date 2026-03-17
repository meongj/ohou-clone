# 오늘의집 클론 - 1주일 MVP 개발 계획

## 기술 스택

| 분류          | 기술                              |
| ------------- | --------------------------------- |
| 언어          | TypeScript                        |
| 프론트엔드    | React, React Native, Vite         |
| 스타일링 & UI | Tailwind CSS, shadcn/ui           |
| 폼 검증       | Zod                               |
| 백엔드        | Supabase (DB, Storage)            |
| 데이터 페칭   | TanStack Query                    |
| 라우팅        | React Router                      |
| 상태관리      | Zustand (+ localStorage persist)  |
| 모바일        | Expo (WebView)                    |
| CI/CD         | Vercel (웹호스팅), GitHub Actions |
| 모노레포      | pnpm + Turborepo                  |

---

## 프로젝트 구조 (모노레포)

```
ohou-clone/
├── apps/
│   ├── web/                  # React + Vite (메인 웹앱)
│   └── mobile/               # Expo (WebView 래퍼)
├── packages/
│   ├── ui/                   # 공유 UI 컴포넌트 (shadcn/ui 기반)
│   └── shared/               # 공유 타입, 유틸, API 클라이언트
├── supabase/                 # Supabase 마이그레이션, seed 데이터
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## FSD 프론트엔드 구조 (apps/web/src)

```
src/
├── app/           # 앱 진입점, 라우터, 프로바이더
├── pages/         # 페이지 컴포넌트 (라우트 단위)
├── widgets/       # 독립적 UI 블록 (Header, ProductCard 등)
├── features/      # 비즈니스 기능 단위
│   ├── bookmark/
│   ├── cart/
│   └── community/
├── entities/      # 도메인 모델 (product, post)
└── shared/        # 공통 유틸, UI, API, 타입
```

---

## Supabase 스키마 (읽기 전용 데이터)

```sql
-- 상품
products (
  id          uuid PRIMARY KEY,
  name        text NOT NULL,
  price       integer NOT NULL,
  discount_rate integer DEFAULT 0,
  image_url   text,
  category    text,
  description text,
  created_at  timestamptz DEFAULT now()
)

-- 커뮤니티 포스트
posts (
  id          uuid PRIMARY KEY,
  nickname    text NOT NULL,
  avatar_url  text,
  image_url   text NOT NULL,
  content     text,
  created_at  timestamptz DEFAULT now()
)

-- 댓글
comments (
  id          uuid PRIMARY KEY,
  post_id     uuid REFERENCES posts(id),
  nickname    text NOT NULL,
  content     text NOT NULL,
  created_at  timestamptz DEFAULT now()
)
```

## 로컬 상태 (Zustand + localStorage persist)

```
bookmarks   → product_id 배열
cart_items  → { product_id, quantity }[]
post_likes  → post_id 배열
```

> Supabase는 상품/커뮤니티 데이터 서빙 전용, 유저 인터랙션은 전부 클라이언트 로컬 처리

---

## 핵심 기술 결정

| 결정               | 이유                                   |
| ------------------ | -------------------------------------- |
| Auth 제거          | MVP 범위 축소, 북마크/카트는 로컬 처리 |
| Supabase 읽기 전용 | seed 데이터 서빙만, RLS 불필요         |
| TanStack Query     | 서버 상태 캐싱, 무한 스크롤            |
| Zustand persist    | 클라이언트 상태 + localStorage 영속화  |
| shadcn/ui          | 커스터마이징 가능, Tailwind 호환       |
| FSD 아키텍처       | feature별 코드 분리로 확장성 확보      |

---

## 일별 개발 계획

### Day 1 (월) - 프로젝트 세팅

- [x] 모노레포 초기화 (pnpm workspace + Turborepo)
- [x] 웹앱 세팅 (Vite + React + TypeScript + Tailwind + shadcn/ui)
- [x] Expo 앱 세팅 (Expo 프로젝트 + WebView 설정)
- [x] Supabase 세팅 (프로젝트 생성, DB 스키마 마이그레이션)
- [x] 공통 패키지 설정 (shared 타입, Supabase 클라이언트)
- [x] GitHub repo 생성, Vercel 연동

### Day 2 (화) - 레이아웃 & 라우팅

- [x] 공통 레이아웃 (Header: 로고, 검색, 카트 아이콘 / Bottom Nav / Footer)
- [x] React Router 설정 (`/`, `/products/:id`, `/community`, `/cart`, `/bookmarks`)
- [ ] Zustand 스토어 구성 (cart, bookmark, ui)
- [x] TanStack Query 프로바이더 설정

### Day 3 (수) - 메인 페이지 & 상품 목록

- [ ] 메인 배너 (캐러셀/히어로 배너)
- [ ] 카테고리 탭 (가구, 패브릭, 조명, 수납 등)
- [ ] 상품 카드 컴포넌트 (이미지, 가격, 할인율, 북마크 버튼)
- [ ] 상품 리스트 (TanStack Query + Supabase, 무한 스크롤)
- [ ] Seed 데이터 작성 (상품 20~30개)

### Day 4 (목) - 상품 상세 & 북마크

- [ ] 상품 상세 페이지 (이미지, 가격, 설명, 옵션 선택)
- [ ] 장바구니 담기 (수량 선택 → Zustand cart에 추가)
- [ ] 북마크 토글 (하트 버튼 → Zustand bookmark)
- [ ] 마이 북마크 페이지 (북마크한 상품 목록)

### Day 5 (금) - 장바구니 & 커뮤니티

- [ ] 장바구니 페이지 (상품 목록, 수량 변경, 삭제, 총 금액 계산)
- [ ] 커뮤니티 피드 (인스타 스타일 카드 레이아웃)
- [ ] 포스트 좋아요 토글 (로컬 상태)
- [ ] Seed 데이터 작성 (커뮤니티 포스트 10~15개)

### Day 6 (토) - Expo 앱 & 반응형

- [ ] Expo WebView 연동 (웹앱 로드, 딥링크 처리)
- [ ] 반응형 UI (모바일/태블릿 대응, Tailwind breakpoints)
- [ ] UX 개선 (로딩 스켈레톤, 에러 바운더리, 토스트 알림)

### Day 7 (일) - 마무리 & 배포

- [ ] Vercel 프로덕션 배포
- [ ] GitHub Actions CI (lint + type-check)
- [ ] README 작성 (프로젝트 소개, 실행 방법, 스크린샷)
- [ ] 전체 플로우 테스트 & 버그 수정

---

## 주요 페이지 & 기능 요약

| 페이지                      | 주요 기능                                |
| --------------------------- | ---------------------------------------- |
| 메인 (`/`)                  | 배너, 카테고리, 상품 리스트, 무한 스크롤 |
| 상품 상세 (`/products/:id`) | 상품 정보, 장바구니 담기, 북마크         |
| 커뮤니티 (`/community`)     | 인스타 스타일 피드, 좋아요               |
| 장바구니 (`/cart`)          | 상품 목록, 수량 조절, 총 금액            |
| 북마크 (`/bookmarks`)       | 북마크한 상품 목록                       |
