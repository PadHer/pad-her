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
        className="w-auto h-auto flex flex-col gap-4 items-center py-10 px-8"
      >
        <SuccessTick />
        <h2
          style={{ fontFamily: "Yeseva" }}
          className="text-[#111111] text-[32px] "
        >
          {title}
        </h2>
        <p className="text-[#393939] font-open text-[16px] font-normal">
          {message}
        </p>
        <div>
          <button onClick={onClose} className="button-secondary">
            {secondary}
          </button>
          <button onClick={() => router.push("/")} className="button">
            {primary}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
