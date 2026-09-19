"use client";
import { MessageCircle } from "lucide-react";
import { kakaoLogin } from "@/src/functions/kakao_login";

// [카카오] 카카오 인증 페이지로 보내는 로그인 버튼. 카카오 브랜드 노랑을 쓴다.
export default function KakaoButton() {
  return (
    <button
      type="button"
      onClick={kakaoLogin}
      className="inline-flex items-center gap-2 rounded-lg bg-[#FEE500] px-8 py-4 font-semibold text-[#191919] transition-colors hover:bg-[#f5dc00]"
    >
      <MessageCircle size={18} />
      카카오로 연동하기
    </button>
  );
}
