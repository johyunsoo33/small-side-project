import { StickyNote } from "lucide-react";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
// 2026년 9월. 1일이 화요일이라 앞에 빈 칸 2개
const LEADING_BLANKS = 2;
const DAYS_IN_MONTH = 30;
const TODAY = 17;
const DOTS: Record<number, string> = {
  3: "bg-clay-500",
  9: "bg-sage-500",
  22: "bg-clay-500",
  25: "bg-sage-500",
};

// [랜딩] 히어로 아래 캘린더 목업. 실제 데이터가 아니라 보여주기용 정적 화면
export default function CalendarMock() {
  const cells = [
    ...Array.from({ length: LEADING_BLANKS }, () => null),
    ...Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1),
  ];

  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-[0_20px_60px_-20px_rgba(120,80,40,0.25)]">
        <div className="flex items-center gap-4 border-b border-cream-200 bg-cream-50 px-8 py-5">
          <span className="flex gap-2">
            <span className="h-3.5 w-3.5 rounded-full bg-clay-500/80" />
            <span className="h-3.5 w-3.5 rounded-full bg-honey-500/80" />
            <span className="h-3.5 w-3.5 rounded-full bg-sage-500/80" />
          </span>
          <span className="text-ink-600">메모캘 · 2026년 9월</span>
        </div>

        <div className="px-10 py-8">
          <div className="grid grid-cols-7 text-center text-sm text-ink-600/60">
            {WEEKDAYS.map((day) => (
              <div key={day} className="py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-y-3 text-center">
            {cells.map((day, i) => (
              <div key={i} className="flex h-20 flex-col items-center justify-center">
                {day && (
                  <>
                    <span
                      className={
                        day === TODAY
                          ? "flex h-14 w-14 items-center justify-center rounded-xl bg-clay-500 text-lg font-bold text-white"
                          : "text-lg text-ink-900"
                      }
                    >
                      {day}
                    </span>
                    {DOTS[day] && (
                      <span className={`mt-1.5 h-2 w-2 rounded-full ${DOTS[day]}`} />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 캘린더 위에 겹쳐 떠 있는 빠른 메모 카드 */}
      <div className="absolute -top-8 -right-4 w-72 rotate-2 rounded-xl border border-honey-500/30 bg-honey-100 p-5 shadow-lg md:-right-16">
        <div className="flex items-center gap-2 font-semibold text-ink-900">
          <StickyNote size={18} />
          빠른 메모
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          지원할 공고 3곳 마감일 캘린더에 옮기기
        </p>
      </div>
    </div>
  );
}
