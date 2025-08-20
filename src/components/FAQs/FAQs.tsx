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
    <div className="w-full flex flex-col items-center relative bg-[#FFF9FB] py-[80px] gap-16">
      <Image
        src={"/svgs/flower-1.svg"}
        alt={"Flower Decoration"}
        width={200}
        height={200}
        className="absolute right-0 top-0"
      />
      <Image
        src={"/svgs/flower-2.svg"}
        alt={"Flower Decoration"}
        width={200}
        height={200}
        className="absolute left-0 bottom-0"
      />
      <div className="w-full flex flex-col items-center">
        <div
          className="w-full flex flex-col items-center text-[64px] gap-0"
          style={{ fontFamily: "Yeseva" }}
        >
          <h2 className="text-[#111111] p-0 m-0">Got Questions About</h2>
          <h2 className="text-[#11111199] p-0 -mt-4">PADHer With Love?</h2>
        </div>
        <p
          className="text-center w-[61%] capitalize text-[#393939] text-4"
          style={{ fontFamily: "OpenSans-Semi" }}
        >
          Find quick answers to the most common questions about who we are, what
          we do, and how you can be part of the movement to end period poverty.
        </p>
      </div>
      <div className="w-full flex flex-col items-center gap-[16px]">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="w-[61%] bg-[#FFF] rounded-[8px] px-6 py-[24px] cursor-pointer"
            onClick={() => toggleFAQ(index)}
            style={{borderTop: "1px solid #1A1A0028", borderBottom: "1px solid #1A1A0028"}}
          >
            <h3
              className="text-[#111111] text-[20px] font-bold w-full flex justify-between items-center"
              style={{ fontFamily: "OpenSans-Bold" }}
            >
              {faq.question}
              <span>
                <Plus
                  className={`transition-transform duration-500 ${activeIndex === index ? "rotate-135" : ""}`}
                />
              </span>
            </h3>
            {activeIndex === index && (
              <p
                className="text-[#393939] text-[16px] mt-8"
                style={{ fontFamily: "OpenSans" }}
              >
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
