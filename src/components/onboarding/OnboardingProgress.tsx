import { useOnboardingStore } from "@/store/onboarding-store";
import { colors } from "@/theme";
import type { OnboardingStepId } from "@/types/onboarding";

import {
  BriefcaseBusiness,
  Check,
  ScanFace,
  Sparkles,
  UserRound,
} from "lucide-react-native";
import { Text, View } from "react-native";

type OnboardingPhaseId = "about-you" | "daily-life" | "your-model" | "your-style";

type OnboardingPhase = {
  id: OnboardingPhaseId;
  label: string;
  Icon: typeof UserRound;
  steps: readonly OnboardingStepId[];
};

const ONBOARDING_PHASES: readonly OnboardingPhase[] = [
  {
    id: "about-you",
    label: "About you",
    Icon: UserRound,
    steps: ["about-you"],
  },
  {
    id: "daily-life",
    label: "Daily life",
    Icon: BriefcaseBusiness,
    steps: ["daily-life"],
  },
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
      <View className="flex-row">
        {ONBOARDING_PHASES.map((phase, index) => {
          const isActive = index === activePhaseIndex;
          const isCompleted = index < activePhaseIndex;
          const Icon = phase.Icon;

          return (
            <View className="flex-1 items-center" key={phase.id}>
              <View
                className={
                  isActive
                    ? "h-12 w-12 items-center justify-center rounded-full bg-navy"
                    : "h-12 w-12 items-center justify-center rounded-full bg-surface-secondary"
                }
              >
                {isCompleted ? (
                  <Check color={colors.navy} size={23} strokeWidth={1.9} />
                ) : (
                  <Icon
                    color={isActive ? colors.surface : colors.navy}
                    size={23}
                    strokeWidth={1.55}
                  />
                )}
              </View>
              <Text
                className={
                  isActive
                    ? "mt-2 text-center font-ui-semibold text-[12px] leading-4 text-navy"
                    : "mt-2 text-center font-ui-medium text-[12px] leading-4 text-text-secondary"
                }
              >
                {phase.label}
              </Text>
              <View
                className={
                  isActive || isCompleted
                    ? "mt-3 h-1 w-[72%] rounded-full bg-navy"
                    : "mt-3 h-1 w-[72%] rounded-full bg-muted"
                }
              />
            </View>
          );
        })}
      </View>

      <Text className="mt-5 text-center font-ui-medium text-[15px] leading-5 text-text-secondary">
        {activePhaseIndex + 1} of {ONBOARDING_PHASES.length} completed
      </Text>
    </View>
  );
}
