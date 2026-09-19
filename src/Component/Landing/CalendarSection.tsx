import { MousePointerClick, Bookmark, Clock } from "lucide-react";
import WeekViewMock from "./WeekViewMock";

const POINTS = [
  {
    icon: MousePointerClick,
    title: "날짜를 누르면 바로 일정 추가",
    body: "캘린더에서 날짜를 고르고 제목과 시간만 적으면 끝이에요.",
  },
  {
    icon: Bookmark,
    title: "북마크로 중요한 일정 고정",
    body: "놓치면 안 되는 일정은 북마크해두면 따로 모아 볼 수 있어요.",
  },
  {
    icon: Clock,
    title: "최근 본 항목 자동 정리",
    body: "24시간 안에 열어본 일정과 메모가 최근 목록에 자동으로 남아요.",
  },
];

// [랜딩] 캘린더 · 일정 소개. 왼쪽 설명 + 오른쪽 주간 뷰 목업
export default function CalendarSection() {
  return (
    <section id="calendar" className="scroll-mt-20 bg-cream-100">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 py-28 lg:grid-cols-2">
        <div>
          <p data-aos="fade-up" className="text-sm font-semibold text-sage-500">
            캘린더 · 일정
          </p>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="mt-4 font-serif text-5xl leading-tight font-bold text-ink-900"
          >
            하루가 한눈에 보이는
            <br />
            나만의 캘린더
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-6 text-lg leading-relaxed text-ink-600"
          >
            메모에서 일정을 만들고, 날짜 위에 올려두면 끝. 월·주·일 어느
            보기에서도 흐름이 끊기지 않아요.
          </p>

          <ul className="mt-12 space-y-8">
            {POINTS.map((point, i) => {
              const Icon = point.icon;
              return (
                <li
                  key={point.title}
                  data-aos="fade-up"
                  data-aos-delay={300 + i * 100}
                  className="flex gap-6"
                >
                  <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-sage-500">
                    <Icon size={28} />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-ink-900">
                      {point.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink-600">
                      {point.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div data-aos="fade-left" data-aos-delay="200">
          <WeekViewMock />
        </div>
      </div>
    </section>
  );
}
