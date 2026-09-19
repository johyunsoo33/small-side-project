import { CalendarCheck } from "lucide-react";

// [랜딩] 페이지 하단
export default function LandingFooter() {
  return (
    <footer className="border-t border-cream-200 bg-cream-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-12 text-center md:flex-row md:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-clay-500 text-white">
            <CalendarCheck size={18} />
          </span>
          <span className="font-serif text-xl font-bold text-ink-900">메모캘</span>
        </div>
        <p className="text-sm text-ink-600">기억은 메모에, 시간은 캘린더에</p>
      </div>
    </footer>
  );
}
