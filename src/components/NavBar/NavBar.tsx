"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ClickHeart } from "../animations/heart";
import Hamburger from "../Hamburger/Hamburger";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Volunteer", href: "/volunteer" },
  { name: "Blog", href: "/blog" },
  { name: "Contact Us", href: "#partnership" },
];

const NavBar = () => {
  const pathname = usePathname();
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggle = () => {
    setMobileMenuOpen((prev) => !prev);
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
          : "lg:rounded-[40px] text-[#FFF] md:w-[90%] md:bg-[#FFFFFF40] md:backdrop-blur-[54px] md:shadow-[0px_4px_16px_0px_#FF07A914] top-0 w-full lg:top-10"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:py-2 md:px-8 relative">
        <div className="w-full flex justify-between items-center h-16">
          <Link href="/">
            <Image
              src={"/logos/Main-Logo.png"}
              alt="PadHer with Love Logo"
              width={80}
              height={35}
            />
          </Link>
          <Hamburger
            open={mobileMenuOpen}
            toggle={handleToggle}
            color="#FF07A9"
            size={24}
          />
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                rel="noopener noreferrer"
                key={item.name}
                href={item.href}
                className="relative group"
              >
                <span
                  className={`text-sm font-open font-medium transition-colors hover:text-[#FF07A9] flex flex-col ${
                    pathname === item.href
                      ? "text-[#FF07A9] font-semiBold"
                      : isSticky
                      ? "text-[#393939]"
                      : "text-[#CCC]"
                  }`}
                >
                  {item.name}
                  <span
                    className={`
                    h-[3px] w-0 bg-[#FF07A9] transition-all duration-300 
                    group-hover:w-full
                    ${pathname === item.href ? "w-1/2" : ""}
                  `}
                  />
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
                className={`border-[1.5px] font-medium font-open px-[24px] py-[12px] rounded-[24px] hover:bg-[#FFE8F7] transition-colors duration-300 ease-in-out hover:text-[#B90D7D] hover:border-[#B90D7D] cursor-pointer ${
                  isSticky
                    ? "text-[#ED006C] border-[#ED006C]"
                    : "border-[#CCC] text-[#CCC]"
                }`}
              >
                Get Involved
              </button>
            </Link>
          </div>

          {mobileMenuOpen && (
            <div
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden flex items-baseline justify-center absolute top-16 left-0 w-full h-screen z-50"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full h-auto flex flex-col bg-white py-4 rounded-[0_0_16px_16px] px-8 gap-8 shadow-lg transition-transform duration-300 ease-in-out"
                style={{ animation: "menuEnter 300ms ease forwards" }}
              >
                <div className="flex flex-col gap-4 space-x-8">
                  {navigation.map((item) => (
                    <Link
                      rel="noopener noreferrer"
                      key={item.name}
                      href={item.href}
                    >
                      <span
                        className={`text-sm font-medium transition-colors hover:text-[#FF07A9] ${
                          pathname === item.href
                            ? "text-[#FF07A9] border-b-2 border-[#FF07A9] pb-1"
                            : "text-[#393939] md:shadow-[0px_4px_16px_0px_#FF07A914]"
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
                      className={`border-[1.5px] font-medium font-open px-[24px] py-[12px] rounded-[24px] text-[#ED006C] border-[#ED006C]`}
                    >
                      Get Involved
                    </button>
                  </Link>
                </div>
              </div>

              <style jsx>{`
                @keyframes menuEnter {
                  from {
                    opacity: 0;
                    transform: translateY(-10px) scale(0.995);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                  }
                }
              `}</style>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
