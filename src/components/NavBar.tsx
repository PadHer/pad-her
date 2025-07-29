"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ClickHeart } from "./animations/heart";

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
        isSticky ? "bg-white top-[0] w-full" : "rounded-[40px] w-[90%] backdrop-blur-[24px] top-10"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <Image
              src={"/logos/Main-Logo.png"}
              alt="PadHer with Love Logo"
              width={80}
              height={35}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span
                  className={`text-sm font-medium transition-colors hover:text-primary-pink ${
                    isActive(item.href)
                      ? "text-primary-pink border-b-2 border-primary-pink pb-1"
                      : "text-text-dark"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="flex flex-row items-center gap-4">
            <Link href="/donate">
              <button className="flex flex-row gap-2 items-center bg-gradient-to-b from-[#FF07A9] to-[#B90D7D] px-[24px] py-[12px] rounded-[24px] cursor-pointer">
                <ClickHeart />
                Donate Now
              </button>
            </Link>

            <Link href="/volunteer">
              <button className="border-[1.5px] border-white px-[24px] py-[12px] rounded-[24px]">
                Get Involved
              </button>
            </Link>
          </div>

          {/* Mobile Menu button
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="flex items-center pb-4 border-b">
                    <Heart className="h-6 w-6 text-primary-pink mr-2" />
                    <span className="text-lg font-bold text-primary-pink">PadHer with Love</span>
                  </div>
                  
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={`block py-2 px-3 rounded-md text-base font-medium transition-colors ${
                          isActive(item.href)
                            ? "bg-primary-pink text-white"
                            : "text-text-dark hover:bg-accent-pink hover:text-primary-pink"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                  
                  <div className="pt-4 space-y-3">
                    <Link href="/donate">
                      <button className="w-full btn-primary" onClick={() => setMobileMenuOpen(false)}>
                        <Heart className="mr-2 h-4 w-4" />
                        Donate Now
                      </button>
                    </Link>
                    
                    <Link href="/login">
                      <button variant="outline" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                        <User className="mr-2 h-4 w-4" />
                        Login
                      </button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
