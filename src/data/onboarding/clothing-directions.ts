import type { ClothingDirectionId, OnboardingOption } from "@/types/onboarding";

export const clothingDirections = [
  { id: "womenswear", label: "Womenswear" },
  { id: "menswear", label: "Menswear" },
  { id: "both", label: "Both" },
] satisfies readonly OnboardingOption<ClothingDirectionId>[];
