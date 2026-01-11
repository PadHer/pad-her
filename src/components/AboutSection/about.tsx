"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

type AsideMotionProps = {
  enterTop: string;
  enterLeft: string;
  exitTop: string;
  exitLeft: string;
  delay?: number;
};
const easeOutCubic: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

const About = () => {
  const asideVariant: Variants = {
    hidden: (custom: AsideMotionProps) => ({
      opacity: 1,
      top: custom.exitTop,
      left: custom.exitLeft,
    }),
    visible: (custom: AsideMotionProps) => ({
      opacity: 1,
      top: custom.enterTop,
      left: custom.enterLeft,
      transition: {
        duration: 0.5,
        ease: easeOutCubic,
        delay: custom.delay ?? 0,
      },
    }),
  };

  return (
    <div className="w-full bg-[#FFFFFF] flex justify-center items-center px-4 py-4 md:px-[100px] md:py-[80px] sticky top-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 1, once: false }}
        className="w-full bg-[#FFFAFC] flex flex-col md:flex-row rounded-[40px] p-4 md:p-8 overflow-hidden"
      >
        <section className="w-full md:w-1/2 flex flex-col gap-4">
          <h3
            className="text-[32px] md:text-[48px] p-0 m-0 text-[#111111]"
            style={{ fontFamily: "Yeseva" }}
          >
            About <br /> Pad<span className="text-pink-600">Her</span>
          </h3>
          <p className="text-[#393939] text-[16px] md:text-[24px] w-full md:w-[90%]">
            PadHer With Love is a nonprofit initiative committed to ending
            period poverty by equipping young girls with free sanitary pads,
            menstrual health education, and compassionate support. We believe
            every girl deserves dignity, confidence, and equal opportunity—no
            matter her background.
          </p>
        </section>
        <section className="w-full hidden lg:flex h-[55dvh] md:h-auto md:w-1/2 relative">
          <motion.aside
            custom={{
              enterTop: "80%",
              enterLeft: "20%",
              exitTop: "70%",
              exitLeft: "25%",
            }}
            variants={asideVariant}
            className="bg-[#6DC6C9] md:w-1/2 rounded-[40px] py-[12px] px-[24px] flex flex-row items-center gap-6 absolute top-[40%] left-[30%]  md:top-[80%] md:left-[20%] -rotate-25 md:-rotate-15 whitespace-nowrap"
          >
            <span className="bg-[#FDFDFD40] h-[40px] w-[40px] flex justify-center items-center rounded-full">
              <Image
                src={"/svgs/Vector.svg"}
                alt="svg"
                width={24}
                height={24}
                priority
              />
            </span>
            <p
              className="text-white text-[16px] md:text-[24px]"
              style={{ fontFamily: "OpenSans-Semi" }}
            >
              Volunteer-Led
            </p>
          </motion.aside>
          <motion.aside
            custom={{
              enterTop: "25%",
              enterLeft: "43%",
              exitTop: "35%",
              exitLeft: "53%",
            }}
            variants={asideVariant}
            className="bg-[#8C89EE] md:w-[65%] rounded-[40px] py-[12px] px-[24px] flex flex-row items-center gap-6 absolute -rotate-25 md:-rotate-15 top-[5%] left-[10%] md:top-[25%] md:left-[43%] whitespace-nowrap"
          >
            <span className="bg-[#FDFDFD40] h-[40px] w-[40px] flex justify-center items-center rounded-full">
              <Image
                src={"/svgs/donate.svg"}
                alt="donate-svg"
                width={24}
                height={24}
                priority
              />
            </span>
            <p
              className="text-white text-[16px] md:text-[24px]"
              style={{ fontFamily: "OpenSans-Semi" }}
            >
              Transparent Donations
            </p>
          </motion.aside>
          <motion.aside
            custom={{
              enterTop: "60%",
              enterLeft: "55%",
              exitTop: "50%",
              exitLeft: "45%",
            }}
            variants={asideVariant}
            className="bg-[#FF67E3] md:w-[55%] rounded-[40px] py-[12px] px-[24px] flex flex-row items-center gap-6 absolute top-[25%] left-[-15%] md:top-[60%] md:left-[55%] rotate-20 md:rotate-15 whitespace-nowrap"
          >
            <span className="bg-[#FDFDFD40] h-[40px] w-[40px] flex justify-center items-center rounded-full">
              <Image
                src={"/svgs/check.svg"}
                alt="check-svg"
                width={24}
                height={24}
                priority
              />
            </span>
            <p
              className="text-white text-[16px] md:text-[24px]"
              style={{ fontFamily: "OpenSans-Semi" }}
            >
              Grassroot Impact
            </p>
          </motion.aside>
          <motion.aside
            custom={{
              enterTop: "50%",
              enterLeft: "-5%",
              exitTop: "55%",
              exitLeft: "10%",
            }}
            variants={asideVariant}
            className="bg-[#B451BC] md:w-[1/2] rounded-[40px] py-[12px] px-[24px] flex flex-row items-center gap-6 absolute rotate-15 top-[55%] md:top-[50%] left-[-5%]"
          >
            <span className="bg-[#FDFDFD40] h-[40px] w-[40px] flex justify-center items-center rounded-full">
              <Image
                src={"/svgs/location.svg"}
                alt="location-svg"
                width={24}
                height={24}
                priority
              />
            </span>
            <p
              className="text-white text-[16px] md:text-[24px]"
              style={{ fontFamily: "OpenSans-Semi" }}
            >
              4,000+ girls reached
            </p>
          </motion.aside>
        </section>
        <section className="w-full flex md:hidden h-[40dvh] relative">
          <aside className="bg-[#6DC6C9] rounded-[40px] py-[12px] px-[24px] flex flex-row items-center gap-2 absolute top-[45%] right-0 rotate-25 whitespace-nowrap">
            <span className="bg-[#FDFDFD40] h-[40px] w-[40px] flex justify-center items-center rounded-full">
              <Image
                src={"/svgs/Vector.svg"}
                alt="svg"
                width={24}
                height={24}
                priority
              />
            </span>
            <p
              className="text-white text-[16px]"
              style={{ fontFamily: "OpenSans-Semi" }}
            >
              Volunteer-Led
            </p>
          </aside>
          <aside className="bg-[#8C89EE] rounded-[40px] py-[12px] px-[24px] flex flex-row items-center gap-3 absolute -rotate-25 top-[10%] -right-10 whitespace-nowrap">
            <span className="bg-[#FDFDFD40] h-[40px] w-[40px] flex justify-center items-center rounded-full">
              <Image
                src={"/svgs/donate.svg"}
                alt="donate-svg"
                width={24}
                height={24}
                priority
              />
            </span>
            <p
              className="text-white text-[16px]"
              style={{ fontFamily: "OpenSans-Semi" }}
            >
              Transparent Donations
            </p>
          </aside>
          <aside className="bg-[#FF67E3] rounded-[40px] py-[12px] px-[24px] flex flex-row items-center gap-2 absolute top-[25%] left-0 rotate-20 whitespace-nowrap">
            <span className="bg-[#FDFDFD40] h-[40px] w-[40px] flex justify-center items-center rounded-full">
              <Image
                src={"/svgs/check.svg"}
                alt="check-svg"
                width={24}
                height={24}
                priority
              />
            </span>
            <p
              className="text-white text-[16px]"
              style={{ fontFamily: "OpenSans-Semi" }}
            >
              Grassroot Impact
            </p>
          </aside>
          <aside className="bg-[#B451BC] rounded-[40px] py-[12px] px-[24px] flex flex-row items-center gap-2 absolute -rotate-20 top-[55%] left-0">
            <span className="bg-[#FDFDFD40] h-[40px] w-[40px] flex justify-center items-center rounded-full">
              <Image
                src={"/svgs/location.svg"}
                alt="location-svg"
                width={24}
                height={24}
                priority
              />
            </span>
            <p
              className="text-white text-[16px]"
              style={{ fontFamily: "OpenSans-Semi" }}
            >
              4,000+ girls reached
            </p>
          </aside>
        </section>
      </motion.div>
    </div>
  );
};

export default About;
