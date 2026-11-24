# Design: jihun.me

The locked system for jihun.me. Every page shares it, and Hallmark reads this file first on any later run. Change it on purpose: the file is the rule.

## Idea

**A security report about my own work.** Each project is presented as a scoped engagement: what was built, what was found, and what is still open. The homepage hero draws the deployed koreanpages.com.au architecture with its four published open findings marked where they apply. The case studies read like reports: a cover with a record (period, role, stack, status), a contents rail, tables, code and findings.

The site should look engineered and edited by the person who did the work. Credibility comes from real systems, real numbers and published weaknesses, never from decoration.

## System

- Genre: modern-minimal
- Shape: engagement record (home), long document (case studies)
- Theme: custom (vibe: "precise, candid, engineered, quiet, report-like, bilingual-ready")
- Axes: light/grotesk-sans/chromatic-vermillion · posture: restrained · modes: light + dark
- Direction chosen over two others dealt by Hallmark: Blueprint (all-caps display on prussian blue; rejected because of the uppercase and architecture-firm feel) and Vantage (a point-cloud hero that would have needed invented imagery). From the third, Console, it keeps hairline panels, record-like tables and mono only for what a machine wrote.

## Tokens

`assets/css/tokens.css` is the source of truth. The roles:

```css
:root {
  --color-paper: oklch(98.4% 0.003 250);  --color-paper-2: oklch(95.8% 0.004 250);  --color-paper-3: oklch(93% 0.005 250);
  --color-ink: oklch(21% 0.012 255);  --color-ink-2: oklch(35% 0.012 255);  --color-muted: oklch(47% 0.012 255);
  --color-rule: oklch(88.5% 0.006 250);  --color-rule-2: oklch(76% 0.008 250);
  --color-accent: oklch(53% 0.19 32);  --color-accent-ink: oklch(98.5% 0.008 40);  --color-focus: var(--color-accent);
  --font-display: "Pretendard Variable", Pretendard, -apple-system, system-ui, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif;
  --font-body: var(--font-display);
  --font-outlier: "Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --radius-card: 6px;  --radius-pill: 6px;  --radius-chip: 4px;  --rule-hair: 1px;  --shadow-card: none;
}
```

Dark mode re-derives every colour token under `:root[data-mode="dark"]` and `prefers-color-scheme: dark` (graphite paper at L 17%, ink at L 94%, accent lifted to oklch(70% 0.15 34)). The hues never move between modes. Body weight drops from 400 to 360 in dark.

Severity tokens (`--color-sev-critical`, `-high`, `-medium`, `-low`, each with a `-soft` tint) exist for findings and status only. Code tokens (`--color-code-*`) colour syntax only.

## Colour

- Neutrals sit at hue 250 (cool, barely tinted). The single accent is vermillion at hue 32: the reviewer's red pen. It marks open findings, the one primary button and link hover. Nothing else is coloured.
- Severity colours appear only on the pentest report, the scan-engine tables and status chips, always as text on a soft tint.
- No gradients, glows, glass, or shadows. Elevation is a step in paper lightness plus a hairline.

## Type

- **Pretendard Variable** for everything a person reads: headings, body, navigation, buttons, tables. Self-hosted as a dynamic unicode-range subset (`assets/fonts/pretendard/`), so Latin pages download one ~38 KB file (subset 91, preloaded) and Korean glyphs load only when used. `word-break: keep-all` keeps Korean words intact.
- **Geist Mono** (self-hosted variable WOFF2) only for code, file names, identifiers and CVSS vectors. Never for labels, headings or buttons.
- Scale: h1 40 to 60px at weight 640, tracking -0.028em; homepage h2 30 to 40px; case-study h2 28px; titles 20 to 24px; body 17px at 1.6; labels and captions 14px in `--color-muted`.
- Sentence case everywhere. No uppercase labels, no letter-spaced small text, no gradient text, no single coloured word inside a heading.

## Layout

- 12-column grid, container capped at 1360px with 64px gutters (24px under 60rem, 16px under 40rem). At 1920 the gutters grow; the measure and grids do not.
- Homepage sections: head on columns 1 to 3, content on 4 to 12. That asymmetry is the page's main structure.
- Case studies: cover (title, one-sentence lede, a four-cell record), then a sticky contents rail on columns 1 to 3 and the document on 4 to 11 at a 60ch measure.
- Section rhythm varies on purpose: a hairline rule, a paper-2 band (Capabilities), open space. Section gaps are 120px at desktop.
- Structured content uses tables, definition lists and ledgers, not cards. One containment layer at most.

## Controls

- Primary: vermillion fill, `--color-accent-ink` text, 6px radius, 48px tall. One per page (the hero).
- Secondary: 1px `--color-rule-2` outline on paper, same radius and height.
- Links: ink with a `--color-rule-2` underline; vermillion on hover. Every control has hover, active, focus-visible (2px accent ring, instant) and disabled states.
- The mode switch follows the OS until the visitor chooses; the choice persists in `localStorage` and is applied before first paint.

## Motion

Still. Colour and background transitions of 120 to 220ms on controls only; no reveals, no scroll animation, no typing effects. Under `prefers-reduced-motion` all transitions end immediately.

## Pictures

- Real screenshots of the live products (captured with Hallmark's `capture.mjs`), real proof-of-concept captures from the pentest, and the professional portrait.
- Architecture diagrams are inline SVG drawn only from documented facts, styled with the same tokens so they switch with the mode. Each has a `<title>` and `<desc>`.
- Never stock photography, illustrations, icons as decoration, or mock browser and terminal frames.

## Anti-AI rules (what this site refuses)

- Purple-to-blue or any decorative gradient; glowing backgrounds; floating orbs; glassmorphism.
- Fake terminal windows, blinking cursors, typing animations, hacker hoodies, padlocks, binary rain.
- Pulsing "open to work" or availability badges; decorative status dots.
- Eyebrow labels above headings; numbered section labels ("01"); tracked uppercase labels.
- Rows of pill-shaped technology badges; percentage skill bars; icon-above-heading card grids; bento grids.
- Middle-dot meta strings ("A · B · C"); arrows glued to link text ("Read more →"); em or en dashes in copy.
- Marketing language (seamless, robust, cutting-edge, empower) and self-praise. State what was built and what it does.
- Any number, quote, logo or screenshot that is not real. Unverified claims are left out, and open problems are stated plainly.

## Checks

`node <hallmark>/scripts/sloplint.mjs index.html cybershield.html pentest-report.html ai-attack-classifier.html assets/css --genre modern-minimal --render` with the site served locally. The stamp at the top of `assets/css/site.css` records waivers and dismissals.

## Exports

`assets/css/tokens.css` in this project. Tailwind, DTCG or shadcn blocks can be added here on request.
