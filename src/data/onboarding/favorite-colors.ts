import type { ColorOption, FavoriteColorId } from "@/types/onboarding";

export const favoriteClothingColors = [
  { id: "black", label: "Black", hex: "#171717" },
  { id: "white", label: "White", hex: "#FFFFFF" },
  { id: "cream", label: "Cream", hex: "#E9DFC9" },
  { id: "gray", label: "Gray", hex: "#8E8E8E" },
  { id: "navy", label: "Navy", hex: "#1A2948" },
  { id: "blue", label: "Blue", hex: "#3E70B8" },
  { id: "beige", label: "Beige", hex: "#C6AB88" },
  { id: "brown", label: "Brown", hex: "#71482E" },
  { id: "olive", label: "Olive", hex: "#73734D" },
  { id: "green", label: "Green", hex: "#3E6A50" },
  { id: "burgundy", label: "Burgundy", hex: "#6B2435" },
  { id: "red", label: "Red", hex: "#B73A35" },
  { id: "pink", label: "Pink", hex: "#D5899D" },
  { id: "purple", label: "Purple", hex: "#6D4C87" },
  { id: "orange", label: "Orange", hex: "#D87832" },
  { id: "yellow", label: "Yellow", hex: "#D2AD3E" },
] satisfies readonly ColorOption<FavoriteColorId>[];
