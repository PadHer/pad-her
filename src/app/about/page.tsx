"use client";

import React from "react";
import DataCount from "@/components/Data/Data";
import FAQs from "@/components/FAQs/FAQs";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import PartnerShip from "@/components/PartnerShip/PartnerShip";
import Image from "next/image";
import Link from "next/link";
import { aboutData } from "@/data/about";
import Stories from "@/components/Stories/Stories";
import Captures from "@/components/Captures/Captures";
import Head from "next/head";

<Head>
  <link
    rel="preload"
    as="image"
    href="/images/about.png"
  />
</Head>

const Page = () => {
  return (
    <div className="w-full bg-[#FFF] flex flex-col items-center justify-center overflow-hidden relative">
      <NavBar />
      <div className="w-full md:h-screen flex flex-col items-center justify-center">
        <div className="w-full h-auto md:h-[80%] mt-[10dvh] md:mt-[10dvh] flex flex-col md:flex-row md:justify-between px-4 py-2 md:px-24 md:py-16">
          <h1
            className="font-playfair font-extrabold text-[75px] md:text-[150px] text-[#111111] inset-0 leading-[75px] md:leading-[150px]"
            style={{
              fontFamily: "Yeseva",
            }}
          >
            ABOUT <br /> US
          </h1>
          <div className="w-full h-[50dvh] md:h-auto md:w-1/2 rounded-[8px_60px_8px_60px] overflow-hidden relative">
            <Image
              src={"/images/about.png"}
              alt="About Us Image"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
        <DataCount />
      </div>
      <div className="w-full md:h-screen px-4 py-6 md:px-24 md:py-16 flex flex-col items-center md:items-start md:justify-between">
        <div className="w-full h-auto md:h-[45%] flex flex-col md:flex-row md:justify-between items-start">
          <div className="hidden md:flex md:w-1/2 md:h-full rounded-[8px_60px_8px_60px] overflow-hidden relative">
            <Image
              src={"/images/join.jpg"}
              alt="About Image"
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full md:w-[49%] flex flex-col justify-center">
            <h2
              className="text-[48px] text-[#111111]"
              style={{
                fontFamily: "Yeseva",
              }}
            >
              Our Mission
            </h2>
            <Image
              src={"/svgs/Vector-1.svg"}
              alt="Vector"
              width={300}
              height={18}
              className="transform scale-x-[-1] -mt-4"
            />
            <div className="md:hidden w-full h-[40dvh] mt-8 rounded-[8px_60px_8px_60px] overflow-hidden relative">
              <Image
                src={"/images/join.jpg"}
                alt="About Image"
                fill
                className="object-cover"
              />
            </div>
            <p
              className="text-[#393939] text-[16px] md:text-[24px] text-start w-full md:w-full leading-[36px] mt-4 md:m-0"
              style={{
                fontFamily: "OpenSans",
              }}
            >
              To eliminate period poverty by ensuring every girl has access to
              quality menstrual hygiene products and comprehensive education
              about reproductive health. We strive to create a world where
              menstruation is never a barrier to education, opportunity, or
              dignity.
            </p>
          </div>
        </div>
        <div className="w-full h-auto md:h-[45%] flex flex-col md:flex-row md:justify-between items-start">
          <div className="w-full md:w-[49%] flex flex-col justify-center">
            <h2
              className="text-[48px] text-[#111111]"
              style={{
                fontFamily: "Yeseva",
              }}
            >
              Our Vision
            </h2>
            <Image
              src={"/svgs/Vector-1.svg"}
              alt="Vector"
              width={300}
              height={18}
              className="-mt-4"
            />
            <div className="md:hidden w-full h-[40dvh] mt-8 rounded-[8px_60px_8px_60px] overflow-hidden relative">
              <Image
                src={"/images/together.png"}
                alt="About Image"
                fill
                className="object-cover"
              />
            </div>
            <p
              className="text-[#393939] text-[16px] md:text-[24px] text-start w-full md:w-full leading-[36px] mt-4 md:m-0"
              style={{
                fontFamily: "OpenSans",
              }}
            >
              To eliminate period poverty by ensuring every girl has access to
              quality menstrual hygiene products and comprehensive education
              about reproductive health. We strive to create a world where
              menstruation is never a barrier to education, opportunity, or
              dignity.
            </p>

            <Link
              className="button hidden md:flex font-open mt-4 w-fit"
              href={"/donate"}
            >
              Support Our Mission
            </Link>
          </div>
          <div className="hidden md:flex w-1/2 h-full rounded-[8px_60px_8px_60px] overflow-hidden relative">
            <Image
              src={"/images/together.png"}
              alt="About Image"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <Link
          className="button md:hidden font-open mt-4 w-fit"
          href={"/donate"}
        >
          Support Our Mission
        </Link>
      </div>
      <div className="w-full py-6 px-4 md:py-18 md:px-24 flex flex-col items-center gap-4 bg-[#FEF5F9F5]">
        <h2 className="text-[36px] md:text-[56px] font-extrabold font-playfair text-[#111111]">
          Our <b className="text-[#111111AD]">Approach</b>
        </h2>
        <p className="font-open font-normal text-[#393939] w-full md:w-1/2 text-center">
          We tackle period poverty through a comprehensive, multi-faceted
          approach that addresses both immediate needs and long-term systemic
          change.
        </p>
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 justify-between mt-10">
          {aboutData.map((item, index) => (
            <div
              key={index}
              className="w-full flex flex-col items-center gap-8 border-1 border-[#E7E7E7] py-10 px-8 shadow-[0px_4px_40px_0px_#0000000F] rounded-[16px] bg-[#FFFFFF]"
            >
              <span className="relative w-20 h-20 overflow-hidden rounded-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transform scale-x-[-1]"
                />
              </span>
              <h4
                style={{ fontFamily: "Yeseva" }}
                className="text-[#393939] text-[24px] text-center"
              >
                {item.title}
              </h4>
              <p className="text-[#393939CC] font-open text-[16px] text-center">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row items-start justify-between px-4 md:px-24 py-6 md:py-12">
        <div className="w-full md:w-[57%] flex flex-col">
          <h2
            className="text-[48px] text-[#111111]"
            style={{
              fontFamily: "Yeseva",
            }}
          >
            Our Story
          </h2>
          <Image
            src={"/svgs/Vector-1.svg"}
            alt="Vector"
            width={250}
            height={18}
            className="mt-[-1rem] transform scale-x-[-1]"
          />
          <div className="md:hidden w-full h-[55dvh] relative mt-8">
            <div className="w-full rounded-[40px] overflow-hidden h-full absolute right-0 top-0 border-1 border-[#E7E7E7] shadow-[0px_4px_40px_0px_#0000000F]">
              <Image
                src={"/images/Image-4.png"}
                alt="Our Story Image"
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="absolute w-3/5 h-4/6 bg-[#FFF] rounded-[40px] top-55 left-17.5 flex flex-col items-center justify-center">
              <div className="w-[95%] h-[95%] rounded-[40px] overflow-hidden relative">
                <Image
                  src={"/images/shams.png"}
                  alt="PadHer with Love Founder"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <p className="md:mt-6 text-[#393939CC] font-open font-normal mt-26">
            PadHer with Love was founded in 2019 when our founder witnessed
            firsthand how period poverty was preventing girls in her community
            from attending school. What started as a small initiative to provide
            sanitary pads to a local school has grown into a comprehensive
            program reaching thousands of girls across multiple regions.
            <br />
            <br />
            Today, we work with schools, communities, and partner organizations
            to ensure that no girl misses school because of her period. Through
            our programs, we&apos;ve not only provided essential products but
            also created safe spaces for girls to learn about their bodies and
            reproductive health.
          </p>
          <div className="mt-6 flex gap-3 items-center">
            <Link className="button font-bold font-open" href={"/volunteer"}>
              Join Our Team
            </Link>
            <Link
              className="button-secondary hover:bg-[#FFE8F7] transition-colors duration-300 ease-in-out hover:text-[#B90D7D] hover:border-[#B90D7D] font-open"
              href={"/blog"}
            >
              Read Our Blog
            </Link>
          </div>
        </div>
        <div className="hidden md:flex w-[42%] h-[55dvh] relative">
          <div className="w-3/4 rounded-[8px_60px_8px_60px] overflow-hidden h-full absolute right-0 top-0 border-1 border-[#E7E7E7] shadow-[0px_4px_40px_0px_#0000000F]">
            <Image
              src={"/images/Image-4.png"}
              alt="Our Story Image"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="absolute w-3/5 h-4/6 bg-[#FFF] rounded-[8px_60px_8px_60px] top-18 left-0 flex flex-col items-center justify-center">
            <div className="w-[95%] h-[95%] rounded-[8px_60px_8px_60px] overflow-hidden relative">
              <Image
                src={"/images/shams.png"}
                alt="PadHer with Love Founder"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <Captures />
      <Stories />
      <FAQs />
      <div id="partnership" className="scroll-mt-24">
        <PartnerShip />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
