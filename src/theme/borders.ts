import { colors } from "./colors";

export const borders = {
  subtle: {
    borderColor: colors.borderSubtle,
    borderWidth: 1,
  },
  default: {
    borderColor: colors.borderDefault,
    borderWidth: 1,
  },
  strong: {
    borderColor: colors.borderStrong,
    borderWidth: 1,
  },
  focus: {
    borderColor: colors.borderFocus,
    borderWidth: 1,
  },
} as const;

export type BorderToken = keyof typeof borders;
