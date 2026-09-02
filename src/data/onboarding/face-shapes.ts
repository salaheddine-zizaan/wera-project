import type { FaceShapeId, OnboardingOption } from "@/types/onboarding";

export const faceShapes = [
  { id: "oval", label: "Oval", assetKey: "face-oval" },
  { id: "round", label: "Round", assetKey: "face-round" },
  { id: "square", label: "Square", assetKey: "face-square" },
  { id: "heart", label: "Heart", assetKey: "face-heart" },
  { id: "diamond", label: "Diamond", assetKey: "face-diamond" },
] satisfies readonly OnboardingOption<FaceShapeId>[];
