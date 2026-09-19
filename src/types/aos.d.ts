// AOS 를 CDN <script> 로 불러오면 window.AOS 가 생긴다. npm 패키지가 아니라 TS 가 모르므로 직접 선언한다.
declare global {
  interface Window {
    AOS: {
      init: (options?: {
        duration?: number;
        easing?: string;
        once?: boolean;
        offset?: number;
      }) => void;
      refresh: () => void;
    };
  }
}

export {};
