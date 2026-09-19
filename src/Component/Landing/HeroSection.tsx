import Link from "next/link";
import { Sparkles } from "lucide-react";
import CalendarMock from "./CalendarMock";

// [랜딩] 첫 화면. 헤드라인 + 버튼, 아래에 캘린더 목업
export default function HeroSection() {
  return (
    <section className="landing-hero-bg">
      <div className="mx-auto max-w-6xl px-6 pt-32 pb-16">
        <div className="max-w-3xl">
          <span
            data-aos="fade-up"
            className="inline-flex items-center gap-2 rounded-full bg-clay-100 px-4 py-2 text-sm font-medium text-clay-600"
          >
            <Sparkles size={16} />
            메모와 캘린더, 하나로
          </span>

          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className="mt-8 font-serif text-6xl leading-tight font-bold text-ink-900 md:text-7xl"
          >
            기억은 메모에,
            <br />
            시간은 <span className="text-clay-500">캘린더</span>에
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="mt-8 max-w-2xl text-xl leading-relaxed text-ink-600"
          >
            떠오른 생각은 바로 적고, 해야 할 일은 일정으로 옮기세요. 흩어진
            메모와 일정을 한 곳에서 정리하는 가장 가벼운 방법.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="mt-12 flex flex-wrap gap-4"
          >
            <Link
              href="/mySchedule"
              className="rounded-lg bg-clay-500 px-10 py-5 text-lg font-semibold text-white transition-colors hover:bg-clay-600"
            >
              시작하기
            </Link>
            <a
              href="#features"
              className="rounded-lg border border-cream-200 bg-white/60 px-10 py-5 text-lg font-semibold text-ink-900 transition-colors hover:bg-white"
            >
              기능 살펴보기
            </a>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="400" className="mt-24">
          <CalendarMock />
        </div>
      </div>
    </section>
  );
}
