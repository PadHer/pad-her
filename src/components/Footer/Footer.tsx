"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaMedium, FaLinkedinIn } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { PiInstagramLogoFill } from "react-icons/pi";

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
  return (
    <div className="w-full flex flex-col items-center bg-[#FFF8FB] pt-[25px] px-24">
      <h1 className="font-playfair font-extrabold footer-text text-[100px] inset-0">
        PAD HER WITH LOVE
      </h1>
      <p className="w-[30%] text-[#989797] text-[16px] text-center font-open font-semibold">
        Join us as we create a world where no girl is held back because of her
        period.
      </p>
      <form
        className="w-[35%] flex gap-2 items-center justify-center mt-7"
        action=""
      >
        <input
          type="text"
          onChange={(e) => setSubscribe(e.target.value)}
          value={subscribe}
          name="subscribe"
          placeholder="Subscribe to Newsletter"
          className="border-[1px] border-[#EAEAEA] bg-[#FFF] rounded-[16px] px-4 py-2 outline-none placeholder:text-[#989797] placeholder:text-[12px] font-open text-[16px] text-[#1A1A1A]"
        />
        <button className="button">Subscribe</button>
      </form>
      <div className="w-full flex flex-row mt-7 py-6 items-center justify-between">
        <h4
          style={{ fontFamily: "Yeseva" }}
          className="text-[#393939] text-[16px]"
        >
          PadHerwithlove.All Rights Reserved.
        </h4>
        <div className="flex items-center gap-6">
          {["Home", "About Us", "Volunteer", "Blog", "Donate"].map(
            (link, index) => (
              <Link
                className="font-open text-[#393939] text-[16px] hover:text-[#FF07A9]"
                key={index}
                href={""}
              >
                {link}
              </Link>
            )
          )}
        </div>
        <div className="flex items-center gap-2">
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
