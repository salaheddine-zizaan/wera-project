# Wera — Onboarding Content System

**Status: SOURCE OF TRUTH — use alongside `APP_MAP.md`**

## Purpose

This document defines what Wera needs to know about the user, why that information is useful, when it should be collected, and how the onboarding datasets should be structured.

The goal is to avoid turning onboarding into one large questionnaire.

**Core principle:** Ask only what Wera needs now. Learn the rest progressively from user behavior, wardrobe usage, and feedback.

---

## 1. User Data Domains

Wera user information is organized into six domains:

| Domain | Purpose | How collected |
|---|---|---|
| Basics | Basic personalization | Explicit user input |
| Lifestyle | Understand recurring dressing situations | Explicit user input |
| Sizes & Fit | Fit, clothing sizing, future shopping support | Explicit user input |
| Wera Model | Body/appearance representation and outfit preview | Manual selections or photos |
| Taste | Understand styling preferences | Mostly inferred from outfit reactions |
| Wardrobe & Behavior | Improve recommendations over time | Added and learned progressively |

---

## 2. Onboarding Content Flow

| Phase | Collect | Why |
|---|---|---|
| 01 About You | Name, age range, clothing/model direction | Basic personalization |
| 02 Daily Life | Profession, usual dressing, and frequent activities | Recommendation context |
| 03 Model Method | Photos or Manual | Choose Wera Model creation path |
| 04 Wera Model | Body/model data | Preview and fit context |
| 05 Model Reveal | Model confirmation | Validate Wera Model |
| 06 Taste Discovery | Reactions to complete outfits | Build initial taste profile |
| 07 Favorite Colors | Colors the user enjoys wearing | Improve outfit/color matching |
| 08 Profile Ready | Summary | Complete onboarding |
| Later | Wardrobe, wear history, feedback | Progressive learning |

---

## 3. About You

Keep this section short and conversational.

### Data

| Field | Type | Example |
|---|---|---|
| `displayName` | text | Sara |
| `ageRange` | single choice | 25–34 |
| `clothingDirection` | single or multi-select | Womenswear / Menswear / Both |
| `modelBase` | single choice | Feminine / Masculine |

### Rule

`clothingDirection` and `modelBase` are separate concepts.

A user may choose a masculine or feminine Wera Model while still being interested in multiple clothing directions.

Do not collect identity information unless the product actually requires it.

---

## 4. Lifestyle / Daily Life

Lifestyle data supports recurring outfit recommendations.

Keep Daily Life to three short questions, shown one at a time. This preserves a conversational pace while gathering the context Wera needs for useful outfit recommendations.

### Profession

Single choice:

```text
work
study
work-and-study
other
```

Suggested labels: Working, Studying, Work & study, and Something else.

### Usual Dressing

Single choice:

```text
casual
sporty
smart-casual
business
formal
```

### Frequent Activities

Multi-select:

```text
gym
friends
classes
work
travel
events
```

Suggested labels: The gym, Seeing friends, Classes, Work, Travel, and Events.

---

## 5. Sizes & Fit

Sizes & Fit is a shared user-profile domain and should not depend exclusively on the Manual Model path.

### Size System

```text
EU
US
UK
International
```

### Basic Sizes

```text
topSize
bottomSize
shoeSize
```

Example:

```json
{
  "system": "EU",
  "topSize": "M",
  "bottomSize": "40",
  "shoeSize": "42"
}
```

### Basic Measurements

```text
height
weight
```

### Optional Detailed Measurements

```text
chest-or-bust
waist
hips
shoulders
inseam
```

### Units

```text
cm / kg
ft-in / lb
```

Detailed measurements should remain optional unless a future feature genuinely requires them.

---

## 6. Wera Model Data

The Manual Model flow is structured around:

```text
Measurements
→ Usual Sizes
→ Build
→ Body Shape
→ Face Shape
→ Hair + Hair Color
→ Facial Hair
→ Skin Tone
```

