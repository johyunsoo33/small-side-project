import { Suspense } from "react";
import LoginBox from "@/src/Component/KakaoLoginBox/LoginBox";

export default function Login() {
  return (
    <>
      <h1>Login</h1>
      {/* useSearchParams 를 쓰는 컴포넌트는 Suspense 로 감싸야 프로덕션 빌드가 통과한다. */}
      <Suspense fallback={<p>불러오는 중...</p>}>
        <LoginBox />
      </Suspense>
    </>
  );
}
