"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaMedium, FaLinkedinIn } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { PiInstagramLogoFill } from "react-icons/pi";
import Star from "../Star/Star";

const socials = [
  {
    icon: FaMedium,
    link: "https://medium.com/@padherwithlove",
  },
  {
    icon: FaSquareXTwitter,
    link: "https://x.com/Pad_Her_",
  },
  {
    icon: PiInstagramLogoFill,
    link: "https://www.instagram.com/pad_her_",
  },
  {
    icon: FaLinkedinIn,
    link: "https://www.linkedin.com/company/pad-her-with-love/",
  },
];

const Footer = () => {
  const [subscribe, setSubscribe] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!subscribe) return;

    setLoading(true);

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: subscribe }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Subscribed successfully 🎉");
      setLoading(false);
      setSubscribe("");
    } else {
      alert(data.error || "Something went wrong");
    }
  };
  return (
    <div className="w-full flex flex-col items-center bg-[#FFF8FB] pt-4 md:pt-[25px] px-4 md:px-24 relative z-20">
      <span className="absolute left-[12%] md:left-[14%] -top-25 md:top-8">
        <Star size="16px" color={"#ED006C"} />
      </span>
      <span className="absolute -right-40 md:right-[3%] md:top-18">
        <Star size="12px" color={"#ED006C"} />
      </span>
      <span className="absolute left-10 md:left-[41%] md:top-7">
        <Star size="6px" color={"#ED006C"} />
      </span>
      <span className="absolute -top-15 right-10 md:right-[18%] md:-top-8">
        <Star size="6px" color={"#ED006C"} />
      </span>

      <h1 className="font-playfair font-extrabold footer-text text-[40px] text-center  md:text-[100px] inset-0">
        PAD HER WITH LOVE
      </h1>
      <p className="w-full md:w-[30%] text-[#989797] text-[16px] text-center font-open font-semibold mt-6 md:mt-0">
        Subscribe to our newsletter
      </p>
      <form
        className="w-[35%] flex gap-2 items-center justify-center mt-4"
        action=""
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          onChange={(e) => setSubscribe(e.target.value)}
          value={subscribe}
          name="subscribe"
          placeholder="Enter email address"
          className="border-[1px] border-[#EAEAEA] bg-[#FFF] rounded-[16px] px-4 py-2 outline-none placeholder:text-[#989797] placeholder:text-[12px] font-open text-[16px] text-[#1A1A1A]"
        />
        <button disabled={loading} type="submit" className="button">{loading ? "Subscribing..." : "Subscribe"}</button>
      </form>
      <div className="w-full flex flex-col-reverse md:flex-row md:mt-16 py-6 items-center gap-6 md:justify-between">
        <h4
          style={{ fontFamily: "Yeseva" }}
          className="text-[#393939] text-[16px]"
        >
          PadHerwithlove.All Rights Reserved.
        </h4>
        <div className="w-3/4 md:w-auto flex flex-row justify-between md:justify-start items-center md:gap-6">
          {["Home", "About Us", "Volunteer", "Blog", "Donate"].map(
            (link, index) => (
              <Link
                className="font-open text-[#393939] text-[12px] md:text-[16px] hover:text-[#FF07A9]"
                key={index}
                href={""}
              >
                {link}
              </Link>
            )
          )}
        </div>
        <div className="w-1/2 md:w-auto flex flex-row items-center justify-between md:justify-start md:gap-2">
          {socials.map((social, index) => (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              href={social.link}
            >
              {<social.icon size={20} color="#FF07A9" />}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
