# Near Market(동네마켓)

Next.js 기반으로 구현하는 지역 중고거래 플랫폼 미니 프로젝트입니다.

사용자는 지역과 카테고리를 기준으로 상품을 탐색하고, 상품 상세 정보를 확인할 수 있습니다.  
로그인 후에는 상품 등록, 수정, 삭제, 관심 상품 관리, 마이페이지를 통해 자신의 거래 활동을 관리할 수 있도록 구현할 예정입니다.

이 프로젝트는 특정 서비스를 그대로 복제하는 것이 아니라, 지역 기반 중고거래 서비스의 핵심 사용자 흐름을 참고해 Next.js App Router 기반 프론트엔드 구조와 Supabase 연동 경험을 보여주는 포트폴리오 프로젝트입니다.

🔗 Repository: **near-market**  
🔗 Live Demo: **TBD**

---

## 📆 Version Info

| 항목             | 내용               |
| ---------------- | ------------------ |
| First created on | 2026.07            |
| Framework        | Next.js            |
| Language         | TypeScript         |
| Styling          | Tailwind CSS       |
| Router           | Next.js App Router |
| Deploy           | Vercel 예정        |

---

## 🎯 프로젝트 목적

- Next.js App Router 기반 페이지 구조 설계
- TypeScript를 활용한 상품/유저 데이터 타입 정의
- Tailwind CSS를 활용한 모바일 우선 반응형 UI 구현
- TanStack Query를 활용한 서버 상태 관리
- Zustand를 활용한 간단한 클라이언트 상태 관리
- Zod를 활용한 입력값 검증 스키마 작성
- Supabase를 활용한 상품 데이터 CRUD, 인증, 이미지 업로드 연동
- 검색, 카테고리 필터, 관심 상품, 마이페이지 기능 구현

---

## 📌 기술 스택

### Frontend

| 기술         | 사용 목적                   |
| ------------ | --------------------------- |
| Next.js      | App Router 기반 페이지 구성 |
| React        | 컴포넌트 기반 UI 구현       |
| TypeScript   | 타입 안정성 확보            |
| Tailwind CSS | 모바일 우선 반응형 스타일링 |
| lucide-react | 아이콘 사용                 |

### State / Data / Form

| 라이브러리              | 사용 목적                                        | 설치 상태      |
| ----------------------- | ------------------------------------------------ | -------------- |
| `@tanstack/react-query` | 서버 데이터 조회, 캐싱, 로딩, 에러 상태 관리     | 설치 완료      |
| `zustand`               | 지역 선택, 필터, UI 상태 등 클라이언트 상태 관리 | 설치 완료      |
| `zod`                   | 입력값 검증 스키마 작성                          | 설치 완료      |
| `dayjs`                 | 상품 등록일, 수정일 등 날짜 포맷 처리            | 설치 완료      |
| `react-hook-form`       | 상품 등록/수정 폼 상태 관리                      | 추후 설치 예정 |
| `@hookform/resolvers`   | React Hook Form과 Zod 연결                       | 추후 설치 예정 |

### Backend / Deploy / Tools

| 기술              | 사용 목적                           | 상태      |
| ----------------- | ----------------------------------- | --------- |
| Supabase Database | 상품, 관심 상품, 프로필 데이터 관리 | 연동 예정 |
| Supabase Auth     | 로그인 / 로그아웃 기능              | 연동 예정 |
| Supabase Storage  | 상품 이미지 업로드 및 관리          | 연동 예정 |
| Vercel            | 프로젝트 배포                       | 예정      |
| Git / GitHub      | 버전 관리 및 원격 저장소 관리       | 사용 중   |

---

## 🚧 구현 예정 기능

### 상품

- [ ] 상품 목록 조회
- [ ] 상품 상세 조회
- [ ] 상품 등록
- [ ] 상품 수정
- [ ] 상품 삭제
- [ ] 판매중 / 예약중 / 거래완료 상태 표시

### 검색 / 필터

- [ ] 키워드 기반 상품 검색
- [ ] 카테고리별 상품 필터
- [ ] 지역별 상품 필터
- [ ] 가격순 정렬

### 관심 상품

- [ ] 관심 상품 등록
- [ ] 관심 상품 해제
- [ ] 관심 상품 목록 조회
- [ ] 관심 상품 없음 상태 처리

### 사용자 / 마이페이지

- [ ] Supabase Auth 기반 로그인
- [ ] 로그아웃
- [ ] 사용자 정보 확인
- [ ] 내가 등록한 판매글 조회
- [ ] 본인 상품만 수정/삭제 가능하도록 처리

### UI 상태

