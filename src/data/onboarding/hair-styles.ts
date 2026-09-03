import type {
  FeminineHairStyleId,
  MasculineHairStyleId,
  OnboardingOption,
} from "@/types/onboarding";

export const masculineHairStyles = [
  { id: "bald", label: "Bald", assetKey: "hair-masculine-bald" },
  { id: "buzz", label: "Buzz", assetKey: "hair-masculine-buzz" },
  { id: "crop", label: "Crop", assetKey: "hair-masculine-crop" },
  { id: "fade", label: "Fade", assetKey: "hair-masculine-fade" },
  { id: "side-part", label: "Side part", assetKey: "hair-masculine-side-part" },
  { id: "textured", label: "Textured", assetKey: "hair-masculine-textured" },
  { id: "short-curly", label: "Short curly", assetKey: "hair-masculine-short-curly" },
  { id: "medium", label: "Medium", assetKey: "hair-masculine-medium" },
  { id: "long", label: "Long", assetKey: "hair-masculine-long" },
  { id: "afro", label: "Afro", assetKey: "hair-masculine-afro" },
  { id: "braids", label: "Braids", assetKey: "hair-masculine-braids" },
  { id: "locs", label: "Locs", assetKey: "hair-masculine-locs" },
  { id: "bun", label: "Bun", assetKey: "hair-masculine-bun" },
] satisfies readonly OnboardingOption<MasculineHairStyleId>[];

export const feminineHairStyles = [
  { id: "pixie", label: "Pixie", assetKey: "hair-feminine-pixie" },
  { id: "bob", label: "Bob", assetKey: "hair-feminine-bob" },
  { id: "lob", label: "Lob", assetKey: "hair-feminine-lob" },
  { id: "medium", label: "Medium", assetKey: "hair-feminine-medium" },
  { id: "long", label: "Long", assetKey: "hair-feminine-long" },
  { id: "short-curly", label: "Short curly", assetKey: "hair-feminine-short-curly" },
  { id: "long-curly", label: "Long curly", assetKey: "hair-feminine-long-curly" },
  { id: "afro", label: "Afro", assetKey: "hair-feminine-afro" },
  { id: "braids", label: "Braids", assetKey: "hair-feminine-braids" },
  { id: "locs", label: "Locs", assetKey: "hair-feminine-locs" },
  { id: "bun", label: "Bun", assetKey: "hair-feminine-bun" },
  { id: "ponytail", label: "Ponytail", assetKey: "hair-feminine-ponytail" },
  { id: "hijab", label: "Hijab", assetKey: "hair-feminine-hijab" },
] satisfies readonly OnboardingOption<FeminineHairStyleId>[];
