# Wera Design Foundation

**Status:** Approved design foundation  
**References:** `design/references/foundation/wera-foundation.png` and `design/references/foundation/wera-surfaces-depth.png`

## Purpose and precedence

This document is the detailed visual source of truth for Wera interface work. It defines the visual language, components, and implementation rules derived from the approved foundation references.

It does not define product architecture, navigation structure, business flows, or new features. Those remain governed by `APP_MAP.md`. A pattern visible in a reference image is a visual example unless this document explicitly makes it a reusable UI rule.

When sources conflict, use this order:

1. Latest explicit user instruction
2. `APP_MAP.md` for product structure and navigation
3. This document and approved final screen references for visual direction
4. Existing implementation

## Design character

Wera is an editorial, fashion-first mobile product: modern, refined, minimal, confident, and image-led. It uses composition and imagery before containers. Functional controls should be calm and precise; high-impact moments should be rare and intentional.

Avoid generic SaaS dashboards, dense ecommerce grids, playful/cartoon styling, web-like layouts, excessive cards, decorative borders, and blanket shadows.

## Foundations

### Color

| Token | Value | Intended use |
| --- | --- | --- |
| Primary Navy | `#1A2948` | Primary actions, selected states, focused hierarchy, navy-on-light contrast |
| Canvas | `#FAF9F6` | Default application background |
| Surface | `#FFFFFF` | Standard contained content and temporary layers |
| Secondary | `#F5F3EF` | Quiet supporting surfaces and image backdrops |
| Muted | `#ECE9E7` | Subtle fills and restrained dividers |
| Text Primary | `#1B1A1D` | Functional text and core content |
| Text Secondary | `#777A7D` | Supporting labels and metadata |
| Dark Editorial | `#111111` | Rare high-impact editorial moments |
| Warm Accent | `#B1896B` | Small, supportive brand-warmth moments only |

Navy is an accent and hierarchy color, not the atmosphere of every screen. Warm accent is not a default action or status color. Use neutrals and Canvas to preserve breathing room.

Functional feedback colors are semantic only: success green, warning amber, error red, and info blue. They must remain legible and should not become decorative brand colors.

### Typography

| Role | Typeface | Use |
| --- | --- | --- |
| Display | League Spartan Bold | Large, condensed, assertive editorial headlines |
| Accent | Cormorant Garamond Italic | Expressive editorial phrases and select moments of warmth |
| UI | Plus Jakarta Sans | All functional UI: headings, body copy, labels, controls, and metadata |

Functional type scale:

| Level | Size / weight | Guidance |
| --- | --- | --- |
| Heading | 28px / Semibold | Main screen and section hierarchy |
| Subheading | 16px / Medium | Group titles and important supporting hierarchy |
| Body | 14px / Regular | Explanatory and primary functional copy |
| Caption | 12px / Regular | Metadata, hints, and low-emphasis labels |

Use display type only when it provides a meaningful editorial focal point. Do not use it for routine labels, forms, or dense content. Use the italic accent face sparingly; never substitute it for functional UI text.

### Spacing, size, and rhythm

Use the spacing scale: `4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64`.

- Standard horizontal screen margin: 20px; reduce to 16px only when needed on small phones.
- Preserve generous whitespace around editorial imagery and key actions.
- Minimum interactive target: 44–48px in both dimensions.
- Use visible type hierarchy and whitespace before adding a container.
- Maintain a clear text rhythm: heading → subheading → body → caption. Do not compress unrelated text into one density level.

### Radius, borders, and depth

| Token | Value | Intended use |
| --- | --- | --- |
| Small radius | 8–10px | Inputs, compact controls, small utility elements |
| Medium radius | 14–16px | Standard surfaces, cards, image tiles |
| Large radius | 20–24px | Large image-led modules and sheets |
| Full pill | 999px | Chips and semantically pill-shaped controls only |

Borders exist for clarity, not decoration. Use the smallest visual signal that establishes grouping or an interactive boundary:

- Subtle: low-contrast separation for quiet fields and surfaces.
- Default: a restrained neutral outline for contained controls.
- Strong: navy focus/selection only when state needs to be explicit.

Depth follows this order: whitespace → hierarchy → contrast → restrained outline → contextual blur → subtle shadow. Shadows are reserved for floating, elevated, or temporary layers; they must be soft and unobtrusive.

## Surface language

Choose a surface based on hierarchy and context, not as a default wrapping pattern.

| Surface | Purpose | Implementation guidance |
| --- | --- | --- |
| Canvas | Normal page background | Warm off-white, spacious, no container required |
| Flat content | Content flowing on Canvas | Typography and whitespace establish hierarchy |
| Standard surface | Clear contained content | White/quiet surface; subtle outline or low elevation only when needed |
| Secondary surface | Supporting content | Muted neutral fill; lower visual weight than a standard surface |
| Elevated surface | Temporary or focused layer | Floats over content with a subtle shadow |
| Image-led surface | Fashion imagery with content | Imagery is primary; use overlays only when readability requires it |
| Editorial composition | High-impact storytelling | Typography and imagery together; not a card pattern |
| Blurred contextual layer | Search, picker, contextual overlay | Blur only when content visibly exists behind it |
| Dark editorial surface | Rare emotional/high-impact moment | Deep navy or near-black; high-contrast type and focused action |
| Bottom sheet | Transient action or review layer | Elevated from the bottom edge; rounded top corners; clear drag affordance where relevant |

