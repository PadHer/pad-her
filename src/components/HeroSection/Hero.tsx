"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { HeroImages } from "@/data/Images";
import { ClickHere } from "../animations/click";

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
    <main className="w-full h-[90dvh] p-2">
      <div
        className="h-full w-full relative flex flex-column rounded-[24px] bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${HeroImages[currentIndex]})`,
        }}
      >
        <div className="absolute inset-0 bg-[#00000099] rounded-[24px]" />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
          }}
          className="absolute w-full h-full"
        >
          <h1
            className="text-[80px] text-white w-[60%] text-center"
            style={{ fontFamily: "Yeseva" }}
          >
            Empowering <span className="text-[#FF07A9]">Girls,</span> One Pad at
            a Time.
          </h1>
          <p
            className="text-[24px] text-[#FFF5F9] w-[42%] text-center"
            style={{
              fontFamily: "OpenSans",
            }}
          >
            Join us as we create a world where no girl is held back because of
            her period.
          </p>
          <div className="w-full flex justify-center items-center gap-4 relative">
            <button
              className="bg-white border-[2px] border-[#FFE8F7] text-[#FF07A9] px-4 py-2 rounded-[24px] cursor-pointer hover:bg-[#FFE8F7] transition-colors duration-300 ease-in-out hover:text-[#B90D7D] hover:border-[#B90D7D]"
              style={{
                fontFamily: "OpenSans-Semi",
              }}
            >
              Get Involved
            </button>
            <button
              className="bg-gradient-to-b from-[#FF07A9] to-[#B90D7D] text-white px-4 py-2 rounded-[24px] cursor-pointer hover:opacity-90 transition-opacity duration-300 ease-in-out"
              style={{
                fontFamily: "OpenSans-Semi",
              }}
            >
              Donate Now
            </button>
            <ClickHere />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;
