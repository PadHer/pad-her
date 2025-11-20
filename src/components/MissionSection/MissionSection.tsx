import Image from "next/image";

const Mission = () => {
  return (
    <div className="w-full bg-[#FFF5F9] flex justify-center items-center px-4 py-4 md:px-[100px] md:py-[80px] sticky">
      <div className="w-full py-4 md:py-[32px] bg-[#FFF] flex flex-col items-center rounded-[40px] gap-8">
        <h2
          className="text-[48px] text-[#111111]"
          style={{
            fontFamily: "Yeseva",
          }}
        >
          Our Mission
        </h2>
        <Image
          src={"/svgs/Vector-1.svg"}
          alt="Vector"
          width={300}
          height={18}
        />
        <p
          className="text-[#393939] text-[16px] md:text-[24px] text-center w-full md:w-[60%] leading-[36px]"
          style={{
            fontFamily: "OpenSans",
          }}
        >
          To provide girls with access to menstrual hygiene products and
          education, empowering them to stay in school, build self-worth, and
          thrive confidently in their communities.
        </p>
        <button
          className="rounded-[24px] cursor-pointer px-[32px] py-[4px] text-[16px] text-white font-semibold hover:opacity-90 transition-opacity duration-300 ease-in-out mb-[32px]"
          style={{
            background: "linear-gradient(180deg, #FF07A9 0%, #B90D7D 100%)",
          }}
        >
          Continue Reading
        </button>
      </div>
    </div>
  );
};

export default Mission;