The Photo Model path should eventually produce the same normalized Wera Model profile where possible.

---

## 7. Build Dataset

Build and body shape are independent concepts.

Starter build dataset:

```text
slim
lean
average
athletic
full
```

Example dataset entry:

```ts
{
  id: "athletic",
  label: "Athletic",
  description: "Defined, balanced build",
  assetKey: "athletic"
}
```

---

## 8. Body Shape Dataset

Body-shape options depend on the Wera Model base.

### Masculine Model

| ID | Label |
|---|---|
| `rectangle` | Rectangle |
| `trapezoid` | Trapezoid |
| `v-shape` | V Shape |
| `triangle` | Triangle |
| `oval` | Oval |

### Feminine Model

| ID | Label |
|---|---|
| `hourglass` | Hourglass |
| `triangle` | Triangle / Pear |
| `inverted-triangle` | Inverted Triangle |
| `rectangle` | Rectangle |
| `oval` | Oval |

### Rule

Body-shape selection should be visual-first.

The user should primarily compare Wera Model illustrations/assets rather than rely only on body-shape terminology.

---

## 9. Face Shape Dataset

Starter dataset:

```text
oval
round
square
heart
diamond
```

Face-shape selection should also be visual-first.

---

## 10. Hair Dataset

Hair options should be driven by approved assets.

Starter taxonomy:

```text
bald
buzz
crop
fade
side-part
textured
short-curly
medium
long
afro
braids
locs
bun
```

Example:

```ts
{
  id: "short-curly",
  label: "Short curly",
  assetKey: "hair-male-short-curly"
}
```

The UI must not contain asset-resolution logic.

---

## 11. Hair Color Dataset

Starter palette:

```text
black
dark-brown
brown
light-brown
blonde
auburn
gray
```

Suggested labels:

| ID | Label |
|---|---|
| `black` | Black |
| `dark-brown` | Dark Brown |
| `brown` | Brown |
| `light-brown` | Light Brown |
| `blonde` | Blonde |
| `auburn` | Auburn / Red |
| `gray` | Gray / White |

Use visual swatches.

---

## 12. Facial Hair Dataset

Starter options:

```text
none
stubble
mustache
goatee
short-boxed
full-beard
circle-beard
```

`none` must always be available.

---

## 13. Skin Tone Dataset

Use eight visual tones.

Internal IDs:

```text
tone-01
tone-02
tone-03
tone-04
tone-05
tone-06
tone-07
tone-08
```

### Rule

Skin tone is Wera Model rendering data.

It should not automatically become a styling-preference or outfit-recommendation signal.

The same principle applies to face shape and hairstyle.

Appearance should not be used to make assumptions about what style a user should prefer.

---

## 14. Taste Discovery System

Taste should primarily be learned through reactions to complete outfits rather than asking users to define themselves using fashion labels.

### User Interaction

Question:

**Does this feel like you?**

Responses:

```text
like
not-for-me
```

### Hidden Look Metadata

The user sees the outfit.

Wera stores structured metadata behind each look.

Example:

```ts
{
  id: "look-017",
  image: "...",
  tags: {
    styles: ["smart-casual", "minimal"],
    fit: "relaxed",
    formality: 3,
    palette: ["navy", "cream"],
    silhouette: "structured",
    layering: "light",
    footwear: "loafers"
  }
}
```

A positive reaction can strengthen multiple preference signals instead of storing only one style label.

---

## 15. Internal Style Taxonomy

Starter style families:

```text
casual
minimal
classic
smart-casual
streetwear
athleisure
preppy
workwear
elegant
formal
vintage
bohemian
edgy
modest
```

These are primarily internal tags.

Users should react to real outfit examples instead of being forced to understand fashion taxonomy.

---

## 16. Taste Look Metadata

Every taste-test look should describe several dimensions.

| Dimension | Example |
|---|---|
| Style | smart-casual |
| Formality | 3 / 5 |
| Fit | relaxed |
| Silhouette | structured |
| Palette | navy + cream |
| Pattern | solid |
| Layering | medium |
| Footwear | sneakers |
| Accessories | minimal |
| Season | transitional |

