import Link from "next/link";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#E6E6E6] bg-[#F7F6F2]/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6B8A58] text-sm font-bold text-white">
            N
          </div>

          <span className="text-[22px] font-bold tracking-[-0.03em] text-[#3F5038]">
            Near Market
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-center px-8 md:flex">
          <div className="flex h-11 w-full max-w-md items-center gap-2 rounded-full border border-[#E6E6E6] bg-white px-4">
            <Search size={18} className="text-[#777777]" />
            <input
              type="text"
              placeholder="어떤 물건을 찾고 있나요?"
              className="w-full bg-transparent text-sm text-[#333333] outline-none placeholder:text-[#AAAAAA]"
            />
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            className="flex items-center gap-1 rounded-full bg-[#EDF3E9] px-4 py-2 text-sm font-semibold text-[#4F6843]"
          >
            창원시 성산구
            <ChevronDown size={16} />
          </button>

          <Link
            href="/products/new"
            className="rounded-full bg-[#6B8A58] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4F6843]"
          >
            글쓰기
          </Link>

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
          aria-label="메뉴"
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

        <div className="flex h-11 flex-1 items-center gap-2 rounded-full border border-[#E6E6E6] bg-white px-4">
          <Search size={18} className="text-[#777777]" />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#AAAAAA]"
          />
        </div>
      </div>
    </header>
  );
}
