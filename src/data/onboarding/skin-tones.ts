import type { ColorOption, SkinToneId } from "@/types/onboarding";

export const skinTones = [
  { id: "tone-01", label: "Tone 01", hex: "#F9E3D0", assetKey: "skin-tone-01" },
  { id: "tone-02", label: "Tone 02", hex: "#F1C9A9", assetKey: "skin-tone-02" },
  { id: "tone-03", label: "Tone 03", hex: "#DCA17A", assetKey: "skin-tone-03" },
  { id: "tone-04", label: "Tone 04", hex: "#BF7A54", assetKey: "skin-tone-04" },
  { id: "tone-05", label: "Tone 05", hex: "#9B5D3F", assetKey: "skin-tone-05" },
  { id: "tone-06", label: "Tone 06", hex: "#7A432E", assetKey: "skin-tone-06" },
  { id: "tone-07", label: "Tone 07", hex: "#573021", assetKey: "skin-tone-07" },
  { id: "tone-08", label: "Tone 08", hex: "#382017", assetKey: "skin-tone-08" },
] satisfies readonly ColorOption<SkinToneId>[];
