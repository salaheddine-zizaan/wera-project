import { useOnboardingStore } from "@/store/onboarding-store";
import { colors } from "@/theme";
import type { OnboardingStepId } from "@/types/onboarding";

import { BriefcaseBusiness, ScanFace, Sparkles, UserRound } from "lucide-react-native";
import { Fragment } from "react";
import { Text, View } from "react-native";

type OnboardingPhaseId = "about-you" | "daily-life" | "your-model" | "your-style";

type OnboardingPhase = {
  id: OnboardingPhaseId;
  label: string;
  Icon: typeof UserRound;
  steps: readonly OnboardingStepId[];
};

const ONBOARDING_PHASES: readonly OnboardingPhase[] = [
  { id: "about-you", label: "About you", Icon: UserRound, steps: ["about-you"] },
  { id: "daily-life", label: "Daily life", Icon: BriefcaseBusiness, steps: ["daily-life"] },
  {
    id: "your-model",
    label: "Your model",
    Icon: ScanFace,
    steps: [
      "model-method",
      "photo-model",
      "measurements",
      "usual-sizes",
      "build",
      "body-shape",
      "face-shape",
      "hair",
      "facial-hair",
      "skin-tone",
      "model-reveal",
    ],
  },
  {
    id: "your-style",
    label: "Your style",
    Icon: Sparkles,
    steps: ["taste-discovery", "favorite-colors", "profile-ready"],
  },
] as const;

function getPhaseIndex(currentStep?: OnboardingStepId) {
  const index = ONBOARDING_PHASES.findIndex((phase) =>
    currentStep ? phase.steps.includes(currentStep) : false,
  );

  return index === -1 ? 0 : index;
}

export function OnboardingProgress() {
  const currentStep = useOnboardingStore((state) => state.currentStep);
  const activePhaseIndex = getPhaseIndex(currentStep);

  return (
    <View accessibilityLabel={`Onboarding progress: ${activePhaseIndex + 1} of 4 phases`}>
      <View className="flex-row items-start justify-between ">
        {ONBOARDING_PHASES.map((phase, index) => {
          const isActive = index === activePhaseIndex;
          const isCompleted = index < activePhaseIndex;
          const Icon = phase.Icon;
          const isLastPhase = index === ONBOARDING_PHASES.length - 1;

          return (
            <Fragment key={phase.id}>
              <View className="w-16 items-center">
                <View
                  className={
                    isActive
                      ? "h-9 w-9 items-center justify-center rounded-full border border-navy bg-navy"
                      : "h-9 w-9 items-center justify-center rounded-full border border-[#E6E2DE] bg-canvas"
                  }
                >
                  <Icon
                    color={isActive ? colors.surface : colors.textPrimary}
                    size={17}
                    strokeWidth={1.45}
                  />
                </View>
                <Text
                  className={
                    isActive
                      ? "mt-[5px] text-center font-ui-semibold text-[9px] leading-3 text-navy "
                      : "mt-[5px] text-center font-ui-medium text-[9px] leading-3 text-text-secondary"
                  }
                  numberOfLines={1}
                >
                  {phase.label}
                </Text>
              </View>

              {!isLastPhase ? (
                <View className="min-w-3 flex-1 pt-[17px] ">
                  <View
                    className={
                      isActive || isCompleted
                        ? "mx-[5px] h-[1.5px] bg-navy"
                        : "mx-[5px] h-[1.5px] bg-[#E6E2DE]"
                    }
                  />
                </View>
              ) : null}
            </Fragment>
          );
        })}
      </View>
    </View>
  );
}
