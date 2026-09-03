import type {
  AgeRangeId,
  BodyBuildId,
  BodyShapeId,
  ClothingDirectionId,
  FaceShapeId,
  FacialHairId,
  FavoriteColorId,
  HairColorId,
  HairStyleId,
  ModelBase,
  ModelCreationMethod,
  LifestyleActivityId,
  ProfessionId,
  SizeSystemId,
  SkinToneId,
  StyleFamily,
  TasteReaction,
  UsualDressingId,
} from "@/types/onboarding";

export type UserBasics = {
  displayName?: string;
  ageRange?: AgeRangeId;
  clothingDirections: ClothingDirectionId[];
  modelBase?: ModelBase;
};

export type UserLifestyle = {
  profession?: ProfessionId;
  usualDressing?: UsualDressingId;
  activities: LifestyleActivityId[];
};

export type MeasurementSystem = "metric" | "imperial";

export type MetricLengthMeasurement = {
  unit: "cm";
  value: number;
};

export type ImperialLengthMeasurement = {
  unit: "ft-in";
  feet: number;
  inches: number;
};

export type LengthMeasurement = MetricLengthMeasurement | ImperialLengthMeasurement;

export type WeightMeasurement = {
  unit: "kg" | "lb";
  value: number;
};

export type UserMeasurements = {
  height?: LengthMeasurement;
  weight?: WeightMeasurement;
  chestOrBust?: LengthMeasurement;
  waist?: LengthMeasurement;
  hips?: LengthMeasurement;
  shoulders?: LengthMeasurement;
  inseam?: LengthMeasurement;
};

export type SizesAndFit = {
  sizeSystem?: SizeSystemId;
  topSize?: string;
  bottomSize?: string;
  shoeSize?: string;
  measurementSystem?: MeasurementSystem;
  measurements: UserMeasurements;
};

export type WeraModel = {
  creationMethod?: ModelCreationMethod;
  build?: BodyBuildId;
  suggestedBuild?: BodyBuildId;
  bodyShape?: BodyShapeId;
  faceShape?: FaceShapeId;
  hairStyle?: HairStyleId;
  hairColor?: HairColorId;
  facialHair?: FacialHairId;
  skinTone?: SkinToneId;
};

export type InferredStyleProfile = {
  styleAffinities?: Partial<Record<StyleFamily, number>>;
};

export type UserTaste = {
  reactions: TasteReaction[];
  inferredStyleProfile?: InferredStyleProfile;
};

export type UserColors = {
  favoriteWearColors: FavoriteColorId[];
};

export type WeraProfile = {
  basics: UserBasics;
  lifestyle: UserLifestyle;
  sizesAndFit: SizesAndFit;
  model: WeraModel;
  taste: UserTaste;
  colors: UserColors;
};
