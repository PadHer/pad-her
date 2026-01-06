"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BlogSection = () => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const postsPerPage = 4;
  const swipeThreshold = 100;

  const totalPages = Math.ceil(blogs.length / postsPerPage);

  const paginate = (newDirection: number) => {
    setPage(([prevPage]) => {
      const nextPage = prevPage + newDirection;
      if (nextPage < 0 || nextPage >= totalPages) return [prevPage, 0];
      return [nextPage, newDirection];
    });
  };

  const startIndex = page * postsPerPage;
  const visibleBlogs = blogs.slice(startIndex, startIndex + postsPerPage);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full bg-[#FFF9FB] flex flex-col py-8 md:py-16 pl-4 md:pl-32 overflow-hidden z-20">
      <div className="w-full  flex items-center justify-between pr-32">
        <div className="w-full flex flex-col">
          <h4
            className="capitalize text-[#ED006C] text-6"
            style={{ fontFamily: "OpenSans-Semi" }}
          >
            our latest blogs
          </h4>
          <h1
            className="text-[32px] md:text-[60px] flex flex-col gap-2"
            style={{ fontFamily: "Yeseva" }}
          >
            <span className="text-[#111111] m-0 p-0">EDUCATION &</span>
            <span className="text-[#111111AD] p-0 -mt-6">AWARENESS</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => paginate(-1)}
            disabled={page === 0}
            className="w-[32px] h-[32px] cursor-pointer flex items-center rounded-[4px] border-1 border-[#FF07A9] justify-center hover:bg-[#FF07A9] text-[#FF07A9] hover:text-[#FFF] transition-all duration-300"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => paginate(1)}
            disabled={page === totalPages - 1}
            className="w-[32px] h-[32px] cursor-pointer flex items-center rounded-[4px] border-1 border-[#FF07A9] justify-center hover:bg-[#FF07A9] text-[#FF07A9] hover:text-[#FFF] transition-all duration-300"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(_, { offset, velocity }) => {
            const swipePower = offset.x * velocity.x;

            if (swipePower < -swipeThreshold) {
              paginate(1);
            } else if (swipePower > swipeThreshold) {
              paginate(-1);
            }
          }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {visibleBlogs.map((blog) => (
            <section
              key={blog.id}
              className="w-full md:w-full flex flex-col gap-4 bg-[#FFF] p-2"
            >
              <div className="w-full h-[224px] relative">
                <Image
                  src={"/images/bg-blog.png"}
                  alt="Blog Background"
                  fill
                  className="object-cover rounded-[0px_50px_0px_50px] absolute"
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
                className="text-5 text-[#111111] h-6"
              >
                {blog.title}
              </h4>
              <Link href={"/"}>
                <button
                  className="flex items-center gap-2 text-[#FF07A9] text-[12px] md:text-[16px] font-semibold my-4 cursor-pointer"
                  style={{ fontFamily: "OpenSans" }}
                >
                  Read Blog <ArrowRight size={16} />
                </button>
              </Link>
            </section>
          ))}
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setPage([index, index > page ? 1 : -1])}
            className={`w-2 h-2 rounded-full ${
              index === page ? "bg-pink-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <div className="w-full flex items-center justify-center mt-8">
        <button
          className="button-secondary"
          style={{
            fontFamily: "OpenSans-Bold",
          }}
        >
          View All Blogs
        </button>
      </div>
    </div>
  );
};

export default BlogSection;
