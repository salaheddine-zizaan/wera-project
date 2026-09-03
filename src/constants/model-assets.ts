import { images } from "@/constants/images";
import type {
  BodyBuildId,
  BodyShapeId,
  ClothingDirectionId,
  FaceShapeId,
  ModelBase,
} from "@/types/onboarding";

const BODY_ASSET_HEIGHT = 1536;

export type BodyBuildAsset = {
  source: number;
  bottomInset: number;
};

export type BodyShapeAsset = BodyBuildAsset;

export type FaceShapeAsset = {
  source: number;
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

const FEMININE_SHAPE_BOTTOM_INSET = 56;
const MASCULINE_SHAPE_BOTTOM_INSET = 53;

function feminineShapeAsset(source: number): BodyShapeAsset {
  return { source, bottomInset: FEMININE_SHAPE_BOTTOM_INSET };
}

function masculineShapeAsset(source: number): BodyShapeAsset {
  return { source, bottomInset: MASCULINE_SHAPE_BOTTOM_INSET };
}

export const bodyShapeModelAssets: Record<
  ModelBase,
  Record<BodyBuildId, Partial<Record<BodyShapeId, BodyShapeAsset>>>
> = {
  feminine: {
    slim: {
      hourglass: feminineShapeAsset(images.weraModelFeminineSlimShapeHourglass),
      triangle: feminineShapeAsset(images.weraModelFeminineSlimShapeTriangle),
      "inverted-triangle": feminineShapeAsset(images.weraModelFeminineSlimShapeInvertedTriangle),
      rectangle: feminineShapeAsset(images.weraModelFeminineSlimShapeRectangle),
      oval: feminineShapeAsset(images.weraModelFeminineSlimShapeOval),
    },
    lean: {
      hourglass: feminineShapeAsset(images.weraModelFeminineLeanShapeHourglass),
      triangle: feminineShapeAsset(images.weraModelFeminineLeanShapeTriangle),
      "inverted-triangle": feminineShapeAsset(images.weraModelFeminineLeanShapeInvertedTriangle),
      rectangle: feminineShapeAsset(images.weraModelFeminineLeanShapeRectangle),
      oval: feminineShapeAsset(images.weraModelFeminineLeanShapeOval),
    },
    average: {
      hourglass: feminineShapeAsset(images.weraModelFeminineAverageShapeHourglass),
      triangle: feminineShapeAsset(images.weraModelFeminineAverageShapeTriangle),
      "inverted-triangle": feminineShapeAsset(images.weraModelFeminineAverageShapeInvertedTriangle),
      rectangle: feminineShapeAsset(images.weraModelFeminineAverageShapeRectangle),
      oval: feminineShapeAsset(images.weraModelFeminineAverageShapeOval),
    },
    athletic: {
      hourglass: feminineShapeAsset(images.weraModelFeminineAthleticShapeHourglass),
      triangle: feminineShapeAsset(images.weraModelFeminineAthleticShapeTriangle),
      "inverted-triangle": feminineShapeAsset(images.weraModelFeminineAthleticShapeInvertedTriangle),
      rectangle: feminineShapeAsset(images.weraModelFeminineAthleticShapeRectangle),
      oval: feminineShapeAsset(images.weraModelFeminineAthleticShapeOval),
    },
    full: {
      hourglass: feminineShapeAsset(images.weraModelFeminineFullShapeHourglass),
      triangle: feminineShapeAsset(images.weraModelFeminineFullShapeTriangle),
      "inverted-triangle": feminineShapeAsset(images.weraModelFeminineFullShapeInvertedTriangle),
      rectangle: feminineShapeAsset(images.weraModelFeminineFullShapeRectangle),
      oval: feminineShapeAsset(images.weraModelFeminineFullShapeOval),
    },
  },
  masculine: {
    slim: {
      rectangle: masculineShapeAsset(images.weraModelMasculineSlimShapeRectangle),
      trapezoid: masculineShapeAsset(images.weraModelMasculineSlimShapeTrapezoid),
      "v-shape": masculineShapeAsset(images.weraModelMasculineSlimShapeVShape),
      triangle: masculineShapeAsset(images.weraModelMasculineSlimShapeTriangle),
      oval: masculineShapeAsset(images.weraModelMasculineSlimShapeOval),
    },
    lean: {
      rectangle: masculineShapeAsset(images.weraModelMasculineLeanShapeRectangle),
      trapezoid: masculineShapeAsset(images.weraModelMasculineLeanShapeTrapezoid),
      "v-shape": masculineShapeAsset(images.weraModelMasculineLeanShapeVShape),
      triangle: masculineShapeAsset(images.weraModelMasculineLeanShapeTriangle),
      oval: masculineShapeAsset(images.weraModelMasculineLeanShapeOval),
    },
    average: {
      rectangle: masculineShapeAsset(images.weraModelMasculineAverageShapeRectangle),
      trapezoid: masculineShapeAsset(images.weraModelMasculineAverageShapeTrapezoid),
      "v-shape": masculineShapeAsset(images.weraModelMasculineAverageShapeVShape),
      triangle: masculineShapeAsset(images.weraModelMasculineAverageShapeTriangle),
      oval: masculineShapeAsset(images.weraModelMasculineAverageShapeOval),
    },
    athletic: {
      rectangle: masculineShapeAsset(images.weraModelMasculineAthleticShapeRectangle),
      trapezoid: masculineShapeAsset(images.weraModelMasculineAthleticShapeTrapezoid),
      "v-shape": masculineShapeAsset(images.weraModelMasculineAthleticShapeVShape),
      triangle: masculineShapeAsset(images.weraModelMasculineAthleticShapeTriangle),
      oval: masculineShapeAsset(images.weraModelMasculineAthleticShapeOval),
    },
    full: {
      rectangle: masculineShapeAsset(images.weraModelMasculineFullShapeRectangle),
      trapezoid: masculineShapeAsset(images.weraModelMasculineFullShapeTrapezoid),
      "v-shape": masculineShapeAsset(images.weraModelMasculineFullShapeVShape),
      triangle: masculineShapeAsset(images.weraModelMasculineFullShapeTriangle),
      oval: masculineShapeAsset(images.weraModelMasculineFullShapeOval),
    },
  },
};

export function getBodyShapeAsset(
  modelBase: ModelBase,
  build: BodyBuildId,
  bodyShape: BodyShapeId,
): BodyShapeAsset | undefined {
  return bodyShapeModelAssets[modelBase][build][bodyShape];
}

export const faceShapeModelAssets = {
  feminine: {
    oval: { source: images.weraModelFeminineFaceOval },
    round: { source: images.weraModelFeminineFaceRound },
    square: { source: images.weraModelFeminineFaceSquare },
    heart: { source: images.weraModelFeminineFaceHeart },
    diamond: { source: images.weraModelFeminineFaceLong },
  },
  masculine: {
    oval: { source: images.weraModelMasculineFaceOval },
    round: { source: images.weraModelMasculineFaceRound },
    square: { source: images.weraModelMasculineFaceSquare },
    heart: { source: images.weraModelMasculineFaceHeart },
    diamond: { source: images.weraModelMasculineFaceLong },
  },
} as const satisfies Record<ModelBase, Record<FaceShapeId, FaceShapeAsset>>;

export const bodyAssetDimensions = {
  height: BODY_ASSET_HEIGHT,
  width: 1024,
} as const;

export function getModelBaseForClothingDirection(
  clothingDirections: readonly ClothingDirectionId[],
): ModelBase {
  return clothingDirections.includes("menswear") ? "masculine" : "feminine";
}