- [ ] 로딩 상태 처리
- [ ] 에러 상태 처리
- [ ] 빈 데이터 상태 처리
- [ ] 이미지 없는 상품 기본 이미지 처리
- [ ] 로그인하지 않은 사용자 접근 처리
- [ ] 모바일 반응형 UI 정리

---

## 📁 Project Structure

```txt
src/
├─ app/                         # Next.js App Router 페이지
│  ├─ page.tsx                  # 홈
│  ├─ products/                 # 상품 관련 페이지
│  │  ├─ page.tsx               # 상품 목록
│  │  ├─ new/page.tsx           # 상품 등록
│  │  └─ [id]/                  # 상품 상세 / 수정
│  │     ├─ page.tsx
│  │     └─ edit/page.tsx
│  ├─ likes/page.tsx            # 관심 상품
│  ├─ mypage/                   # 마이페이지
│  │  ├─ page.tsx
│  │  └─ sales/page.tsx
│  └─ login/page.tsx            # 로그인
│
├─ components/                  # 공통 UI 컴포넌트
│  ├─ common/
│  └─ product/
│
├─ features/                    # 기능 단위 모듈
│  ├─ products/
│  │  ├─ components/
│  │  ├─ hooks/
│  │  ├─ types/
│  │  └─ api/
│  ├─ auth/
│  ├─ likes/
│  └─ mypage/
│
├─ constants/                   # 상수 데이터
├─ mocks/                       # 목데이터
├─ lib/                         # 외부 라이브러리 설정
├─ providers/                   # Provider 설정
└─ types/                       # 공통 타입
```

---

## 🔗 주요 페이지

| 경로                  | 설명       |
| --------------------- | ---------- |
| `/`                   | 홈         |
| `/products`           | 상품 목록  |
| `/products/[id]`      | 상품 상세  |
| `/products/new`       | 상품 등록  |
| `/products/[id]/edit` | 상품 수정  |
| `/likes`              | 관심 상품  |
| `/mypage`             | 마이페이지 |
| `/mypage/sales`       | 내 판매글  |
| `/login`              | 로그인     |

---

## 🧱 데이터 구조

### Product

```ts
type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  status: "selling" | "reserved" | "sold";
  imageUrl: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
};
```

### User

```ts
type User = {
  id: string;
  nickname: string;
  profileImage?: string;
  location: string;
};
```

### Like

```ts
type Like = {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
};
```

---

## 🗄️ Supabase 테이블 설계 예정

### products

```txt
id
title
description
price
category
location
status
image_url
seller_id
created_at
updated_at
```

### likes

```txt
id
user_id
product_id
created_at
```

### profiles

```txt
id
nickname
profile_image
location
created_at
```

---

## 🎨 디자인 방향

모바일 사용 흐름을 우선으로 고려한 지역 기반 중고거래 서비스 UI입니다.

- 따뜻하고 친근한 분위기
- 올리브 그린 계열의 메인 컬러
- 크림색 배경과 흰색 카드 중심의 구성
- 둥근 카드와 넉넉한 여백
- 모바일 우선 반응형 레이아웃
- 상품 이미지와 가격 정보가 잘 보이는 카드형 UI
- 하단 네비게이션을 통한 빠른 화면 이동
- 검색, 관심, 마이페이지 접근성을 고려한 구조

---

## 📜 설치 및 실행

### 프로젝트 생성

```bash
npx create-next-app@latest near-market
```

### 프로젝트 폴더 이동

