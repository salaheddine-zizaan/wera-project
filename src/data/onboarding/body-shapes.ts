import type { BodyShapeId, OnboardingOption } from "@/types/onboarding";

export const masculineBodyShapes = [
  { id: "rectangle", label: "Rectangle", assetKey: "body-masculine-rectangle" },
  { id: "trapezoid", label: "Trapezoid", assetKey: "body-masculine-trapezoid" },
  { id: "v-shape", label: "V Shape", assetKey: "body-masculine-v-shape" },
  { id: "triangle", label: "Triangle", assetKey: "body-masculine-triangle" },
  { id: "oval", label: "Oval", assetKey: "body-masculine-oval" },
] satisfies readonly OnboardingOption<BodyShapeId>[];

export const feminineBodyShapes = [
  { id: "hourglass", label: "Hourglass", assetKey: "body-feminine-hourglass" },
  { id: "triangle", label: "Triangle / Pear", assetKey: "body-feminine-triangle" },
  {
    id: "inverted-triangle",
    label: "Inverted Triangle",
    assetKey: "body-feminine-inverted-triangle",
  },
  { id: "rectangle", label: "Rectangle", assetKey: "body-feminine-rectangle" },
  { id: "oval", label: "Oval", assetKey: "body-feminine-oval" },
] satisfies readonly OnboardingOption<BodyShapeId>[];
