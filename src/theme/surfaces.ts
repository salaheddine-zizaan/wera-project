import { colors } from "./colors";
import { shadows } from "./shadows";

export const surfaces = {
  canvas: {
    backgroundColor: colors.canvas,
  },
  standard: {
    backgroundColor: colors.surface,
  },
  elevated: {
    backgroundColor: colors.surface,
    ...shadows.elevated,
  },
  darkEditorial: {
    backgroundColor: colors.editorialDark,
  },
} as const;

/**
 * Context-dependent surfaces intentionally have no default style recipe.
 * Image-led compositions, editorial compositions, and blurred overlays depend
 * on their visible content and should not become generic containers.
 */
export const surfaceGuidance = {
  flat: "Use typography, imagery, and whitespace without a container.",
  imageLed: "Layer content intentionally over an image; preserve image priority.",
  editorial: "Compose typography, imagery, and whitespace without card treatment.",
  blurred: "Use only when meaningful content remains visibly present behind it.",
  bottomSheet: "Use a surface that enters from the bottom with sheet elevation.",
} as const;

export type SurfaceToken = keyof typeof surfaces;
