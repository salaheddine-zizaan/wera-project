import type { OnboardingOption, SizeSystemId } from "@/types/onboarding";

export const sizeSystems = [
  { id: "EU", label: "EU" },
  { id: "US", label: "US" },
  { id: "UK", label: "UK" },
  { id: "International", label: "International" },
] satisfies readonly OnboardingOption<SizeSystemId>[];
