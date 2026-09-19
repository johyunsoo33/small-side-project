import { Suspense } from "react";
import Header from "@/src/Component/Header/header";
import LoginBox from "@/src/Component/KakaoLoginBox/LoginBox";

// [페이지] 카카오 로그인 (/login)
export default function Login() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-xl px-6 py-20 text-center">
        <p className="text-sm font-semibold text-honey-500">카카오톡 알림</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-ink-900">
          카카오 계정 연결하기
        </h1>
        <p className="mt-4 text-ink-600">
          한 번만 연결하면 일정 시간에 맞춰 내 카카오톡으로 알림이 와요.
        </p>

        {/* useSearchParams 를 쓰는 컴포넌트는 Suspense 로 감싸야 프로덕션 빌드가 통과한다. */}
        <div className="mt-12">
          <Suspense fallback={<p className="text-ink-600">불러오는 중...</p>}>
            <LoginBox />
          </Suspense>
        </div>
      </main>
    </>
  );
}
