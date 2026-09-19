import AosInit from "@/src/Component/Landing/AosInit";
import LandingNav from "@/src/Component/Landing/LandingNav";
import HeroSection from "@/src/Component/Landing/HeroSection";
import FeaturesSection from "@/src/Component/Landing/FeaturesSection";
import CalendarSection from "@/src/Component/Landing/CalendarSection";
import KakaoConnectSection from "@/src/Component/Landing/KakaoConnectSection";
import HowToSection from "@/src/Component/Landing/HowToSection";
import FaqSection from "@/src/Component/Landing/FaqSection";
import LandingFooter from "@/src/Component/Landing/LandingFooter";

// [페이지] 홈 (/). 스크롤하며 기능을 소개하는 랜딩. 중간의 카카오 섹션이 연동을 유도한다.
export default function Home() {
  return (
    <div className="bg-cream-50 text-ink-900">
      <AosInit />
      <LandingNav />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CalendarSection />
        <KakaoConnectSection />
        <HowToSection />
        <FaqSection />
      </main>
      <LandingFooter />
    </div>
  );
}
