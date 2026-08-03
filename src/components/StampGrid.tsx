import { Gift } from "lucide-react";
import type { Accent } from "../types";
import { accentClasses } from "../lib/accent";

interface StampGridProps {
  totalSlots: number;
  collected: number;
  accent: Accent;
  mascotEmoji: string;
  milestoneSlots?: number[];
}

export function StampGrid({
  totalSlots,
  collected,
  accent,
  mascotEmoji,
  milestoneSlots = [],
}: StampGridProps) {
  const classes = accentClasses[accent];

  return (
    <div className="grid grid-cols-5 gap-3">
      {Array.from({ length: totalSlots }, (_, i) => i + 1).map((slot) => {
        const filled = slot <= collected;
        const isMilestone = milestoneSlots.includes(slot);

        return (
          <div
            key={slot}
            className={`relative flex aspect-square items-center justify-center rounded-2xl text-xl transition-transform ${
              filled
                ? `${classes.solidBg} ${classes.solidText} shadow-md scale-100`
                : "border-2 border-dashed border-leaf-200 bg-white text-leaf-200"
            }`}
          >
            {filled ? mascotEmoji : slot}
            {isMilestone && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-oshi-pink-dark shadow ring-1 ring-oshi-pink">
                <Gift size={11} strokeWidth={2.5} />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
