import Link from "next/link";
import { MessageCircle, ArrowRight, Clock, ShieldCheck, Wifi } from "lucide-react";
import Header from "@/components/common/Header";
import BottomNavigation from "@/components/common/BottomNavigation";

const plannedFeatures = [
  {
    title: "채팅 목록",
    description: "상품별 문의 내역을 한눈에 확인할 수 있도록 구현 예정",
    icon: MessageCircle,
  },
  {
    title: "실시간 메시지",
    description: "Supabase Realtime을 활용한 메시지 송수신 확장 예정",
    icon: Wifi,
  },
  {
    title: "거래 안전 안내",
    description: "거래 전 확인해야 할 안내 문구와 신고 기능 확장 예정",
    icon: ShieldCheck,
  },
];

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-[#F7F6F2] pb-20 md:pb-0">
      <Header />

      <main className="mx-auto w-full max-w-[960px] px-5 py-6 md:px-6 md:py-10">
        <section className="overflow-hidden rounded-[28px] bg-[#EDF3E9] px-6 py-8 md:px-8 md:py-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#4F6843]">
            <Clock size={14} />
            추후 구현 예정
          </div>

          <h1 className="mt-5 text-[30px] leading-[38px] font-bold tracking-[-0.04em] text-[#333333] md:text-[42px] md:leading-[52px]">
            채팅 기능은
            <br />
            준비 중이에요
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-[#66715F] md:text-base md:leading-7">
            현재 프로젝트의 필수 구현 범위는 상품 CRUD, 검색, 필터, 관심 상품, 마이페이지입니다.
            채팅은 추후 Supabase Realtime을 활용해 확장할 예정입니다.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#6B8A58] px-6 text-sm font-semibold text-white transition hover:bg-[#4F6843]"
            >
              상품 둘러보기
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#D5D5D5] bg-white px-6 text-sm font-semibold text-[#333333] transition hover:bg-[#FAFAF8]"
            >
              홈으로 이동
            </Link>
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#E6E6E6] bg-white p-5 md:p-7">
          <h2 className="text-lg font-bold tracking-[-0.02em] text-[#333333]">확장 예정 기능</h2>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {plannedFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-[#E6E6E6] bg-[#FAFAF8] p-4"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDF3E9] text-[#4F6843]">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-4 font-semibold text-[#333333]">{feature.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-[#777777]">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#E6E6E6] bg-white p-5 md:p-7">
          <h2 className="text-lg font-bold tracking-[-0.02em] text-[#333333]">현재 구현 범위</h2>

          <ul className="mt-4 space-y-2 text-sm leading-6 text-[#777777]">
            <li>• 상품 목록, 상세, 등록, 수정 UI 구현</li>
            <li>• 관심 상품과 마이페이지 UI 구현</li>
            <li>• 로그인 UI 구현</li>
            <li>• 채팅은 포트폴리오 확장 예정 기능으로 분리</li>
          </ul>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}
