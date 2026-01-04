"use client";

import React, { useState } from "react";
import { faqs } from "@/data/faqs";
import Image from "next/image";
import { Plus } from "lucide-react";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="w-full flex flex-col items-center relative bg-[#FFF9FB] py-4 md:py-[80px] gap-4 md:gap-16 z-20 overflow-hidden">
      <Image
        src={"/svgs/flower-1.svg"}
        alt={"Flower Decoration"}
        width={200}
        height={200}
        className="absolute -right-4 md:right top-0"
      />
      <Image
        src={"/svgs/flower-2.svg"}
        alt={"Flower Decoration"}
        width={200}
        height={200}
        className="absolute left-0 -bottom-24 md:bottom-0 hidden md:flex"
      />
      <div className="w-full flex flex-col gap-4 items-center">
        <div
          className="w-full flex flex-col items-start md:items-center text-[32px] md:text-[64px] px-4 md:px-0 gap-4 md:gap-4"
          style={{ fontFamily: "Yeseva" }}
        >
          <h2 className="text-[#111111] text-center p-0 m-0 w-2/3 leading-10 md:leading-[64px]">Got Questions About</h2>
          <h2 className="text-[#11111199] text-center p-0 -mt-4 w-2/3 leading-10 md:leading-[64px]">PADHer With Love?</h2>
        </div>
        <p
          className="text-center w-[90%] md:w-[61%] capitalize text-[#393939] mt-4 md:mt-0 text-[14px] md:text-[16px]"
          style={{ fontFamily: "OpenSans-Semi" }}
        >
          Find quick answers to the most common questions about who we are, what
          we do, and how you can be part of the movement to end period poverty.
        </p>
      </div>
      <div className="w-full flex flex-col items-center gap-[16px] px-4 md:px-0">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="w-full md:w-[61%] bg-[#FFF] rounded-[8px] px-3 md:px-6 py-3 md:py-[24px] cursor-pointer"
            onClick={() => toggleFAQ(index)}
            style={{borderTop: "1px solid #1A1A0028", borderBottom: "1px solid #1A1A0028"}}
          >
            <h3
              className="text-[#111111] text-[14px] md:text-[20px] font-bold w-full flex justify-between items-center"
              style={{ fontFamily: "OpenSans-Bold" }}
            >
              {faq.question}
              <span>
                <Plus
                  className={`transition-transform duration-500 ${activeIndex === index ? "rotate-135" : ""}`}
                />
              </span>
            </h3>
            {/* {activeIndex === index && (
              <p
                className="text-[#393939] text-[16px] mt-8"
                style={{ fontFamily: "OpenSans" }}
              >
                {faq.answer}
              </p>
            )} */}
            <div
        className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${activeIndex === index ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"}
        `}
      >
        <p
          className="text-[#393939] text-[16px]"
          style={{ fontFamily: "OpenSans" }}
        >
          {faq.answer}
        </p>
      </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
