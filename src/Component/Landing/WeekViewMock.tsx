const TONES = {
  clay: { card: "bg-clay-100", bar: "bg-clay-500" },
  honey: { card: "bg-honey-100", bar: "bg-honey-500" },
  sage: { card: "bg-sage-100", bar: "bg-sage-500" },
};

type Tone = keyof typeof TONES;

const DAYS: {
  label: string;
  date: number;
  today?: boolean;
  events: { title: string; time: string; tone: Tone }[];
}[] = [
  {
    label: "월",
    date: 15,
    events: [
      { title: "팀 주간 회의", time: "10:00", tone: "clay" },
      { title: "메모 정리", time: "16:00", tone: "sage" },
    ],
  },
  {
    label: "화",
    date: 16,
    events: [{ title: "지원 공고 확인", time: "09:30", tone: "honey" }],
  },
  {
    label: "수",
    date: 17,
    today: true,
    events: [
      { title: "디자인 리뷰", time: "11:00", tone: "clay" },
      { title: "이력서 마감", time: "15:00", tone: "honey" },
      { title: "운동", time: "19:00", tone: "sage" },
    ],
  },
  {
    label: "목",
    date: 18,
    events: [{ title: "외부 일정 동기화", time: "13:00", tone: "sage" }],
  },
  {
    label: "금",
    date: 19,
    events: [{ title: "주간 정산", time: "17:00", tone: "clay" }],
  },
];

// [랜딩] 주간 보기 목업. 보여주기용 정적 화면
export default function WeekViewMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-[0_20px_60px_-20px_rgba(120,80,40,0.2)]">
      <div className="flex items-center justify-between border-b border-cream-200 px-6 py-4">
        <div className="flex gap-2">
          {["일", "주", "월"].map((view) => (
            <span
              key={view}
              className={
                view === "주"
                  ? "flex h-11 w-11 items-center justify-center rounded-full bg-sage-500 text-white"
                  : "flex h-11 w-11 items-center justify-center rounded-full border border-cream-200 text-ink-600"
              }
            >
              {view}
            </span>
          ))}
        </div>
        <span className="text-ink-600">2026년 9월 3주</span>
      </div>

      <div className="grid grid-cols-5 gap-3 p-6">
        {DAYS.map((day) => (
          <div key={day.date}>
            <div className="border-b border-cream-200 pb-3 text-center">
              <div className="text-sm text-ink-600/60">{day.label}</div>
              <div
                className={`mt-1 text-xl font-bold ${day.today ? "text-clay-500" : "text-ink-900"}`}
              >
                {day.date}
              </div>
            </div>
            <div className="mt-3 space-y-3">
              {day.events.map((event) => (
                <div
                  key={event.title}
                  className={`rounded-lg p-3 ${TONES[event.tone].card}`}
                >
                  <span
                    className={`block h-1.5 w-7 rounded-full ${TONES[event.tone].bar}`}
                  />
                  <div className="mt-2 text-sm font-semibold text-ink-900">
                    {event.title}
                  </div>
                  <div className="text-sm text-ink-600">{event.time}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
