# Near Market(동네마켓)

Next.js 기반으로 구현하는 지역 중고거래 플랫폼 미니 프로젝트입니다.
사용자는 지역과 카테고리를 기준으로 상품을 탐색하고, 상품 상세 정보를 확인할 수 있습니다.

로그인 후에는 상품 등록, 수정, 삭제, 관심 상품 관리, 마이페이지를 통해 자신의 거래 활동을 관리할 수 있도록 구현할 예정입니다.

이 프로젝트는 특정 서비스를 그대로 복제하는 것이 아니라, 지역 기반 중고거래 서비스의 핵심 사용자 흐름을 참고해 Next.js App Router 기반 프론트엔드 구조와 Supabase 연동 경험을 보여주는 포트폴리오 프로젝트입니다.

🔗 Repository: **near-market**
🔗 Live Demo: **TBD**

---

## 📆 Version Info

- First created on: **2026.07**
- Next.js + TypeScript 기반 중고거래 서비스 UI 프로젝트
- Tailwind CSS 기반 모바일 우선 반응형 UI 구현 예정
- Supabase를 활용한 상품 데이터 CRUD 연동 예정
- TanStack Query 기반 서버 상태 관리 적용 예정
- React Hook Form + Zod 기반 상품 등록/수정 폼 검증 예정
- Zustand를 활용한 간단한 클라이언트 상태 관리 예정
- Vercel 배포 예정

---

## 🎯 프로젝트 목적

- Next.js App Router 기반 페이지 구조 설계
- TypeScript를 활용한 상품/유저 데이터 타입 정의
- Tailwind CSS를 활용한 모바일 우선 반응형 UI 구현
- Supabase를 활용한 상품 데이터 CRUD 구현
- TanStack Query를 활용한 서버 상태 관리
- React Hook Form과 Zod를 활용한 상품 등록/수정 폼 검증
- Zustand를 활용한 간단한 클라이언트 상태 관리
- 검색, 카테고리 필터, 관심 상품, 마이페이지 기능 구현

---

## 🚧 현재 미구현 / 예정 기능

- [x] 프로젝트 기획
- [x] 기술 스택 선정
- [x] 디자인 컨셉 정리
- [x] README 초안 작성
- [ ] Next.js 프로젝트 생성
- [ ] 공통 스타일 설정
- [ ] Header / Footer / BottomNavigation 구현
- [ ] mockProducts 더미데이터 작성
- [ ] 상품 카드 컴포넌트 구현
- [ ] 홈 화면 구현
- [ ] 상품 목록 페이지 구현
- [ ] 상품 상세 페이지 구현
- [ ] 상품 등록 폼 UI 구현
- [ ] 상품 수정 폼 UI 구현
- [ ] 검색 / 카테고리 필터 구현
- [ ] 관심 상품 페이지 구현
- [ ] 마이페이지 구현
- [ ] Supabase products 테이블 연결
- [ ] 상품 CRUD 연동
- [ ] 로그인 기능 연동
- [ ] 관심 상품 기능 연동
- [ ] 모바일 반응형 UI 정리
- [ ] README 최종 정리
- [ ] Vercel 배포

---

## ⚙️ 프로젝트 초기화 및 설정

본 프로젝트는 Next.js App Router 환경에서 React + TypeScript로 UI를 구현합니다.

### 🔧 초기 설정 예정 내역

- Next.js + TypeScript 프로젝트 생성
- App Router 기반 페이지 라우팅 구성
- Tailwind CSS 기반 전역 스타일 적용
- 공통 Layout 구조 설정
- 모바일 우선 반응형 UI 구성
- TanStack Query Provider 설정
- Zustand Store 구조 설정
- React Hook Form + Zod 폼 검증 구조 설정
- Supabase 클라이언트 설정
- ESLint 기본 설정
- Vercel 배포 환경 구성

---

## 📌 기술 스택

