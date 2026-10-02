"use client";

import React, { useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import PartnerShip from "@/components/PartnerShip/PartnerShip";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, FilePenLine } from "lucide-react";
import { BlogPost, usePublicBlogPosts } from "@/hooks/use-blogs";
import { formatDate } from "@/components/Blog/Blog-shell";
import { getReadTime } from "@/helpers/getReadTime";

const rowsPerPage = 6;

// next/image only optimises hosts listed in next.config.ts
const isOptimisable = (src: string) =>
  src.startsWith("/") || src.startsWith("https://res.cloudinary.com/");

function CoverImage({
  src,
  fallback,
  alt,
  className,
}: {
  src?: string | null;
  fallback: string;
  alt: string;
  className: string;
}) {
  const image = src || fallback;
  return (
    <Image
      src={image}
      alt={alt}
      fill
      unoptimized={!isOptimisable(image)}
      className={className}
    />
  );
}

function FeaturedStory({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block w-full h-1/2 md:h-[75%] rounded-[6px_40px_6px_40px] md:rounded-[8px_60px_8px_60px] relative overflow-hidden mt-4"
      data-testid={`link-featured-story-${post.id}`}
    >
      <CoverImage
        src={post.featuredImage}
        fallback="/images/blog.png"
        alt={post.title}
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="w-full h-full flex flex-col items-start justify-end bg-[#00000080] z-30 absolute px-4 pb-4 md:pb-12">
        <span className="mb-2 rounded-full bg-[#FF07A9] px-3 py-1 text-[10px] md:text-[12px] font-open font-semibold text-white">
          {post.category}
        </span>
        <h2
          className="text-[16px] md:text-[32px] text-[#FFFFFF] w-full md:w-5/6"
          style={{
            fontFamily: "Yeseva",
          }}
        >
          {post.title}
        </h2>
        <div className="w-full flex items-end justify-between">
          <div className="flex gap-4 md:gap-12">
            <div className="flex flex-col">
              <p className="text-[8px] md:text-[12px] font-open font-semibold text-[#BAB6BB]">
                Written by
              </p>
              <span className="flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[#FFE8F7] text-[10px] font-bold text-[#B90D7D]">
                  {(post.author || "P").slice(0, 1).toUpperCase()}
                </span>
                <h6 className="text-[#FFFFFF] text-[10px] md:text-[16px] font-open text-nowrap">
                  {post.author || "PadHer Team"}
                </h6>
              </span>
            </div>
            <div className="flex flex-col">
              <p className="text-[8px] md:text-[12px] font-open font-semibold text-[#BAB6BB]">
                Published On
              </p>
              <h6 className="text-[#FFFFFF] text-[10px] md:text-[16px] font-open">
                {formatDate(post.publishedAt)}
              </h6>
            </div>
          </div>
          <span className="border-1 border-[#FFF5F9] py-1 px-1 md:px-2.5 rounded-[12px] md:rounded-[16px] text-[10px] md:text-[12px] font-open text-[#FFF5F9]">
            {getReadTime(post.content)} min read
          </span>
        </div>
      </div>
    </Link>
  );
}

function StoryCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group w-full h-auto flex flex-col gap-4 bg-[#FFF8FC] py-2 md:py-4 px-2 md:px-6 rounded-[4px_20px_4px_20px] md:rounded-[10px_50px_10px_50px] shadow-[0px_4px_25px_0px_#F9DBE780] transition-shadow hover:shadow-[0px_8px_30px_0px_#FF07A933]"
      data-testid={`card-story-${post.id}`}
    >
      <div className="w-full h-25 md:h-[224px] relative overflow-hidden rounded-[4px_20px_4px_20px] md:rounded-[10px_50px_10px_50px]">
        <CoverImage
          src={post.featuredImage}
          fallback="/images/bg-blog.png"
          alt={post.title}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <span
        style={{ fontFamily: "OpenSans" }}
        className="text-[10px] md:text-[14px] text-[#393939]"
      >
        {post.category}
      </span>
      <h4
        style={{ fontFamily: "Yeseva" }}
        className="text-[12px] md:text-[20px] text-[#111111] transition-colors group-hover:text-[#ED006C]"
      >
        {post.title}
      </h4>
    </Link>
  );
}

function BlogSkeleton() {
  return (
    <div className="skeleton w-full h-1/2 md:h-[75%] rounded-[6px_40px_6px_40px] md:rounded-[8px_60px_8px_60px] mt-4" />
  );
}

