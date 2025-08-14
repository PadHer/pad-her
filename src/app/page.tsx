import About from "@/components/AboutSection/about";
import BlogSection from "@/components/BlogSection/BlogSection";
import DataCount from "@/components/Data/Data";
import Events from "@/components/Events/Events";
import GetInvolved from "@/components/GetInvolved/GetInvolved";
import HeroSection from "@/components/HeroSection/Hero";
import Mission from "@/components/MissionSection/MissionSection";
import NavBar from "@/components/NavBar/NavBar";

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
    </div>
  );
}
