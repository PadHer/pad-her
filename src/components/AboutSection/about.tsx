import Image from "next/image";

const About = () => {
  return (
    <div className="w-full bg-[#FFFFFF] flex justify-center items-center px-[100px] py-[80px]">
      <div className="w-full bg-[#FFFAFC] flex flex-row rounded-[40px] p-8 overflow-hidden">
        <section className="w-1/2 flex flex-col gap-4">
          <h3
            className="text-[48px] p-0 m-0 text-[#111111]"
            style={{ fontFamily: "Yeseva" }}
          >
            About <br /> Pad<span className="text-pink-600">Her</span>
          </h3>
          <p className="text-[#393939] text-[24px] w-[90%]">
            PadHer With Love is a nonprofit initiative committed to ending
            period poverty by equipping young girls with free sanitary pads,
            menstrual health education, and compassionate support. We believe
            every girl deserves dignity, confidence, and equal opportunity—no
            matter her background.
          </p>
        </section>
        <section className="w-1/2 relative">
          <aside
            className="bg-[#6DC6C9] w-1/2 rounded-[40px] py-[12px] px-[24px] flex flex-row items-center gap-6 absolute"
            style={{
              transform: "rotate(-15deg)",
              top: "80%",
              left: "20%"
            }}
          >
            <span 
            className="bg-[#FDFDFD40] h-[40px] w-[40px] flex justify-center items-center rounded-full">
              <Image
                src={"/svgs/Vector.svg"}
                alt="svg"
                width={24}
                height={24}
                priority
              />
            </span>
            <p
              className="text-white text-[24px]"
              style={{ fontFamily: "OpenSans-Semi" }}
            >
              Volunteer-Led
            </p>
          </aside>
          <aside 
          className="bg-[#8C89EE] w-[65%] rounded-[40px] py-[12px] px-[24px] flex flex-row items-center gap-6 absolute"
          style={{
                transform: "rotate(-15deg)",
                top: "25%",
                left: "43%",
            }}
          >
            <span className="bg-[#FDFDFD40] h-[40px] w-[40px] flex justify-center items-center rounded-full">
              <Image
                src={"/svgs/donate.svg"}
                alt="donate-svg"
                width={24}
                height={24}
                priority
              />
            </span>
            <p
              className="text-white text-[24px]"
              style={{ fontFamily: "OpenSans-Semi" }}
            >
              Transparent Donations
            </p>
          </aside>
          <aside className="bg-[#FF67E3] w-[55%] rounded-[40px] py-[12px] px-[24px] flex flex-row items-center gap-6 absolute"
          style={{
            transform: "rotate(15deg)",
            top: "60%",
            left: "55%"
          }}
          >
            <span className="bg-[#FDFDFD40] h-[40px] w-[40px] flex justify-center items-center rounded-full">
              <Image
                src={"/svgs/check.svg"}
                alt="check-svg"
                width={24}
                height={24}
                priority
              />
            </span>
            <p
              className="text-white text-[24px]"
              style={{ fontFamily: "OpenSans-Semi" }}
            >
              Grassroot Impact
            </p>
          </aside>
          <aside className="bg-[#B451BC] w-[1/2] rounded-[40px] py-[12px] px-[24px] flex flex-row items-center gap-6 absolute" style={{
            transform: "rotate(15deg)",
            top: "50%",
            left: "-5%",

          }}>
            <span className="bg-[#FDFDFD40] h-[40px] w-[40px] flex justify-center items-center rounded-full">
              <Image
                src={"/svgs/location.svg"}
                alt="location-svg"
                width={24}
                height={24}
                priority
              />
            </span>
            <p
              className="text-white text-[24px]"
              style={{ fontFamily: "OpenSans-Semi" }}
            >
              4,000+ girls reached
            </p>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default About;
