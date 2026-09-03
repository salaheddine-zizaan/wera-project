export type AgeRangeId =
  | "18-24"
  | "25-34"
  | "35-44"
  | "45-54"
  | "55-64"
  | "65-plus";

export type ClothingDirectionId = "womenswear" | "menswear" | "both";
export type ModelBase = "feminine" | "masculine";

export type ProfessionId =
  | "work"
  | "study"
  | "work-and-study"
  | "other";

export type UsualDressingId =
  | "casual"
  | "sporty"
  | "smart-casual"
  | "business"
  | "formal";

export type LifestyleActivityId =
  | "gym"
  | "friends"
  | "classes"
  | "work"
  | "travel"
  | "events";

export type SizeSystemId = "EU" | "US" | "UK" | "International";
export type ModelCreationMethod = "photos" | "manual";
export type BodyBuildId = "slim" | "lean" | "average" | "athletic" | "full";
export type BodyShapeId =
  | "rectangle"
  | "trapezoid"
  | "v-shape"
  | "triangle"
  | "oval"
  | "hourglass"
  | "inverted-triangle";
export type FaceShapeId = "oval" | "round" | "square" | "heart" | "diamond";
export type MasculineHairStyleId =
  | "bald"
  | "buzz"
  | "crop"
  | "fade"
  | "side-part"
  | "textured"
  | "short-curly"
  | "medium"
  | "long"
  | "afro"
  | "braids"
  | "locs"
  | "bun";
export type FeminineHairStyleId =
  | "pixie"
  | "bob"
  | "lob"
  | "medium"
  | "long"
  | "short-curly"
  | "long-curly"
  | "afro"
  | "braids"
  | "locs"
  | "bun"
  | "ponytail"
  | "hijab";
export type HairStyleId = MasculineHairStyleId | FeminineHairStyleId;
export type HairColorId =
  | "black"
  | "dark-brown"
  | "brown"
  | "light-brown"
  | "blonde"
  | "auburn"
  | "gray";
export type FacialHairId =
  | "none"
  | "stubble"
  | "mustache"
  | "goatee"
  | "short-boxed"
  | "full-beard"
  | "circle-beard";
export type SkinToneId =
  | "tone-01"
  | "tone-02"
  | "tone-03"
  | "tone-04"
  | "tone-05"
  | "tone-06"
  | "tone-07"
  | "tone-08";

export type FavoriteColorId =
  | "black"
  | "white"
  | "cream"
  | "gray"
  | "navy"
  | "blue"
  | "beige"
  | "brown"
  | "olive"
  | "green"
  | "burgundy"
  | "red"
  | "pink"
  | "purple"
  | "orange"
  | "yellow";

export type OnboardingOption<Id extends string = string> = {
  id: Id;
  label: string;
  description?: string;
  assetKey?: string;
};

export type ColorOption<Id extends string = string> = OnboardingOption<Id> & {
  hex: string;
};

export type StyleFamily =
  | "casual"
  | "minimal"
  | "classic"
  | "smart-casual"
  | "streetwear"
  | "athleisure"
  | "preppy"
  | "workwear"
  | "elegant"
  | "formal"
  | "vintage"
  | "bohemian"
  | "edgy"
  | "modest";

export type TasteLookId = `look-${string}`;
export type TasteReactionValue = "like" | "not-for-me";
export type TasteFormality = 1 | 2 | 3 | 4 | 5;
export type TasteFit = "fitted" | "regular" | "relaxed" | "oversized";
export type TasteSilhouette = "streamlined" | "structured" | "balanced" | "voluminous";
export type TastePattern = "solid" | "striped" | "checked" | "graphic" | "floral";
export type TasteLayering = "none" | "light" | "medium" | "heavy";
export type TasteFootwear = "sneakers" | "loafers" | "boots" | "heels" | "sandals" | "flats";
export type TasteAccessories = "none" | "minimal" | "statement" | "practical";
export type TasteSeason = "warm" | "transitional" | "cool" | "all-season";

export type TasteLookMetadata = {
  styles: StyleFamily[];
  formality: TasteFormality;
  fit: TasteFit;
  silhouette: TasteSilhouette;
  palette: FavoriteColorId[];
  pattern: TastePattern;
  layering: TasteLayering;
  footwear: TasteFootwear;
  accessories: TasteAccessories;
  season: TasteSeason;
};

export type TasteLook = {
  id: TasteLookId;
  label: string;
  assetKey?: string;
  tags: TasteLookMetadata;
};

export type TasteReaction = {
  lookId: TasteLookId;
  value: TasteReactionValue;
};

export type OnboardingStepId =
  | "about-you"
  | "daily-life"
  | "model-method"
  | "photo-model"
  | "measurements"
  | "usual-sizes"
  | "build"
  | "body-shape"
  | "face-shape"
  | "hair"
  | "facial-hair"
  | "skin-tone"
  | "model-reveal"
  | "taste-discovery"
  | "favorite-colors"
  | "profile-ready";
