import { ArrowRight } from "lucide-react";

const STEPS = [
  {
    title: "메모 남기기",
    body: "해야 할 일이나 기억할 내용을 빠르게 적어둡니다.",
  },
  {
    title: "일정으로 옮기기",
    body: "날짜와 시간을 정하면 캘린더에 일정으로 표시됩니다.",
  },
  {
    title: "카카오톡으로 챙기기",
    body: "때가 되면 카카오톡 알림이 와서 일정을 놓치지 않게 도와줍니다.",
  },
];

// [랜딩] 사용 방법 3단계
export default function HowToSection() {
  return (
    <section id="howto" className="scroll-mt-20 bg-cream-100">
      <div className="mx-auto max-w-6xl px-6 py-28">
        <p data-aos="fade-up" className="text-sm font-semibold text-clay-500">
          사용 방법
        </p>
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="mt-4 font-serif text-5xl leading-tight font-bold text-ink-900"
        >
          세 단계면 충분해요
        </h2>

        <div className="mt-16 grid items-center gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {STEPS.map((step, i) => (
            <StepCard key={step.title} index={i} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  return (
    <>
      {index > 0 && (
        <span className="hidden justify-center text-clay-200 md:flex">
          <ArrowRight size={22} />
        </span>
      )}
      <div
        data-aos="fade-up"
        data-aos-delay={index * 150}
        className="rounded-2xl border border-cream-200 bg-white/70 p-10"
      >
        <span className="font-serif text-6xl text-clay-200">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-8 font-serif text-2xl font-bold text-ink-900">
          {title}
        </h3>
        <p className="mt-4 leading-relaxed text-ink-600">{body}</p>
      </div>
    </>
  );
}
