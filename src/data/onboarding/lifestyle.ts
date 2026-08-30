import type {
  ActivityLevelId,
  CommonOccasionId,
  DressCodeId,
  EnvironmentId,
  OnboardingOption,
  RoutineId,
} from "@/types/onboarding";

export const routines = [
  { id: "work", label: "Work" },
  { id: "study", label: "Study" },
  { id: "work-and-study", label: "Work & study" },
  { id: "remote-flexible", label: "Flexible / remote" },
  { id: "home", label: "Mostly at home" },
  { id: "active-outdoors", label: "Active / on the move" },
  { id: "other", label: "Other" },
] satisfies readonly OnboardingOption<RoutineId>[];

export const environments = [
  { id: "office", label: "Office" },
  { id: "campus", label: "Campus" },
  { id: "indoors", label: "Mostly indoors" },
  { id: "outdoors", label: "Mostly outdoors" },
  { id: "mixed", label: "Mixed" },
] satisfies readonly OnboardingOption<EnvironmentId>[];

export const dressCodes = [
  { id: "none", label: "No dress code" },
  { id: "relaxed", label: "Relaxed" },
  { id: "casual", label: "Casual" },
  { id: "smart-casual", label: "Smart casual" },
  { id: "business", label: "Business" },
  { id: "formal", label: "Formal" },
  { id: "uniform-workwear", label: "Uniform / workwear" },
] satisfies readonly OnboardingOption<DressCodeId>[];

export const activityLevels = [
  { id: "mostly-seated", label: "Mostly seated" },
  { id: "mixed", label: "Mixed" },
  { id: "on-the-move", label: "On the move" },
] satisfies readonly OnboardingOption<ActivityLevelId>[];

export const commonOccasions = [
  { id: "everyday", label: "Everyday" },
  { id: "work", label: "Work" },
  { id: "classes", label: "Classes" },
  { id: "errands", label: "Errands" },
  { id: "social", label: "Social" },
  { id: "dinner-date", label: "Dinner / date" },
  { id: "events", label: "Events" },
  { id: "formal-events", label: "Formal events" },
  { id: "sport", label: "Sport" },
  { id: "travel", label: "Travel" },
  { id: "outdoors", label: "Outdoors" },
] satisfies readonly OnboardingOption<CommonOccasionId>[];