function EmptyState({
  title,
  copy,
  onRetry,
}: {
  title: string;
  copy: string;
  onRetry?: () => void;
}) {
  return (
    <div className="mt-4 flex w-full flex-col items-center justify-center rounded-[8px_60px_8px_60px] border border-dashed border-pink-200 bg-[#FFF9FB] px-6 py-16 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-[#FFE8F7] text-[#FF07A9]">
        <FilePenLine className="h-5 w-5" />
      </div>
      <h3 className="mt-5 font-playfair text-2xl font-bold text-[#111111]">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm font-open text-[#393939]">{copy}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="button-secondary mt-6"
          data-testid="button-retry-stories"
        >
          Try again
        </button>
      )}
    </div>
  );
}

const Page = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: posts = [], isLoading, isError, refetch } = usePublicBlogPosts();

  // The newest story leads the page; the rest are listed below it
  const [featured, ...rest] = posts;

  const totalPages = Math.max(1, Math.ceil(rest.length / rowsPerPage));
  const page = Math.min(currentPage, totalPages);
  const indexOfFirstRow = (page - 1) * rowsPerPage;
  const currentRows = rest.slice(indexOfFirstRow, indexOfFirstRow + rowsPerPage);

  const handleNextPage = () => {
    if (page < totalPages) setCurrentPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setCurrentPage(page - 1);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="w-full bg-[#FFF] flex flex-col items-center justify-center overflow-hidden relative">
      <NavBar />
      <div
        className={`w-full mt-[10dvh] md:mt-[25dvh] py-6 md:py-0 px-4 md:px-24 ${featured || isLoading ? "h-[95dvh] md:h-screen" : ""}`}
      >
        <h1
          className="text-[32px] leading-[40px] md:text-[60px] text-[#111111]"
          style={{
            fontFamily: "Yeseva",
          }}
        >
          Education & Awareness
        </h1>
        <p className="text-[16px] font-open text-[#393939] mt-4 w-full md:w-9/10">
          At PadHer with Love, we believe that menstrual stigma and ending
          period poverty begins with open conversations and informed minds. This
          space is where we challenge harmful myths, share empowering stories,
          and provide accurate relatable education about menstrual health.
        </p>
        {isLoading ? (
          <BlogSkeleton />
        ) : isError ? (
          <EmptyState
            title="Stories are taking a short break."
            copy="We could not load the blog right now. Please try again in a moment."
            onRetry={() => refetch()}
          />
        ) : featured ? (
          <FeaturedStory post={featured} />
        ) : (
          <EmptyState
            title="Our first stories are on the way."
            copy="Check back soon for stories, myth-busting and menstrual health education from the PadHer team."
          />
        )}
      </div>
      {isLoading ? (
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 px-4 py-6 md:px-24 md:py-16">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="skeleton h-40 md:h-80 rounded-[4px_20px_4px_20px] md:rounded-[10px_50px_10px_50px]"
            />
          ))}
        </div>
      ) : (
        currentRows.length > 0 && (
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 px-4 py-6 md:px-24 md:py-16">
            {currentRows.map((post) => (
              <StoryCard key={post.id} post={post} />
            ))}
          </div>
        )
      )}
      {totalPages > 1 && (
        <div className="w-full px-4 md:px-24 py-4 overflow-hidden">
          <div className="relative w-full flex items-center justify-center">
            <span className="absolute w-full border-1 border-[#B9B9B9]"></span>
            <div className="flex gap-4 items-center bg-[#FFF] z-30 px-2">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                aria-label="Previous page"
                className="border-1 border-[#929292] flex items-center justify-center h-6 w-6 md:h-8 md:w-8 rounded-[4px] md:rounded-[8px] hover:bg-[#FF07A9] hover:border-1 hover:border-[#FFF] transition-colors duration-300 ease-in-out cursor-pointer disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft />
              </button>
              {pageNumbers.map((p) => (
                <button
                  className={`border-1 border-[#111111] font-playfair font-bold text-[#111111] hover:text-[#FFF] flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-[8px] hover:bg-[#FF07A9] hover:border-1 hover:border-[#FFF] transition-colors duration-300 ease-in-out cursor-pointer ${p === page ? "bg-[#FF07A9] text-[#FFF] border-[#FFF]" : ""}`}
                  onClick={() => setCurrentPage(p)}
                  aria-current={p === page ? "page" : undefined}
                  key={p}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                aria-label="Next page"
                className="border-1 border-[#929292] flex items-center justify-center h-6 w-6 md:h-8 md:w-8 rounded-[4px] md:rounded-[8px] hover:bg-[#FF07A9] hover:border-1 hover:border-[#FFF] transition-colors duration-300 ease-in-out cursor-pointer disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
      <div id="partnership" className="scroll-mt-24">
        <PartnerShip />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
