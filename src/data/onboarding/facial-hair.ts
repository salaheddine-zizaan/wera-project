import type { FacialHairId, OnboardingOption } from "@/types/onboarding";

export const facialHairOptions = [
  { id: "none", label: "None", assetKey: "facial-hair-none" },
  { id: "stubble", label: "Stubble", assetKey: "facial-hair-stubble" },
  { id: "mustache", label: "Mustache", assetKey: "facial-hair-mustache" },
  { id: "goatee", label: "Goatee", assetKey: "facial-hair-goatee" },
  { id: "short-boxed", label: "Short boxed", assetKey: "facial-hair-short-boxed" },
  { id: "full-beard", label: "Full beard", assetKey: "facial-hair-full-beard" },
  { id: "circle-beard", label: "Circle beard", assetKey: "facial-hair-circle-beard" },
] satisfies readonly OnboardingOption<FacialHairId>[];
