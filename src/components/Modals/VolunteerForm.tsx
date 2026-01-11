"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import SuccessModal from "./SuccessModal";

type FormData = {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  interest: string;
  whyVolunteer: string;
  isAgree: boolean;
};

type FormErrors = {
  fullName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  interest?: string;
  whyVolunteer?: string;
  isAgree?: string;
};

interface FormProps {
  onClose: () => void;
}

const VolunteerForm = ({ onClose }: FormProps) => {
  const [volunteerForm, setVolunteerForm] = useState<FormData>({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    interest: "",
    whyVolunteer: "",
    isAgree: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSucces] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    setVolunteerForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!volunteerForm.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!volunteerForm.emailAddress.trim()) {
      newErrors.emailAddress = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(volunteerForm.emailAddress)) {
      newErrors.emailAddress = "Enter a valid email address";
    }
    if (!volunteerForm.interest.trim()) {
      newErrors.interest = "Please select your area of interest";
    }
    if (!volunteerForm.whyVolunteer.trim()) {
      newErrors.whyVolunteer = "Message cannot be empty";
    }
    if (!volunteerForm.isAgree) {
      newErrors.isAgree = "You must agree before submitting";
    }
    return newErrors;
  };

  if (loading) return;

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    const submissionData = {
      fullName: volunteerForm.fullName,
      emailAddress: volunteerForm.emailAddress,
      phoneNumber: volunteerForm.phoneNumber,
      interest: volunteerForm.interest,
      whyVolunteer: volunteerForm.whyVolunteer,
      isAgree: volunteerForm.isAgree,
    };

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
      const data = await res.json();

      if (res.ok) {
        setIsSucces(true);
        setLoading(false);
        setVolunteerForm({
          fullName: "",
          emailAddress: "",
          phoneNumber: "",
          interest: "",
          whyVolunteer: "",
          isAgree: false,
        });
        setErrors({});
      } else {
        alert(data.error || "Volunteer Registration failed.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      onClick={onClose}
      className="h-screen w-full inset-0 bg-[#00000099] z-999 fixed flex items-center justify-center top-0 left-0"
    >
      {isSuccess && (
        <SuccessModal
          title="Thank You for Signing Up!"
          message="We’re excited to have you join the PadHer With Love volunteer community. Our team will review your application and reach out with next steps soon."
          primary="Back to Homepage"
          secondary="Explore Events"
          onClose={() => setIsSucces(false)}
        />
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-5/6 md:w-2/3 py-4 md:px-10 md:grid grid-cols-2 grid-rows-1 gap-4 shadow-[#0000001F] bg-[#FFFFFF] rounded-4xl"
      >
        <div className="w-full hidden lg:flex relative h-auto bg-[#9D9D9D] rounded-[24px] overflow-hidden"></div>
        <form
          className="w-full flex flex-col gap-4 px-8 md:px-0"
          action=""
          onSubmit={handleSubmitForm}
        >
          <span
            className="text-[#000000] flex items-center gap-4 cursor-pointer font-open font-light text-[16px] capitalize"
            onClick={onClose}
          >
            <ArrowLeft size={20} color="#000000" />
            back
          </span>
          <h4
            className="text-[#ED006C] text-[40px] leading-10"
            style={{ fontFamily: "Yeseva" }}
          >
            Get Involved <span className="text-[#393939]">with us</span>
          </h4>
          <p className="font-open text-[#393939] text-[16px] -mt-4">
            Kindly fill the right information in the form below.
          </p>
          <label className="vol-label" htmlFor="fullName">
            Full Name
            <span className="name left-0 ml-5 md:ml-4">*</span>
            <input
              type="text"
              name="fullName"
              value={volunteerForm.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
            />
            {errors.fullName && (
              <p className="text-[12px] text-[red] absolute left-0 -bottom-4.5">
                *{errors.fullName}
              </p>
            )}
          </label>
          <label className="vol-label" htmlFor="emailAddress">
            Email Address
            <span className="email ml-10 md:ml-8">*</span>
            <input
              type="text"
              name="emailAddress"
              value={volunteerForm.emailAddress}
              onChange={handleChange}
              placeholder="Enter email address"
            />
            {errors.emailAddress && (
              <p className="text-[12px] text-[red] absolute left-0 -bottom-4.5">
                *{errors.emailAddress}
              </p>
            )}
          </label>
          <label className="vol-label" htmlFor="">
            Phone Number
            <span className="name left-0 ml-5 md:ml-14">*</span>
            <input
              type="text"
              name="phoneNumber"
              value={volunteerForm.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </label>
          <label className="vol-label" htmlFor="">
            Area(s) of Interest
            <span className="ml-10 md:ml-13">*</span>
            <input
              type="text"
              name="interest"
              value={volunteerForm.interest}
              onChange={handleChange}
              placeholder="Select here"
            />
            {errors.interest && (
              <p className="text-[12px] text-[red] absolute left-0 -bottom-4.5">
                *{errors.interest}
              </p>
            )}
          </label>
          <label className="vol-label" htmlFor="">
            Why do you want to volunteer with us?
            <textarea
              onChange={handleChange}
              name="whyVolunteer"
              value={volunteerForm.whyVolunteer}
              placeholder="Enter message"
            ></textarea>
            {errors.whyVolunteer && (
              <p className="text-[12px] text-[red] absolute left-0 -bottom-4.5">
                *{errors.whyVolunteer}
              </p>
            )}
          </label>
          <label
            className="text-[#121212] text-[12px] md:text-[14px] font-open flex items-start p-0 m-0 font-normal leading-[14px] mt-4"
            htmlFor="isAgree"
          >
            <input
              type="checkbox"
              onChange={handleChange}
              checked={volunteerForm.isAgree}
              name="isAgree"
              className="mr-2 w-4 h-4 border-1 border-[#FF00B8] rounded-[6px] checked:bg-[#FF00B8]"
            />
            I agree to be contacted by PadHer and understand my role as a
            volunteer.
          </label>
          <div className="w-full flex justify-start items-center">
            <button disabled={loading} type="submit" className="vol-button">
              {loading ? "Submiting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;
