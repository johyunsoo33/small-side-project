import axios from "axios";

// [카카오] 인증 페이지로 이동. 동의가 끝나면 redirect_uri 로 ?code=... 가 붙어 돌아온다.
export function kakaoLogin() {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!,
    redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
    response_type: "code",
    scope: "talk_message",
  });
  window.location.href = `https://kauth.kakao.com/oauth/authorize?${params}`;
}

// [카카오] 돌아온 code 를 서버에 넘겨 토큰 교환을 맡긴다. 토큰은 서버에만 저장된다.
export async function kakaoLoginComplete(code: string) {
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/kakao/token`, {
    code,
  });
}

export type KakaoStatus = {
  connected: boolean;
  accessExpiresAt?: string;
  refreshExpiresAt?: string;
  error?: string;
};

// [카카오] 서버에 저장된 토큰이 유효한지 확인한다. 만료됐으면 서버가 갱신까지 시도한 결과를 준다.
export async function fetchKakaoStatus(): Promise<KakaoStatus> {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/kakao/status`,
  );
  return res.data;
}
