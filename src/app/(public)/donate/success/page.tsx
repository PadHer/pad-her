"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Confetti() {
  return (
    <svg viewBox="0 0 420 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md">
      {/* Left confetti */}
      <path d="M30 80 Q50 55 75 75" stroke="#F97316" strokeWidth="6" strokeLinecap="round" />
      <path d="M20 105 Q50 85 65 105" stroke="#F97316" strokeWidth="6" strokeLinecap="round" />
      <path d="M55 50 Q80 30 100 50" stroke="#A78BFA" strokeWidth="6" strokeLinecap="round" />
      <rect x="70" y="95" width="12" height="12" rx="2" fill="#A78BFA" transform="rotate(20 70 95)" />
      <path d="M15 60 Q40 45 55 65" stroke="#34D399" strokeWidth="6" strokeLinecap="round" />
      <path d="M85 110 Q105 90 125 108" stroke="#34D399" strokeWidth="6" strokeLinecap="round" />
      <circle cx="42" cy="130" r="6" fill="#F97316" />
      <rect x="95" y="55" width="10" height="10" rx="2" fill="#60A5FA" transform="rotate(-15 95 55)" />

      {/* Right confetti */}
      <path d="M290 55 Q315 35 345 55" stroke="#34D399" strokeWidth="6" strokeLinecap="round" />
      <path d="M310 85 Q340 65 365 80" stroke="#F472B6" strokeWidth="6" strokeLinecap="round" />
      <path d="M345 110 Q375 90 395 110" stroke="#F97316" strokeWidth="6" strokeLinecap="round" />
      <circle cx="310" cy="40" r="7" fill="#60A5FA" />
      <circle cx="388" cy="60" r="5" fill="#FBBF24" />
      <rect x="355" y="38" width="11" height="11" rx="2" fill="#A78BFA" transform="rotate(25 355 38)" />
      <path d="M275 100 Q295 80 320 95" stroke="#60A5FA" strokeWidth="6" strokeLinecap="round" />
      <rect x="280" y="120" width="10" height="10" rx="2" fill="#F472B6" transform="rotate(-10 280 120)" />
      <circle cx="400" cy="115" r="6" fill="#34D399" />
    </svg>
  );
}

function PulseRing() {
  return (
    <span className="absolute inset-0 rounded-full animate-ping bg-pink-400 opacity-20" />
  );
}

export default function SuccessPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
    <NavBar />
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-pink-50 via-white to-purple-50 px-4 py-16">

      {/* Card */}
      <div
        className={`
          bg-white rounded-3xl shadow-2xl shadow-pink-100 w-full max-w-lg
          flex flex-col items-center px-10 pt-12 pb-12 gap-6
          transition-all duration-700
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        {/* Confetti art */}
        <div className="w-full flex justify-center -mb-2">
          <Confetti />
        </div>

        {/* Checkmark circle */}
        <div className="relative flex items-center justify-center -mt-10 mb-2">
          <span className="absolute inset-0 rounded-full bg-pink-500 opacity-10 scale-125" />
          <PulseRing />
          <div className="relative z-10 w-20 h-20 rounded-full bg-[#E91E8C] flex items-center justify-center shadow-lg shadow-pink-300">
            <CheckIcon />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center leading-tight">
          Thank You for Your Generous Donation!
        </h1>

        {/* Body */}
        <p className="text-gray-500 text-center text-base leading-relaxed max-w-sm">
          Your support helps{" "}
          <span className="font-semibold text-[#E91E8C]">PadHer With Love</span>{" "}
          provide sanitary pads and menstrual health education to young girls who need it most.
          We&apos;ve sent a confirmation email with your donation details.
        </p>

        {/* Divider */}
        <div className="w-16 h-0.5 rounded-full bg-pink-100" />

        {/* Impact stat */}
        <div className="flex gap-8 text-center">
          <div>
            <p className="text-2xl font-bold text-[#E91E8C]">10K+</p>
            <p className="text-xs text-gray-400 mt-0.5">Girls Reached</p>
          </div>
          <div className="w-px bg-gray-100" />
          <div>
            <p className="text-2xl font-bold text-[#E91E8C]">50K+</p>
            <p className="text-xs text-gray-400 mt-0.5">Pads Distributed</p>
          </div>
          <div className="w-px bg-gray-100" />
          <div>
            <p className="text-2xl font-bold text-[#E91E8C]">15+</p>
            <p className="text-xs text-gray-400 mt-0.5">Communities</p>
          </div>
        </div>

        {/* CTA button */}
        <button
          className="
            mt-2 w-full max-w-xs py-3.5 rounded-full
            bg-[#E91E8C] hover:bg-[#c91578] active:scale-95
            text-white font-semibold text-base
            transition-all duration-200 shadow-md shadow-pink-200
            focus:outline-none focus:ring-4 focus:ring-pink-300
          "
        >
          Back to Homepage
        </button>

        {/* Secondary link */}
        <a
          href="#"
          className="text-sm text-gray-400 hover:text-[#E91E8C] transition-colors underline underline-offset-2"
        >
          View donation receipt
        </a>
      </div>
    </div>
    <Footer />
    </>
  );
}
