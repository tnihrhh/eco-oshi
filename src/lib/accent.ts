import type { Accent } from "../types";

interface AccentClasses {
  solidBg: string;
  solidText: string;
  chipBg: string;
  chipText: string;
  ring: string;
  gradient: string;
}

export const accentClasses: Record<Accent, AccentClasses> = {
  pink: {
    solidBg: "bg-oshi-pink",
    solidText: "text-white",
    chipBg: "bg-pink-100",
    chipText: "text-oshi-pink-dark",
    ring: "ring-oshi-pink",
    gradient: "from-oshi-pink to-rose-300",
  },
  yellow: {
    solidBg: "bg-oshi-yellow",
    solidText: "text-leaf-900",
    chipBg: "bg-amber-100",
    chipText: "text-amber-700",
    ring: "ring-oshi-yellow",
    gradient: "from-oshi-yellow to-amber-300",
  },
  sky: {
    solidBg: "bg-sky-400",
    solidText: "text-white",
    chipBg: "bg-sky-100",
    chipText: "text-sky-700",
    ring: "ring-sky-400",
    gradient: "from-sky-400 to-sky-300",
  },
  purple: {
    solidBg: "bg-violet-400",
    solidText: "text-white",
    chipBg: "bg-violet-100",
    chipText: "text-violet-700",
    ring: "ring-violet-400",
    gradient: "from-violet-400 to-violet-300",
  },
};
