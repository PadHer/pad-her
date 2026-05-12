"use client";

import { CarouselImages } from "@/data/Images";
import { useRef, useEffect } from "react";
import Image from "next/image";

const Captures = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.9;
    const imageWidth = 320;
    const totalWidth = CarouselImages.length * imageWidth;

    const scroll = () => {
      scrollPosition += scrollSpeed;

     
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    
    animationId = requestAnimationFrame(scroll);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
  };

  const duplicatedImages = [
    ...CarouselImages,
    ...CarouselImages,
    ...CarouselImages,
  ];
  return (
    <div className="w-full bg-[#FFF] flex flex-col gap-6 items-center justify-center py-4 md:py-16 z-20">
      <div className="w-full flex flex-col items-center gap-2 px-4">
        <h2
          className="w-full text-[32px] md:text-[64px] md:text-center text-[#111111] relative"
          style={{ fontFamily: "Yeseva" }}
        >
          Captured with{" "}
          <span
            className="bg-[#FF07A9] rounded-[60px] text-[#FFF] px-[10px] py-0 top-0 absolute"
            style={{ transform: "rotate(7deg)" }}
          >
            Love
          </span>
        </h2>
        <p className="w-full md:w-[41%] text-center text-[#111111] text-[14px] md:text-[20px]" style={{ fontFamily: "OpenSans" }}>
          Every image tells a story of dignity, hope, and impact — stories of
          love in action and the ongoing fight to end period poverty.{" "}
        </p>
      </div>
      <div className="relative w-full max-w-8xl mx-auto overflow-hidden">
        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent  z-10"
            style={{
              boxShadow: "inset -10px 0 10px -5px rgba(255, 253, 253, 0)",
            }}
          ></div>
          <div
            className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent  z-10"
            style={{
              boxShadow: "inset 10px 0 10px -5px rgba(255, 255, 255, 0)",
            }}
          ></div>
          <div
            ref={scrollRef}
            className="overflow-hidden scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex space-x-4 py-8">
              {duplicatedImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="flex-shrink-0 w-72 h-[30dvh] md:h-[320px] relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer hover:z-20 hover:scale-120"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Image
                    src={image}
                    alt={"Pad her with love"}
                    fill
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Captures;
