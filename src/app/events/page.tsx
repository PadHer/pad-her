"use client";

import { useState } from "react";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import React from "react";
import Captures from "@/components/Captures/Captures";
import FAQs from "@/components/FAQs/FAQs";
import Stories from "@/components/Stories/Stories";
import PartnerShip from "@/components/PartnerShip/PartnerShip";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { campaigns, Campaign } from "@/data/campaigns";
import EventForm from "@/components/Modals/EventForm";

const Page = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<string>('');

  const handleClickApply = (eventName: string) => {
    setSelectedEvent(eventName);
    setFormOpen(true);
  };

  return (
    <div className="w-full bg-[#FFF] flex flex-col items-center justify-center overflow-hidden relative">
      <NavBar />
      <div className="h-[50dvh] w-full relative mt-[10dvh] md:mt-[20dvh]">
        <Image
          src={"/images/event.png"}
          alt={""}
          fill
          className="object-cover object-[50%_30%]"
        />
        <div className="absolute w-full h-full bg-[#ED006CCC] flex flex-col items-center justify-center z-50">
          <h1
            className="text-[32px] md:text-[64px]"
            style={{
              fontFamily: "Yeseva",
            }}
          >
            Events
          </h1>
          <p className="font-open font-normal w-3/4 md:w-1/4 text-center text-white text-[16px]">
            Join our upcoming events and be a part of the movement to end period
            poverty.
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full py-10 px-4 md:py-[90px] md:px-30 gap-8">
        <h2
          style={{
            fontFamily: "Yeseva",
          }}
          className="text-4xl text-[#393939]"
        >
          <span className="text-[#ED006C]">Upcoming</span> Events
        </h2>
        <div className="w-full flex flex-col md:flex-row md:justify-between gap-8">
          {campaigns.map((camp) => (
            <section
              key={camp.id}
              className="w-full md:w-[32%] flex flex-col gap-4"
            >
              <div className="w-full h-[35dvh] md:h-[35dvh] flex flex-col relative">
                <Image
                  src={camp.image}
                  alt=""
                  fill
                  className="object-cover object-center rounded-[60px_8px_60px_8px]"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="flex w-full items-center gap-4">
                    <button
                      onClick={() => handleClickApply(camp.title)}
                    className="rounded-[24px] px-6 py-2 cursor-pointer text-[#FFF5F9] text-[12px]"
                    style={{
                      background:
                        "linear-gradient(180deg, #ED006C 0%, #B90D7D 100%)",
                      fontFamily: "OpenSans-Semi",
                    }}
                  >
                    Join the Movement
                  </button>
                  <span
                    className="text-[14px] text-[#393939]"
                    style={{ fontFamily: "OpenSans" }}
                  >
                    {camp.date}
                  </span>
                </div>
                <h3
                  className="text-[20px] text-[#000000]"
                  style={{ fontFamily: "Yeseva" }}
                >
                  {camp.title}
                </h3>
                <span
                  className="text-[#FF07A9] text-[12px] md:text-[16px] flex items-center gap-2"
                  style={{ fontFamily: "OpenSans" }}
                >
                  <MapPin size={16} />
                  {camp.location}
                </span>
              </div>
            </section>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full px-4 md:px-30 gap-8">
        <h2
          style={{
            fontFamily: "Yeseva",
          }}
          className="text-4xl text-[#393939]"
        >
          Past Events
        </h2>
        <div className="w-full flex flex-col md:flex-row md:justify-between gap-8">
          {campaigns.map((camp) => (
            <section
              key={camp.id}
              className="w-full md:w-[32%] flex flex-col gap-4"
            >
              <div className="w-full h-[35dvh] md:h-[35dvh] flex flex-col relative">
                <Image
                  src={camp.image}
                  alt=""
                  fill
                  className="object-cover object-center rounded-[60px_8px_60px_8px]"
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                
                <h3
                  className="text-[20px] text-[#000000]"
                  style={{ fontFamily: "Yeseva" }}
                >
                  {camp.title}
                </h3>
                <span
                  className="text-[#FF07A9] text-[12px] md:text-[16px] flex items-center gap-2"
                  style={{ fontFamily: "OpenSans" }}
                >
                  <MapPin size={16} />
                  {camp.location}
                </span>
                <span
                    className="text-sm text-[#393939] font-bold"
                    style={{ fontFamily: "OpenSans" }}
                  >
                    {camp.date}
                  </span>
              </div>
            </section>
          ))}
        </div>
      </div>
      {formOpen && (
        <EventForm onClose={() => setFormOpen(false)} eventName={selectedEvent}/>
      )}
      <Captures />
      <Stories />
      <FAQs />
      <div id="partnership" className="scroll-mt-24">
        <PartnerShip />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
