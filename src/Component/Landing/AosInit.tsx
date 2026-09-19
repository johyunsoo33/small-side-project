"use client";
import Script from "next/script";

// [랜딩] AOS 스크립트를 불러오고, 로드가 끝나면 초기화한다. onLoad 는 클라이언트 컴포넌트에서만 동작한다.
export default function AosInit() {
  return (
    <Script
      src="https://unpkg.com/aos@2.3.1/dist/aos.js"
      onLoad={() => {
        window.AOS.init({
          duration: 700,
          easing: "ease-out-cubic",
          once: true,
          offset: 80,
        });
      }}
    />
  );
}
