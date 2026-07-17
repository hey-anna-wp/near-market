import type { ReactNode } from "react";
import Header from "@/components/common/Header";
import BottomNavigation from "@/components/common/BottomNavigation";

type PageLayoutProps = {
  children: ReactNode;
  maxWidth?: "max-w-[960px]" | "max-w-[1200px]";
  className?: string;
  showBottomNavigation?: boolean;
};

export default function PageLayout({
  children,
  maxWidth = "max-w-[1200px]",
  className = "",
  showBottomNavigation = true,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F7F6F2] pb-20 md:pb-0">
      <Header />

      <main className={`mx-auto w-full ${maxWidth} px-5 py-6 md:px-6 md:py-10 ${className}`}>
        {children}
      </main>

      {showBottomNavigation && <BottomNavigation />}
    </div>
  );
}
