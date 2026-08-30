import type { AgeRangeId, OnboardingOption } from "@/types/onboarding";

export const ageRanges = [
  { id: "18-24", label: "18–24" },
  { id: "25-34", label: "25–34" },
  { id: "35-44", label: "35–44" },
  { id: "45-54", label: "45–54" },
  { id: "55-64", label: "55–64" },
  { id: "65-plus", label: "65+" },
] satisfies readonly OnboardingOption<AgeRangeId>[];
