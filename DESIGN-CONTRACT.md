# BrandBridge · Section Build Contract

This is the **operational contract** every section-build agent follows so the
site assembles into one coherent system. Read `DESIGN.md` (scaffold) and the
tokens in `src/index.css` first; this contract is how we *apply* them.

## Non-negotiable brand rules

- **One accent only:** coral `--color-primary #cc785c`. Do not introduce a second
  accent hue anywhere. Use neutral cream/ink/body/muted values for everything else.
- **Theme is locked light/warm-cream** (`--color-canvas #faf9f5`). No mid-page
  theme flips. `--color-surface-dark #181715` is allowed for the footer and
  optional editorial bands, and it must go CORAL-free on its own text (use
  `--color-on-dark`).
- **Typography split:** display/headlines use `--font-display` (serif, weight 400,
  `tracking-tighter`). Body/labels use `--font-sans`. Never use serif for buttons,
  pills, nav, or body text. Headlines stay weight 400; do not bold the serif.
- **Zero em-dashes. Zero en-dashes.** Use hyphens, commas, periods, colons. This
  applies to every visible string: headlines, body, buttons, alt text, captions.
  This is mandatory and non-negotiable.
- **Zero fake claims.** No invented stats, follower thresholds, testimonials,
  brand logos, revenue, or "1000s of creators". If a number is not real, it is
  either omitted or clearly labeled as an example/illustrative.
- **Zero AI-slop tells.** No purple/blue gradients, no `Acme`, no `Jane Doe`, no
  "Revolutionizing X", no "Unlock your potential", no decorative status dots, no
  section-numbering eyebrows, no `BRAND. MOTION.` text strips, no scroll cues.

## The conversion CTA

- The single conversion label is **"Get started"** (`config.ctaLabel`). Use it on
  the nav CTA, hero primary CTA, and form submit. Do not invent a second
  conversion label. One intent = one label.
- The secondary in-page anchor is **"How it works"** (`config.secondaryAnchorLabel`)
  and scrolls to `#how-it-works`. Not a conversion CTA.

## Primitives to reuse (do not re-implement)

- `Container` (`src/lib/Container.tsx`) for all max-width layout.
- `Button` (`src/lib/Button.tsx`): `variant="primary" | "secondary" | "on-dark" | "link"`,
  optional `href`, optional `icon`. For form submit buttons pass the props through
  or build `<button>` matching the same classes.
- `Reveal` (`src/lib/Reveal.tsx`) and `RevealStagger` + `StaggerItem`
  (`src/lib/RevealStagger.tsx`) for scroll reveals (honor reduced motion).
- Use `@phosphor-icons/react` for icons. One family. `weight="bold"` for UI icons.

## Tokens & shape system

- Radii: buttons `8px`, cards `12px`, hero visual container `16px`. Consistent.
- Section rhythm: `py-24 md:py-32` between major sections. Card padding `p-8`/`p-10`.
- Max width `max-w-7xl` via `Container`. Body paragraphs `max-w-2xl` or `max-w-[65ch]`.
- Text colors: headings `text-[--color-ink]`, body `text-[--color-body]`, muted
  `text-[--color-muted]`. Use the CSS vars `--color-*` (Tailwind v4 `text-[--color-x]`).

## Taste dials (design read)

`DESIGN_VARIANCE 7 · MOTION 5 · DENSITY 3` — premium but calm, trust-forward,
editorial. Motion: subtle fade/slide reveals only. No parallax, no float loops.

## Accessibility

- Semantic HTML: use `section`, `h2`, `ol`/`li`, `button`, appropriate `aria`.
- Visible `:focus-visible` (already global). Keyboard navigable.
- Labels above inputs; helper/error text below. Visible label + `aria-describedby`.
- Sufficient contrast: coral button uses white text (AA on #cc785c).
- Honor reduced motion (primitives already do).

## Section ownership & ids

Each response of yours builds to a **production-quality component file** in
`src/components/`. Anchors used by nav: `#how-it-works`, `#for-creators`,
`#faq`, `#contact`.

- `Nav.tsx` + `Hero.tsx` + `WhatIs.tsx`
- `ValueProps.tsx` + `HowItWorks.tsx` + `WhoItsFor.tsx`
- `OpportunityPreview.tsx` + `TrustSection.tsx`
- `Faq.tsx` + `CreatorForm.tsx` + `Footer.tsx`

## Output discipline

- TypeScript, one default export per file, clean naming, no unused vars.
- No fake interactions; every button scrolls, anchors, or submits, or is removed.
- Match surrounding comment style (brief, low-noise comments).
- Report: file(s) built, the copy you wrote, and any config values you believe
  belong in `src/config.ts`.