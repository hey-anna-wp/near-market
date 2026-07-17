import Link from "next/link";
import {
  ChevronRight,
  Heart,
  LogOut,
  MapPin,
  Package,
  Pencil,
  Settings,
  ShoppingBag,
  User,
} from "lucide-react";
import Header from "@/components/common/Header";
import BottomNavigation from "@/components/common/BottomNavigation";
import ProductCard from "@/components/product/ProductCard";
import { mockUser } from "@/mocks/user";
import { mockProducts } from "@/mocks/products";

const menuItems = [
  {
    href: "/mypage/sales",
    label: "내 판매글",
    description: "내가 등록한 상품을 확인하고 관리해요",
    icon: Package,
  },
  {
    href: "/likes",
    label: "관심 상품",
    description: "관심 표시한 상품을 모아볼 수 있어요",
    icon: Heart,
  },
  {
    href: "/products/new",
    label: "상품 등록",
    description: "새로운 중고 상품을 등록해요",
    icon: Pencil,
  },
  {
    href: "/login",
    label: "로그인 관리",
    description: "로그인 상태와 계정 정보를 확인해요",
    icon: Settings,
  },
];

export default function MyPage() {
  const myProducts = mockProducts.filter((product) => product.sellerId === mockUser.id);

  const likedProducts = mockProducts.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F7F6F2] pb-20 md:pb-0">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] px-5 py-6 md:px-6 md:py-10">
        <section className="overflow-hidden rounded-[28px] bg-[#EDF3E9] px-6 py-7 md:px-8 md:py-9">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-[#4F6843] shadow-[0_10px_30px_rgba(79,104,67,0.08)]">
                <User size={34} />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#4F6843]">My Page</p>

                <h1 className="mt-1 text-[28px] leading-9 font-bold tracking-[-0.04em] text-[#333333] md:text-[36px] md:leading-[46px]">
                  {mockUser.nickname}님
                </h1>

                <div className="mt-2 flex items-center gap-1 text-sm text-[#66715F]">
                  <MapPin size={16} />
                  <span>{mockUser.location}</span>
                </div>
              </div>
            </div>

            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#D5D5D5] bg-white px-5 text-sm font-semibold text-[#333333] transition hover:bg-[#FAFAF8]"
            >
              프로필 수정
            </Link>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-3 gap-3 md:gap-4">
          <div className="rounded-2xl border border-[#E6E6E6] bg-white p-4 text-center md:p-5">
            <p className="text-2xl font-bold text-[#4F6843]">{myProducts.length}</p>
            <p className="mt-1 text-xs font-medium text-[#777777]">판매글</p>
          </div>

          <div className="rounded-2xl border border-[#E6E6E6] bg-white p-4 text-center md:p-5">
            <p className="text-2xl font-bold text-[#4F6843]">{likedProducts.length}</p>
            <p className="mt-1 text-xs font-medium text-[#777777]">관심 상품</p>
          </div>

          <div className="rounded-2xl border border-[#E6E6E6] bg-white p-4 text-center md:p-5">
            <p className="text-2xl font-bold text-[#4F6843]">0</p>
            <p className="mt-1 text-xs font-medium text-[#777777]">문의 내역</p>
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#E6E6E6] bg-white p-5 md:p-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-[-0.02em] text-[#333333]">내 거래 활동</h2>

              <p className="mt-1 text-sm text-[#777777]">
                판매글, 관심 상품, 계정 정보를 관리할 수 있어요.
              </p>
            </div>
          </div>

          <div className="mt-5 divide-y divide-[#F0F0F0]">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-4 py-4 transition hover:bg-[#FAFAF8] md:px-3"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EDF3E9] text-[#4F6843]">
                    <Icon size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#333333]">{item.label}</p>
                    <p className="mt-1 truncate text-sm text-[#777777]">{item.description}</p>
                  </div>

                  <ChevronRight size={20} className="text-[#AAAAAA]" />
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#E6E6E6] bg-white p-5 md:p-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-[-0.02em] text-[#333333]">내 판매글</h2>

              <p className="mt-1 text-sm text-[#777777]">내가 등록한 상품을 확인해보세요.</p>
            </div>

            <Link href="/mypage/sales" className="text-sm font-semibold text-[#4F6843]">
              전체보기
            </Link>
          </div>

          {myProducts.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
              {myProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#D5D5D5] bg-[#FAFAF8] px-6 py-10 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EDF3E9] text-[#4F6843]">
                <ShoppingBag size={26} />
              </div>

              <h3 className="mt-4 font-semibold text-[#333333]">아직 등록한 상품이 없어요</h3>

              <p className="mt-2 text-sm leading-6 text-[#777777]">
                판매할 물건이 있다면 상품을 등록해보세요.
              </p>

              <Link
                href="/products/new"
                className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-[#6B8A58] px-5 text-sm font-semibold text-white transition hover:bg-[#4F6843]"
              >
                상품 등록하기
              </Link>
            </div>
          )}
        </section>

        <section className="mt-6 rounded-[28px] border border-[#E6E6E6] bg-white p-5 md:p-7">
          <h2 className="text-lg font-bold tracking-[-0.02em] text-[#333333]">계정 안내</h2>

          <div className="mt-4 rounded-2xl bg-[#FAFAF8] p-4">
            <p className="text-sm font-semibold text-[#333333]">현재는 더미 로그인 상태입니다.</p>

            <p className="mt-2 text-sm leading-6 text-[#777777]">
              추후 Supabase Auth 연동 후 실제 로그인 사용자 기준으로 프로필, 내 판매글, 관심 상품
              데이터를 불러올 예정입니다.
            </p>
          </div>

          <button
            type="button"
            className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#F3C1C3] bg-white px-5 text-sm font-semibold text-[#E5484D] transition hover:bg-[#FFF5F5]"
          >
            <LogOut size={17} />
            로그아웃
          </button>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}
