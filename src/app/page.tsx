import About from "@/components/AboutSection/about";
import BlogSection from "@/components/BlogSection/BlogSection";
import Captures from "@/components/Captures/Captures";
import DataCount from "@/components/Data/Data";
import Events from "@/components/Events/Events";
import FAQs from "@/components/FAQs/FAQs";
import Footer from "@/components/Footer/Footer";
import GetInvolved from "@/components/GetInvolved/GetInvolved";
import HeroSection from "@/components/HeroSection/Hero";
import Mission from "@/components/MissionSection/MissionSection";
import NavBar from "@/components/NavBar/NavBar";
import PartnerShip from "@/components/PartnerShip/PartnerShip";
import Stories from "@/components/Stories/Stories";

export default function Home() {
  return (
    <>
      <div className="w-full bg-[#FFF] md:flex flex-col items-center justify-center relative hidden">
        <NavBar />
        <HeroSection />
        <DataCount />
        <div className="sticky top-10 w-full z-10 bg-white overflow-hidden">
          <About />
        </div>
        <Mission />
        <GetInvolved />
        <Events />
        <BlogSection />
        <Captures />
        <Stories />
        <FAQs />
        <div id="partnership" className="scroll-mt-20">
          <PartnerShip />
        </div>
        <Footer />
      </div>
      <div className="w-full bg-[#FFF] flex flex-col items-center justify-center relative md:hidden overflow-hidden">
        <NavBar />
        <HeroSection />
        <DataCount />
        <div className="sticky top-10 w-full z-10 bg-white overflow-hidden">
          <About />
        </div>
        <Mission />
        <GetInvolved />
        <Events />
        <BlogSection />
        <Captures />
        <Stories />
        <FAQs />
        <div id="partnership" className="scroll-mt-20">
          <PartnerShip />
        </div>
        <Footer />
      </div>
    </>
  );
}