### ⚙️ Frontend

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: Next.js App Router
- **UI**: lucide-react

### 🗂️ State / Data

| 라이브러리              | 설명                                              |
| ----------------------- | ------------------------------------------------- |
| `@tanstack/react-query` | 서버 데이터 조회, 캐싱, 로딩, 에러 상태 관리      |
| `zustand`               | 지역 선택, UI 상태 등 간단한 클라이언트 상태 관리 |

### 📝 Form

| 라이브러리            | 설명                        |
| --------------------- | --------------------------- |
| `react-hook-form`     | 상품 등록/수정 폼 상태 관리 |
| `zod`                 | 입력값 검증 스키마 작성     |
| `@hookform/resolvers` | React Hook Form과 Zod 연결  |

### 🗄️ Backend / BaaS

| 서비스              | 설명                                |
| ------------------- | ----------------------------------- |
| `Supabase Database` | 상품, 관심 상품, 프로필 데이터 관리 |
| `Supabase Auth`     | 로그인 / 로그아웃 기능              |
| `Supabase Storage`  | 상품 이미지 업로드 및 관리          |

### 🧰 Deploy / Tools

| 도구      | 설명                    |
| --------- | ----------------------- |
| `Vercel`  | 프로젝트 배포           |
| `Git`     | 버전 관리               |
| `GitHub`  | 원격 저장소 관리        |
| `Postman` | API 테스트 및 요청 확인 |

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

```txt
/                   홈
/products           상품 목록
/products/[id]      상품 상세
/products/new       상품 등록
/products/[id]/edit 상품 수정
/likes              관심 상품
/mypage             마이페이지
/mypage/sales       내 판매글
/login              로그인
```

---

## 👀 미리보기

> Near Market(동네마켓) UI Preview
> 개발 진행 후 이미지 추가 예정

```md
![Near Market Preview](./docs/preview/near-market.png)
```

---

## 🔗 UI / Features

### 🏠 Home

| Feature          | Description                       |
| ---------------- | --------------------------------- |
| Header           | 로고, 지역 선택, 검색 진입        |
| Category         | 주요 카테고리 바로가기            |
| Product Preview  | 최근 상품 또는 추천 상품 미리보기 |
| BottomNavigation | 홈, 상품, 관심, 마이페이지 이동   |

### 🛍️ Products

| Feature        | Description                              |
| -------------- | ---------------------------------------- |
| Product List   | 상품 목록 조회                           |
| Product Card   | 상품 이미지, 제목, 가격, 지역, 상태 표시 |
| Product Detail | 상품 상세 정보 확인                      |
| Product Create | 상품 등록                                |
| Product Edit   | 상품 수정                                |
| Product Delete | 상품 삭제                                |
| Status         | 판매중 / 예약중 / 거래완료 상태 표시     |

### 🔍 Search / Filter

| Feature         | Description           |
| --------------- | --------------------- |
| Keyword Search  | 키워드 기반 상품 검색 |
| Category Filter | 카테고리별 상품 필터  |
| Location Filter | 지역별 상품 필터      |
| Price Sort      | 가격순 정렬           |

### ❤️ Likes

| Feature        | Description              |
| -------------- | ------------------------ |
| Like Product   | 관심 상품 등록           |
| Unlike Product | 관심 상품 해제           |
| Like List      | 관심 상품 목록 조회      |
| Empty State    | 관심 상품 없음 상태 처리 |

### 👤 User / MyPage

| Feature    | Description                           |
| ---------- | ------------------------------------- |
| Login      | Supabase Auth 기반 로그인             |
| Logout     | 로그아웃                              |
| MyPage     | 사용자 정보 확인                      |
| My Sales   | 내가 등록한 판매글 조회               |
| Permission | 본인 상품만 수정/삭제 가능하도록 처리 |

### 🧩 UI State

