---
# STATUS: SCAFFOLD — NOT a binding design contract yet.
#
# This file is Brand Bridge's per-project visual contract, but it is currently in
# placeholder mode because the project is greenfield and no brand assets exist yet.
#
#   - What used to be here (the getdesign "claude" brand template) is preserved
#     verbatim in ./DESIGN.claude-placeholder.md. It is an *interim reference
#     direction only* — never the brand contract — and may be dropped once the slots
#     below are filled.
#   - Until the TODO slots are filled from real Brand Bridge brand assets, the Taste
#     skill (design-taste-frontend) has **final aesthetic authority** and determines
#     the visual language. This file's tokens are suggestions, not commands.
#   - See ./CLAUDE.md for the authority order and how to take this file OUT of scaffold
#     mode (three regeneration paths are listed at the bottom).
#
# Scaffold mode ends when name + description + colors + typography reflect the real
# Brand Bridge brand. Then flip `status` to "final" below.
version: alpha
status: scaffold
name: Brand-Bridge
# TODO: One paragraph. What is Brand Bridge? What does it build? Who is it for?
description: "<TO-FILL> Brand Bridge is ____. It serves ____. The audience is ____."

# TODO: Replace every value below with Brand Bridge's real tokens once known.
# Until then, the values from ./DESIGN.claude-placeholder.md are an interim working
# palette — acceptable to build against, always overridable by the Taste read.
colors:
  # Dark-first, tangent to tone. Warm amber accent. Mapped to semantic CSS vars
  # in src/index.css; light mode is a deliberate inversion of the same names.
  primary: "#c78f3f"        # restrained warm amber — the signal color
  primary-active: "#9e6a20"
  primary-strong: "#b87e2b" # filled CTA fill (white text)
  ink: "#f5f3ef"            # near-white (dark native); light inverts to #111113
  body: "#a1a1aa"
  muted: "#71717a"
  hairline: "rgba(255,255,255,0.08)"
  canvas: "#09090b"         # dark-native page floor; light inverts to #fafaf8
  surface-dark: "#0d0d10"   # dark stage; stays dark in both themes (footer, HowItWorks)
  on-primary: "#ffffff"
  on-dark: "#f5f3ef"
  success: "#4ade80"
  error: "#f87171"

typography:
  # Elegant serif display (Cormorant Garamond) + clean sans (DM Sans) +
  # JetBrains Mono for technical mono labels. For the full letter-spacing and
  # scale map, read src/index.css @theme font tokens and the shipped components.
  display-xl: { fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 64, fontWeight: 400, lineHeight: 1.04, letterSpacing: -0.02em }
  display-lg: { fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 48, fontWeight: 400, lineHeight: 1.05, letterSpacing: -0.02em }
  display-md: { fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 36, fontWeight: 400, lineHeight: 1.06, letterSpacing: -0.02em }
  display-sm: { fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 28, fontWeight: 400, lineHeight: 1.08, letterSpacing: -0.02em }
  title-lg:   { fontFamily: "DM Sans, sans-serif", fontSize: 22, fontWeight: 500, lineHeight: 1.3, letterSpacing: 0 }
  title-md:   { fontFamily: "DM Sans, sans-serif", fontSize: 18, fontWeight: 500, lineHeight: 1.4, letterSpacing: 0 }
  title-sm:   { fontFamily: "DM Sans, sans-serif", fontSize: 16, fontWeight: 500, lineHeight: 1.4, letterSpacing: 0 }
  body-md:    { fontFamily: "DM Sans, sans-serif", fontSize: 16, fontWeight: 400, lineHeight: 1.55, letterSpacing: 0 }
  body-sm:    { fontFamily: "DM Sans, sans-serif", fontSize: 14, fontWeight: 400, lineHeight: 1.55, letterSpacing: 0 }
  caption:    { fontFamily: "DM Sans, sans-serif", fontSize: 13, fontWeight: 500, lineHeight: 1.4, letterSpacing: 0 }
  code:       { fontFamily: "JetBrains Mono, ui-monospace, monospace", fontSize: 14, fontWeight: 400, lineHeight: 1.6, letterSpacing: 0 }

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  pill: 9999px

spacing:
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px

components:
  # Component specs are intentionally left TBD — they must be derived from Brand
  # Bridge's real brand once defined. See ./DESIGN.claude-placeholder.md for a fully
  # populated example of the component contract shape (buttons, cards, nav, forms).
  status: "TBD until brand regeneration"
---

# Brand Bridge — Design Contract (Scaffold)

## Right now: scaffold mode

Read the STATUS block above first. **This file does not yet constrain Brand Bridge's
visual language.** While in scaffold mode, the Taste skill decides the aesthetic
direction; the tokens in this file are a working baseline, not the brand.

## What this file will become

Once finalized, this DESIGN.md is the single source of truth for every visual
decision in Brand Bridge: palette, type scale, spacing, radii, and component
patterns. Agents read it before writing any UI and match its tokens.

## Views of the design

- **Interim direction (until real brand exists):** `./DESIGN.claude-placeholder.md`
  holds the prior getdesign "claude" brand template — a strong warm-editorial,
  cream + coral + serif language. Build against it if you need *something concrete now*,
  but treat it as a placeholder to be replaced, not as Brand Bridge's identity.

## Regeneration paths (pick one to finalize)

1. **From real brand assets** — provide Brand Bridge's logo, existing palette, and
   type face (or a one-paragraph brief: what it is, audience, one-word vibe). Slots
   above get filled and `status` flips to `final`. Aesthetic choices after that come
   from Taste, tuned to those tokens.
2. **Auto-extract from built UI** — after Brand Bridge's first real interface ships,
   run the Impeccable `document` flow (or extract tokens from the shipped CSS) to
   derive DESIGN.md from the actual artifact instead of intentions.
3. **Adopt a getdesign direction** — pick a fitting catalog slug
   (`npx getdesign add <slug> --force`) if a specific reference look is wanted, then
   re-brand it to Brand Bridge and mark `final`.

## Authority order (conflict resolution)

1. User + Brand Bridge requirements always win.
2. **Taste** (`design-taste-frontend`) = primary aesthetic authority — design read,
   dials, typography, color, layout.
3. **UI/UX Pro Max** = supporting layer — accessibility, UX correctness, design-system/
   token architecture. Counts on a11y + core UX; never overrides art direction.
4. **Impeccable** = quality-control layer — `critique` / `audit` / `polish` before
   shipping.
5. **This file** = project contract (only binding once `status: final`).
6. Specialized aesthetic skills fire only for their specific case.

Full routing lives in `./CLAUDE.md` and in the global `~/.claude/CLAUDE.md`.