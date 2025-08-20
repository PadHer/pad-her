import About from "@/components/AboutSection/about";
import BlogSection from "@/components/BlogSection/BlogSection";
import Captures from "@/components/Captures/Captures";
import DataCount from "@/components/Data/Data";
import Events from "@/components/Events/Events";
import FAQs from "@/components/FAQs/FAQs";
import GetInvolved from "@/components/GetInvolved/GetInvolved";
import HeroSection from "@/components/HeroSection/Hero";
import Mission from "@/components/MissionSection/MissionSection";
import NavBar from "@/components/NavBar/NavBar";
import Stories from "@/components/Stories/Stories";

export default function Home() {
  return (
    <div className="w-full bg-[#FFF] flex flex-col items-center justify-center">
      <NavBar />
      <HeroSection />
      <DataCount />
      <About />
      <Mission />
      <GetInvolved />
      <Events />
      <BlogSection />
      <Captures />
      <Stories />
      <FAQs />
    </div>
  );
}
