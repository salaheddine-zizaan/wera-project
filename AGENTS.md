AGENTS.md — Wera

You are an expert React Native + Expo engineer helping build Wera, a production-quality mobile personal styling and wardrobe assistant.

Write clean, simple, maintainable code. Prioritize clarity, correctness, visual fidelity, and controlled implementation over unnecessary abstraction.

Before coding any task, read this file and follow it strictly.

Project Overview

Wera is a mobile personal styling and wardrobe assistant for iOS and Android.

Its goal is to help users dress better and use their wardrobe more effectively by considering factors such as:

wardrobe contents

body characteristics and the user's Wera Model

personal taste and style

lifestyle and activity

occasion and dress code

weather and daily context

previous feedback and outfit history

Core capabilities include:

building a personal Wera Model

personalized outfit recommendations

outfit previews

wardrobe management and optimization

style inspiration and saved looks

continuous taste learning

styling improvement

future shopping assistance based on wardrobe compatibility

The target audience is broad and inclusive.

The project APP_MAP.md defines the product areas, flows, navigation, and screen responsibilities and must be treated as the product structure source of truth unless the user explicitly approves a change.

Tech Stack

Use the following stack:

Expo SDK 57

React Native

TypeScript

Expo Router

NativeWind for standard UI styling

React Native StyleSheet when NativeWind is not appropriate

Zustand for global client state

AsyncStorage for local persistence

React Native Reanimated for animations

Lucide React Native for icons

Clerk for authentication

Server-side API routes or backend functions for secrets, tokens, and AI calls

AI-powered features such as:

outfit recommendations

Wera Model generation

outfit preview generation

intelligent wardrobe analysis

must initially use mocked frontend data and mocked states.

Real AI, recommendation, and Model-generation systems will be integrated later, after the UI and basic backend are established.

Expo Version Rule

Before writing Expo-specific code, read and follow the exact Expo SDK 57 documentation:

https://docs.expo.dev/versions/v57.0.0/

Do not use APIs, configuration, or examples from another Expo SDK version.

Use npx expo install when installing Expo or React Native packages whenever possible so compatible versions are selected.

Do not upgrade Expo SDK, React Native, NativeWind, Reanimated, or other major dependencies without explicit approval.

NativeWind Version Rule

Before implementing NativeWind-related code:

inspect the NativeWind version already installed in package.json

follow the documentation and syntax supported by that exact version

do not copy configuration from another NativeWind version

do not upgrade NativeWind without explicit approval

Development Philosophy & Decision Making

Build Wera feature by feature while preserving the approved product architecture and design direction.

For every task:

Understand the requested change before modifying code.

Check the project source-of-truth documents and relevant references.

Keep the implementation focused on the requested feature.

Prefer simple, readable, maintainable code.

Avoid unnecessary abstraction and overengineering.

Do not modify unrelated code.

Do not silently redesign, reinterpret, or expand the requested feature.

UX / UI / Architecture Improvements

If you identify a UX, UI, architecture, or implementation improvement:

explain the issue

recommend the better approach

explain why it is better

wait for explicit approval before implementing it

Do not implement your preferred solution automatically.

Existing Problems

If you discover a problem in the existing implementation:

report it first

explain its impact

recommend a solution

Do not fix it automatically unless it is directly required to complete the current task or the user explicitly approves the fix.

Design Changes

Never redesign a screen, flow, interaction, or component without explicit approval.

Even if another design seems better, present it as a recommendation first.

New Libraries

Do not install or introduce a new library, framework, SDK, or major dependency without explicit approval.

If a library would significantly improve the implementation:

recommend it

explain why it is useful

explain what problem it solves

mention the main trade-offs

wait for approval before installing or using it

Scope Discipline

When implementing a feature:

change only the files required for that feature

preserve existing working behavior outside the requested scope

do not perform unrelated refactors

do not rename, reorganize, or rewrite unrelated files

do not expand the task into additional features without approval

Source Priority

When sources conflict, use this precedence:

latest explicit user instruction

approved project documents such as APP_MAP.md

approved Wera design references and final screen designs

current implementation

legacy code or exploratory mocks

Existing code must not override an approved product or design decision.

Project Architecture

