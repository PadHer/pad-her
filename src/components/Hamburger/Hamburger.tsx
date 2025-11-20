import clsx from "clsx";

interface HamburgerToggleProps {
  size?: number;
  color?: string;
  open: boolean;
  toggle: () => void;
}

const HamburgerToggle = ({ size, color, toggle, open }: HamburgerToggleProps) => {

  const sizePx = `${size}px`;
  return (
    <button
      onClick={toggle}
      className="md:hidden relative flex flex-col justify-center items-start h-[20px] transition-all duration-300"
      style={{ width: sizePx }}
    >
      {/* Top Line */}
      <span
        className={clsx(
          "absolute top-0 h-[2px] rounded transition-all duration-300 origin-left",
          open ? "w-2/3 rotate-45 bottom-10" : "w-1/2 rotate-0 top-0"
        )}
        style={{ backgroundColor: color }}
      />

      {/* Middle Line */}
      <span
        className={clsx(
          "absolute h-[2px] rounded transition-all duration-300",
          open ? "opacity-0 w-0" : "opacity-100 w-full"
        )}
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: color,
        }}
      />

      {/* Bottom Line */}
      <span
        className={clsx(
          "absolute h-[2px] rounded transition-all duration-300 origin-left",
          open ? "w-2/3 -rotate-45 bottom-[35%]" : "w-[70%] rotate-0 bottom-0"
        )}
        style={{ backgroundColor: color }}
      />
    </button>
  );
};

export default HamburgerToggle;