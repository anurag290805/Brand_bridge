# Brand Bridge — Project Design Config

## Read before any UI work
- **`./DESIGN.md` is this project's visual contract.** Read it before writing or
  changing any UI in this project and match its tokens, type scale, spacing, and
  component patterns. It is currently a **scaffold** (see its STATUS header). The
  prior getdesign "claude" template is preserved at `./DESIGN.claude-placeholder.md`
  as an interim direction. Do not duplicate DESIGN.md's contents here; reference it.
- Working directory: `/Users/Anurag/Desktop/Brand_Bridge` (greenfield; `.claude/`
  holds only local permissions).

## Design authority order (minimum conflict; full rules in global `~/.claude/CLAUDE.md`)
1. **User + Brand Bridge requirements** always win.
2. **Taste** (`design-taste-frontend`) — primary aesthetic authority: design read,
   dials, art direction, typography, color, layout. Run its pre-flight check before
   shipping a page.
3. **UI/UX Pro Max** — supporting: accessibility, UX correctness, design-system/token
   architecture, charts, stack guidance. Never overrides art direction; accessibility
   & core-UX do take precedence (accessibility is non-negotiable).
4. **Impeccable** — quality-control layer: `critique`/`audit`/`polish` pass before
   shipping. Its `DESIGN.md` concept is exactly this file; keep it project-scoped.
5. **This `DESIGN.md`** = the project contract, binding once finalized.
6. **Specialized taste skills** (minimalist, brutalist, high-end, gpt-taste, brandkit)
   fire only when the brief maps to their specific aesthetic; they never override Taste
   by default.

## Triggers (load the minimum; don't stack rule-sets)
- Landing / portfolio / redesign / marketing page → Taste governs aesthetics;
  UI/UX Pro Max supplies UX + tokens *inside* that direction; Impeccable QC pass.
- Dashboard / dense product UI / data tables / admin → out of Taste's landing scope;
  use the correct design system + UI/UX Pro Max for UX/charts + Impeccable QC.
- Explicit aesthetic brief → matching specialized skill, Taste still governs.
- Brand identity / logo → `brandkit` + UI/UX Pro Max `brand`/`design`.
- Accessibility pass → UI/UX Pro Max `--domain ux`; wins over aesthetics.

## Scaffold → final transition
While `DESIGN.md` is in scaffold mode, Taste retains final aesthetic authority. Move it
to `final` via one of the three paths at the bottom of `DESIGN.md` (real brand assets /
Impeccable `document` extract / `getdesign add`). Never let a getdesign brand template
dictate Brand Bridge's identity — it is placeholder material only.