import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { createInitialWeraProfile } from "@/data/onboarding";
import type {
  FavoriteColorId,
  OnboardingStepId,
  TasteReaction,
} from "@/types/onboarding";
import type {
  SizesAndFit,
  UserBasics,
  UserLifestyle,
  WeraModel,
  WeraProfile,
} from "@/types/profile";

export const ONBOARDING_STORAGE_KEY = "wera:onboarding:v2";

const ONBOARDING_STEPS = [
  "about-you",
  "daily-life",
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
  "taste-discovery",
  "favorite-colors",
  "profile-ready",
] as const satisfies readonly OnboardingStepId[];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isOnboardingStepId(value: unknown): value is OnboardingStepId {
  return typeof value === "string" && ONBOARDING_STEPS.some((step) => step === value);
}

function isWeraProfile(value: unknown): value is WeraProfile {
  if (!isRecord(value)) {
    return false;
  }

  const { basics, lifestyle, sizesAndFit, model, taste, colors } = value;

  return (
    isRecord(basics) &&
    Array.isArray(basics.clothingDirections) &&
    isRecord(lifestyle) &&
    Array.isArray(lifestyle.activities) &&
    isRecord(sizesAndFit) &&
    isRecord(sizesAndFit.measurements) &&
    isRecord(model) &&
    isRecord(taste) &&
    Array.isArray(taste.reactions) &&
    isRecord(colors) &&
    Array.isArray(colors.favoriteWearColors)
  );
}

type OnboardingStore = {
  profile: WeraProfile;
  currentStep?: OnboardingStepId;
  completedSteps: OnboardingStepId[];
  updateBasics: (updates: Partial<UserBasics>) => void;
  updateLifestyle: (updates: Partial<UserLifestyle>) => void;
  updateSizesAndFit: (updates: Partial<SizesAndFit>) => void;
  updateModel: (updates: Partial<WeraModel>) => void;
  toggleFavoriteColor: (colorId: FavoriteColorId) => void;
  addTasteReaction: (reaction: TasteReaction) => void;
  setCurrentStep: (step?: OnboardingStepId) => void;
  markStepCompleted: (step: OnboardingStepId) => void;
  resetOnboarding: () => void;
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      profile: createInitialWeraProfile(),
      completedSteps: [],
      updateBasics: (updates) =>
        set(({ profile }) => ({
          profile: {
            ...profile,
            basics: { ...profile.basics, ...updates },
          },
        })),
      updateLifestyle: (updates) =>
        set(({ profile }) => ({
          profile: {
            ...profile,
            lifestyle: { ...profile.lifestyle, ...updates },
          },
        })),
      updateSizesAndFit: (updates) =>
        set(({ profile }) => ({
          profile: {
            ...profile,
            sizesAndFit: {
              ...profile.sizesAndFit,
              ...updates,
              measurements: {
                ...profile.sizesAndFit.measurements,
                ...updates.measurements,
              },
            },
          },
        })),
      updateModel: (updates) =>
        set(({ profile }) => ({
          profile: {
            ...profile,
            model: { ...profile.model, ...updates },
          },
        })),
      toggleFavoriteColor: (colorId) =>
        set(({ profile }) => {
          const favoriteWearColors = profile.colors.favoriteWearColors.includes(colorId)
            ? profile.colors.favoriteWearColors.filter((id) => id !== colorId)
            : [...profile.colors.favoriteWearColors, colorId];

          return {
            profile: {
              ...profile,
              colors: { ...profile.colors, favoriteWearColors },
            },
          };
        }),
      addTasteReaction: (reaction) =>
        set(({ profile }) => ({
          profile: {
            ...profile,
            taste: {
              ...profile.taste,
              reactions: [
                ...profile.taste.reactions.filter(
                  (existingReaction) => existingReaction.lookId !== reaction.lookId,
                ),
                reaction,
              ],
            },
          },
        })),
      setCurrentStep: (currentStep) => set({ currentStep }),
      markStepCompleted: (step) =>
        set(({ completedSteps }) => ({
          completedSteps: completedSteps.includes(step)
            ? completedSteps
            : [...completedSteps, step],
        })),
      resetOnboarding: () =>
        set({
          profile: createInitialWeraProfile(),
          currentStep: undefined,
          completedSteps: [],
        }),
    }),
    {
      name: ONBOARDING_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ profile, currentStep, completedSteps }) => ({
        profile,
        currentStep,
        completedSteps,
      }),
      merge: (persistedState, currentState) => {
        const savedState = isRecord(persistedState) ? persistedState : undefined;
        const savedCompletedSteps = Array.isArray(savedState?.completedSteps)
          ? savedState.completedSteps.filter(isOnboardingStepId)
          : currentState.completedSteps;

        return {
          ...currentState,
          profile: isWeraProfile(savedState?.profile)
            ? savedState.profile
            : createInitialWeraProfile(),
          currentStep: isOnboardingStepId(savedState?.currentStep)
            ? savedState.currentStep
            : undefined,
          completedSteps: savedCompletedSteps,
        };
      },
    },
  ),
);