Do not use one surface style across an entire screen. A screen should usually be Canvas-led, with only the surfaces that clarify focus or interaction.

## Components and interaction patterns

### Buttons

All buttons must have an obvious label, a minimum 44–48px target, and a clear pressed/disabled state.

| Variant | Treatment | Use |
| --- | --- | --- |
| Primary | Navy fill, white label, medium radius | One clear primary action in a local decision area |
| Secondary | Quiet surface with restrained border | Supporting action without equal emphasis |
| Outlined | Canvas/white fill with navy outline and text | Alternative path or lower-emphasis explicit action |
| Inverted | Dark fill on a light context or light action on dark editorial context | Contrast-critical editorial moment |
| Icon action | Outline Lucide icon in a clear 44–48px target | Single obvious utility; add text when meaning is ambiguous |
| Destructive | Red semantic treatment | Destructive action only; never use as visual decoration |

Avoid placing several filled primary buttons beside each other. Within a screen section, establish a single clearest next step.

### Inputs and search

Inputs use a white or Canvas-adjacent standard surface, a subtle neutral border, medium radius, 16px horizontal inset, and comfortable vertical padding. Labels and helper/error text use Plus Jakarta Sans.

Search fields pair an outline search icon with concise placeholder text such as “Search in your closet…”. Do not use filled, heavy search bars unless an active contextual layer requires it.

### Chips, tabs, and filters

Chips are compact selection controls, not miniature cards. Use rounded pills only for category, filter, or tag semantics.

- Default: quiet neutral/white surface with restrained outline or low contrast fill.
- Selected: navy fill with white text, or navy outline where adjacent visual weight must stay low.
- Keep labels short and easily scannable.
- Do not use more chip density than the mobile width can comfortably support.

### Icons

Use Lucide React Native outline icons with consistent stroke weight. Icons should support—not replace—labels where the meaning is not universal. Prefer the foundation set’s calm functional language: home, closet/hanger, studio, heart, profile, search, edit, sliders, bookmark, share, plus, and delete.

Use navy for selected/focused states, primary text for normal high-emphasis actions, and muted tones for inactive icons. Do not mix icon families without an approved need.

### Bottom navigation

When a product area requires bottom navigation, use a light elevated surface, outline icons, concise labels, and a clear navy selected state. The exact destination set must follow `APP_MAP.md`; the five-item navigation in the foundation reference is visual treatment only and does not change the approved Home · Closet · Profile main navigation.

### Image grids and garment tiles

Clothing and inspiration grids should be image-first. Use a calm neutral image backing, consistent crop, medium radius, and minimal metadata. Favourite or utility actions may sit as small unobtrusive overlays when they remain legible and reliably tappable.

Do not put image-led fashion content inside heavy framed cards. Preserve the supplied asset crop and proportions; never stretch, recolor, or filter approved Wera Model assets.

## Screen composition examples

The supplied reference examples demonstrate these reusable principles:

- **Welcome:** editorial headline beside or over a strong fashion image, with a restrained primary CTA.
- **Lifestyle choice:** clear question, brief helper text, and selectable illustrated/options with a strong selected state.
- **Home:** greeting first; a large image-led outfit direction; weather as supporting context rather than the main experience.
- **Closet overview:** real-wardrobe imagery can create the product metaphor, paired with concise inventory information and a direct opening action.
- **Closet category:** filter chips over a calm image grid, with clear category/count hierarchy.
- **Search overlay:** contextual blur behind an elevated search/filter layer, only while that layer is active.
- **Outfit Studio:** the Model is the visual stage; garment controls are secondary and actions remain reachable at the bottom.
- **Profile:** a focused dark/image-led profile header can introduce identity, followed by calm functional rows on Canvas.
- **Model reveal:** reserve dark editorial treatment for this high-emotion milestone; use large type, a stable full-body Model, and one clear continuation action.
- **Bottom sheet:** temporarily elevate save/share/note flows instead of navigating away when the task is short and contextual.

These examples do not prescribe routes, information architecture, or a mandatory layout for every instance. Reproduce a final approved screen closely; for conceptual references, preserve the composition principles rather than copying every visible element.

## Implementation rules

- Inspect this document and the relevant approved visual reference before implementing or changing UI.
- Use NativeWind for ordinary static layout, spacing, color, type, borders, radius, and alignment. Use StyleSheet/inline styles only for runtime values, platform behavior, transforms, or Reanimated styles where it is clearer or required.
- Use React Native Reanimated only for subtle, purposeful feedback, continuity, selection, sheet, and Model transitions. Respect reduced-motion settings.
- Use existing approved assets before proposing placeholders or generated imagery. Missing final assets must be reported and approved before substitution.
- Centralize runtime image imports in `constants/images.ts`; components should consume `images.*` instead of importing assets directly.
- Keep design references under `design/references/` as documentation. Do not import reference boards into the runtime app unless explicitly instructed.
- Before changing a final approved screen, describe the UX/design change and obtain explicit approval.

## UI review checklist

- Does the screen feel mobile-native, fashion-first, editorial, and restrained?
- Is the primary action unambiguous and reachable?
- Does Canvas and whitespace do most of the organizational work?
- Are surfaces, borders, shadows, and blur justified by hierarchy or context?
- Are typography roles, image crops, icon treatment, touch targets, and selected states consistent with this foundation?
- Does the implementation preserve `APP_MAP.md` rather than inferring architecture from a visual reference?
