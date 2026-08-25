"use client";

import { useState } from "react";
import { ArrowRight, Check, Lock } from "lucide-react";

type VolunteerRole = {
  id: string;
  title: string;
  category: string;
};

type VolunteerApplicationProps = {
  selectedRole: VolunteerRole | null;
};

const skills = [
  "Teaching",
  "Healthcare",
  "Social media",
  "Event planning",
  "Photography",
  "Fundraising",
  "Translation",
  "Community outreach",
];

const availabilityOptions = [
  "Weekday mornings",
  "Weekday evenings",
  "Weekends",
  "Remote only",
  "In-person only",
  "Either works",
];

const referralOptions = [
  "Instagram",
  "Twitter / X",
  "LinkedIn",
  "Friend or family",
  "Event",
  "Other",
];

const VolunteerApplication = ({ selectedRole }: VolunteerApplicationProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    referral: "",
    motivation: "",
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((item) => item !== skill)
        : [...prev, skill],
    );
  };

  const toggleAvailability = (option: string) => {
    setAvailability((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedRole) {
      return;
    }

    setIsSubmitting(true);

    const applicationData = {
      roleId: selectedRole.id,
      role: selectedRole.title,
      ...formData,
      skills: selectedSkills,
      availability,
    };

    console.log("Volunteer application:", applicationData);

    /*
     * Later:
     * await fetch("/api/volunteers/apply", {
     *   method: "POST",
     *   headers: {
     *     "Content-Type": "application/json",
     *   },
     *   body: JSON.stringify(applicationData),
     * });
     */

    setIsSubmitting(false);
  };

  return (
    <section
      id="volunteer-application"
      className="w-full scroll-mt-24 bg-white px-4 py-12 md:px-16 md:py-16"
    >
      <div className="mx-auto w-full max-w-4xl">
        {/* Heading */}
        <div className="mb-8">
          <p className="font-open text-[12px] font-medium uppercase tracking-[0.08em] text-[#39393999]">
            Application
          </p>

          <h2
            className="mt-2 text-[32px] text-[#111111] md:text-[48px]"
            style={{ fontFamily: "Yeseva" }}
          >
            Volunteer Application
          </h2>

          <p className="mt-2 max-w-2xl font-open text-[14px] leading-6 text-[#39393999] md:text-[15px]">
            Tell us a little about yourself and why you&apos;d like to volunteer
            with PadHer.
          </p>
        </div>

        <div className="rounded-2xl border border-[#E7E7E7] bg-white p-5 md:p-8">
          {/* Steps */}
          <div className="mb-6 flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1D9E75]">
                <Check size={13} className="text-white" />
              </span>

              <span className="font-open text-[12px] font-medium text-[#393939]">
                Choose a role
              </span>
            </div>

            <span className="text-[#AAAAAA]">›</span>

            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#1D9E75] font-open text-[11px] text-[#1D9E75]">
                2
              </span>

              <span className="font-open text-[12px] font-medium text-[#111111]">
                Your details
              </span>
            </div>

            <span className="text-[#AAAAAA]">›</span>

            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F5F5F5] font-open text-[11px] text-[#999999]">
                3
              </span>

              <span className="font-open text-[12px] text-[#999999]">
                Submit
              </span>
            </div>
          </div>

          {/* Selected role */}
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-[#E1F5EE] px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
              <Check size={16} className="text-[#0F6E56]" />
            </div>

            <div>
              <p className="font-open text-[11px] text-[#0F6E56]">
                Applying for
              </p>

              <p className="font-open text-[13px] font-semibold text-[#085041]">
                {selectedRole ? selectedRole.title : "No role selected"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("open-roles")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="ml-auto font-open text-[12px] text-[#0F6E56] underline"
            >
              Change
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Personal details */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="firstName"
                  className="font-open text-[12px] font-medium text-[#393939]"
                >
                  First name <span className="text-red-500">*</span>
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Fatima"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[#D9D9D9] px-3 py-2.5 font-open text-[14px] outline-none transition focus:border-[#1D9E75]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="lastName"
                  className="font-open text-[12px] font-medium text-[#393939]"
                >
                  Last name <span className="text-red-500">*</span>
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Bello"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[#D9D9D9] px-3 py-2.5 font-open text-[14px] outline-none transition focus:border-[#1D9E75]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="font-open text-[12px] font-medium text-[#393939]"
                >
                  Email address <span className="text-red-500">*</span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[#D9D9D9] px-3 py-2.5 font-open text-[14px] outline-none transition focus:border-[#1D9E75]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="phone"
                  className="font-open text-[12px] font-medium text-[#393939]"
                >
                  Phone{" "}
                  <span className="font-normal text-[#999999]">(optional)</span>
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#D9D9D9] px-3 py-2.5 font-open text-[14px] outline-none transition focus:border-[#1D9E75]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="location"
                  className="font-open text-[12px] font-medium text-[#393939]"
                >
                  State / city <span className="text-red-500">*</span>
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Kaduna"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-[#D9D9D9] px-3 py-2.5 font-open text-[14px] outline-none transition focus:border-[#1D9E75]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="referral"
                  className="font-open text-[12px] font-medium text-[#393939]"
                >
                  How did you hear about us?
                </label>

                <select
                  id="referral"
                  name="referral"
                  value={formData.referral}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#D9D9D9] bg-white px-3 py-2.5 font-open text-[14px] outline-none transition focus:border-[#1D9E75]"
                >
                  <option value="">Select one</option>

                  {referralOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6">
              <label className="font-open text-[12px] font-medium text-[#393939]">
                Relevant skills{" "}
                <span className="font-normal text-[#999999]">
                  (select all that apply)
                </span>
              </label>

              <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
                {skills.map((skill) => {
                  const selected = selectedSkills.includes(skill);

                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left font-open text-[12px] transition ${
                        selected
                          ? "border-[#1D9E75] bg-[#E1F5EE] text-[#085041]"
                          : "border-[#D9D9D9] text-[#666666]"
                      }`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${
                          selected
                            ? "border-[#1D9E75] bg-[#1D9E75]"
                            : "border-[#BBBBBB]"
                        }`}
                      >
                        {selected && <Check size={10} className="text-white" />}
                      </span>

                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="mt-6">
              <label className="font-open text-[12px] font-medium text-[#393939]">
                Availability <span className="text-red-500">*</span>
              </label>

              <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3">
                {availabilityOptions.map((option) => {
                  const selected = availability.includes(option);

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleAvailability(option)}
                      className={`rounded-lg border px-3 py-2.5 font-open text-[12px] transition ${
                        selected
                          ? "border-[#1D9E75] bg-[#E1F5EE] font-medium text-[#085041]"
                          : "border-[#D9D9D9] text-[#666666]"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Motivation */}
            <div className="mt-6">
              <label
                htmlFor="motivation"
                className="font-open text-[12px] font-medium text-[#393939]"
              >
                Why do you want to volunteer with PadHer?{" "}
                <span className="text-red-500">*</span>
              </label>

              <textarea
                id="motivation"
                name="motivation"
                placeholder="Tell us a bit about your motivation and any relevant experience..."
                value={formData.motivation}
                onChange={handleChange}
                required
                className="mt-1.5 min-h-30 w-full resize-y rounded-lg border border-[#D9D9D9] px-3 py-2.5 font-open text-[14px] outline-none transition focus:border-[#1D9E75]"
              />
            </div>

            {/* Footer */}
            <div className="mt-6 flex flex-col gap-4 border-t border-[#E7E7E7] pt-5 sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center font-open text-[12px] text-[#999999]">
                <Lock size={13} className="mr-1.5" />
                Your info is kept confidential
              </span>

              <button
                type="submit"
                disabled={!selectedRole || isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#ED006C] px-5 py-3 font-open text-[13px] font-semibold text-white transition hover:bg-[#C9005C] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}

                {!isSubmitting && <ArrowRight size={15} />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VolunteerApplication;