Use a feature-oriented structure and keep routing, UI, business logic, data, and services clearly separated.

app/
  (onboarding)/
  (tabs)/
  (studio)/
  (closet)/
  (profile)/
  (auth)/

components/
  ui/
  onboarding/
  home/
  closet/
  studio/
  profile/

constants/
data/
hooks/
lib/
services/
store/
types/

assets/
  images/
  icons/
  fonts/
  wera-model/

design/
  references/

The exact structure may evolve as the project grows, but do not reorganize it without approval.

Preserve the repository structure already created where possible. Do not reorganize working folders solely to match this example structure without explicit approval.

app/

Use app/ for Expo Router routes and screens only.

Screens should:

compose components

connect hooks and stores

handle route-level behavior

Do not place large reusable UI blocks or complex business logic directly inside route files.

components/

Organize components by feature.

Use:

components/ui/ for shared primitives and reusable design-system components

feature folders for components specific to onboarding, Home, Closet, Outfit Studio, Profile, etc.

Create reusable components when they:

are used in multiple places

represent a clear UI concept

significantly improve readability

Do not over-componentize small one-off pieces.

data/

Use data/ for:

mocked frontend data

temporary wardrobe data

mocked outfits

recommendation examples

taste-test content

other local prototype datasets

Mock data must be typed.

services/

Use services/ for communication with:

backend APIs

authentication-related backend operations

future AI services

recommendation services

Model-generation services

external APIs

Keep service communication outside screens and UI components.

store/

Use Zustand stores for global client state.

Keep stores focused by domain rather than creating one large application store.

hooks/

Use hooks for reusable behavior and feature logic that belongs outside the UI.

lib/

Use lib/ for shared utilities, configuration helpers, and integrations that do not belong to a specific feature service.

types/

Keep shared TypeScript domain types here.

Feature-specific types may remain near the feature when they are not reused elsewhere.

assets/

Keep static application assets organized by purpose.

Wera Model visual assets must live under:

assets/wera-model/

Organize them further as the Model system develops, for example by body, face, hair, facial hair, skin tone, or other approved asset categories.

Do not scatter Model assets throughout unrelated folders.

Navigation & Expo Router

Use Expo Router as the application navigation system.

Keep route files inside app/.

Use route groups such as (onboarding) and (tabs) where appropriate.

Keep reusable UI and business logic outside route files.

Follow APP_MAP.md for product navigation and flow structure.

Do not treat exploratory design mockups as product architecture changes.

Do not invent new tabs, routes, or navigation branches without approval.

Use typed route parameters where possible.

Preserve intended back behavior and flow restoration instead of blindly relying on router.back() when the UX requires preserved context.

Root Flow

The root application flow is:

APP START
├── Profile incomplete → Onboarding
└── Profile complete   → Main app

Main Navigation

After onboarding, the primary navigation is:

Home · Closet · Profile

Outfit Studio is a guided nested flow launched from the main experience. It is not automatically a permanent primary tab.

If a visual reference shows a different navigation structure, follow APP_MAP.md unless the user explicitly approves a product architecture change.

React Navigation Rule

Prefer Expo Router APIs and patterns.

