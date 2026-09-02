import type { WeraProfile } from "@/types/profile";

export function createInitialWeraProfile(): WeraProfile {
  return {
    basics: {
      clothingDirections: [],
    },
    lifestyle: {
      activities: [],
    },
    sizesAndFit: {
      measurements: {},
    },
    model: {},
    taste: {
      reactions: [],
    },
    colors: {
      favoriteWearColors: [],
    },
  };
}

export const initialWeraProfile = createInitialWeraProfile();
