import axios from "axios";

// 카카오 인증 페이지로 이동시킨다. 동의가 끝나면 카카오가 redirect_uri 로 ?code=... 를 붙여 돌려보낸다.
export function kakaoLogin() {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!,
    redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
    response_type: "code",
    scope: "talk_message",
  });
  window.location.href = `https://kauth.kakao.com/oauth/authorize?${params}`;
}

// 돌아온 code 를 서버에 넘겨 토큰 교환을 맡긴다. 토큰은 서버에만 저장된다.
export async function kakaoLoginComplete(code: string) {
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/kakao/token`, {
    code,
  });
}

// ---- 이전 JS SDK 방식 (참고용) ----
// SDK v2 에는 팝업 로그인(Auth.login)이 없고 authorize 만 있어서 결국 code → 토큰 교환이 서버에서 필요했다.
// 그래서 SDK 를 걷어내고 REST API 방식으로 전환했다.
//
// export function kakaoLogin() {
//   if (!Kakao.isInitialized()) {
//     Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY!);
//   }
//
//   Kakao.Auth.authorize({
//     redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
//     scope: "talk_message",
//   });
// }
