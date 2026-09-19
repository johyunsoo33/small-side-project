import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 랜딩 페이지 헤드라인용 명조체
const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "메모캘",
  description: "기억은 메모에, 시간은 캘린더에",
};

// [공통] 모든 페이지를 감싸는 루트 레이아웃. 폰트와 전역 CSS를 적용한다.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko-KR"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifKr.variable} h-full antialiased`}
    >
      <head>
        {/* AOS 스타일. 스크립트는 init 호출이 필요해서 클라이언트 컴포넌트(AosInit)에서 불러온다. */}
        <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
