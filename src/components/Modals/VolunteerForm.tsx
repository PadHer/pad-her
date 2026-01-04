"use client";

import React, { useState } from "react";

type FormData = {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  interest: string;
  whyVolunteer: string;
  isAgree: boolean;
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
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setVolunteerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    console.log(errors);
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};

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
    return newErrors;
  };

  const handleSubmitForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setVolunteerForm({
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      interest: "",
      whyVolunteer: "",
      isAgree: false,
    });
    setErrors({});
  };

  return (
    <div className="h-screen w-full inset-0 bg-[#00000099] z-999 fixed flex items-center justify-center top-0 left-0">
      <div className="w-auto py-8 px-20 md:grid grid-cols-2 grid-rows-1 gap-4 shadow-[#0000001F] bg-[#FFFFFF] rounded-4xl">
        <div className="w-full relative h-auto"></div>
        <form action="" onSubmit={handleSubmitForm}>
          <span
            className="text-[#000000] font-open font-light text-[16px]"
            onClick={onClose}
          >
            back
          </span>
          <h4 className="text-[#ED006C] text-[40px] " style={{ fontFamily: "Yeseva" }}>
            Get Involved <span className="text-[#393939]">with us</span>
          </h4>
          <p>Kindly fill the right information in the form below.</p>
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;
