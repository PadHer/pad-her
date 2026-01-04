"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const GetInvolved = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, {
    amount: 0.8,
    once: false,
  });

  return (
    <div
      className="w-full flex flex-col gap-8 px-4 py-8 md:px-16 md:py-12 relative z-20 overflow-hidden bg-[#FFFFFFF0]"
      ref={sectionRef}
    >
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: isInView ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          backgroundImage: `url('images/bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-[#FEF5F9CC]" />
      </motion.div>
      <motion.div
        className="absolute inset-0 z-0 bg-[#FFFFFFF0]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <div className="w-full flex flex-col z-30">
        <h4
          className="text-[#ED006C] text-[14px]"
          style={{ fontFamily: "OpenSans-Semi" }}
        >
          Become a Volunteer
        </h4>
        <h1
          className="uppercase flex flex-col text-[32px] md:text-[56px]"
          style={{
            fontFamily: "Yeseva",
          }}
        >
          <span className="text-[#111] m-0 p-0">get Involved</span>
          <span className="text-[#11111199] -mt-4 p-0">with us today</span>
        </h1>
        <p
          className="text-[16px] text-[#393939] w-full md:w-1/3"
          style={{ fontFamily: "OpenSans" }}
        >
          Be part of the change. Our volunteers are the heart of our mission,
          helping us reach more girls and communities.
        </p>
      </div>
      <div className="w-full z-30 flex flex-col md:flex-row md:justify-between gap-8">
        <section className="w-full md:w-[32%] card">
          <div className="w-full px-4 pt-12 flex flex-col gap-4">
            <h2
              className="text-[40px]"
              style={{
                fontFamily: "Yeseva",
              }}
            >
              Community Outreach
            </h2>
            <h6
              className="text-[16px] h-[80px]"
              style={{ fontFamily: "OpenSans" }}
            >
              Join our field teams to distribute pads and conduct educational
              workshops in underserved communities.
            </h6>
          </div>

          <div className="w-full h-[260px] rounded-[16px] rounded-br-[8px] flex flex-col justify-end px-6 pb-6 relative">
            <Image
              src={"/images/Image-6.png"}
              alt="Community Outreach"
              fill
              className="object-cover object-top rounded-[16px] rounded-br-[8px]"
            />
            <div className="w-1/2 md:w-[37%] backdrop-blur-[5px] apply">
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
        <section className="w-full md:w-[32%] card">
          <div className="w-full px-4 pt-12 flex flex-col gap-4">
            <h2
              className="text-[#111111] text-[40px]"
              style={{
                fontFamily: "Yeseva",
              }}
            >
              Education & Training
            </h2>
            <h6
              className="text-[16px] h-[80px]"
              style={{ fontFamily: "OpenSans" }}
            >
              Lead workshops on menstrual hygiene and reproductive health in
              schools and community centers.
            </h6>
          </div>
          <div className="w-full h-[260px] rounded-[16px] rounded-br-[8px] flex flex-col justify-end px-6 pb-6 relative">
            <Image
              src={"/images/Image-2.png"}
              alt="Education & Training"
              fill
              className="object-cover rounded-[16px] rounded-br-[8px]"
            />
            <div className="w-1/2 md:w-[37%] backdrop-blur-[5px] apply">
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
        <section className="card w-full md:w-[32%]">
          <div className="w-full px-4 pt-12 flex flex-col gap-4">
            <h2
              className="text-[40px]"
              style={{
                fontFamily: "Yeseva",
              }}
            >
              Digital <br /> Advocacy
            </h2>
            <h6
              className="text-[16px] h-[80px]"
              style={{ fontFamily: "OpenSans" }}
            >
              Help us spread awareness through social media, content creation,
              and digital campaigns.
            </h6>
          </div>
          <div className="w-full h-[260px] rounded-[16px] rounded-br-[8px] flex flex-col justify-end px-6 pb-6 relative">
            <Image
              src={"/images/Image-3.png"}
              alt="Digital Advocacy"
              fill
              className="object-cover rounded-[16px] rounded-br-[8px]"
            />
            <div className="apply w-1/2 md:w-[37%] backdrop-blur-[5px]">
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
          className="button-secondary"
          style={{ fontFamily: "OpenSans-Bold" }}
        >
          View All Opportunities
        </button>
      </div>
    </div>
  );
};

export default GetInvolved;