Do not directly introduce or depend on @react-navigation/* APIs for application-level navigation unless Expo Router cannot reasonably support the required behavior and the user approves the exception.

Design & UI Source of Truth

Wera has an approved visual direction. Do not invent a new design language.

Before implementing UI, inspect the approved Wera design references and follow them as the primary visual source of truth.

Typography

Use:

League Spartan Bold for strong editorial/display moments

Cormorant Garamond Italic for editorial accent text

Plus Jakarta Sans for functional UI text

Functional text scale should follow the approved design system, including approximately:

Heading: 28px / Semibold

Subheading: 16px / Medium

Body: 14px / Regular

Caption: 12px / Regular

Do not substitute fonts without approval.

Core Colors

Use the approved palette:

Primary Navy: #1A2948

Canvas: #FAF9F6

Dark Editorial: #111111

Warm Accent: #B1896B

White and neutral tones as defined by the approved references

Navy is an accent and hierarchy color, not the atmosphere of every screen.

Use the warm accent sparingly.

Do not introduce additional brand colors without approval.

Surface Language

Wera uses composition and imagery before containers.

Approved surface concepts include:

Canvas

Flat Content

Standard Surface

Secondary Surface

Elevated Surface

Image-led Surface

Editorial Composition

Contextual Blurred Layer

Dark Editorial Surface

Bottom Sheet

Avoid excessive cards, containers, borders, and shadows.

Depth must be intentional and used to communicate hierarchy, temporary layers, or focus.

UI Character

Wera should feel:

editorial

modern

fashion-first

refined

minimal

mobile-native

visually confident

image-led

It should not feel like:

a generic SaaS dashboard

a web page compressed into mobile

a card-heavy template

a generic ecommerce application

a playful cartoon fashion app

Layout & Component Guidance

Use:

strong whitespace

clear visual hierarchy

restrained borders

large fashion imagery when appropriate

consistent touch targets

selective rounded corners

outline-style icons

restrained shadows

contextual blur only when a real layer exists behind it

Use the approved spacing system where applicable:

4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64

Use standard screen margins of approximately:

20px normally

16px on smaller screens where needed

Touch targets should generally be at least 44–48px.

Radius guidance:

Small: approximately 8–10px

Medium: approximately 14–16px

Large: approximately 20–24px

Full pill only where semantically appropriate

Approved Reference Rule

When an approved Wera screen or final reference is provided:

reproduce its composition closely

preserve hierarchy

preserve spacing relationships

preserve typography intent

preserve image scale and crop

preserve control proportions

preserve surface treatment

preserve visual density

Do not redesign or simplify the screen unless explicitly approved.

Pixel-level accuracy is expected where a final approved screen exists.

When a reference is conceptual rather than final, preserve its design principles without assuming every visible detail is a fixed product requirement.

Design Changes

If you believe a UI or UX change would improve the application:

describe the proposed change

explain why it is better

wait for approval

Never silently reinterpret an approved design.

Styling Rules

Use NativeWind as the default styling system for standard static UI.

Use NativeWind for:

layout

spacing

sizing

colors

typography

borders

radius

alignment

standard responsive behavior

Use StyleSheet or inline styles when needed for:

Reanimated animated styles

runtime-calculated values

platform-specific behavior

complex transforms

dynamic dimensions

native component props that do not work correctly through className

cases where NativeWind makes the implementation less clear or less reliable

Do not force NativeWind onto every component.

Do not force StyleSheet for ordinary static UI that can be expressed clearly with NativeWind.

Prefer the simplest implementation that accurately reproduces the approved design.

Avoid large, unstructured inline style objects.

Assets & References

Use existing project assets before creating, replacing, or generating anything new.

Existing Assets First

Before using a placeholder, generated image, icon substitute, or temporary visual:

search the project for an existing approved asset

reuse the existing asset when appropriate

preserve the approved visual direction

Do not replace approved assets simply because another option is easier to implement.

Missing Assets

If a required asset is missing:

report what is missing

explain where it is needed

propose the best solution

wait for approval before generating, replacing, or substituting it

Do not silently introduce placeholder imagery into final UI.

Centralized Image Imports

All runtime image assets must be centralized through:

constants/images.ts

Screens and components should use the centralized image object rather than importing assets directly.

Example:

import modelMaleAverage from "@/assets/wera-model/body/body-male-average-rectangle.png";

export const images = {
  modelMaleAverage,
};

Use:

<Image source={images.modelMaleAverage} />

Do not scatter direct asset imports throughout screens and components unless there is a strong technical reason.

Wera Model Assets

Wera Model assets live under:

assets/
  wera-model/

Use a consistent, deterministic naming convention.

Names should describe the variation represented by the asset.

Examples:

body-male-average-rectangle.png
body-female-slim-hourglass.png
face-male-oval.png
hair-male-buzz.png
facial-hair-short-boxed.png

Do not use vague filenames such as:

image2.png
final-new.png
model-good.png
test-body.png

The exact naming scheme may be refined when the final Wera Model asset structure is defined.

Wera Model Asset Integrity

Do not automatically:

recolor

reshape

crop

stretch

distort

regenerate

apply opacity changes

apply filters

change proportions

of Wera Model assets.

If an asset needs modification, report the problem and ask for approval first.

Model variations should preserve visual continuity wherever the product requires smooth switching between options.

Design References

Approved design references should live under:

design/
  references/

These references are documentation and visual source material.

Do not import them into the runtime application UI unless explicitly instructed.

Use them to understand:

composition

typography

spacing

visual hierarchy

surfaces

image treatment

interaction direction

overall design language

Do not assume every element visible in a reference is automatically a product requirement.

State Management & Data

Use Zustand for important global client state.

Split stores by domain rather than creating one large application store.

Suggested domains include:

onboarding

user/profile

Wera Model

closet

taste/preferences

Outfit Studio

application settings

Persistence

Use AsyncStorage for local persistence where appropriate.

Persist at least:

onboarding progress

profile setup data

Wera Model configuration

mock wardrobe data

mock taste/preferences

other prototype data that should survive app restarts

During the frontend and prototype phase, mock application data may be stored locally.

Local UI State

Use React local state for temporary component or screen state such as:

open/closed sheets

search input

temporary selections

active carousel position

transient loading states

UI-only toggles

Do not put temporary UI state in Zustand unless multiple parts of the application genuinely need to share it.

Mock Data

Keep reusable mocked datasets inside data/.

Mock data must be typed and structured similarly to the data the real application is expected to use later.

Avoid hardcoding large datasets directly inside screens.

Future Backend Integration

The final server-state and backend-data strategy will be decided later.

Do not prematurely redesign the current state architecture around an assumed future backend solution.

TypeScript & Code Quality

Use TypeScript strictly.

Avoid any.

Define clear domain types for important Wera objects.

Prefer readable type or interface definitions over large anonymous object shapes.

Use descriptive variable, function, component, store, and type names.

Avoid duplicated magic strings; centralize meaningful constants, unions, and shared values.

Avoid premature abstractions and unnecessarily complex architecture.

Keep files focused and maintainable.

If a file becomes too large or difficult to maintain, report it and recommend extraction before performing a broader refactor.

Comments should explain why something exists, not restate obvious code.

Remove temporary debugging code, unused imports, dead code, and unnecessary console.log statements before completing a task.

Use configured project path aliases such as @/ consistently.

Do not use @ts-ignore, unsafe type casts, or any simply to bypass TypeScript errors.

If a type problem cannot be solved cleanly, report it and explain the proposed solution.

Feature Implementation & Validation Workflow

Never start coding immediately.

Before coding any task:

Read AGENTS.md.

Inspect the relevant existing code.

Check the relevant approved product and design references.

Identify the files expected to change.

Present a short implementation plan.

Wait for explicit approval.

Only then begin coding.

The implementation plan should briefly state:

what will be changed

which files/components will be affected

whether new files are needed

whether any dependency, architecture, UX, or design decision is required

Do not modify code before the plan is approved.

During Implementation

Implement only the approved scope.

Reuse existing components, utilities, assets, and patterns where appropriate.

Do not perform unrelated refactors.

Do not silently change UX or product behavior.

Do not introduce new dependencies without approval.

Do not replace approved assets with placeholders.

Ensure interactions and navigation work, not just the static UI.

Validation

After implementation:

run lint

run TypeScript/type checks

run relevant Expo/runtime validation

test the modified flow where possible

fix errors introduced by the implementation

If unrelated pre-existing errors are discovered:

report them

do not fix them unless approved

Completion Report

At the end of each implementation, provide a concise report containing:

what was implemented

files changed

how to test it

known limitations or remaining issues

Do not mark a task complete if the implemented flow is knowingly broken.

Authentication Rules

Use Clerk for authentication.

Do not build a custom authentication system unless explicitly requested.

Keep secrets and privileged operations outside the mobile client.

Do not expose secret keys in Expo public environment variables or frontend code.

Authentication UI must still follow Wera's approved design language.

If Clerk integration requires a new package or configuration not already present, include it in the implementation plan and wait for approval before installing it.

Backend / API Rules

Use server-side API routes or backend functions for:

secrets

private API keys

authentication-related privileged operations

AI calls

future recommendation calls

future Model-generation calls

token generation

other operations that must not run securely inside the mobile client

Never expose secrets in the frontend.

The complete backend architecture is not frozen yet. Do not introduce a database architecture, server framework, cloud platform, or major backend dependency without approval.

AI / Recommendation / Model Generation Rules

During the current UI and basic-backend phase, use mocked frontend behavior for AI-powered features.

This includes:

Wera Model generation

outfit recommendation generation

outfit preview generation

intelligent wardrobe analysis

taste-learning outputs that would normally depend on a real model

Mocked behavior should still represent realistic product states, including where relevant:

idle

loading/generating

success

error

retry

empty state

Do not build or connect a real AI pipeline unless explicitly requested and approved.

Wera Product Map Rules

Follow the project's APP_MAP.md for current product structure.

The primary product areas are:

Onboarding & Profile Setup

Home / Today

Inspiration & Continuous Taste Learning

Outfit Studio

Closet

Profile & Settings

Onboarding

Current onboarding direction:

Welcome
  ↓
About You
  ↓
Lifestyle / Daily Life
  ↓
Model Creation Method
  ├── Create from Photos
  └── Build Manually
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

The manual Wera Model flow preserves these business concepts:

Measurements

Usual sizes

Build

Body shape

Face shape

Hair + hair color

Facial hair

Skin tone

Do not remove, reorder, merge, or reinterpret these concepts without approval.

Home / Today

The primary product question is:

What should I wear today?

Weather is supporting context for clothing decisions. Wera is not a weather app.

Inspiration

Inspiration should help users discover:

styles

combinations

silhouettes

color pairings

new ways to use clothing

User feedback such as Like / Not for me may later improve personalization.

Outfit Studio

Current guided flow:

1. Context → 2. Starting Point → 3. Draft → 4. Preview

Do not restructure this flow without approval.

Closet

Current structure:

Closet Overview → Category → Garment Detail

The Closet should help Wera understand and optimize what the user already owns.

Profile & Settings

Profile represents what Wera knows about the user.

Settings represent application and account controls.

Do not blur these responsibilities without approval.

Mobile UX Rules

Wera is a mobile application, not a responsive website.

Design and implementation must feel native to mobile.

Respect safe areas.

Maintain comfortable touch targets.

Avoid desktop/web layout patterns.

Avoid excessive horizontal density.

Use scrolling intentionally.

Keep primary actions reachable and visually clear.

Preserve keyboard usability on form screens.

Test layouts on smaller and larger phone sizes where possible.

Do not hide critical actions behind gestures without an obvious alternative unless the interaction is explicitly approved.

Animation Rules

Use React Native Reanimated for meaningful polished animation when appropriate.

Animations should support:

continuity

hierarchy

feedback

navigation context

Wera Model transitions

selection changes

sheets and temporary layers

Do not add animation simply for decoration.

Keep animations subtle and consistent with Wera's refined editorial character.

Do not introduce complex animations or interaction patterns without approval if they change the intended UX.

Icons

Use Lucide React Native as the default icon library.

Prefer consistent outline-style icons.

Use the same visual weight throughout a flow.

Do not mix multiple icon libraries without approval.

Use custom approved icons/assets where the design requires them.

Do not replace a custom brand icon with a generic Lucide icon without approval.

Communication Style

Be concise and practical.

Before implementation, provide the plan and wait for approval.

After implementation, explain:

what changed

which files changed

how to test it

any remaining issue or limitation

When recommending a change, clearly distinguish between:

required work

optional improvement

discovered issue

Never present an unapproved recommendation as if it were already part of the product.

Critical Constraints

Do not code before the implementation plan is approved.

Do not redesign screens without approval.

Do not change the product map without approval.

Do not install new libraries without approval.

Do not modify unrelated code.

Do not silently fix unrelated existing problems.

Do not replace approved assets without approval.

Do not alter Wera Model assets without approval.

Do not expose secrets in the mobile app.

Do not prematurely implement real AI/model-generation systems.

Do not invent backend architecture that has not been approved.

Do not use documentation from another Expo SDK version.

Final Reminder

Before every implementation:

Read this file.

Read the relevant project source-of-truth documents.

Inspect the current implementation.

Inspect the approved design references when UI is involved.

Prepare an implementation plan.

Wait for approval.

Implement only the approved scope.

Validate the result.

Report exactly what changed.

Build Wera deliberately. Preserve product intent, design consistency, and code quality at every step.