"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import Image from "next/image";
import DataCount from "@/components/Data/Data";
import { Heart, BookOpen, Shield } from "lucide-react";

type DonationData = {
  donationAmount: string;
  donationType: string;
  donorName: string;
  donorEmail: string;
  isAnon: boolean;
};

const Page = () => {
  const [selectedAmount, setSelectedAmount] = useState<string>("");
  const [formData, setFormData] = useState<DonationData>({
    donationAmount: "",
    donationType: "",
    donorName: "",
    donorEmail: "",
    isAnon: false,
  });
  const [errors, setErrors] = useState<Partial<DonationData>>({});

  const handleDonationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    console.log(errors);
  };

  const handleSelectAmount = (amount: string) => {
    setSelectedAmount(amount);
    setFormData((prev) => ({
      ...prev,
      donationAmount: amount,
    }));
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<DonationData> = {};

    if (!formData.donationAmount) {
      newErrors.donationAmount = "Please enter the amount you want to donate.";
    }

    if (!formData.donationType) {
      newErrors.donationType = "Please select a donation type.";
    }

    if (!formData.donorName.trim()) {
      newErrors.donorName = "Name is required.";
    }

    if (!formData.donorEmail.trim()) {
      newErrors.donorEmail = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.donorEmail)) {
      newErrors.donorEmail = "Please enter a valid email address.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const submissionData = {
      donationAmount: Number(formData.donationAmount),
      donationType: formData.donationType,
      donorName: formData.donorName,
      donorEmail: formData.donorEmail,
      isAnon: formData.isAnon,
    };

    console.log("Submitting donation:", submissionData);
  };

  return (
    <div className="w-full bg-[#FFF] flex flex-col items-center justify-center overflow-hidden relative">
      <NavBar />
      <div className="h-[50dvh] w-full relative mt-[10dvh] md:mt-[20dvh]">
        <Image
          src={"/images/volunteer.png"}
          alt={""}
          fill
          className="object-cover object-[50%_25%]"
        />
        <div className="absolute w-full h-full bg-[#ED006CCC] flex flex-col items-center justify-center z-50">
          <h1
            className="text-[32px] md:text-[64px]"
            style={{
              fontFamily: "Yeseva",
            }}
          >
            Donate Now
          </h1>
          <p className="font-open font-semibold text-[16px]">
            Donate with us today!
          </p>
        </div>
      </div>
      <div className="w-full px-4 py-6 md:px-24 md:py-16 flex flex-col items-center">
        <h2 className="text-[#111111] font-extrabold font-playfair text-[32px] md:text-[56px]">
          Make Your <b className="text-[#FF00B8]">Donation</b>
        </h2>
        <p className="font-open font-normal md:font-semibold text-[12px] text-center md:text-[16px] text-[#393939CC]">
          Choose an amount that works for you. Every contribution makes a
          meaningful difference.
        </p>
        <div className="w-full md:w-[75%] flex flex-col border-1 border-[#C3C3C3] rounded-[20px] md:rounded-[40px] px-4 p-3 md:px-6 md:py-10 gap-3 md:gap-6 mt-8">
          <h6 className="text-[#111111CC] font-playfair font-bold text-[16px] md:text-[24px]">
            Choose Amount
          </h6>
          <div className="w-full flex justify-between">
            {["10", "20", "50", "100"].map((amount, idx) => (
              <span
                style={{
                  fontFamily: "Yeseva",
                }}
                className={`text-[16px] md:text-[24px] py-2 rounded-[2px_6px_2px_6px] md:rounded-[4px_12px_4px_12px] w-[23.5%] flex items-center justify-center border-1 border-[#FF07A9] text-[#FF00B8] hover:bg-[#FF07A9] hover:text-[#FFF] transition-colors ease-in-out duration-300 cursor-pointer ${
                  selectedAmount === amount
                    ? "bg-[#FF07A9] text-[#FFF] z-10"
                    : "bg-[#FFF5F9]"
                }`}
                key={idx}
                onClick={() => handleSelectAmount(amount)}
              >
                ${amount}
              </span>
            ))}
          </div>
          <form
            className="w-full flex flex-col gap-8"
            onSubmit={handleDonate}
            action=""
          >
            <label
              htmlFor="donationAmount"
              className="w-full relative flex flex-col"
            >
              <span
                style={{
                  fontFamily: "Yeseva",
                }}
                className="absolute text-[16px] text-[#393939CC] left-3 flex items-center justify-center top-3.5"
              >
                $
              </span>
              <input
                type="text"
                value={formData.donationAmount}
                name="donationAmount"
                onChange={handleDonationChange}
                placeholder={"Custom Amount"}
                className="w-full pl-6 py-3 bg-[#FAFAFA] border-1 border-[#8A8C8E] rounded-[12px] outline-none focus:border-1 focus:border-[#ED006C33] placeholder:text-[#39393980] placeholder:font-open placeholder:text-[16px] text-[#111111] font-playfair text-[16px]"
              />
              {errors.donationAmount && (
                <p className="text-[12px] text-[red] font-open">
                  *{errors.donationAmount}
                </p>
              )}
            </label>

            <div className="w-full flex flex-col gap-6">
              <h4 className="font-playfair font-bold text-[#111111CC] text-[16px] md:text-[24px]">
                Donation Type
              </h4>
              <div className="w-full flex flex-col md:flex-row md:items-center gap-8">
                {[
                  { value: "one-time", label: "One-time donation" },
                  { value: "monthly", label: "Monthly Donation" },
                ].map((item) => (
                  <div
                    key={item.value}
                    className="radio flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="donationType"
                      value={item.value}
                      checked={formData.donationType === item.value}
                      onChange={handleDonationChange}
                      className=""
                    />
                    <label
                      className="text-[12px] md:text-[16px] font-open text-[#121212]"
                      htmlFor=""
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
              {errors.donationType && (
                <p className="text-[12px] text-[red] -mt-3 font-open">
                  *{errors.donationType}
                </p>
              )}
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <label
                htmlFor="donorName"
                className="flex flex-col gap-2 text-[#121212] text-[12px] md:text-[16px] font-open"
              >
                Full Name
                <input
                  type="text"
                  name="donorName"
                  value={formData.donorName}
                  placeholder="Enter your full name"
                  onChange={handleDonationChange}
                  className="w-full px-2 py-1.5 md:px-4 md:py-3 bg-[#FAFAFA] border-1 border-[#8A8C8E] rounded-[12px] outline-none focus:border-1 focus:border-[#ED006C33] placeholder:text-[#39393980] placeholder:font-open placeholder:text-[12px] md:placeholder:text-[16px] text-[#111111] font-playfair text-[16px]"
                />
                {errors.donorName && (
                  <p className="text-[12px] text-[red] font-open">
                    *{errors.donorName}
                  </p>
                )}
              </label>
              <label
                htmlFor="donorEmail"
                className="flex flex-col gap-2 text-[#121212] text-[12px] md:text-[16px] font-open"
              >
                Email Address
                <input
                  type="text"
                  name="donorEmail"
                  value={formData.donorEmail}
                  placeholder="Enter your email address"
                  onChange={handleDonationChange}
                  className="w-full px-2 py-1.5 md:px-4 md:py-3 bg-[#FAFAFA] border-1 border-[#8A8C8E] rounded-[12px] outline-none focus:border-1 focus:border-[#ED006C33] placeholder:text-[#39393980] placeholder:font-open placeholder:text-[12px] md:placeholder:text-[16px] text-[#111111] font-playfair text-[16px]"
                />
                {errors.donorEmail && (
                  <p className="text-[12px] text-[red] font-open">
                    *{errors.donorEmail}
                  </p>
                )}
              </label>
            </div>
            <label
              className="text-[#393939] text-[12px] md:text-[16px] font-open flex items-center"
              htmlFor="isAnon"
            >
              <input
                type="checkbox"
                name="isAnon"
                checked={formData.isAnon}
                onChange={handleDonationChange}
                className="mr-2 w-4 h-4 border-1 border-[#FF00B8] rounded-[6px] checked:bg-[#FF00B8]"
              />
              Make this donation anonymous
            </label>
            <div className="w-full flex justify-center items-center">
              <button className="button" type="submit">
                Donate{" "}
                {formData.donationAmount && <>${formData.donationAmount}</>} now
              </button>
            </div>
          </form>
        </div>
      </div>
      <DataCount />
      <div className="w-full px-4 md:px-24 py-6 mdz:py-16 flex flex-col items-center">
        <h2
          style={{
            fontFamily: "Yeseva",
          }}
          className="text-[28px] md:text-[48px] text-[#111111] "
        >
          Your <span className="text-[#FF07A9]">Impact</span> in Action
        </h2>
        <p className="font-open text-[#393939] text-[12px] text-center md:text-[16px]">
          See exactly how your donation translates into real change for girls
          and communities.
        </p>
        <div className={"w-3/4 grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"}>
          <div className="w-full flex flex-col items-center gap-4 px-2 py-2 md:px-8 md:py-4 border-1 border-[#E7E7E7] rounded-[4px_20px_4px_20px] md:rounded-[8px_60px_8px_60px]">
            <span className="w-15 h-15 flex items-center justify-center rounded-full bg-[#8C89EE]">
              <Heart size={30} color="#FFF" />
            </span>
            <h6
              style={{
                fontFamily: "Yeseva",
              }}
              className="font-[24px] text-[#393939]"
            >
              $10
            </h6>
            <p className="text-center text-[12px] md:text-[16px] text-[#393939CC] font-open">
              Provides a 6-month supply of sanitary pads for one girl, ensuring
              she never misses school due to her period.
            </p>
            <span className="px-2 py-1 font-open font-semibold text-[#8C89EE] text-[10px] md:text-[14px] rounded-[16px] bg-[#8C89EE33]">
              Basic Support
            </span>
          </div>
          <div className="w-full flex flex-col items-center gap-4 px-2 py-2 md:px-8 md:py-4 border-1 border-[#E7E7E7] rounded-[4px_20px_4px_20px] md:rounded-[8px_60px_8px_60px]">
            <span className="w-15 h-15 flex items-center justify-center rounded-full bg-[#B351BC]">
              <BookOpen size={30} color="#FFF" />
            </span>
            <h6
              style={{
                fontFamily: "Yeseva",
              }}
              className="font-[24px] text-[#393939]"
            >
              $50
            </h6>
            <p className="text-center text-[12px] md:text-[16px] text-[#393939CC] font-open">
              Funds educational workshops for 20 girls, providing crucial
              knowledge about menstrual health and hygiene.
            </p>
            <span className="px-2 py-1 font-open font-semibold text-[#B351BC] text-[10px] md:text-[14px] rounded-[16px] bg-[#B351BC33]">
              Education Package
            </span>
          </div>
          <div className="w-full flex flex-col items-center gap-4 px-2 py-2 md:px-8 md:py-4 border-1 border-[#E7E7E7] rounded-[4px_20px_4px_20px] md:rounded-[8px_60px_8px_60px]">
            <span className="w-15 h-15 flex items-center justify-center rounded-full bg-[#FF67E3]">
              <Image
                src={"/svgs/donate-svg.svg"}
                alt=""
                width={30}
                height={30}
              />
            </span>
            <h6
              style={{
                fontFamily: "Yeseva",
              }}
              className="font-[24px] text-[#393939]"
            >
              $100
            </h6>
            <p className="text-center text-[12px] md:text-[16px] text-[#393939CC] font-open">
              Supports a complete community outreach program, reaching 50+ girls
              with products and education.
            </p>
            <span className="px-2 py-1 font-open font-semibold text-[#FF67E3] text-[10px] md:text-[14px] rounded-[16px] bg-[#FF67E333]">
              Community Impact
            </span>
          </div>
        </div>
      </div>
      <div
        className={"w-full bg-[#FFFAFC] flex flex-col items-center px-4 py-6 md:px-24 md:py-16"}
      >
        <h2 className="font-playfair font-extrabold text-[28px] text-center md:text-[56px] text-[#111111]">
          Why Your <span className="text-[#FF07A9]">Donation</span> Matters
        </h2>
        <p className="font-open text-[#393939] text-[12px] md:text-[16px] md:w-1/2 text-center">
          Period poverty is a real issue affecting millions of girls worldwide.
          Your support helps us tackle this problem head-on.
        </p>
        <div className="w-[90%] md:w-[70%] relative h-auto md:h-[60dvh] flex flex-col gap-8 md:flex-row items-center justify-between mt-12">
          <span className="bg-[#FFE9F9] w-30 h-30 rounded-[4px] absolute -left-5 -top-5 md:-left-10 md:-top-10"></span>
          <span className="bg-[#EDE2F5] w-30 h-30 rounded-[4px] absolute left-52 top-60 md:left-100 md:-bottom-10"></span>
          <div className="relative w-full md:w-[54%] h-[50dvh] md:h-full overflow-hidden rounded-[40px_8px_40px_8px]">
            <span className="absolute right-0 w-1/2 h-full border-l-[16px] z-10 border-[#FFF]"></span>
            <span className="absolute right-0 w-full h-1/2 border-b-[16px] z-10 border-[#FFF]"></span>
            <Image
              src={"/images/heart-image.png"}
              alt={""}
              fill
              priority
              className="object-cover object-[50%_70%]"
            />
          </div>
          <div className="w-full md:w-[44%] z-20 flex flex-col gap-4 mt-8">
            <div className="w-full flex items-center justify-between group hover:shadow-[0px_8px_16px_0px_#0000001A] hover:bg-[#ED006C] p-4 rounded-[24px] transition-all duration-200 shadow-[0px_8px_16px_0px_#0000001A] md:shadow-none">
              <span
                className="h-10 w-10 group-hover:bg-[#FFF] rounded-full flex items-center justify-center text-[#111111] group-hover:text-[#ED006C] text-[24px]"
                style={{ fontFamily: "Yeseva" }}
              >
                1
              </span>
              <div className="w-[85%] flex flex-col gap-1">
                <h6
                  className="text-[16px] text-[#111111] group-hover:text-[#FFF] leading-[20px]"
                  style={{ fontFamily: "Yeseva" }}
                >
                  Breaking Educational Barriers
                </h6>
                <p className="text-[12px] text-[#393939] group-hover:text-[#FFF] leading-[16px] font-open">
                  1 in 4 girls miss school during their period due to lack of
                  access to menstrual products. Your donation keeps girls in
                  school.
                </p>
              </div>
            </div>
            <div className="w-full flex items-center justify-between group hover:shadow-[0px_8px_16px_0px_#0000001A] hover:bg-[#ED006C] p-4 rounded-[24px] transition-all duration-200 shadow-[0px_8px_16px_0px_#0000001A] md:shadow-none">
              <span
                className="h-10 w-10 group-hover:bg-[#FFF] rounded-full flex items-center justify-center text-[#111111] group-hover:text-[#ED006C] text-[24px]"
                style={{ fontFamily: "Yeseva" }}
              >
                2
              </span>
              <div className="w-[85%] flex flex-col gap-1">
                <h6
                  className="text-[16px] text-[#111111] group-hover:text-[#FFF] leading-[20px]"
                  style={{ fontFamily: "Yeseva" }}
                >
                  Reducing Stigma
                </h6>
                <p className="text-[12px] text-[#393939] group-hover:text-[#FFF] leading-[16px] font-open">
                  Our education programs help normalize menstruation and break
                  down harmful myths and taboos in communities.
                </p>
              </div>
            </div>
            <div className="w-full flex items-center justify-between group hover:shadow-[0px_8px_16px_0px_#0000001A] hover:bg-[#ED006C] p-4 rounded-[24px] transition-all duration-200 shadow-[0px_8px_16px_0px_#0000001A] md:shadow-none">
              <span
                className="h-10 w-10 group-hover:bg-[#FFF] rounded-full flex items-center justify-center text-[#111111] group-hover:text-[#ED006C] text-[24px]"
                style={{ fontFamily: "Yeseva" }}
              >
                3
              </span>
              <div className="w-[85%] flex flex-col gap-1">
                <h6
                  className="text-[16px] text-[#111111] group-hover:text-[#FFF] leading-[20px]"
                  style={{ fontFamily: "Yeseva" }}
                >
                  Building Confidence
                </h6>
                <p className="text-[12px] text-[#393939] group-hover:text-[#FFF] leading-[16px] font-open">
                  Access to proper menstrual products and education gives girls
                  the confidence to pursue their dreams without interruption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 py-6 md:px-24 md:py-16 flex flex-col items-center bg-[#FFF]">
        <div className="flex flex-col items-end">
          <h2
            className="text-[#111111] text-[28px] md:text-[48px]"
            style={{
              fontFamily: "Yeseva",
            }}
          >
            Complete <span className="text-[#111111CC]">Transparency</span>
          </h2>
          <Image
            src={"/svgs/Vector-1.svg"}
            alt="Vector"
            width={300}
            height={18}
            className="-mt-2 m:-mt-4.5 transform scale-x-[-1] w-45"
          />
        </div>
        <p className="font-open text-center w-full text-[12px] md:text-[16px] md:w-[45%] text-[#393939]">
          We believe in full transparency. Here&apos;s exactly how your donations are
          used to create maximum impact.
        </p>
        <div className="w-[80%] grid grid-cols-1 md:grid-cols-3 gap-8 mt-15">
          <div className="w-full flex flex-col gap-3 py-2 md:py-6 items-center rounded-[8px_60px_8px_60px] border-1 border-[#E7E7E7] bg-[#FFF6FC] rotate-4">
            <h3
              className="text-[24px] md:text-[40px] text-[#E11B9F] "
              style={{
                fontFamily: "Yeseva",
              }}
            >
              75%
            </h3>
            <span
              style={{
                fontFamily: "Yeseva",
              }}
              className="text-[#393939] text-[16px] md:text-[24px]"
            >
              Direct Program
            </span>
            <p className="font-open text-[#393939CC] text-[12px] md:text-[16px] text-center w-2/3">
              Product procurement, distribution, and educational workshops
            </p>
          </div>
          <div className="w-full flex flex-col gap-3 py-2 md:py-6 items-center rounded-[8px_60px_8px_60px] border-1 border-[#E7E7E7] bg-[#FCEFF4] rotate-2">
            <h3
              className="text-[24px] md:text-[40px] text-[#EA2A74] "
              style={{
                fontFamily: "Yeseva",
              }}
            >
              15%
            </h3>
            <span
              style={{
                fontFamily: "Yeseva",
              }}
              className="text-[#393939] text-[16px] md:text-[24px]"
            >
              Operations
            </span>
            <p className="font-open text-[#393939CC] text-[12px] md:text-[16px] text-center w-2/3">
              Staff salaries, office expenses, and program coordination
            </p>
          </div>
          <div className="w-full flex flex-col gap-3 py-2 md:py-6 items-center rounded-[8px_60px_8px_60px] border-1 border-[#E7E7E7] bg-[#FCF8FF] -rotate-4">
            <h3
              className="text-[24px] md:text-[40px] text-[#9725EC] "
              style={{
                fontFamily: "Yeseva",
              }}
            >
              10%
            </h3>
            <span
              style={{
                fontFamily: "Yeseva",
              }}
              className="text-[#393939] text-[16px] md:text-[24px]"
            >
              Fundraising
            </span>
            <p className="font-open text-[#393939CC] text-[12px] md:text-[16px] text-center w-2/3">
              Marketing, events, and donor engagement activities
            </p>
          </div>
        </div>
        <span className="flex gap-2 items-center mt-15">
          <Shield size={20} color="#393939" />
          <p className="text-[#393939] font-open capitalize text-[12px] md:text-[16px] ">
            All donations are secured with SSL encryption
          </p>
        </span>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
