import { StickyNote, CalendarDays, Bookmark } from "lucide-react";

const FEATURES = [
  {
    icon: StickyNote,
    tone: "bg-clay-100 text-clay-600",
    title: "떠오르는 순간 메모",
    body: "생각이 나는 그 자리에서 바로 적으세요. 파일을 첨부해두면 나중에 찾기도 쉬워요.",
  },
  {
    icon: CalendarDays,
    tone: "bg-sage-100 text-sage-500",
    title: "하나로 합쳐진 캘린더",
    body: "월간 캘린더에서 하루를 한눈에. 시작과 끝 시간을 정해 일정으로 남길 수 있어요.",
  },
  {
    icon: Bookmark,
    tone: "bg-honey-100 text-honey-500",
    title: "북마크와 최근 본 항목",
    body: "중요한 일정과 메모는 북마크로 고정하고, 최근 24시간 안에 본 것은 자동으로 모아둬요.",
  },
];

// [랜딩] 기능 살펴보기. 카드 3장
export default function FeaturesSection() {
  return (
    <section id="features" className="scroll-mt-20 bg-cream-50">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <p data-aos="fade-up" className="text-sm font-semibold text-clay-500">
          기능 살펴보기
        </p>
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="mt-4 font-serif text-5xl leading-tight font-bold text-ink-900"
        >
          적는 순간부터 지키는 순간까지
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-600"
        >
          메모와 캘린더가 따로 놀지 않아요. 적은 내용이 자연스럽게 일정이 되고,
          일정은 다시 기록으로 남습니다.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="rounded-2xl border border-cream-200 bg-white/70 p-10"
              >
                <span
                  className={`flex h-24 w-24 items-center justify-center rounded-2xl ${feature.tone}`}
                >
                  <Icon size={40} />
                </span>
                <h3 className="mt-10 font-serif text-2xl font-bold text-ink-900">
                  {feature.title}
                </h3>
                <p className="mt-4 leading-relaxed text-ink-600">
                  {feature.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
