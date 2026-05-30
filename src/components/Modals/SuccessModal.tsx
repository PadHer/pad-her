import { SuccessTick } from "../animations/success";
import { useRouter } from "next/navigation";

interface SuccessProps {
  title: string;
  message: string;
  primary: string;
  secondary?: string;
  onClose?: () => void;
}
const SuccessModal = ({
  title,
  message,
  primary,
  secondary,
  onClose,
}: SuccessProps) => {
  const router = useRouter();
  return (
    <div
      onClick={onClose}
      className="h-screen w-full inset-0 bg-[#00000099] z-999 fixed flex items-center justify-center top-0 left-0"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-1/3 h-1/2 flex flex-col gap-1 items-center py-6 px-8 bg-white rounded-lg"
      >
        <div className="w-120 h-90 flex items-center justify-center -mt-10">
          <SuccessTick />
        </div>
        <div className="w-full flex flex-col items-center space-y-1.5">
          <h2
          style={{ fontFamily: "Yeseva" }}
          className="text-[#111111] text-[24px] "
        >
          {title}
        </h2>
        <p className="text-[#111] font-open text-[16px] font-normal">
          {message}
        </p>
        <div className="flex gap-2 items-center">
          <button onClick={onClose} className="button-secondary">
            {secondary}
          </button>
          <button onClick={() => router.push("/")} className="button">
            {primary}
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
