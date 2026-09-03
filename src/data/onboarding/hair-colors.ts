import type { ColorOption, HairColorId } from "@/types/onboarding";

export const hairColors = [
  { id: "black", label: "Black", hex: "#171717" },
  { id: "dark-brown", label: "Dark Brown", hex: "#2B1B15" },
  { id: "brown", label: "Brown", hex: "#5A3825" },
  { id: "light-brown", label: "Light Brown", hex: "#9A6A47" },
  { id: "blonde", label: "Blonde", hex: "#D5B06B" },
  { id: "auburn", label: "Auburn / Red", hex: "#8A3C25" },
  { id: "gray", label: "Gray / White", hex: "#A6A6A2" },
] satisfies readonly ColorOption<HairColorId>[];

export const hairColorClassNames: Record<HairColorId, string> = {
  black: "bg-[#171717]",
  "dark-brown": "bg-[#2B1B15]",
  brown: "bg-[#5A3825]",
  "light-brown": "bg-[#9A6A47]",
  blonde: "bg-[#D5B06B]",
  auburn: "bg-[#8A3C25]",
  gray: "bg-[#A6A6A2]",
};
