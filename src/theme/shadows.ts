import { colors } from "./colors";

export const shadows = {
  none: {},
  elevated: {
    elevation: 4,
    shadowColor: colors.editorialDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  sheet: {
    elevation: 8,
    shadowColor: colors.editorialDark,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
} as const;

export type ShadowToken = keyof typeof shadows;
