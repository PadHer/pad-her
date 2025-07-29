import About from "@/components/AboutSection/about";
import DataCount from "@/components/Data";
import HeroSection from "@/components/HeroSection/Hero";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="w-full bg-[#FFFAFD] flex flex-col items-center justify-center gap-8">
      <NavBar />
      <HeroSection />
      <DataCount />
      <About />
    </div>
  );
}
