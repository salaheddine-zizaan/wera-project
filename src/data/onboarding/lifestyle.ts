import type {
  LifestyleActivityId,
  OnboardingOption,
  ProfessionId,
  UsualDressingId,
} from "@/types/onboarding";

export const professions = [
  { id: "work", label: "Working" },
  { id: "study", label: "Studying" },
  { id: "work-and-study", label: "Work & study" },
  { id: "other", label: "Something else" },
] satisfies readonly OnboardingOption<ProfessionId>[];

export const usualDressingOptions = [
  { id: "casual", label: "Casual" },
  { id: "sporty", label: "Sporty" },
  { id: "smart-casual", label: "Smart casual" },
  { id: "business", label: "Business" },
  { id: "formal", label: "Formal" },
] satisfies readonly OnboardingOption<UsualDressingId>[];

export const activityOptions = [
  { id: "gym", label: "The gym" },
  { id: "friends", label: "Seeing friends" },
  { id: "classes", label: "Classes" },
  { id: "work", label: "Work" },
  { id: "travel", label: "Travel" },
  { id: "events", label: "Events" },
] satisfies readonly OnboardingOption<LifestyleActivityId>[];
