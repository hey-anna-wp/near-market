import Link from "next/link";
import { Heart, Home, MessageCircle, PlusSquare, User } from "lucide-react";

const navigationItems = [
  {
    href: "/",
    label: "홈",
    icon: Home,
  },
  {
    href: "/products",
    label: "상품",
    icon: PlusSquare,
  },
  {
    href: "/likes",
    label: "관심",
    icon: Heart,
  },
  {
    href: "/chat",
    label: "채팅",
    icon: MessageCircle,
  },
  {
    href: "/mypage",
    label: "마이",
    icon: User,
  },
];

export default function BottomNavigation() {
  return (
    <nav className="fixed right-0 bottom-0 left-0 z-40 border-t border-[#E6E6E6] bg-white md:hidden">
      <div className="mx-auto grid h-16 max-w-md grid-cols-5">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 text-[#777777]"
            >
              <Icon size={20} />
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
