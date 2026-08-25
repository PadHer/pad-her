import { RECENT_DONATIONS } from '@/data/dummy'
import { useState } from "react";

const FlashTicker = () => {
    const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || RECENT_DONATIONS.length === 0) {
    return null;
  }
  return (
   <div className="w-full bg-[#FFF5F9] border-y border-[#FFD6EA] overflow-hidden">
  <div className="max-w-full flex items-center">
    {/* Fixed label */}
    <div className="relative z-10 shrink-0 bg-[#FF07A9] text-white px-4 md:px-6 py-2.5 font-open font-semibold text-xs md:text-sm flex items-center gap-2 shadow-[4px_0_12px_rgba(255,7,169,0.15)]">
      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
      Recent Donations
    </div>

    {/* Marquee */}
    <div className="relative flex-1 overflow-hidden">
      <div className="whitespace-nowrap animate-marquee flex items-center gap-8 md:gap-12 px-6">
        {[...RECENT_DONATIONS, ...RECENT_DONATIONS, ...RECENT_DONATIONS].map(
          (donation, i) => (
            <span
              key={i}
              className="flex items-center gap-2 font-open text-[#393939] text-xs md:text-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF07A9] shrink-0" />

              <span>
                <span className="font-semibold text-[#111111]">
                  {donation.name}
                </span>{" "}
                donated{" "}
                <span className="font-bold text-[#FF07A9]">
                  ₦{donation.amount.toLocaleString()}
                </span>

                <span className="ml-2 text-[#39393980] text-[11px]">
                  {donation.time}
                </span>
              </span>
            </span>
          )
        )}
      </div>
    </div>
    <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Hide recent donations"
          className="absolute right-2 md:right-4 z-30 w-7 h-7 flex items-center justify-center rounded-full bg-white/90 border border-[#FFD6EA] text-[#39393980] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 hover:text-[#FF07A9] hover:border-[#FF07A9] shadow-sm transition-all duration-200 cursor-pointer"
        >
          <span className="text-lg leading-none">×</span>
        </button>
  </div>
</div>
  )
}

export default FlashTicker
