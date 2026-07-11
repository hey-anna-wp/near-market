import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
