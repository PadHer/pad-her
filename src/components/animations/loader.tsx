import Image from "next/image";

const Loader = () => {
  return (
    <div>
      <Image
        src={"/images/Main-Logo.png"}
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
