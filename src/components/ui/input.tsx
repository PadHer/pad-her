import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    // h-9 to match icon buttons and default buttons.
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-md border border-[#8A8C8E] bg-[#FAFAFA] px-3 py-4 text-base text-[#111] ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-normal file:font-open placeholder:font-open file:text-black placeholder:text-[#8A8C8E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-[#ed006c33] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
