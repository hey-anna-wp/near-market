import type { Metadata } from "next";

import Providers from "@/app/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Near Market",
  description: "지역 기반 중고거래 포트폴리오 프로젝트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
