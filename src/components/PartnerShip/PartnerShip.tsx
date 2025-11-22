"use client";

import React, { useState } from "react";
import Image from "next/image";

type FormData = {
  fullName: string;
  organisation: string;
  emailAddress: string;
  phoneNumber: string;
  typeOfEnquiry: string;
  website: string;
  message: string;
};
const PartnerShip = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    organisation: "",
    emailAddress: "",
    phoneNumber: "",
    typeOfEnquiry: "",
    website: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    console.log(errors);
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Enter a valid email address";
    }
    if (!formData.typeOfEnquiry.trim()) {
      newErrors.typeOfEnquiry = "Please enter your type of enquiry"
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    }

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setFormData({
      fullName: "",
      organisation: "",
      emailAddress: "",
      phoneNumber: "",
      typeOfEnquiry: "",
      website: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <div className="w-full flex flex-col md:flex-row relative py-4 md:py-[70px] p-4 md:px-24 gap-8 md:justify-between bg-[#FFF]">
      <Image
        src={"/svgs/Vector-3.svg"}
        alt=""
        width={150}
        height={600}
        className="absolute top-0 right-0"
      />
      <div className="w-full md:w-[45%] flex flex-col gap-4">
        <span
          className="w-full relative text-[#111111] text-[48px] leading-[46px]"
          style={{ fontFamily: "Yeseva" }}
        >
          <h2>Partner or</h2>
          <h2 className="text-[#11111199] w-3/4 md:w-full">Sponsor With Us</h2>
          <Image
            src={"/svgs/Vector-4.svg"}
            alt=""
            width={180}
            height={20}
            className="absolute right-40"
          />
        </span>
        <p
          className="text-[#393939] text-[16px] mt-8 md:mt-0"
          style={{ fontFamily: "OpenSans" }}
        >
          We&apos;re always excited to welcome partners and sponsors who share our
          passion for empowering young girls and ending period poverty. If
          you&apos;re interested in collaborating with us whether through corporate
          sponsorship, resource donations, community partnerships, or
          volunteering support, please reach out by filling the form.
        </p>
        <div className="w-full h-[45dvh] object-cover object-bottom md:h-[480px] relative">
          <Image src={"/images/Contact.png"} alt="" fill />
        </div>
      </div>
      <form className="w-full md:w-[45%] flex flex-col gap-2" onSubmit={handleSubmit}>
        <label className="label" htmlFor="">
          Full Name
          <span className="name left-0 ml-5 md:ml-0">*</span>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
          />
          {errors.fullName && (
            <p className="text-[12px] text-[red]">*{errors.fullName}</p>
          )}
        </label>
        <label className="label" htmlFor="">
          Organisation Name
          <input
            type="text"
            name="organisation"
            value={formData.organisation}
            onChange={handleChange}
            placeholder="Enter organistation name"
          />
        </label>
        <label className="label" htmlFor="">
          Email Address
          <span className="email ml-10 md:ml-0">*</span>
          <input
            type="text"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleChange}
            placeholder="Enter email address"
          />
          {errors.emailAddress && (
            <p className="text-[12px] text-[red]">*{errors.emailAddress}</p>
          )}
        </label>
        <label className="label" htmlFor="">
          Phone Number (Optional)
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </label>
        <label className="label" htmlFor="">
          Type of Inquiry
          <span className="ml-10 md:ml-0">*</span>
          <input
            type="text"
            name="typeOfEnquiry"
            value={formData.typeOfEnquiry}
            onChange={handleChange}
            placeholder="Enter here (e.g Sponsorship, Donation, partnership, other)"
          />
          {errors.typeOfEnquiry && (
            <p className="text-[12px] text-[red]">*{errors.typeOfEnquiry}</p>
          )}
        </label>
        <label className="label" htmlFor="">
          Website/Social Handle (Optional)
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Enter URL"
          />
        </label>
        <label className="label" htmlFor="">
          Message
          <textarea
            onChange={handleChange}
            name="message"
            value={formData.message}
            placeholder="Enter message"
          ></textarea>
          {errors.message && (
            <p className="text-[12px] text-[red]">*{errors.message}</p>
          )}
        </label>
        <label htmlFor="">
          <button className="button" type="submit">
            Send Message
          </button>
        </label>
      </form>
    </div>
  );
};

export default PartnerShip;
