"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ClickHeart } from "../animations/heart";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

const NavBar = () => {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return true;
    return href !== "/" && pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsSticky(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed flex justify-center z-100 py-1 transition-all duration-300 ${
        isSticky
          ? "bg-white top-[0] w-full"
          : "lg:rounded-[40px] md:w-[90%] md:backdrop-blur-[24px] top-0 w-full bg-white lg:top-10"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 relative">
        <div className="w-full flex justify-between items-center h-16">
          <Link href="/">
            <Image
              src={"/logos/Main-Logo.png"}
              alt="PadHer with Love Logo"
              width={80}
              height={35}
            />
          </Link>
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden">
            Open Menu
          </button>
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link rel="noopener noreferrer" key={item.name} href={item.href}>
                <span
                  className={`text-sm font-medium transition-colors hover:text-[#FF07A9] ${
                    isActive(item.href)
                      ? "text-[#FF07A9] border-b-2 border-[#FF07A9] pb-1"
                      : "text-[#393939]"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="hidden md:flex flex-row items-center gap-4">
            <Link href="/donate">
              <button className="flex flex-row gap-2 items-center bg-gradient-to-b from-[#FF07A9] to-[#B90D7D] px-[24px] py-[12px] rounded-[24px] cursor-pointer">
                <ClickHeart />
                Donate Now
              </button>
            </Link>

            <Link href="/volunteer">
              <button
                className={`border-[1.5px] font-medium font-open px-[24px] py-[12px] rounded-[24px] ${
                  isSticky
                    ? "text-[#ED006C] border-[#ED006C]"
                    : "border-white text-[#FFF]"
                }`}
              >
                Get Involved
              </button>
            </Link>
          </div>

          {mobileMenuOpen && <div className="md:hidden flex flex-col absolute">
            <div className="flex flex-col space-x-8">
            {navigation.map((item) => (
              <Link rel="noopener noreferrer" key={item.name} href={item.href}>
                <span
                  className={`text-sm font-medium transition-colors hover:text-[#FF07A9] ${
                    isActive(item.href)
                      ? "text-[#FF07A9] border-b-2 border-[#FF07A9] pb-1"
                      : "text-[#393939]"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-center gap-4">
            <Link href="/donate">
              <button className="flex flex-row gap-2 items-center bg-gradient-to-b from-[#FF07A9] to-[#B90D7D] px-[24px] py-[12px] rounded-[24px] cursor-pointer">
                <ClickHeart />
                Donate Now
              </button>
            </Link>

            <Link href="/volunteer">
              <button
                className={`border-[1.5px] font-medium font-open px-[24px] py-[12px] rounded-[24px] ${
                  isSticky
                    ? "text-[#ED006C] border-[#ED006C]"
                    : "border-white text-[#FFF]"
                }`}
              >
                Get Involved
              </button>
            </Link>
          </div>
            </div>}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
