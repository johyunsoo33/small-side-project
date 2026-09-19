"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { fetchKakaoStatus } from "@/src/functions/kakao_login";

// [공통] 헤더 오른쪽의 카카오 연동 상태. 미연동이면 /login 으로 유도한다.
export default function KakaoStatusBadge() {
  const [connected, setConnected] = useState<boolean | null>(null);

  useEffect(() => {
    fetchKakaoStatus()
      .then((status) => setConnected(status.connected))
      .catch(() => setConnected(false));
  }, []);

  // 조회 전엔 자리만 잡아 헤더가 흔들리지 않게 한다
  if (connected === null) return <span className="h-10 w-36 shrink-0" />;

  if (connected) {
    return (
      <Link
        href="/login"
        className="flex shrink-0 items-center gap-2 rounded-full bg-sage-100 px-4 py-2 text-sm font-medium whitespace-nowrap text-sage-500"
      >
        <CheckCircle2 size={16} />
        카카오 연동됨
      </Link>
    );
  }

  return (
    <Link
      href="/login"
      className="flex shrink-0 items-center gap-2 rounded-full bg-clay-500 px-4 py-2 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-clay-600"
    >
      <MessageCircle size={16} />
      카카오 연동하기
    </Link>
  );
}
