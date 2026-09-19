"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, MessageCircle } from "lucide-react";
import KakaoButton from "../KakaoBtn/KakaoButton";
import { kakaoLoginComplete } from "@/src/functions/kakao_login";

// [카카오] 로그인 버튼을 띄우고, 리다이렉트로 돌아온 code 를 서버에 넘겨 연동을 마무리한다
export default function LoginBox() {
  const code = useSearchParams().get("code");
  const router = useRouter();
  // 인가 코드는 1회용이라 두 번 보내면 실패한다
  const hasRun = useRef(false);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (!code || hasRun.current) return;
    hasRun.current = true;

    setStatus("loading");
    kakaoLoginComplete(code)
      .then(() => {
        setStatus("success");
        // 새로고침해도 쓰고 난 code 가 다시 전송되지 않도록 URL 에서 지운다.
        router.replace("/login");
      })
      .catch(() => setStatus("error"));
  }, [code, router]);

  if (status === "loading") {
    return (
      <div className="rounded-2xl border border-cream-200 bg-white p-10 text-ink-600">
        연동 처리 중...
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-sage-500/30 bg-sage-100/60 p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-sage-500">
          <CheckCircle2 size={32} />
        </span>
        <p className="mt-5 font-serif text-2xl font-bold text-ink-900">
          카카오 연동 완료
        </p>
        <Link
          href="/mySchedule"
          className="mt-6 inline-block rounded-lg bg-clay-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-clay-600"
        >
          일정으로 가기
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-cream-200 bg-white p-10">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-honey-100 text-honey-500">
        <MessageCircle size={32} />
      </span>
      {status === "error" && (
        <p className="mt-5 text-sm text-clay-600">
          연동에 실패했어요. 다시 시도해주세요.
        </p>
      )}
      <div className="mt-6">
        <KakaoButton />
      </div>
    </div>
  );
}
