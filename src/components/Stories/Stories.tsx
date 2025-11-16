"use client";

import React, { useState } from "react";
import Image from "next/image";
import { testimonials } from "@/data/stories";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Stories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
  const mobileCardsPerPage = 1;

  const totalPages = Math.ceil(testimonials.length / cardsPerPage);
  const mobileTotalPages = Math.ceil(testimonials.length / mobileCardsPerPage);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentTestimonials = testimonials.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  const mobileStartIndex = (currentPage -1) * mobileCardsPerPage;
  const mobileCurrentTestimonials = testimonials.slice(
    mobileStartIndex,
    mobileStartIndex + mobileCardsPerPage
  );

  const previous = () => {
    if(currentPage >1) setCurrentPage((prev) => prev -1 );
    };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const next = () => {
    if(currentPage < mobileTotalPages) setCurrentPage((prev) => prev + 1);
  }

  return (
    <div className="w-full flex flex-col items-center relative overflow-hidden py-4 md:py-[90px] px-4 md:px-8 gap-4 md:gap-16 bg-[#FFF]">
      <Image
        src={"/svgs/Vector-2.svg"}
        alt={""}
        width={500}
        height={400}
        className="absolute right-[-4%] top-0 transform scale-x-[-1]"
      />
      <div className="w-full flex flex-col items-center mt-4 md:mt-0">
        <div
          className="w-full flex flex-col md:items-center text-[24px] md:text-[48px] capitalize items-start"
          style={{ fontFamily: "Yeseva" }}
        >
          <h2 className="text-[#11111199] w-1/2 md:w-full">What Our Beneficiaries,</h2>
          <h2 className="text-[#000000] w-2/3 md:w-full">Volunteers and Partners Say</h2>
        </div>
        <p
          className="text-[#393939] text-center w-3/4 md:w-[100%] text-[16px]"
          style={{ fontFamily: "OpenSans" }}
        >
          Every pad given, every conversation held, and every outreach organized
          is changing a life. Here&apos;s what some of our girls, volunteers, and
          partners have to say about us.
        </p>
      </div>
      <div className="w-full hidden lg:flex flex-row items-center justify-between">
        <button onClick={handlePrev} className="w-[32px] h-[32px] cursor-pointer flex items-center rounded-[4px] border-1 border-[#FF07A9] justify-center hover:bg-[#FF07A9] text-[#FF07A9] hover:text-[#FFF] transition-all duration-300">
          <ChevronLeft />
        </button>
        <div className="w-[90%] flex flex-row justify-between gap-4">
          {currentTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-[33%] h-[321px] flex flex-col justify-between p-6 bg-white rounded-[10px] cursor-pointer hover:shadow-xl transition-shadow duration-300"
            >
              <p
                className="text-[#333333] h-1/2 text-[16px]"
                style={{ fontFamily: "OpenSans" }}
              >
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex flex-col items-start">
                <h3
                className="text-[#ED006C] text-[20px]"
                style={{ fontFamily: "OpenSans-Bold" }}
              >
                {testimonial.name}
              </h3>
              <span
                className="text-[#989797] text-[14px]"
                style={{ fontFamily: "OpenSans-Semi" }}
              >
                {testimonial.role}, {testimonial.location}
              </span>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleNext} className="w-[32px] h-[32px] cursor-pointer flex items-center rounded-[4px] border-1 border-[#FF07A9] justify-center hover:bg-[#FF07A9] text-[#FF07A9] hover:text-[#FFF] transition-all duration-300">
          <ChevronRight />
        </button>
      </div>
      <div className="w-full flex flex-row md:hidden items-center justify-between">
        <button onClick={previous} className="w-[32px] h-[32px] cursor-pointer flex items-center rounded-[4px] border-1 border-[#FF07A9] justify-center hover:bg-[#FF07A9] text-[#FF07A9] hover:text-[#FFF] transition-all duration-300">
          <ChevronLeft />
        </button>
        <div className="w-full md:w-[90%] flex flex-row justify-between gap-4">
          {mobileCurrentTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="w-full md:w-[33%] h-[321px] flex flex-col justify-between p-6 bg-white rounded-[10px] cursor-pointer hover:shadow-xl transition-shadow duration-300"
            >
              <p
                className="text-[#333333] h-1/2 text-[16px]"
                style={{ fontFamily: "OpenSans" }}
              >
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex flex-col items-start">
                <h3
                className="text-[#ED006C] text-[20px]"
                style={{ fontFamily: "OpenSans-Bold" }}
              >
                {testimonial.name}
              </h3>
              <span
                className="text-[#989797] text-[14px]"
                style={{ fontFamily: "OpenSans-Semi" }}
              >
                {testimonial.role}, {testimonial.location}
              </span>
              </div>
            </div>
          ))}
        </div>
        <button onClick={next} className="w-[32px] h-[32px] cursor-pointer flex items-center rounded-[4px] border-1 border-[#FF07A9] justify-center hover:bg-[#FF07A9] text-[#FF07A9] hover:text-[#FFF] transition-all duration-300">
          <ChevronRight />
        </button>
      </div>

    </div>
  );
};

export default Stories;
