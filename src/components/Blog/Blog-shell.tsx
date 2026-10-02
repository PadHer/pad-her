"use client";

import { BookOpen, ChevronRight, Search } from "lucide-react";
import Link from "next/link";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/blog"
      className="flex items-center gap-3"
      data-testid="link-brand"
    >
      <span
        className={`grid h-9 w-9 place-items-center rounded-full border ${light ? "border-[#e4a0b2] bg-[#e4a0b2] text-[#512336]" : "border-primary bg-primary text-primary-foreground"}`}
      >
        <span className="font-serif text-xl leading-none">p</span>
      </span>
      <span
        className={`font-serif text-[1.35rem] font-semibold tracking-[-.04em] ${light ? "text-[#fff6ef]" : "text-foreground"}`}
      >
        PadHer
      </span>
    </Link>
  );
}

export function PublicHeader() {
  return (
    <header className="border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-19 max-w-7xl items-center justify-between px-5 lg:px-8">
        <BrandMark />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <Link
            href="/blog"
            className="transition-colors hover:text-foreground"
            data-testid="link-stories"
          >
            Stories
          </Link>
          <a
            href="#about"
            className="transition-colors hover:text-foreground"
            data-testid="link-about"
          >
            About PadHer
          </a>
          <a
            href="#newsletter"
            className="transition-colors hover:text-foreground"
            data-testid="link-newsletter"
          >
            Stay close
          </a>
        </nav>
        <Link
          href="/admin/blog"
          className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold tracking-wide text-foreground transition-all hover:border-primary hover:text-primary"
          data-testid="link-admin"
        >
          <BookOpen className="h-3.5 w-3.5" /> Writing room{" "}
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}

export function SearchField({
  value,
  onChange,
  placeholder = "Search stories",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="flex h-11 items-center gap-3 rounded-full border border-pink-100 bg-white px-4 transition-colors focus-within:border-[#FF07A9] focus-within:ring-3 focus-within:ring-[#FF07A9]/15">
      <Search className="h-4 w-4 shrink-0 text-[#FF07A9]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 flex-1 bg-transparent text-sm text-[#111111] outline-none placeholder:text-[#11111166]"
        placeholder={placeholder}
        data-testid="input-search-stories"
      />
    </label>
  );
}

export function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.22em] text-[#FF07A9]">
      <span className="h-px w-7 bg-[#FF07A9]" />
      {children}
    </div>
  );
}

export function formatDate(date?: string | null) {
  if (!date) return "Not published";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
