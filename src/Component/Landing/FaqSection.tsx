"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "메모와 캘린더가 어떻게 연결되나요?",
    a: "메모는 메모대로, 일정은 날짜와 시간을 붙여 캘린더에 남깁니다. 둘 다 북마크와 최근 본 목록에서 함께 관리돼요.",
  },
  {
    q: "카카오톡 알림은 어떻게 받나요?",
    a: "카카오 계정으로 한 번 연동하면, 서버가 일정 시간에 맞춰 내 카카오톡으로 메시지를 보내줍니다. 앱을 켜두지 않아도 됩니다.",
  },
  {
    q: "휴대폰과 컴퓨터에서 같이 쓸 수 있나요?",
    a: "웹으로 동작해서 브라우저만 있으면 어디서든 열 수 있어요. 데이터는 서버에 저장되니 기기가 달라도 같은 내용을 봅니다.",
  },
  {
    q: "무료로 사용할 수 있나요?",
    a: "네. 개인 프로젝트로 만든 서비스라 별도 요금은 없습니다.",
  },
];

// [랜딩] 자주 묻는 질문. 한 번에 하나만 열린다
export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-cream-50">
      <div className="mx-auto max-w-4xl px-6 py-28">
        <p
          data-aos="fade-up"
          className="text-center text-sm font-semibold text-sage-500"
        >
          자주 묻는 질문
        </p>
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="mt-4 text-center font-serif text-5xl leading-tight font-bold text-ink-900"
        >
          궁금한 점이 있나요?
        </h2>

        <div className="mt-16 space-y-4">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className={`rounded-xl border p-7 transition-colors ${
                  isOpen
                    ? "border-clay-500/50 bg-clay-100/40"
                    : "border-cream-200 bg-white/70"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 text-left"
                >
                  <span className="text-xl font-semibold text-ink-900">
                    {faq.q}
                  </span>
                  <span className={isOpen ? "text-clay-500" : "text-ink-600"}>
                    {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-5 leading-relaxed text-ink-600">{faq.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
