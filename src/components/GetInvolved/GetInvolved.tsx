"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const GetInvolved = () => {
  return (
    <div
      className="w-full flex flex-col gap-8 px-16 py-12 bg-cover bg-center bg-no-repeat flex flex-col relative"
      style={{
        background: "url('images/bg.png')",
      }}
    >
      <div className="absolute inset-0 bg-white opacity-[70%]"></div>
      <div className="w-full flex flex-col z-30">
        <h4
          className="text-[#ED006C] text-[14px]"
          style={{ fontFamily: "OpenSans-Semi" }}
        >
          Become a Volunteer
        </h4>
        <h1
          className="uppercase flex flex-col text-[56px]"
          style={{
            fontFamily: "Yeseva",
          }}
        >
          <span className="text-[#111] m-0 p-0">get Involved</span>
          <span className="text-[#11111199] -mt-4 p-0">with us today</span>
        </h1>
        <p
          className="text-[16px] text-[#393939] w-1/3"
          style={{ fontFamily: "OpenSans" }}
        >
          Be part of the change. Our volunteers are the heart of our mission,
          helping us reach more girls and communities.
        </p>
      </div>
      <div className="w-full z-30 flex flex-row justify-between z-30">
        <section className="rounded-[8px_60px_8px_60px] w-[32%] flex flex-col gap-4 bg-[#FF07A9] overflow-hidden">
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
            <div className="flex items-center gap-2 rounded-[40px] p-2 bg-[#ED006C40] w-[37%] backdrop-blur-[5px] cursor-pointer">
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
        <section 
        className="rounded-[8px_60px_8px_60px] flex flex-col gap-4 w-[32%] bg-[#FFF9FB] overflow-hidden">
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
            <div className="flex items-center gap-2 rounded-[40px] p-2 bg-[#ED006C40] w-[37%] backdrop-blur-[5px] cursor-pointer">
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
        <section className="rounded-[8px_60px_8px_60px] flex flex-col gap-4 w-[32%] bg-[#FFF9FB] overflow-hidden">
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
            <div className="flex items-center gap-2 rounded-[40px] p-2 bg-[#ED006C40] w-[37%] backdrop-blur-[5px] cursor-pointer">
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
      <div className="w-full flex justify-center z-30">
        <button
          className="px-[24px] py-[8px] border-[#FF07A9] border-[2px] rounded-[24px] text-[#B90D7D] text-4"
          style={{ fontFamily: "OpenSans-Bold" }}
        >
          View All Opportunities
        </button>
      </div>
    </div>
  );
};

export default GetInvolved;
