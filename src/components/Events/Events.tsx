import Image from "next/image";
import { MapPin } from "lucide-react";
import { campaigns } from "@/data/campaigns";

const Events = () => {
  return (
    <div className="w-full flex flex-col items-center relative py-[90px] px-48 bg-[#FFFFFF]">
      <Image
        src={"/svgs/Vector-2.svg"}
        alt={""}
        width={500}
        height={400}
        className="absolute left-0 top-0"
      />
      <h1
        className="uppercase text-[#111111] text-[60px]"
        style={{ fontFamily: "Yeseva" }}
      >
        upcoming events
      </h1>
      <h4
        className="uppercase text-[#ED006C] text-[38px]"
        style={{ fontFamily: "Yeseva" }}
      >
        you can&apos;t miss
      </h4>
      <p
        className="text-center w-[70%] text-[#393939] text-4"
        style={{ fontFamily: "OpenSans" }}
      >
        Join our upcoming events and be a part of the movement to end period
        poverty. Whether you’d like to volunteer once, return as a regular
        helper, or support as a sponsor — Every action counts.
      </p>
      <div className="w-full mt-12 flex flex-row justify-between">
        {campaigns.map((camp) => (
          <section key={camp.id} className="w-[32%] flex flex-col gap-4">
            <div className="w-full h-[200px] flex flex-col relative">
              <Image
                src={camp.image}
                alt=""
                fill
                className="object-cover rounded-[60px_8px_60px_8px]"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <div className="flex w-full items-center gap-4">
                <button className="rounded-[24px] px-6 py-2 cursor-pointer text-[#FFF5F9] text-[12px]" style={{ background: "linear-gradient(180deg, #ED006C 0%, #B90D7D 100%)", fontFamily: "OpenSans-Semi"}}>Join the Movement</button>
                <span className="text-[10px] text-[#393939]" style={{fontFamily: "OpenSans"}}>{camp.date}</span>
              </div>
              <h3 className="text-[20px] text-[#000000]" style={{fontFamily: "Yeseva"}}>{camp.title}</h3>
              <span
                className="text-[#FF07A9] flex items-center gap-2"
                style={{ fontFamily: "OpenSans" }}
              >
                <MapPin />
                {camp.location}
              </span>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Events;
