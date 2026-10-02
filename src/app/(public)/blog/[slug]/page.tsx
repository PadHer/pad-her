"use client";

import {
  formatDate,
  SectionKicker,
} from "@/components/Blog/Blog-shell";
import { ContentRenderer } from "@/components/Blog/Content-renderer";
import {
  BlogPost,
  useGetPublicBlogPost,
  useGetRelatedBlogPosts,
} from "@/hooks/use-blogs";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import {
  ArrowLeft,
  ArrowUpRight,
  Bookmark,
  Check,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { getReadTime } from "@/helpers/getReadTime";
import { useParams } from "next/navigation";
import { useState } from "react";


function StoryImage({
  src,
  className = "",
}: {
  src?: string | null;
  className?: string;
}) {
  return src ? (
    <img
      src={src}
      alt=""
      className={`h-full w-full object-cover ${className}`}
    />
  ) : (
    <div className={`h-full w-full bg-[#FFE8F7] ${className}`}>
      <div
        className="h-full w-full opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 22%, #FFF9FB 0 13%, transparent 14%), radial-gradient(circle at 78% 68%, #FF07A9 0 18%, transparent 19%), linear-gradient(135deg, #FFE8F7 0%, #FFF5F9 48%, #B90D7D 49%, #ED006C 100%)",
        }}
      />
    </div>
  );
}

function StoryCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block ${featured ? "md:col-span-2" : ""}`}
      data-testid={`card-story-${post.id}`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm transition-shadow group-hover:shadow-md group-hover:shadow-[#FF07A9]/10 ${featured ? "grid md:grid-cols-[1.15fr_.85fr]" : ""}`}
      >
        <div
          className={`${featured ? "min-h-71.25 md:min-h-91.25" : "h-52"} overflow-hidden`}
        >
          <StoryImage src={post.featuredImage} />
          <div className="absolute inset-0 bg-linear-to-t from-[#111111]/40 to-transparent opacity-60" />
        </div>
        <div
          className={`relative flex flex-col justify-between p-6 ${featured ? "min-h-75 md:min-h-91.25 md:p-9" : "min-h-52.5"}`}
        >
          <div>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#ED006C]">
              <span>{post.category}</span>
              <span className="h-1 w-1 rounded-full bg-[#FF07A9]" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <h3
              className={`mt-4 font-playfair font-bold leading-[1.15] text-[#111111] transition-colors group-hover:text-[#ED006C] ${featured ? "max-w-lg text-3xl md:text-[2.75rem]" : "text-[1.45rem]"}`}
            >
              {post.title}
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#393939]">
              {post.excerpt}
            </p>
          </div>
          <div className="mt-8 flex items-center justify-between text-xs font-semibold">
            <span className="text-[#11111199]">
              Words from {post.author || "PadHer"}
            </span>
            <span className="flex items-center gap-1 text-[#ED006C] opacity-0 transition-opacity group-hover:opacity-100">
              Read story <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = useGetPublicBlogPost(slug);

  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.alert("Copy this page link from your browser.");
    }
  };
  const { data: relatedPosts = [], isLoading: isRelatedLoading } =
    useGetRelatedBlogPosts(slug, post?.tags ?? []);

  if (isLoading || isRelatedLoading)
    return (
      <>
        <div className="mx-auto max-w-3xl px-5 py-20">
          <div className="skeleton h-5 w-28 rounded" />
          <div className="skeleton mt-5 h-20 w-full rounded" />
          <div className="skeleton mt-8 h-5 w-2/3 rounded" />
        </div>
      </>
    );
  if (isError || !post)
    return (
      <>
        <div className="mx-auto max-w-3xl px-5 py-24 text-center text-gray-700">
          <h1 className="font-playfair text-4xl font-bold text-[#111111]">This story is not available.</h1>
          <p className="mt-3 text-[#11111199]">
            It may have moved, or it may still be in the writing room.
          </p>
          <Link
            href="/blog"
            className="mt-7 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-[#ED006C] border border-[#ED006C] transition-colors hover:text-white hover:bg-[#ED006C]"
            data-testid="link-back-stories"
          >
            Back to stories
          </Link>
        </div>
      </>
    );
  return (
    <div className="min-h-dvh">
      <main className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#ED006C]"
          data-testid="link-back-blog"
        >
          <ArrowLeft className="h-4 w-4" /> All stories
        </Link>
        <div className="mx-auto mt-12 max-w-4xl text-center">
          <div className="flex justify-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#ED006C]">
            <span>{post.category}</span>
            <span className="h-1 w-1 self-center rounded-full bg-[#ED006C]" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <h1
            className="mt-5 font-playfair text-4xl font-bold leading-[1.1] tracking-tight md:text-7xl text-[#111111]"
            data-testid={`text-article-title-${post.id}`}
          >
            {post.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#393939]">
            {post.excerpt}
          </p>
          <div className="mt-7 flex items-center justify-center gap-3 text-xs font-semibold text-[#11111199]">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-[#FFE8F7] text-[#B90D7D]">
              {(post.author || "P").slice(0, 1)}
            </div>
            <span>{post.author || "PadHer editorial team"}</span>
            <span className="text-pink-200">/</span>
            <span>
              {getReadTime(post.content)} min read
            </span>
          </div>
        </div>
        <div className="mx-auto mt-12 aspect-16/7 max-w-5xl overflow-hidden rounded-2xl">
          <StoryImage src={post.featuredImage} />
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 py-12 lg:grid-cols-[56px_1fr]">
          <aside className="flex gap-2 lg:flex-col">
            <button
              onClick={() => setSaved(!saved)}
              className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${saved ? "border-[#ED006C] bg-[#ED006C] text-white" : "border-pink-100 bg-white text-[#11111199] hover:border-[#ED006C] hover:text-[#ED006C]"}`}
              aria-label="Bookmark story"
              data-testid="button-bookmark-story"
            >
              <Bookmark
                className="h-4 w-4"
                fill={saved ? "currentColor" : "none"}
              />
            </button>
            <button
              onClick={share}
              className="grid h-10 w-10 place-items-center rounded-full border border-pink-100 bg-white text-[#11111199] transition-colors hover:border-[#ED006C] hover:text-[#ED006C]"
              aria-label="Copy story link"
              data-testid="button-share-story"
            >
              {copied ? (
                <Check className="h-4 w-4 text-[#ED006C]" />
              ) : (
                <Share2 className="h-4 w-4" />
              )}
            </button>
          </aside>
          <article className="max-w-none">
            <ContentRenderer content={post.content} />
          </article>
        </div>
        {relatedPosts.length > 0 && (
          <section
            className="mx-auto max-w-5xl border-t border-pink-100 py-12 lg:py-16"
            aria-labelledby="related-stories-heading"
          >
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <SectionKicker>Keep reading</SectionKicker>
                <h2
                  id="related-stories-heading"
                  className="mt-2 font-playfair text-3xl font-bold text-[#111111] md:text-4xl"
                >
                  Stories close to this one.
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden text-xs font-semibold text-[#ED006C] hover:underline sm:block"
              >
                Browse all stories
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <StoryCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}


export default function PublicBlog() {
  return (
    <div className="w-full bg-[#FFF] flex flex-col items-center justify-center overflow-hidden relative">
      <div className="w-full bg-[#FFF] flex flex-col items-center justify-center overflow-hidden relative">
        <NavBar />
        <div className="w-full h-[95dvh] md:h-screen mt-[10dvh] md:mt-[15dvh] py-6 md:py-0 px-4 md:px-24 overflow-scroll text-gray-700">
            <BlogArticle />
        </div>
        <Footer />
      </div>
    </div>
  );
}
