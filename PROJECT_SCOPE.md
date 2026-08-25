# Instapizza Delivery — Project Scope

## 1. Overview

A single-page Astro + Tailwind site for **Instapizza Delivery**, a pizza/burger/chivito/milanesa
delivery kitchen in San Carlos, Maldonado, Uruguay. The site is order-oriented (no cart/checkout —
every CTA opens a pre-filled WhatsApp chat) and doubles as the full digital menu. Business facts
(name, address, phone, hours, rating) were verified directly against the business's Google Business
Profile listing on 2026-08-25.

## 2. Design direction

The client's own flyer artwork (menu posters, logo) already established a strong brand identity —
this is a **deliberate departure from the skill's bright/warm default**, applied in full rather than
partially:

- **Palette:** near-black canvas (`ink` scale), gold/yellow primary accent (`gold` scale, from the
  flyers' headline lettering), tomato-sauce red secondary accent (`sauce` scale), warm cream body
  text (`cream` scale).
- **Typography:** `Anton` (bold condensed poster face) for headings — a free Google Fonts stand-in
  for the flyers' heavy outlined display lettering; `Caveat` (script) for accent phrases like
  "Recién salida del horno" / "Nuestro menú", matching the hand-lettered "Gustos" flourish on the
  pizza flyer; `Inter` for body copy and menu item names (readability across ~30 menu items).
- **Texture:** a faint diagonal gingham pattern (`bg-gingham` utility) nods to the checkered paper
  used in the flyer food photography, kept subtle so it never competes with text contrast.
- Contrast was checked by hand: primary body text uses `cream-100` at ≥80% opacity on `ink-900`/`ink-950`
  backgrounds (well above 4.5:1); no muted text runs below `/60` opacity.

## 3. Pages

| Route | Status | Description |
|---|---|---|
| `/` | Built | Single page: hero, info-at-a-glance, full menu (pizzas, burgers, chivitos, milanesas, sandwiches, combos), about, gallery, location/hours + map, closing CTA |
| `/404` | Built | Custom not-found page, `noindex, nofollow` |

This is a one-page site by explicit request — no separate `/menu`, `/contact`, etc. Every section is
anchor-linked from the header/footer nav (`#menu`, `#nosotros`, `#galeria`, `#ubicacion`).

## 4. Components

| Component | Path | Purpose |
|---|---|---|
| Header | `src/components/Header.astro` | Sticky nav, anchor links, WhatsApp CTA, accessible mobile menu toggle |
| Footer | `src/components/Footer.astro` | NAP, hours, quick links, Instagram, WhatsApp CTA |
| SectionHeading | `src/components/SectionHeading.astro` | Eyebrow + title + subtitle pattern reused per section |
| MenuRow | `src/components/MenuRow.astro` | Name/description/price row, supports single or dual (chivito 1x/2x) pricing |
| InfoCard | `src/components/InfoCard.astro` | Stat tile used in the "at a glance" grid |
| PlaceholderImage | `src/components/PlaceholderImage.astro` | Dashed-border placeholder for real photos not yet supplied |

## 5. Layout

| Layout | Path | Purpose |
|---|---|---|
| BaseLayout | `src/layouts/BaseLayout.astro` | `<head>` (meta, OG, Twitter Card, JSON-LD), skip link, Header/Footer wrapper |

## 6. Data modules (single source of truth)

- `src/lib/business.ts` — NAP, hours, WhatsApp link, geo, social, rating. Every component/page imports from here.
- `src/lib/menu.ts` — full menu content transcribed from the client's flyer images.
- `src/lib/schema.ts` — builds `Restaurant` and `WebSite` JSON-LD from `business.ts`.

## 7. SEO checklist

- [x] `robots.txt` in `public/`, points at the sitemap
- [x] `@astrojs/sitemap` generates `sitemap-index.xml` on build
- [x] `Restaurant` JSON-LD (subtype of `LocalBusiness`) with name, url, telephone, full `PostalAddress`,
      `geo`, `openingHoursSpecification`, `sameAs`, `areaServed`, `priceRange`, `hasMap`, `aggregateRating`
- [x] `WebSite` JSON-LD on the homepage
- [x] `aggregateRating` in JSON-LD has a matching **visible** rating badge on the page (info-at-a-glance
      grid + about section) — avoids the schema/visible-content mismatch risk
- [ ] `BreadcrumbList` — intentionally omitted; this is a one-page site with no navigable hierarchy to
      represent
- [ ] `FAQPage` — intentionally omitted; there is no visible FAQ section on the page
- [x] Semantic HTML: `<header>`, `<footer>`, `<main id="main-content">`, `<nav aria-label>` ×3 (main/mobile/footer),
      `<address>` for NAP, one `<h1>`, `<h2>` per section, `<h3>` per menu subsection
- [x] Skip-to-content link, `aria-expanded` on mobile toggle (verified via JS — flips correctly), `aria-hidden`
      on decorative SVGs, `aria-current` not applicable (single page, no multi-page nav state)
- [x] 48×48px minimum touch targets on interactive controls (nav toggle, buttons)
- [x] NAP identical across footer, location section, and JSON-LD (all pull from `business.ts`)

## 8. Content needs

- **Milanesa "Al plato" price** — the source flyer shows this item without a visible price; the site
  currently shows "Consultar" instead of a fabricated number. Get the real price from the client.
- Confirm the client is happy with "Consultar" wording, or provide the price to replace it.
- Optional: an email address, if the client wants one listed (currently blank in `business.ts`).

## 9. Photo assets needed

Every real photo slot is currently a labeled dashed-border placeholder — **swap these for the actual
files once available** (client confirmed real photos should be used; waiting on the local folder path):

- Hero: pizza / Instapizza box shot
- Sandwiches: Tortugón de Carne Picada
- About: team / kitchen / storefront photo
- Gallery (8 slots): shrimp pizza, ham & cheddar pizza, burger, steak sandwich, Friendly Box, milanesa
  napolitana, chivito, kitchen/local
- Logo: header currently uses a text-based "IP" mark as a stand-in for the real logo
- Open Graph share image: referenced at `/images/og-cover.jpg` in `schema.ts` / `BaseLayout.astro` —
  needs a real 1200×630 image before launch or social shares will show a broken image

## 10. Integrations to configure

- **Real photos** — once supplied, drop into `public/images/` and swap each `PlaceholderImage` usage
  for a real `<img>` (descriptive filenames, explicit `width`/`height`, `loading="lazy"` below the fold,
  `loading="eager" fetchpriority="high"` on the hero image only)
- **Real logo** — replace the text "IP" mark in `Header.astro` with `<img src="/images/logo.png" ...>`
- **Domain** — `astro.config.mjs` `site`, `business.ts` `url`, `public/robots.txt`, and `schema.ts`'s
  `image`/`menu` URLs all currently point at the placeholder `https://instapizza-uruguay.pages.dev`;
  update all four once the real Cloudflare Pages URL (or custom domain) is confirmed
  — search for `instapizza-uruguay.pages.dev` across the repo to catch every occurrence
- **Milanesa "al plato" price** — see Content needs above
- Google Analytics / Meta Pixel, if the client wants tracking (not included by default)

## 11. Deployment (GitHub → Cloudflare Pages)

1. `git init`, commit, push to `https://github.com/eddyrank/instapizza-uruguay.git` (done as part of this handoff)
2. In the Cloudflare dashboard (client's account): **Workers & Pages → Create → Pages → Connect to Git**
3. Select the `instapizza-uruguay` repo
4. Build settings: **Framework preset:** Astro · **Build command:** `npm run build` · **Build output directory:** `dist`
5. Deploy — Cloudflare Pages auto-builds on every push to the connected branch
6. Once live, update the placeholder domain everywhere listed in section 10, commit, push (triggers a rebuild)
7. Optional: attach a custom domain via Pages → Custom domains

## 12. Future: CMS for non-technical editors

If the client wants to edit menu items/prices without a developer: move `src/lib/menu.ts` into a
`src/content/menu/` Markdown/JSON collection, add Decap CMS (`public/admin/index.html` + `config.yml`),
enable Cloudflare Pages' Git-based auth or Netlify Identity + Git Gateway equivalent, and document the
login → edit → publish workflow. Not built in this pass — flagging as a future option only.

## 13. File structure

```
InstaPizza Uruguay Gonzalo/
├── PROJECT_SCOPE.md
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   └── robots.txt
└── src/
    ├── components/
    │   ├── Footer.astro
    │   ├── Header.astro
    │   ├── InfoCard.astro
    │   ├── MenuRow.astro
    │   ├── PlaceholderImage.astro
    │   └── SectionHeading.astro
    ├── layouts/
    │   └── BaseLayout.astro
    ├── lib/
    │   ├── business.ts
    │   ├── menu.ts
    │   └── schema.ts
    ├── pages/
    │   ├── 404.astro
    │   └── index.astro
    └── styles/
        └── global.css
```
