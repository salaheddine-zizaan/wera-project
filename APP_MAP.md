# Wera — Definitive App Map

**Status: DRAFT — approve before UI implementation**

## Product areas

1. Onboarding & Profile Setup
2. Home / Today
3. Inspiration & continuous taste learning
4. Outfit Studio
5. Closet
6. Profile & Settings

Main navigation after onboarding: **Home · Closet · Profile**. Outfit Studio is a guided nested flow launched from Home.

## Root flow

```text
APP START
├── Profile incomplete → Onboarding
└── Profile complete   → Main app
```

## Onboarding and Profile Setup

```text
Welcome
  ↓
About You
  ↓
Lifestyle / Daily Life
  ↓
Model Creation Method
  ├── Create from Photos
  │     ├── Photo guide
  │     ├── 3+ guided photos
  │     ├── Model reuse consent
  │     └── Mock Model generation during frontend validation
  └── Build Manually
        ├── 1/8 Measurements
        ├── 2/8 Usual sizes
        ├── 3/8 Build
        ├── 4/8 Body shape
        ├── 5/8 Face shape
        ├── 6/8 Hair + hair color
        ├── 7/8 Facial hair
        └── 8/8 Skin tone
  ↓
Model Reveal
  ↓
Initial Taste Test
  ↓
Favorite Colors
  ↓
Profile Ready
  ↓
Home
```

### Onboarding responsibilities

- **Welcome:** introduce Wera as a personal fashion assistant; start profile setup.
- **About You:** collect name, age/age range, and product-required wardrobe/Model reference direction lightly and conversationally.
- **Lifestyle / Daily Life:** gather only context that materially helps recommendations: work/study situation, activity, environment, dress code, common occasions, and general activity level.
- **Photo Model:** guide capture/gallery upload, preview, replace/remove, validation, consent for reuse in outfit previews, and a mocked generation state. Suggested useful views are front, side/angled, and full body.
- **Manual Model:** preserve the eight listed business concepts. Keep the Model anchored at a stable scale, crop, perspective, position, and lighting while selections change.
- **Model Reveal:** present a large Model with `Looks good` and `Make changes` actions.
- **Taste Test:** show complete varied looks; ask `Does this feel like you?`; accept Like or Not for me until a future-validated signal threshold.
- **Favorite Colors:** collect colours the user likes wearing with a visual multi-select palette; this is distinct from hair colour, skin tone, and generic favourite colours.
- **Profile Ready:** summarize the Model, meaningful lifestyle context, representative liked looks, selected colours, and useful basics; primary action is `Start using Wera`.

## Main App

```text
Main App
├── Home / Today
├── Closet
└── Profile & Settings
```

### Home / Today

Primary question: **What should I wear today?**

```text
Greeting / Today
├── Weather + useful context
├── Today's recommendation
├── Plan an Outfit
└── Inspiration
```

Weather supports clothing decisions; Home is not a weather app. Potential future recommendation inputs are profile, Model, lifestyle, dress code, wardrobe, taste, colours, weather, activity, occasion, time, feedback, and future wear history.

### Inspiration and continuous taste learning

Inspiration exposes new styles, combinations, silhouettes, colour pairings, and ways to use clothing. Like / Not for me continuously refines taste after onboarding.

```text
Onboarding Taste Test
  ↓
Initial Taste Profile
  ↓
Main App Feedback
├── Inspiration Like / Not for me
├── Outfit accepted
├── Outfit recreated
├── User-selected starting pieces
├── Favorite colors
└── Future wear/save history
  ↓
Better taste understanding
  ↓
Better future recommendations
```

All learning is mocked/local during frontend validation.

### Outfit Studio

```text
1. Context → 2. Starting Point → 3. Draft → 4. Preview
```

1. **Context:** occasion (Work, Dinner, Everyday, Event), activity (Mostly seated, Mixed, On the move), timing (Now, Tonight, Tomorrow), and known weather/time context.
2. **Starting Point:** either select one or more owned pieces (`Use my items`) or let Wera use available context, profile, wardrobe, and taste (`Choose for me`).
3. **Draft:** propose an outfit; `I would wear it` and `Recreate / Try another` become later preference signals.
4. **Preview:** present the full Model and individual pieces, with useful adjustment controls. Legacy warmth/formality adjustment is a concept to validate, not a fixed requirement.

### Closet

```text
Closet Overview → Category → Garment Detail
```

The overview preserves the legacy concept of a digital wardrobe structured like a real wardrobe with compartments. It shows categories/counts and provides category opening and add-garment actions. Category presentation is open for redesign. Garment detail may provide photo, category/subtype, colour, size, and only useful tags; it supports edit, delete, use in outfit, and optional favourite/save. Add Garment uses capture/upload, category confirmation, useful metadata confirmation, and save. Recognition/background removal are future ideas.

### Profile & Settings

```text
Profile — What Wera knows
├── Model
├── Personal details
├── Sizes & fit
├── Lifestyle
├── Style / taste
├── Favorite colors
└── Outfit preferences

Settings — application/account controls
├── Account
├── Notifications
├── Appearance
├── Privacy & data
├── Help
└── Feedback
```

## Frontend prototype rule

Use mock user, Model, weather, wardrobe, outfits, recommendations, taste profile, and generation states. Do not require backend, database, real authentication, AI pipeline, real recommendation engine, or real Model generation.

## Screen inventory

This inventory does not require 44 separate screens; combine where UX benefits.

| Area | Screens / states |
|---|---|
| Onboarding | Welcome; About You; Lifestyle; Model Method; Photo Intro/Capture/Consent/Generation; Measurements; Usual Sizes; Build; Body Shape; Face Shape; Hair; Facial Hair; Skin Tone; Model Reveal; Taste Test; Favorite Colors; Profile Ready |
| Main | Home / Today; Inspiration state |
| Outfit Studio | Context; Starting Point; Wardrobe Item Picker; Draft; Preview / Adjust |
| Closet | Overview; Category; Garment Detail; Add Garment |
| Profile | My Wera Profile; Edit Personal Details; Edit Model; Sizes & Fit; Lifestyle; Style/Taste; Favorite Colors; Outfit Preferences; Settings; Notifications; Appearance; Privacy & Data; Help/Feedback |

## Evidence and source boundary

- This file is an explicit user-provided product requirement and is **DRAFT** pending approval.
- Legacy code is supporting reference only; it cannot redefine this map.
- Survey evidence supports privacy-sensitive, partial-wardrobe onboarding but does not validate every individual feature in this map.

External source supplied by the user: `C:/Users/salaheddine/Downloads/APP_MAP.md`.
