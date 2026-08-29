export const radius = {
  small: 8,
  medium: 16,
  large: 24,
  full: 999,
} as const;

export type RadiusToken = keyof typeof radius;
