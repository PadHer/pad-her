import Image from "next/image";
import Link from "next/link";

const Mission = () => {
  return (
    <div className="w-full bg-[#FFF5F9] flex justify-center items-center px-4 py-4 md:px-25 md:py-20 z-20">
      <div className="w-full py-4 md:py-8 bg-[#FFF] flex flex-col items-center rounded-[40px]">
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
          className="md:-mt-4"
        />
        <p
          className="text-[#393939] text-[16px] md:text-[24px] text-center w-full md:w-[60%] leading-9 md:mt-4"
          style={{
            fontFamily: "OpenSans",
          }}
        >
          To provide girls with access to menstrual hygiene products and
          education, empowering them to stay in school, build self-worth, and
          thrive confidently in their communities.
        </p>
        <Link
          href={"/about"}
          className="button mt-4"
        >
          Continue Reading
        </Link>
      </div>
    </div>
  );
};

export default Mission;
