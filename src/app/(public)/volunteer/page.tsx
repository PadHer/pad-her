"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import Captures from "@/components/Captures/Captures";
import Events from "@/components/Events/Events";
import FAQs from "@/components/FAQs/FAQs";
import Stories from "@/components/Stories/Stories";
import PartnerShip from "@/components/PartnerShip/PartnerShip";
import Image from "next/image";
import { Heart, Clock4, MapPin } from "lucide-react";
import VolunteerForm from "@/components/Modals/VolunteerForm";
import Link from "next/link";
import VolunteerSection from "@/components/VolunteerSection/VolunteerSection";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { usePublicVolunteerRoles, VolunteerRole } from "@/hooks/use-volunteer-roles";


const Page = () => {
  const [selectedRole, setSelectedRole] = useState<VolunteerRole | null>(null);
  const { data: opportunities, isLoading } = usePublicVolunteerRoles();
  
  const volunteerCategories = [
    {
      title: "Community Outreach",
      description:
        "Join our field teams to distribute pads and conduct educational workshops in underserved communities.",
      image: "/images/Image-6.png",
    },
    {
      title: "Education & Training",
      description:
        "Lead workshops on menstrual hygiene and reproductive health in schools and community centers.",
      image: "/images/Image-2.png",
    },
    {
      title: "Digital Advocacy",
      description:
        "Help us spread awareness through social media, content creation, and digital campaigns.",
      image: "/images/Image-3.png",
    },
  ];
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
            Volunteer
          </h1>
          <p className="font-open font-semibold text-[16px]">
            Get Involved with us today!
          </p>
        </div>
      </div>
      <section className="w-full bg-white px-4 py-12 md:px-16 md:py-16">
        {" "}
        <div className="mx-auto flex w-full max-w-7xl flex-col">
          {" "}
          {/* Section heading */}{" "}
          <div className="mb-8">
            {" "}
            <p className="font-open text-[12px] font-semibold uppercase tracking-[0.08em] text-[#FF07A9]">
              {" "}
              Get Involved{" "}
            </p>{" "}
            <h2
              className="mt-2 text-[32px] text-[#111111] md:text-[48px]"
              style={{ fontFamily: "Yeseva" }}
            >
              {" "}
              Volunteer Opportunities{" "}
            </h2>{" "}
            <p className="mt-2 max-w-2xl font-open text-[14px] leading-6 text-[#39393999] md:text-[15px]">
              {" "}
              There are many ways to support PadHer and contribute to our
              mission. Find an area that matches your interests, skills, and
              passion.{" "}
            </p>{" "}
          </div>{" "}
          {/* Volunteer Categories */}{" "}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {" "}
            {volunteerCategories.map((category) => (
              <article
                key={category.title}
                className="overflow-hidden rounded-2xl border border-[#E7E7E7] bg-white"
              >
                {" "}
                {/* Category image */}{" "}
                <div className="relative h-57.5 w-full">
                  {" "}
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />{" "}
                </div>{" "}
                {/* Category content */}{" "}
                <div className="flex flex-col gap-3 p-5 md:p-6">
                  {" "}
                  <h3
                    className="text-[26px] text-[#111111]"
                    style={{ fontFamily: "Yeseva" }}
                  >
                    {" "}
                    {category.title}{" "}
                  </h3>{" "}
                  <p className="font-open text-[14px] leading-6 text-[#393939CC]">
                    {" "}
                    {category.description}{" "}
                  </p>{" "}
                </div>{" "}
              </article>
            ))}{" "}
          </div>{" "}
          {/* Volunteer note + CTA */}{" "}
          <div className="mt-10 flex flex-col items-center rounded-2xl bg-[#FFFAFC] px-6 py-8 text-center md:mt-14 md:px-12 md:py-10">
            {" "}
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ED006C1A]">
              {" "}
              <HeartHandshake size={28} className="text-[#ED006C]" />{" "}
            </div>{" "}
            <h3
              className="text-[24px] text-[#111111] md:text-[28px]"
              style={{ fontFamily: "Yeseva" }}
            >
              {" "}
              Ready to make a difference?{" "}
            </h3>{" "}
            <p className="mt-2 max-w-2xl font-open text-[14px] leading-6 text-[#393939CC]">
              {" "}
              Whether you&apos;re passionate about community outreach,
              education, or digital advocacy, there&apos;s a place for you at
              PadHer. Explore our current volunteer opportunities and find a way
              to contribute your time and skills.{" "}
            </p>{" "}
            <Link
              href="#open-roles"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#ED006C] px-6 py-3 font-open text-[14px] font-semibold text-white transition hover:bg-[#C9005C]"
            >
              {" "}
              Explore Open Roles <ArrowRight size={17} />{" "}
            </Link>{" "}
          </div>{" "}
        </div>{" "}
      </section>
      <div className="w-full flex flex-col items-center bg-[#FFFAFC] px-4 md:px-24 py-12 gap-2">
        <h2 className="font-playfair text-[32px] md:text-[56px] font-extrabold text-[#111111] text-center">
          Why <b className="text-[#FF07A9]">Volunteer</b> with Us?
        </h2>
        <p className="font-open text-[16px] text-center text-[#393939CC] w-full md:w-1/3">
          Join a community of passionate individuals making a real difference in
          girls&apos; lives.
        </p>
        <div className="w-full flex flex-col md:flex-row md:justify-between items-center py-4 md:py-24 gap-4 md:gap-0">
          <div className="w-[75%] md:w-[23.5%] flex flex-col items-center gap-4 rounded-[8px_60px_8px_60px] p-4 md:p-8 bg-[#FFFFFF] rotate-4 border border-[#E7E7E7]">
            <span className="bg-[#ED006C33] flex items-center justify-center h-20 w-20 rounded-full">
              <Heart size={30} color="#ED006C" />
            </span>
            <h4
              className="text-[24px] text-[#393939]"
              style={{
                fontFamily: "Yeseva",
              }}
            >
              Make Impact
            </h4>
            <p className="text-center font-open text-[#393939CC] text-[16px]">
              Directly impact young girls&apos; lives and help break the cycle
              of period poverty.
            </p>
          </div>
          <div className="w-3/4 md:w-[23.5%] flex flex-col items-center gap-4 rounded-[8px_60px_8px_60px] p-4 md:p-8 bg-[#FFFFFF] -rotate-4 border border-[#E7E7E7]">
            <span className="bg-[#9747FF33] flex items-center justify-center h-20 w-20 rounded-full">
              <Image
                src={"/svgs/group.svg"}
                alt="Group Icon"
                width={30}
                height={30}
              />
            </span>
            <h4
              className="text-[24px] text-[#393939]"
              style={{
                fontFamily: "Yeseva",
              }}
            >
              Build Community
            </h4>
            <p className="text-center font-open text-[#393939CC] text-[16px]">
              Connect with like-minded individuals passionate about social
              change.
            </p>
          </div>
          <div className="w-3/4 md:w-[23.5%] flex flex-col items-center gap-4 rounded-[8px_60px_8px_60px] p-4 md:p-8 bg-[#FFFFFF] rotate-4 border border-[#E7E7E7]">
            <span className="bg-[#C80C8640] flex items-center justify-center h-20 w-20 rounded-full">
              <Clock4 size={30} color="#C80C86" />
            </span>
            <h4
              className="text-[24px] text-[#393939]"
              style={{
                fontFamily: "Yeseva",
              }}
            >
              Flexible Schedule
            </h4>
            <p className="text-center font-open text-[#393939CC] text-[16px]">
              Choose volunteer opportunities that fit your schedule and
              availability.
            </p>
          </div>
          <div className="w-3/4 md:w-[23.5%] flex flex-col items-center gap-4 rounded-[8px_60px_8px_60px] p-4 md:p-8 bg-[#FFFFFF] -rotate-4 border border-[#E7E7E7]">
            <span className="bg-[#219AA633] flex items-center justify-center h-20 w-20 rounded-full">
              <MapPin size={30} color="#219AA6" />
            </span>
            <h4
              className="text-[24px] text-[#393939]"
              style={{
                fontFamily: "Yeseva",
              }}
            >
              Local & Remote
            </h4>
            <p className="text-center font-open text-[#393939CC] text-[16px]">
              Volunteer both in-person and remotely, depending on your
              preference.
            </p>
          </div>
        </div>
      </div>
      <Stories />
      <div id="open-roles" className="scroll-mt-24 w-full">
        <VolunteerSection isLoading={isLoading} opportunities={opportunities ?? []} onApply={setSelectedRole} />
      </div>
      <div id="volunteer-application" className="w-full scroll-mt-24">
        <VolunteerForm opportunities={opportunities ?? []} selectedRole={selectedRole} />
      </div>
      <Events />
      <Captures />
      <FAQs />
      <div id="partnership" className="scroll-mt-24">
        <PartnerShip />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
