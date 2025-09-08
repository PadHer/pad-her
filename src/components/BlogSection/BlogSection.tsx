import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogs } from "@/data/blogs";

const BlogSection = () => {
  return (
    <div className="w-full bg-[#FFF9FB] flex flex-col py-16 pl-32 overflow-hidden">
      <div className="w-full  flex items-center justify-between pr-32">
        <div className="w-full flex flex-col">
          <h4
            className="capitalize text-[#ED006C] text-6"
            style={{ fontFamily: "OpenSans-Semi" }}
          >
            our latest blogs
          </h4>
          <h1
            className="text-[60px] flex flex-col"
            style={{ fontFamily: "Yeseva" }}
          >
            <span className="text-[#111111] m-0 p-0">EDUCATION &</span>
            <span className="text-[#111111AD] p-0 -mt-6">AWARENESS</span>
          </h1>
        </div>
        <div>
          <button>prev</button>
          <button>next</button>
        </div>
      </div>
      <div className="w-full overflow-x-scroll flex items-center gap-4">
        {blogs.map((blog) => (
          <section
            key={blog.id}
            className="min-w-1/4 max-w-1/4 flex flex-col gap-4 bg-[#FFF] p-2"
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
                className="flex items-center gap-2 text-[#FF07A9] text-[16px] font-semibold my-4 cursor-pointer"
                style={{ fontFamily: "OpenSans" }}
              >
                Read Blog <ArrowRight />
              </button>
            </Link>
          </section>
        ))}
      </div>
      <div></div>
      <div className="w-full flex items-center justify-center mt-8">
        <button
          className="px-[24px] py-[8px] border-[#FF07A9] border-[2px] cursor-pointer rounded-[24px] text-[#B90D7D] text-4"
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
