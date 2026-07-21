import { MessageCircle, ArrowRight, Clock, ShieldCheck, Wifi } from "lucide-react";
import PageLayout from "@/components/common/PageLayout";
import HeroCard from "@/components/common/HeroCard";
import PageTitle from "@/components/common/PageTitle";
import SectionHeader from "@/components/common/SectionHeader";
import SectionCard from "@/components/common/SectionCard";
import LinkButton from "@/components/common/button/LinkButton";

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
    <PageLayout maxWidth="max-w-[960px]">
      <HeroCard
        variant="green"
        className="overflow-hidden"
        bottom={
          <div className="flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/products">
              상품 둘러보기
              <ArrowRight size={18} />
            </LinkButton>

            <LinkButton href="/" variant="outline">
              홈으로 이동
            </LinkButton>
          </div>
        }
      >
        <PageTitle
          badge={
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#4F6843]">
              <Clock size={14} />
              추후 구현 예정
            </div>
          }
          title="채팅 기능은 준비 중이에요"
          description={
            <>
              현재 프로젝트의 필수 구현 범위는 상품 CRUD, 검색, 필터, 관심 상품, 마이페이지입니다.
              <br />
              채팅은 추후 Supabase Realtime을 활용해 확장할 예정입니다.
            </>
          }
        />
      </HeroCard>

      <SectionCard>
        <SectionHeader title="확장 예정 기능" />

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
      </SectionCard>

      <SectionCard>
        <SectionHeader title="현재 구현 범위" />

        <ul className="mt-4 space-y-2 text-sm leading-6 text-[#777777]">
          <li>• 상품 목록, 상세, 등록, 수정 UI 구현</li>
          <li>• 관심 상품과 마이페이지 UI 구현</li>
          <li>• 로그인 UI 구현</li>
          <li>• 채팅은 포트폴리오 확장 예정 기능으로 분리</li>
        </ul>
      </SectionCard>
    </PageLayout>
  );
}
