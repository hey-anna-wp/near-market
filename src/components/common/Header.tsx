"use client";

import Link from "next/link";
import { Bell, ChevronDown, CircleHelp, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button, LinkButton } from "@/components/common/button";
import { SearchInput } from "@/components/common/input";

const headerMenus = [
  {
    href: "/products",
    label: "상품",
  },
  {
    href: "/likes",
    label: "관심",
  },
  {
    href: "/mypage",
    label: "마이페이지",
  },
];

export default function Header() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const closeGuide = () => {
    setIsGuideOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#E6E6E6] bg-[#F7F6F2]/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 md:px-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6B8A58] text-sm font-bold text-white">
                N
              </div>

              <span className="text-[22px] font-bold tracking-[-0.03em] text-[#3F5038]">
                Near Market
              </span>
            </Link>

            <nav className="hidden items-center gap-5 lg:flex">
              {headerMenus.map((menu) => (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className="text-sm font-semibold text-[#555555] transition hover:text-[#4F6843]"
                >
                  {menu.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="hidden flex-1 items-center justify-center px-8 md:flex">
            <SearchInput
              value=""
              onChange={() => {}}
              placeholder="어떤 물건을 찾고 있나요?"
              ariaLabel="상품 검색"
              className="h-11 w-full max-w-md rounded-full bg-white"
            />
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              className="flex items-center gap-1 rounded-full bg-[#EDF3E9] px-4 py-2 text-sm font-semibold text-[#4F6843]"
            >
              창원시 성산구
              <ChevronDown size={16} />
            </button>

            <button
              type="button"
              onClick={() => setIsGuideOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-[#DDE5D8] bg-white px-4 py-2 text-sm font-semibold text-[#4F6843] transition hover:bg-[#F4F7F2]"
            >
              <CircleHelp size={17} />
              사이트 안내
            </button>

            <LinkButton href="/products/new" size="sm" className="px-5">
              상품 등록
            </LinkButton>

            <button
              type="button"
              aria-label="알림"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-[#333333]"
            >
              <Bell size={18} />
            </button>
          </div>

          <button
            type="button"
            aria-label="사이트 안내"
            onClick={() => setIsGuideOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-[#333333] md:hidden"
          >
            <Menu size={20} />
          </button>
        </div>

        <div className="mx-auto flex w-full max-w-[1200px] gap-2 px-5 pb-4 md:hidden">
          <button
            type="button"
            className="flex h-11 shrink-0 items-center gap-1 rounded-full bg-[#EDF3E9] px-4 text-sm font-semibold text-[#4F6843]"
          >
            창원시
            <ChevronDown size={16} />
          </button>

          <SearchInput
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="검색어를 입력하세요"
            ariaLabel="상품 검색"
            className="h-11 flex-1 rounded-full bg-white"
          />
        </div>
      </header>
      {isGuideOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 px-5"
          onClick={closeGuide}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-guide-title"
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-[28px] bg-[#FFFDF8] p-6 shadow-2xl md:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#EDF3E9] text-[#4F6843]">
                  <CircleHelp size={22} />
                </div>

                <h2
                  id="site-guide-title"
                  className="text-2xl font-bold tracking-[-0.03em] text-[#35432F]"
                >
                  Near Market 사이트 안내
                </h2>
              </div>

              <button
                type="button"
                onClick={closeGuide}
                aria-label="사이트 안내 닫기"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-[#555555] transition hover:bg-[#F5F5F5]"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-5 text-sm leading-6 text-[#666666]">
              이 프로젝트는 현재 더미데이터를 기반으로 주요 화면과 사용자 흐름을 구현하고 있습니다.
            </p>

            <div className="mt-7">
              <h3 className="text-base font-bold text-[#35432F]">확인 가능한 화면</h3>

              <ul className="mt-3 space-y-2.5 text-sm text-[#555555]">
                <li className="flex gap-2">
                  <span className="text-[#6B8A58]">•</span>홈 및 상품 목록
                </li>
                <li className="flex gap-2">
                  <span className="text-[#6B8A58]">•</span>
                  상품 검색과 필터
                </li>
                <li className="flex gap-2">
                  <span className="text-[#6B8A58]">•</span>
                  상품 상세
                </li>
                <li className="flex gap-2">
                  <span className="text-[#6B8A58]">•</span>
                  상품 등록 및 수정 UI
                </li>
                <li className="flex gap-2">
                  <span className="text-[#6B8A58]">•</span>
                  관심 상품
                </li>
                <li className="flex gap-2">
                  <span className="text-[#6B8A58]">•</span>
                  마이페이지와 내 판매글
                </li>
              </ul>
            </div>

            <div className="mt-7 rounded-2xl bg-[#F2F0E8] p-5">
              <h3 className="text-base font-bold text-[#35432F]">연동 예정</h3>

              <ul className="mt-3 space-y-2.5 text-sm text-[#666666]">
                <li className="flex gap-2">
                  <span className="text-[#9A865D]">•</span>
                  Supabase 상품 CRUD
                </li>
                <li className="flex gap-2">
                  <span className="text-[#9A865D]">•</span>
                  로그인 및 사용자 인증
                </li>
                <li className="flex gap-2">
                  <span className="text-[#9A865D]">•</span>
                  이미지 업로드
                </li>
                <li className="flex gap-2">
                  <span className="text-[#9A865D]">•</span>
                  실시간 채팅
                </li>
              </ul>
            </div>

            <Button onClick={closeGuide} size="lg" fullWidth className="mt-7">
              확인했어요
            </Button>
          </section>
        </div>
      )}
    </>
  );
}
