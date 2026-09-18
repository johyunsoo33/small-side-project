"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

  if (status === "loading") return <p>로그인 처리 중...</p>;
  if (status === "success") return <p>카카오 연동 완료</p>;
  if (status === "error")
    return <p>로그인에 실패했습니다. 다시 시도해주세요.</p>;

  return <KakaoButton />;
}
