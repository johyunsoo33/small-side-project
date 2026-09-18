"use client";
import { kakaoLogin } from "@/src/functions/kakao_login";

// [카카오] 카카오 인증 페이지로 보내는 로그인 버튼
export default function KakaoButton() {
  return <button onClick={kakaoLogin}>Login</button>;
}
