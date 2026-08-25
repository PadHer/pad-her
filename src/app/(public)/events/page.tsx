"use client";

import { useMemo, useState } from "react";
import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import React from "react";
import Captures from "@/components/Captures/Captures";
import FAQs from "@/components/FAQs/FAQs";
import Stories from "@/components/Stories/Stories";
import PartnerShip from "@/components/PartnerShip/PartnerShip";
import Image from "next/image";
import { MapPin } from "lucide-react";
import EventForm from "@/components/Modals/EventForm";
import { Event, usePublicEvents } from "@/hooks/use-events";
import { format } from "date-fns";



const EventCardsSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="w-full flex flex-col gap-4">
          <div className="w-full h-[35dvh] rounded-[60px_8px_60px_8px] bg-gray-200 animate-pulse" />

          <div className="flex flex-col gap-3">
            <div className="h-8 w-32 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-6 w-3/4 rounded bg-gray-200 animate-pulse" />
            <div className="h-5 w-1/2 rounded bg-gray-200 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

const Page = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const { data: events, isLoading } = usePublicEvents();

  const handleClickApply = (event: Event) => {
    setSelectedEvent(event);
    setFormOpen(true);
  };

  const { upcomingEvents, pastEvents } = useMemo(() => {
    if (!events) {
      return {
        upcomingEvents: [],
        pastEvents: [],
      };
    }

    const now = new Date();

    return {
      upcomingEvents: events.filter((event) => new Date(event.date) >= now),
      pastEvents: events.filter((event) => new Date(event.date) < now),
    };
  }, [events]);

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
      <div className="flex flex-col w-full py-10 px-4 md:py-22.5 md:px-30 gap-8">
        <h2
          style={{ fontFamily: "Yeseva" }}
          className="text-4xl text-[#393939]"
        >
          <span className="text-[#ED006C]">Upcoming</span> Events
        </h2>

        {isLoading ? (
          <EventCardsSkeleton count={3} />
        ) : upcomingEvents.length === 0 ? (
          <div className="w-full py-16 flex flex-col items-center justify-center text-center">
            <h3
              className="text-2xl text-[#393939]"
              style={{ fontFamily: "Yeseva" }}
            >
              No events right now
            </h3>

            <p className="mt-2 max-w-md text-sm text-[#39393999] font-open">
              We don&apos;t have any upcoming events at the moment. Check back later
              for new opportunities to join the movement.
            </p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((ev) => (
              <section key={ev.id} className="w-full flex flex-col gap-4">
                <div className="w-full h-[35dvh] relative">
                  <Image
                    src={ev.imageUrl ?? "/images/hero-1.png"}
                    alt={ev.title}
                    fill
                    className="object-cover object-center rounded-[60px_8px_60px_8px]"
                  />
                </div>

                <div className="w-full flex flex-col gap-2">
                  <div className="flex w-full items-center gap-4">
                    <button
                      onClick={() => handleClickApply(ev)}
                      className="rounded-3xl px-6 py-2 cursor-pointer text-[#FFF5F9] text-[12px]"
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
                      {format(new Date(ev.date), "MMM dd, yyyy")}
                    </span>
                  </div>

                  <h3
                    className="text-[20px] text-[#000000]"
                    style={{ fontFamily: "Yeseva" }}
                  >
                    {ev.title}
                  </h3>

                  <span
                    className="text-[#FF07A9] text-[12px] md:text-[16px] flex items-center gap-2"
                    style={{ fontFamily: "OpenSans" }}
                  >
                    <MapPin size={16} />
                    {ev.location}
                  </span>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col w-full px-4 md:px-30 py-10 gap-8">
        <h2
          style={{ fontFamily: "Yeseva" }}
          className="text-4xl text-[#393939]"
        >
          Past Events
        </h2>

        {isLoading ? (
          <EventCardsSkeleton count={3} />
        ) : pastEvents.length === 0 ? (
          <div className="w-full py-12 flex items-center justify-center">
            <p className="text-sm text-[#39393999] font-open">
              No past events yet.
            </p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastEvents.map((ev) => (
              <section key={ev.id} className="w-full flex flex-col gap-4">
                <div className="w-full h-[35dvh] relative">
                  <Image
                    src={ev.imageUrl ?? "/images/hero-1.png"}
                    alt={ev.title}
                    fill
                    className="object-cover object-center rounded-[60px_8px_60px_8px]"
                  />
                </div>

                <div className="w-full flex flex-col gap-2">
                  <h3
                    className="text-[20px] text-[#000000]"
                    style={{ fontFamily: "Yeseva" }}
                  >
                    {ev.title}
                  </h3>

                  <span
                    className="text-[#FF07A9] text-[12px] md:text-[16px] flex items-center gap-2"
                    style={{ fontFamily: "OpenSans" }}
                  >
                    <MapPin size={16} />
                    {ev.location}
                  </span>

                  <span
                    className="text-sm text-[#393939] font-bold"
                    style={{ fontFamily: "OpenSans" }}
                  >
                    {format(new Date(ev.date), "MMM dd, yyyy")}
                  </span>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
      {formOpen && selectedEvent && (
        <EventForm
          selectedEvent={selectedEvent}
          onClose={() => {
            setFormOpen(false);
            setSelectedEvent(null);
          }}
        />
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
