export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const layoutSpacing = {
  screen: spacing[5],
  screenCompact: spacing[4],
  touchTarget: spacing[12],
} as const;
