import type { BodyBuildId, OnboardingOption } from "@/types/onboarding";

export const bodyBuilds = [
  { id: "slim", label: "Slim", assetKey: "body-build-slim" },
  { id: "lean", label: "Lean", assetKey: "body-build-lean" },
  { id: "average", label: "Average", assetKey: "body-build-average" },
  {
    id: "athletic",
    label: "Athletic",
    description: "Defined, balanced build",
    assetKey: "body-build-athletic",
  },
  { id: "full", label: "Full", assetKey: "body-build-full" },
] satisfies readonly OnboardingOption<BodyBuildId>[];