| Feature  | Description                          |
| -------- | ------------------------------------ |
| Loading  | 데이터 조회 중 로딩 화면             |
| Error    | 데이터 조회 실패 화면                |
| Empty    | 검색 결과 없음 / 관심 상품 없음 처리 |
| No Image | 이미지 없는 상품 기본 이미지 처리    |
| Guest    | 로그인하지 않은 사용자 접근 처리     |

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

## 📜 설치 및 실행 명령어

```bash
# 프로젝트 생성
npx create-next-app@latest near-market

# 프로젝트 폴더 이동
cd near-market

# 개발 서버 실행
npm run dev
```

브라우저에서 아래 주소로 접속합니다.

```txt
http://localhost:3000
```

---

## 🧩 프로젝트 생성 옵션

```txt
TypeScript: Yes
ESLint: Yes
React Compiler: No
Tailwind CSS: Yes
src/ directory: Yes
App Router: Yes
Import alias: No
```

---

## 📦 추가 패키지 설치

```bash
npm install @tanstack/react-query zustand react-hook-form zod @hookform/resolvers lucide-react
```

설치한 패키지 역할은 다음과 같습니다.

```txt
@tanstack/react-query
- 서버 데이터 조회, 캐싱, 로딩, 에러 상태 관리

zustand
- 지역 선택, UI 상태 등 간단한 클라이언트 상태 관리

react-hook-form
- 상품 등록/수정 폼 상태 관리

zod
- 입력값 검증 스키마 작성

@hookform/resolvers
- React Hook Form과 Zod 연결

lucide-react
- 검색, 하트, 사용자, 홈 등 아이콘 사용
```

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

```txt
1. 프로젝트 초기 세팅
2. 공통 스타일 설정
3. Header / Footer / BottomNavigation 구현
4. mockProducts 더미데이터 작성
5. 상품 카드 컴포넌트 구현
6. 홈 화면 구현
7. 상품 목록 페이지 구현
8. 상품 상세 페이지 구현
9. 상품 등록 폼 UI 구현
10. 상품 수정 폼 UI 구현
11. 검색 / 카테고리 필터 구현
12. 관심 상품 페이지 구현
13. 마이페이지 구현
14. Supabase products 테이블 연결
15. 상품 CRUD 연동
16. 로그인 기능 연동
17. 관심 상품 기능 연동
18. 반응형 UI 정리
19. README 정리
20. Vercel 배포
```

---

## ✅ 현재 진행 상태

```txt
- [x] 프로젝트 기획
- [x] 기술 스택 선정
- [x] 디자인 컨셉 정리
- [x] README 초안 작성
- [ ] Next.js 프로젝트 생성
- [ ] 공통 스타일 설정
- [ ] 더미데이터 기반 홈 화면 구현
- [ ] 상품 목록 / 상세 구현
- [ ] 상품 등록 / 수정 폼 구현
- [ ] Supabase 연동
- [ ] Vercel 배포
```

---

## 🧪 회고 및 트러블슈팅

프로젝트를 진행하면서 발생한 문제와 해결 과정을 정리할 예정입니다.

예정 기록 항목:

```txt
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
```

---

## 📝 포트폴리오 설명 문구

Near Market(동네마켓)은 Next.js App Router와 TypeScript를 기반으로 구현하는 지역 중고거래 플랫폼 미니 프로젝트입니다.

상품 목록, 상세, 등록, 수정, 삭제, 관심 상품, 마이페이지 등 실제 서비스에서 자주 사용되는 화면 흐름을 기준으로 설계했습니다. 백엔드 서버를 직접 구축하기보다는 Supabase를 활용해 데이터베이스, 인증, 스토리지 연동 경험을 쌓고, TanStack Query로 서버 상태를 관리하는 구조를 적용할 예정입니다.

모바일 사용성을 우선으로 고려해 Tailwind CSS 기반의 반응형 UI를 구현하고, React Hook Form과 Zod를 활용해 상품 등록/수정 폼의 입력값 검증을 처리할 계획입니다.
