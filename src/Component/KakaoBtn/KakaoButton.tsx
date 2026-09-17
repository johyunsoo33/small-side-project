"use client";
import { kakaoLogin } from "@/src/functions/kakao_login";

export default function KakaoButton() {
  return <button onClick={kakaoLogin}>Login</button>;
}
