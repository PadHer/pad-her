import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import React from "react";
import Captures from "@/components/Captures/Captures";
import Events from "@/components/Events/Events";
import FAQs from "@/components/FAQs/FAQs";
import Stories from "@/components/Stories/Stories";
import PartnerShip from "@/components/PartnerShip/PartnerShip";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Heart, Clock4, MapPin } from "lucide-react";

const Page = () => {
  return (
    <div className="w-full bg-[#FFF] flex flex-col items-center justify-center overflow-hidden relative">
      <NavBar />
      <div className="h-[50dvh] w-full relative mt-[20dvh]">
        <Image
          src={"/images/volunteer.png"}
          alt={""}
          fill
          className="object-cover object-[50%_25%]"
        />
        <div className="absolute w-full h-full bg-[#ED006CCC] flex flex-col items-center justify-center z-50">
          <h1
            className="text-[64px]"
            style={{
              fontFamily: "Yeseva",
            }}
          >
            Volunteer
          </h1>
          <p className="font-open font-semibold text-[16px]">
            Get Involved with us today!
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-8 px-4 py-8 md:px-16 md:py-12 bg-[#FFFFFF] relative">
        <div className="w-full z-30 flex flex-col md:flex-row md:justify-between gap-8">
          <section className="rounded-[8px_60px_8px_60px] w-full md:w-[32%] flex flex-col gap-4 bg-[#FF07A9] overflow-hidden">
            <div className="w-full px-4 pt-12 flex flex-col gap-4">
              <h2
                className="text-[#FFF5F9] text-[40px]"
                style={{
                  fontFamily: "Yeseva",
                }}
              >
                Community Outreach
              </h2>
              <p
                className="text-[#FFF5F9] text-[16px] h-[80px]"
                style={{ fontFamily: "OpenSans" }}
              >
                Join our field teams to distribute pads and conduct educational
                workshops in underserved communities.
              </p>
            </div>

            <div className="w-full h-[260px] rounded-[16px] rounded-br-[8px] flex flex-col justify-end px-6 pb-6 relative">
              <Image
                src={"/images/Image-6.png"}
                alt="Community Outreach"
                fill
                className="object-cover object-top rounded-[16px] rounded-br-[8px]"
              />
              <div className="flex items-center gap-2 rounded-[40px] p-2 bg-[#ED006C40] w-1/2 md:w-[37%] backdrop-blur-[5px] cursor-pointer">
                <p
                  className="text-[#FFFFFF] text-[16px]"
                  style={{ fontFamily: "OpenSans-Semi" }}
                >
                  Apply Now
                </p>
                <span className="h-[24px] w-[24px] bg-[#FFFFFF] rounded-full p-1 flex flex-row items-center justify-center">
                  <ArrowRight className="text-[#000] text-[16px]" />
                </span>
              </div>
            </div>
          </section>
          <section className="rounded-[8px_60px_8px_60px] flex flex-col gap-4 w-full md:w-[32%] bg-[#FFF9FB] overflow-hidden">
            <div className="w-full px-4 pt-12 flex flex-col gap-4">
              <h2
                className="text-[#111111] text-[40px]"
                style={{
                  fontFamily: "Yeseva",
                }}
              >
                Education & Training
              </h2>
              <p
                className="text-[#393939] text-[16px] h-[80px]"
                style={{ fontFamily: "OpenSans" }}
              >
                Lead workshops on menstrual hygiene and reproductive health in
                schools and community centers.
              </p>
            </div>
            <div className="w-full h-[260px] rounded-[16px] rounded-br-[8px] flex flex-col justify-end px-6 pb-6 relative">
              <Image
                src={"/images/Image-2.png"}
                alt="Education & Training"
                fill
                className="object-cover rounded-[16px] rounded-br-[8px]"
              />
              <div className="flex items-center gap-2 rounded-[40px] p-2 bg-[#ED006C40] w-1/2 md:w-[37%] backdrop-blur-[5px] cursor-pointer">
                <p
                  className="text-[#FFFFFF] text-[16px]"
                  style={{ fontFamily: "OpenSans-Semi" }}
                >
                  Apply Now
                </p>
                <span className="h-[24px] w-[24px] bg-[#FFFFFF] rounded-full p-1 flex flex-row items-center justify-center">
                  <ArrowRight className="text-[#000] text-[16px]" />
                </span>
              </div>
            </div>
          </section>
          <section className="rounded-[8px_60px_8px_60px] flex flex-col gap-4 w-full md:w-[32%] bg-[#FFF9FB] overflow-hidden">
            <div className="w-full px-4 pt-12 flex flex-col gap-4">
              <h2
                className="text-[#111111] text-[40px]"
                style={{
                  fontFamily: "Yeseva",
                }}
              >
                Digital <br /> Advocacy
              </h2>
              <p
                className="text-[#393939] text-[16px] h-[80px]"
                style={{ fontFamily: "OpenSans" }}
              >
                Help us spread awareness through social media, content creation,
                and digital campaigns.
              </p>
            </div>
            <div className="w-full h-[260px] rounded-[16px] rounded-br-[8px] flex flex-col justify-end px-6 pb-6 relative">
              <Image
                src={"/images/Image-3.png"}
                alt="Digital Advocacy"
                fill
                className="object-cover rounded-[16px] rounded-br-[8px]"
              />
              <div className="flex items-center gap-2 rounded-[40px] p-2 bg-[#ED006C40] w-1/2 md:w-[37%] backdrop-blur-[5px] cursor-pointer">
                <p
                  className="text-[#FFFFFF] text-[16px]"
                  style={{ fontFamily: "OpenSans-Semi" }}
                >
                  Apply Now
                </p>
                <span className="h-[24px] w-[24px] bg-[#FFFFFF] rounded-full p-1 flex flex-row items-center justify-center">
                  <ArrowRight className="text-[#000] text-[16px]" />
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="w-full flex flex-col items-center bg-[#FFFAFC] px-24 py-12 gap-2">
        <h2 className="font-playfair text-[56px] font-extrabold text-[#111111]">
          Why <b className="text-[#FF07A9]">Volunteer</b> with Us?
        </h2>
        <p className="font-open text-[16px] text-center text-[#393939CC] w-full md:w-1/3">
          Join a community of passionate individuals making a real difference in
          girls&apos; lives.
        </p>
        <div className="w-full flex justify-between items-center py-24">
          <div className="w-[23.5%] flex flex-col items-center gap-4 rounded-[8px_60px_8px_60px] p-8 bg-[#FFFFFF] rotate-4 border-1 border-[#E7E7E7]">
            <span className="bg-[#ED006C33] flex items-center justify-center h-20 w-20 rounded-full">
              <Heart size={30} color="#ED006C" />
            </span>
            <h4
              className="text-[24px] text-[#393939]"
              style={{
                fontFamily: "Yeseva",
              }}
            >
              Make Impact
            </h4>
            <p className="text-center font-open text-[#393939CC] text-[16px]">
              Directly impact young girls&apos; lives and help break the cycle of
              period poverty.
            </p>
          </div>
          <div className="w-[23.5%] flex flex-col items-center gap-4 rounded-[8px_60px_8px_60px] p-8 bg-[#FFFFFF] -rotate-4 border-1 border-[#E7E7E7]">
            <span className="bg-[#9747FF33] flex items-center justify-center h-20 w-20 rounded-full">
              <Image
                src={"/svgs/group.svg"}
                alt="Group Icon"
                width={30}
                height={30}
              />
            </span>
            <h4
              className="text-[24px] text-[#393939]"
              style={{
                fontFamily: "Yeseva",
              }}
            >
              Build Community
            </h4>
            <p className="text-center font-open text-[#393939CC] text-[16px]">
              Connect with like-minded individuals passionate about social
              change.
            </p>
          </div>
          <div className="w-[23.5%] flex flex-col items-center gap-4 rounded-[8px_60px_8px_60px] p-8 bg-[#FFFFFF] rotate-4 border-1 border-[#E7E7E7]">
            <span className="bg-[#C80C8640] flex items-center justify-center h-20 w-20 rounded-full">
              <Clock4 size={30} color="#C80C86" />
            </span>
            <h4
              className="text-[24px] text-[#393939]"
              style={{
                fontFamily: "Yeseva",
              }}
            >
              Flexible Schedule
            </h4>
            <p className="text-center font-open text-[#393939CC] text-[16px]">
              Choose volunteer opportunities that fit your schedule and
              availability.
            </p>
          </div>
          <div className="w-[23.5%] flex flex-col items-center gap-4 rounded-[8px_60px_8px_60px] p-8 bg-[#FFFFFF] -rotate-4 border-1 border-[#E7E7E7]">
            <span className="bg-[#219AA633] flex items-center justify-center h-20 w-20 rounded-full">
              <MapPin size={30} color="#219AA6" />
            </span>
            <h4
              className="text-[24px] text-[#393939]"
              style={{
                fontFamily: "Yeseva",
              }}
            >
              Local & Remote
            </h4>
            <p className="text-center font-open text-[#393939CC] text-[16px]">
              Volunteer both in-person and remotely, depending on your
              preference.
            </p>
          </div>
        </div>
      </div>
      <Events />
      <Captures />
      <Stories />
      <FAQs />
      <PartnerShip />
      <Footer />
    </div>
  );
};

export default Page;
