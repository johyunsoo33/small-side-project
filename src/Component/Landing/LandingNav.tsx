import Link from "next/link";
import { CalendarCheck } from "lucide-react";

const NAV_LINKS = [
  { href: "#features", label: "기능" },
  { href: "#calendar", label: "캘린더" },
  { href: "#kakao", label: "카카오 알림" },
  { href: "#howto", label: "사용 방법" },
  { href: "#faq", label: "FAQ" },
];

// [랜딩] 상단 고정 네비게이션. 섹션 앵커 + 로그인 + 시작하기
export default function LandingNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-cream-200 bg-cream-50/85 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-clay-500 text-white">
            <CalendarCheck size={22} />
          </span>
          <span className="font-serif text-2xl font-bold text-ink-900">
            메모캘
          </span>
        </Link>

        <nav className="hidden items-center gap-10 text-[15px] text-ink-600 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-ink-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-[15px] text-ink-600 transition-colors hover:text-ink-900"
          >
            로그인
          </Link>
          <Link
            href="/mySchedule"
            className="rounded-lg bg-clay-500 px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-clay-600"
          >
            시작하기
          </Link>
        </div>
      </div>
    </header>
  );
}
