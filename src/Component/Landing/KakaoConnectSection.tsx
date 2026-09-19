"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { fetchKakaoStatus, type KakaoStatus } from "@/src/functions/kakao_login";

// [랜딩] 카카오톡 알림 연동 유도. 섹션은 항상 같은 자리에 있고, 연동 여부에 따라 카드 내용만 바뀐다.
export default function KakaoConnectSection() {
  const [status, setStatus] = useState<KakaoStatus | null>(null);

  useEffect(() => {
    fetchKakaoStatus()
      .then(setStatus)
      .catch(() => setStatus({ connected: false }));
  }, []);

  return (
    <section id="kakao" className="scroll-mt-20 bg-cream-50">
      <div className="mx-auto max-w-6xl px-6 py-28 text-center">
        <p data-aos="fade-up" className="text-sm font-semibold text-honey-500">
          카카오톡 알림
        </p>
        <h2
          data-aos="fade-up"
          data-aos-delay="100"
          className="mt-4 font-serif text-5xl leading-tight font-bold text-ink-900"
        >
          때가 되면 카카오톡으로
        </h2>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-600"
        >
          일정 시간이 다가오면 내 카카오톡으로 알림이 와요. 앱을 열어두지 않아도
          놓치지 않습니다. 카카오 계정 한 번만 연결하면 됩니다.
        </p>

        {/* 상태 조회가 끝나기 전엔 비워두고 높이만 유지해서 스크롤 위치가 밀리지 않게 한다 */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="mx-auto mt-14 flex min-h-64 max-w-xl items-center justify-center"
        >
          {status && (status.connected ? <ConnectedCard status={status} /> : <ConnectCard />)}
        </div>
      </div>
    </section>
  );
}

function ConnectCard() {
  return (
    <div className="w-full rounded-2xl border border-cream-200 bg-white p-10">
      <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-honey-100 text-honey-500">
        <MessageCircle size={36} />
      </span>
      <h3 className="mt-6 font-serif text-2xl font-bold text-ink-900">
        아직 연동 전이에요
      </h3>
      <p className="mt-3 text-ink-600">
        카카오 로그인 한 번이면 알림을 받을 준비가 끝나요.
      </p>
      <Link
        href="/login"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-clay-500 px-8 py-4 font-semibold text-white transition-colors hover:bg-clay-600"
      >
        카카오톡 연동하기
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}

function ConnectedCard({ status }: { status: KakaoStatus }) {
  const expires = status.refreshExpiresAt
    ? new Date(status.refreshExpiresAt).toLocaleDateString("ko-KR")
    : null;

  return (
    <div className="w-full rounded-2xl border border-sage-500/30 bg-sage-100/60 p-10">
      <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-sage-500">
        <CheckCircle2 size={36} />
      </span>
      <h3 className="mt-6 font-serif text-2xl font-bold text-ink-900">
        카카오톡 알림 연동 완료
      </h3>
      {expires && (
        <p className="mt-3 text-ink-600">{expires}까지 유지돼요</p>
      )}
      <Link
        href="/login"
        className="mt-6 inline-block text-sm text-ink-600 underline underline-offset-4 hover:text-ink-900"
      >
        다시 연동하기
      </Link>
    </div>
  );
}
