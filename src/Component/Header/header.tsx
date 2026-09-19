"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarCheck } from "lucide-react";
import KakaoStatusBadge from "./KakaoStatusBadge";

const NAV_LINKS = [
  { href: "/mySchedule", label: "일정" },
  { href: "/myMemo", label: "메모" },
  { href: "/importantSchedule", label: "북마크" },
  { href: "/recent", label: "최근" },
];

// [공통] 앱 상단 바. 랜딩 네비와 같은 생김새로 페이지를 오가도 톤이 이어진다.
// 이전 햄버거 + 3D 버튼 메뉴는 menuList/menuItem 에 그대로 남아 있다.
export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-cream-200 bg-cream-50/85 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay-500 text-white">
            <CalendarCheck size={22} />
          </span>
          <span className="font-serif text-2xl font-bold whitespace-nowrap text-ink-900">
            메모캘
          </span>
        </Link>

        <nav className="flex items-center gap-5 text-[15px] md:gap-8">
          {NAV_LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`border-b-2 pb-1 whitespace-nowrap transition-colors ${
                  active
                    ? "border-clay-500 font-semibold text-ink-900"
                    : "border-transparent text-ink-600 hover:text-ink-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <KakaoStatusBadge />
      </div>
    </header>
  );
}
