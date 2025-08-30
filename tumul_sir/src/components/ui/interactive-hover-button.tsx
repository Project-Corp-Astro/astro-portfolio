import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative min-w-[8rem] px-6 py-2 cursor-pointer overflow-hidden rounded-full border-2 border-orange/30 flex items-center justify-center transition-all duration-300 bg-[#FFD700] shadow-[0_4px_24px_rgba(0,0,0,0.18),0_1.5px_6px_rgba(0,0,0,0.16),inset_0_1.5px_8px_rgba(255,255,255,0.18)]",
        className,
      )}
      {...props}
    >
      {/* Outgoing text */}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0 z-10 text-orange-900 drop-shadow-sm">
        {text}
      </span>
      {/* Incoming text + icon */}
      <span className="absolute left-1/2 top-1/2 flex items-center gap-2 whitespace-nowrap opacity-0 translate-x-[-2.5rem] -translate-y-1/2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-[-50%] z-10 text-orange-900 drop-shadow-sm">
        <span>{text}</span>
        <ArrowRight />
      </span>
      {/* Glossy overlay */}
      <span className="pointer-events-none absolute left-0 top-0 h-full w-full rounded-full z-20 overflow-hidden">
        <span className="block absolute left-0 top-0 h-1/2 w-full bg-gradient-to-b from-white/70 via-white/30 to-transparent rounded-t-full" />
      </span>
      {/* Animated background effect (subtle overlay on hover) */}
      <span className="absolute left-0 top-0 h-full w-full scale-0 rounded-full bg-orange/30 transition-transform duration-300 group-hover:scale-100 z-0" />
      {/* Invisible span for dynamic sizing */}
      <span className="invisible select-none px-6 py-2 whitespace-nowrap">{text}</span>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton }; 