"use client";

import React, { useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import PartnerShip from "@/components/PartnerShip/PartnerShip";
import Image from "next/image";
// import Link from "next/link";
import { blogs } from "@/data/blogs";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Page = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 6;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = blogs.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(blogs.length / rowsPerPage);
  
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="w-full bg-[#FFF] flex flex-col items-center justify-center overflow-hidden relative">
      <NavBar />
      <div className="w-full h-[85dvh] mt-30 px-24">
        <h1
          className="text-[60px] text-[#111111]"
          style={{
            fontFamily: "Yeseva",
          }}
        >
          Education & Awareness
        </h1>
        <p className="text-[16px] font-open text-[#393939] w-full md:w-9/10">
          At PadHer with Love, we believe that menstrual stigma and ending
          period poverty begins with open conversations and informed minds. This
          space is where we challenge harmful myths, share empowering stories,
          and provide accurate relatable education about menstrual health.
        </p>
        <div className="w-full h-[75%] rounded-[8px_60px_8px_60px] relative overflow-hidden mt-4">
          <Image
            src={"/images/blog.png"}
            alt="Education & Awareness Image"
            fill
            className="object-cover"
          />
          <div className="w-full h-full flex flex-col items-start justify-end bg-[#00000080] z-30 absolute px-6 pb-12">
            <h2
              className="text-[32px] text-[#FFFFFF] w-5/6"
              style={{
                fontFamily: "Yeseva",
              }}
            >
              Breaking the Silence: How Period Stigma Is Holding Girls Back in
              School.
            </h2>
            <div className="w-full flex items-end justify-between">
              <div className="flex gap-12">
                <div className="flex flex-col">
                  <p className="text-[12px] font-open font-semibold text-[#BAB6BB]">
                    Written by
                  </p>
                  <span className="flex gap-2">
                    <Image
                      src={"/images/author.png"}
                      alt="Author Image"
                      width={24}
                      height={24}
                      className="rounded-full object-cover"
                    />
                    <h6 className="text-[#FFFFFF] text-[16px] font-open">
                      Sarah Musa
                    </h6>
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="text-[12px] font-open font-semibold text-[#BAB6BB]">
                    Published On
                  </p>
                  <h6 className="text-[#FFFFFF] text-[16px] font-open">
                    15 August 2025
                  </h6>
                </div>
              </div>
              <span className="border-1 border-[#FFF5F9] py-1 px-2.5 rounded-[16px] text-[16px] font-open text-[#FFF5F9]">
                12 min read
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-4 px-24 py-16">
        {currentRows.map((blog) => (
          <section
            key={blog.id}
            className="w-full h-auto flex flex-col gap-4 bg-[#FFF8FC] py-4 px-6 rounded-[10px_50px_10px_50px] shadow-[0px_4px_25px_0px #F9DBE780]"
          >
            <div className="w-full h-[224px] relative">
              <Image
                src={blog.image || "/images/bg-blog.png"}
                alt="Blog Background"
                fill
                className="object-cover rounded-[10px_50px_10px_50px] absolute"
              />
            </div>
            <span
              style={{ fontFamily: "OpenSans" }}
              className="text[14px] text-[#393939]"
            >
              {blog.category}
            </span>
            <h4
              style={{ fontFamily: "Yeseva" }}
              className="text-5 text-[#111111]"
            >
              {blog.title}
            </h4>
          </section>
        ))}
      </div>
      <div className="w-full px-24 py-4 overflow-hidden">
        <div className="relative w-full flex items-center justify-center">
            <span className="absolute w-full border-1 border-[#B9B9B9]"></span>
        <div onClick={handlePrevPage} className="flex gap-4 items-center bg-[#FFF] z-30 px-2">
            <button className="border-1 border-[#929292] flex items-center justify-center h-8 w-8 rounded-[8px] hover:bg-[#FF07A9] hover:border-1 hover:border-[#FFF] transition-colors duration-300 ease-in-out cursor-pointer">
                <ChevronLeft />
            </button>
            {pageNumbers.map((p, idx) => (
                <button className={`border-1 border-[#111111] text-[#111111] hover:text-[#FFF] flex items-center justify-center h-10 w-10 rounded-[8px] hover:bg-[#FF07A9] hover:border-1 hover:border-[#FFF] transition-colors duration-300 ease-in-out cursor-pointer ${p === currentPage ? "bg-[#FF07A9] text-[#FFF] border-[#FFF]" : ""}`} onClick={() => handlePageClick(p)} key={idx}>
                    {p}
                </button>
            ))}
            <button onClick={handleNextPage} className="border-1 border-[#929292] flex items-center justify-center h-8 w-8 rounded-[8px] hover:bg-[#FF07A9] hover:border-1 hover:border-[#FFF] transition-colors duration-300 ease-in-out cursor-pointer">
                <ChevronRight />
            </button>
        </div>
        </div>
      </div>
      <PartnerShip />
      <Footer />
    </div>
  );
};

export default Page;
