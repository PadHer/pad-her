"use client";

import React, { useState, useEffect } from "react";
import { HeroImages } from "@/data/Images";
import { ClickHere } from "../animations/click";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === HeroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full h-[60dvh] md:h-[90dvh] p-2 px-4 bg-[#FFFAFD]">
      <div className="mt-[10dvh] lg:mt-0 h-full w-full relative flex flex-column rounded-[24px] transition-all duration-1000 ease-in-out overflow-hidden">
        {HeroImages.map((img, index) => (
          <Image
            key={img}
            src={img}
            alt="PadHer hero image"
            fill
            priority={index === 0}
            placeholder="blur"
            blurDataURL="/images/blur-placeholder.jpg"
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-[#00000099] rounded-[24px]" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
          }}
          className="absolute w-full h-full px-4 md:px-0"
        >
          <h1
            className="text-[32px] md:text-[80px] text-white md:w-[60%] text-center"
            style={{ fontFamily: "Yeseva" }}
          >
            Empowering <span className="text-[#FF07A9]">Girls,</span> One Pad at
            a Time.
          </h1>
          <p
            className="text-[16px] md:text-[24px] text-[#FFF5F9] md:w-[42%] text-center"
            style={{
              fontFamily: "OpenSans",
            }}
          >
            Join us as we create a world where no girl is held back because of
            her period.
          </p>
          <div className="w-full flex justify-center items-center gap-4 relative">
            <Link
              href="/volunteer"
              className="bg-white border-[2px] border-[#FFE8F7] text-[#FF07A9] px-4 py-2 rounded-[24px] cursor-pointer hover:bg-[#FFE8F7] transition-colors duration-300 ease-in-out hover:text-[#B90D7D] hover:border-[#B90D7D]"
              style={{
                fontFamily: "OpenSans-Semi",
              }}
            >
              Get Involved
            </Link>
            <Link
              href={"/donate"}
              className="bg-gradient-to-b from-[#FF07A9] to-[#B90D7D] text-white px-4 py-2 rounded-[24px] cursor-pointer hover:opacity-90 transition-opacity duration-300 ease-in-out"
              style={{
                fontFamily: "OpenSans-Semi",
              }}
            >
              Donate Now
            </Link>
            <ClickHere />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
