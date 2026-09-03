import { images } from "@/constants/images";
import type { BodyBuildId, ClothingDirectionId, ModelBase } from "@/types/onboarding";

const BODY_ASSET_HEIGHT = 1536;

export type BodyBuildAsset = {
  source: number;
  bottomInset: number;
};

export const modelAssets = {
  feminine: {
    slim: { source: images.weraModelFeminineBuildSlim, bottomInset: 56 },
    lean: { source: images.weraModelFeminineBuildLean, bottomInset: 55 },
    average: { source: images.weraModelFeminineBuildAverage, bottomInset: 56 },
    athletic: { source: images.weraModelFeminineBuildAthletic, bottomInset: 56 },
    full: { source: images.weraModelFeminineBuildFull, bottomInset: 56 },
  },
  masculine: {
    slim: { source: images.weraModelMasculineBuildSlim, bottomInset: 55 },
    lean: { source: images.weraModelMasculineBuildLean, bottomInset: 52 },
    average: { source: images.weraModelMasculineBuildAverage, bottomInset: 53 },
    athletic: { source: images.weraModelMasculineBuildAthletic, bottomInset: 54 },
    full: { source: images.weraModelMasculineBuildFull, bottomInset: 53 },
  },
} as const satisfies Record<ModelBase, Record<BodyBuildId, BodyBuildAsset>>;

export const bodyAssetDimensions = {
  height: BODY_ASSET_HEIGHT,
  width: 1024,
} as const;

export function getModelBaseForClothingDirection(
  clothingDirections: readonly ClothingDirectionId[],
): ModelBase {
  return clothingDirections.includes("menswear") ? "masculine" : "feminine";
}
