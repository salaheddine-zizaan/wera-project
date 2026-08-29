export const fontFamilies = {
  display: "WeraLeagueSpartan-Bold",
  displayRegular: "WeraLeagueSpartan-Regular",
  displayMedium: "WeraLeagueSpartan-Medium",
  displaySemibold: "WeraLeagueSpartan-SemiBold",
  editorial: "WeraCormorantGaramond-Italic",
  editorialRegular: "WeraCormorantGaramond-Regular",
  ui: "WeraPlusJakartaSans-Regular",
  uiMedium: "WeraPlusJakartaSans-Medium",
  uiSemibold: "WeraPlusJakartaSans-SemiBold",
  uiBold: "WeraPlusJakartaSans-Bold",
} as const;

export const fontAssets = {
  [fontFamilies.display]: require("../../assets/fonts/league-spartan/LeagueSpartan-Bold.ttf"),
  [fontFamilies.displayRegular]: require("../../assets/fonts/league-spartan/LeagueSpartan-Regular.ttf"),
  [fontFamilies.displayMedium]: require("../../assets/fonts/league-spartan/LeagueSpartan-Medium.ttf"),
  [fontFamilies.displaySemibold]: require("../../assets/fonts/league-spartan/LeagueSpartan-SemiBold.ttf"),
  [fontFamilies.editorial]: require("../../assets/fonts/cormorant-garamond/CormorantGaramond-Italic.ttf"),
  [fontFamilies.editorialRegular]: require("../../assets/fonts/cormorant-garamond/CormorantGaramond-Regular.ttf"),
  [fontFamilies.ui]: require("../../assets/fonts/plus-jakarta-sans/PlusJakartaSans-Regular.ttf"),
  [fontFamilies.uiMedium]: require("../../assets/fonts/plus-jakarta-sans/PlusJakartaSans-Medium.ttf"),
  [fontFamilies.uiSemibold]: require("../../assets/fonts/plus-jakarta-sans/PlusJakartaSans-SemiBold.ttf"),
  [fontFamilies.uiBold]: require("../../assets/fonts/plus-jakarta-sans/PlusJakartaSans-Bold.ttf"),
} as const;

export const typography = {
  heading: {
    fontFamily: fontFamilies.uiSemibold,
    fontSize: 28,
    lineHeight: 34,
  },
  subheading: {
    fontFamily: fontFamilies.uiMedium,
    fontSize: 16,
    lineHeight: 22,
  },
  body: {
    fontFamily: fontFamilies.ui,
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontFamily: fontFamilies.ui,
    fontSize: 12,
    lineHeight: 16,
  },
} as const;

export type TypographyToken = keyof typeof typography;