```bash
cd near-market
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 아래 주소로 접속합니다.

```txt
http://localhost:3000
```

---

## 🧩 프로젝트 생성 옵션

| 항목                   | 선택  |
| ---------------------- | ----- |
| TypeScript             | Yes   |
| ESLint                 | Yes   |
| React Compiler         | No    |
| Tailwind CSS           | Yes   |
| src/ directory         | Yes   |
| App Router             | Yes   |
| Import alias customize | No    |
| Default alias          | `@/*` |
| AGENTS.md              | Yes   |

---

## 🧷 Node.js 버전 고정

| 항목        | 내용                    |
| ----------- | ----------------------- |
| 목적        | 프로젝트 실행 환경 통일 |
| 사용 도구   | nvm                     |
| 설정 파일   | `.nvmrc`                |
| 생성 명령어 | `node -v > .nvmrc`      |
| 적용 명령어 | `nvm use`               |

---

## 📦 패키지 설치 기록

### 설치 완료

```bash
npm install @tanstack/react-query zustand zod dayjs lucide-react
```

| 패키지                  | 사용 목적                                        |
| ----------------------- | ------------------------------------------------ |
| `@tanstack/react-query` | 서버 데이터 조회, 캐싱, 로딩, 에러 상태 관리     |
| `zustand`               | 지역 선택, 필터, UI 상태 등 클라이언트 상태 관리 |
| `zod`                   | 상품 등록/수정 폼 입력값 검증 스키마 작성        |
| `dayjs`                 | 상품 등록일, 수정일 등 날짜 포맷 처리            |
| `lucide-react`          | 검색, 하트, 사용자, 홈 등 아이콘 사용            |

### 추후 설치 예정

| 구분          | 명령어                                            | 설치 예정 시점              |
| ------------- | ------------------------------------------------- | --------------------------- |
| 폼 라이브러리 | `npm install react-hook-form @hookform/resolvers` | 상품 등록/수정 폼 구현 단계 |
| Supabase      | `npm install @supabase/supabase-js`               | 더미데이터 기반 UI 구현 후  |

---

## 📁 폴더 구조 생성 명령어

```bash
mkdir -p src/components/common
mkdir -p src/components/product
mkdir -p src/features/products/components
mkdir -p src/features/products/hooks
mkdir -p src/features/products/types
mkdir -p src/features/products/api
mkdir -p src/features/auth
mkdir -p src/features/likes
mkdir -p src/features/mypage
mkdir -p src/constants
mkdir -p src/mocks
mkdir -p src/lib
mkdir -p src/providers
mkdir -p src/types
```

---

## 🧭 구현 순서

1. 공통 스타일 설정
2. Header / Footer / BottomNavigation 구현
3. mockProducts 더미데이터 작성
4. 상품 카드 컴포넌트 구현
5. 홈 화면 구현
6. 상품 목록 페이지 구현
7. 상품 상세 페이지 구현
8. 상품 등록 폼 UI 구현
9. 상품 수정 폼 UI 구현
10. 검색 / 카테고리 필터 구현
11. 관심 상품 페이지 구현
12. 마이페이지 구현
13. Supabase products 테이블 연결
14. 상품 CRUD 연동
15. 로그인 기능 연동
16. 관심 상품 기능 연동
17. 반응형 UI 정리
18. README 정리
19. Vercel 배포

---

## ✅ 현재 진행 상태

- [x] 프로젝트 기획
- [x] 기술 스택 선정
- [x] 디자인 컨셉 정리
- [x] README 초안 작성
- [x] Next.js 프로젝트 생성
- [x] ESLint / Prettier 설정
- [x] Node.js 버전 고정
- [x] 핵심 라이브러리 설치
- [ ] 공통 스타일 설정
- [ ] 더미데이터 기반 홈 화면 구현
- [ ] 상품 목록 / 상세 구현
- [ ] 상품 등록 / 수정 폼 구현
- [ ] Supabase 연동
- [ ] Vercel 배포

---

## 👀 미리보기

> Near Market(동네마켓) UI Preview  
> 개발 진행 후 이미지 추가 예정

```md
![Near Market Preview](./docs/preview/near-market.png)
```

---

## 🧪 회고 및 트러블슈팅

프로젝트를 진행하면서 발생한 문제와 해결 과정을 정리할 예정입니다.

예정 기록 항목:

- Next.js App Router 폴더 구조 설계
- mock 데이터에서 Supabase 데이터로 전환하는 과정
- TanStack Query Provider 설정 과정
- React Hook Form과 Zod를 활용한 폼 검증
- 상품 등록/수정 폼의 타입 설계
- Supabase Auth 로그인 상태 관리
- 로그인 상태에 따른 버튼 제어
- 본인 상품만 수정/삭제 가능하도록 처리한 과정
- 관심 상품 optimistic update 적용 여부 검토
- 모바일 우선 반응형 UI 구현 과정
- Vercel 배포 및 환경변수 설정

---

## 📝 포트폴리오 설명 문구

Near Market(동네마켓)은 Next.js App Router와 TypeScript를 기반으로 구현하는 지역 중고거래 플랫폼 미니 프로젝트입니다.

상품 목록, 상세, 등록, 수정, 삭제, 관심 상품, 마이페이지 등 실제 서비스에서 자주 사용되는 화면 흐름을 기준으로 설계했습니다. 백엔드 서버를 직접 구축하기보다는 Supabase를 활용해 데이터베이스, 인증, 스토리지 연동 경험을 쌓고, TanStack Query로 서버 상태를 관리하는 구조를 적용할 예정입니다.

모바일 사용성을 우선으로 고려해 Tailwind CSS 기반의 반응형 UI를 구현하고, Zod를 활용해 상품 등록/수정 폼의 입력값 검증을 처리할 계획입니다.
