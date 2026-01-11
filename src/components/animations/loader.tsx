import Image from "next/image";

const Loader = () => {
  return (
    <div className="flex flex-col gap-4 items-center">
      <Image
        src={"/logos/Main-Logo.png"}
        alt="Pad Her Logo"
        width={80}
        height={35}
        className=""
      />
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
