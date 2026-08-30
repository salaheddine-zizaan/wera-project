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
