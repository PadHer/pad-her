import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogs } from "@/data/blogs";

const BlogSection = () => {
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
      </div>
      <div className="w-full overflow-x-scroll scroll-smooth no-scrollbar flex items-center gap-4">
        {blogs.map((blog) => (
          <section
            key={blog.id}
            className="min-w-3/4 md:min-w-1/4 max-w-1/4 flex flex-col gap-4 bg-[#FFF] p-2"
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
      </div>
      <div></div>
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