This allows Wera to learn a multidimensional taste profile.

---

## 17. Favorite Colors

Favorite Colors is explicit user input.

Question direction:

**Which colors do you actually enjoy wearing?**

Starter palette:

```text
black
white
cream
gray
navy
blue
beige
brown
olive
green
burgundy
red
pink
purple
orange
yellow
```

This should be a visual multi-select.

Favorite clothing colors are separate from:

- skin tone
- hair color
- generic favorite colors unrelated to clothing

---

## 18. Wardrobe Data

Do not require users to enter their entire wardrobe during profile setup.

Wardrobe building happens progressively.

A garment may eventually contain:

```text
id
image
category
subtype
primaryColor
secondaryColors
size
fit
material
season
formality
styleTags
favorite
wearCount
lastWorn
```

Initial garment creation should require only information that is genuinely useful, such as:

```text
photo
category
color
size when useful
```

---

## 19. Progressive Learning Signals

Wera should continuously improve after onboarding.

Potential learning signals include:

```text
Inspiration Like
Inspiration Not for me
Outfit accepted
Try another
Outfit saved
Starting garment selected
Favorite colors
Garment usage
Future wear history
```

These signals refine the user's taste profile over time.

---

## 20. Runtime Context

Some information should not be asked during onboarding because it can be supplied at recommendation time.

Runtime context may include:

```text
weather
temperature
time
date
day
occasion
activity
selected garment
```

This information belongs to daily recommendation and Outfit Studio context rather than permanent onboarding questions.

---

## 21. Conceptual Wera Profile

```text
WeraProfile
│
├── basics
│   ├── displayName
│   ├── ageRange
│   ├── clothingDirection
│   └── modelBase
│
├── lifestyle
│   ├── profession
│   ├── usualDressing
│   └── activities
│
├── sizesAndFit
│   ├── sizeSystem
│   ├── topSize
│   ├── bottomSize
│   ├── shoeSize
│   └── measurements
│
├── model
│   ├── creationMethod
│   ├── build
│   ├── bodyShape
│   ├── faceShape
│   ├── hair
│   ├── hairColor
│   ├── facialHair
│   └── skinTone
│
├── taste
│   ├── reactions
│   └── inferredStyleProfile
│
├── colors
│   └── favoriteWearColors
│
└── later
    ├── wardrobe
    ├── outfitPreferences
    └── behaviorSignals
```

---

## 22. Shared Sizes & Fit Rule

`Sizes & Fit` should be available to both Wera Model creation paths.

The Manual Model path may collect it during Model creation.

Users who create their Model from photos should still have an opportunity to provide useful size information before or shortly after onboarding completion.

The exact screen placement may be refined during UX implementation, but the final user profile should not assume that photo-based Model creation provides reliable clothing sizes automatically.

---

## 23. Content-System Principles

When implementing onboarding content:

1. Ask only for information with a clear product use.
2. Keep mandatory questions limited.
3. Prefer visual choices when terminology may be confusing.
4. Allow optional detailed information to be skipped.
5. Separate appearance data from taste assumptions.
6. Learn style through outfit reactions instead of relying only on self-described labels.
7. Reuse shared vocabularies across onboarding and Outfit Studio where possible.
8. Keep dataset IDs stable even if user-facing copy changes.
9. Keep asset keys separate from UI logic.
10. Continue learning after onboarding instead of treating the initial profile as final.

---

## Source Relationship

Use this file together with `APP_MAP.md`.

- `APP_MAP.md` defines **where the user goes and the responsibility of each product area/screen**.
- `WERA_ONBOARDING_CONTENT_SYSTEM.md` defines **what user information exists, why Wera needs it, when it should be collected, and the initial dataset/taxonomy structure**.

If implementation reveals a conflict between these documents, do not silently choose one interpretation. Report the conflict and resolve it before changing product behavior.
