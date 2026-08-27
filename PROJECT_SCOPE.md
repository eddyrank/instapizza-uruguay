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
| MenuRow | `src/components/MenuRow.astro` | Name/description/price row, supports single or dual (chivito 1x/2x) pricing; renders an `OrderStepper` per priced entry |
| InfoCard | `src/components/InfoCard.astro` | Stat tile used in the "at a glance" grid |
| OrderStepper | `src/components/OrderStepper.astro` | −/+ quantity control for one orderable line item (48×48px buttons) |
| CartButton | `src/components/CartButton.astro` | Header cart trigger — `icon` variant (desktop + mobile top bar) and `full` variant (mobile menu row), both with a live item-count badge |
| CartDrawer | `src/components/CartDrawer.astro` | The order summary panel: item list with inline qty editing, notes/address field, running total, "Enviar pedido por WhatsApp" button, clear-cart button |

## 5. Layout

| Layout | Path | Purpose |
|---|---|---|
| BaseLayout | `src/layouts/BaseLayout.astro` | `<head>` (meta, OG, Twitter Card, JSON-LD), skip link, Header/Footer/CartDrawer wrapper |

## 6. Data modules (single source of truth)

- `src/lib/business.ts` — NAP, hours, WhatsApp link, geo, social, rating. Every component/page imports from here.
- `src/lib/menu.ts` — full menu content transcribed from the client's flyer images.
- `src/lib/schema.ts` — builds `Restaurant` and `WebSite` JSON-LD from `business.ts`.
- `src/lib/slug.ts` — `slugify()`, used to build stable cart item ids from menu item names.

## 6b. Order-by-WhatsApp cart

Every priced menu item (29 line items: 1 pizza base, 9 burgers, 8 chivito size variants, 5 milanesa
variants, 3 Tortugón variants, 3 Friendly Box variants) has a quantity stepper. Selecting items:

1. Updates an in-memory cart, persisted to **this browser's `localStorage`** (`instapizza-cart-v1`) —
   nothing is sent anywhere until the customer taps "Enviar pedido"
2. Updates the cart badge in the header (desktop icon, mobile icon, mobile menu row — all three stay in sync)
3. Lets the customer open a summary drawer (`CartDrawer`) to review items, adjust quantities, add a free-text
   "Notas / dirección" field, and see a running total
4. On "Enviar pedido por WhatsApp", builds a `wa.me` deep link with the itemized order pre-filled as the
   message text and opens it in a new tab — the customer still reviews and hits send themselves in WhatsApp

All logic lives in `src/scripts/cart.ts` (vanilla TS, no framework, ~1.8KB gzipped), driven entirely by
`data-item-id` / `data-item-name` / `data-item-price` attributes on the stepper markup — so the cart never
needs its own copy of menu data and can't drift out of sync with `menu.ts`.

**Known limitation, by design:** pizza topping combinations (comunes/especiales/premium) aren't individually
orderable — the pricing depends on how many toppings of each tier are chosen, which doesn't reduce to a flat
per-item price. The Muzza base pizza is orderable as a single line item, and there's a hint next to it telling
customers to note their topping choices in the "Notas" field. If the client wants full topping selection, that
would need a small pricing-rules engine — flag if that's wanted and it can be scoped separately.

The "Al plato" milanesa (no listed price) intentionally has no stepper — nothing to add at an unknown price.

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
- [x] 48×48px minimum touch targets on interactive controls (nav toggle, buttons, cart steppers — verified via JS `getBoundingClientRect`)
- [x] Cart drawer: `role="dialog" aria-modal="true"`, `aria-labelledby`, Escape closes it, focus moves to the
      close button on open and returns to whatever triggered it on close
- [x] NAP identical across footer, location section, and JSON-LD (all pull from `business.ts`)

## 8. Content needs

- **Milanesa "Al plato" price** — the source flyer shows this item without a visible price; the site
  currently shows "Consultar" instead of a fabricated number. Get the real price from the client.
- Confirm the client is happy with "Consultar" wording, or provide the price to replace it.
- Optional: an email address, if the client wants one listed (currently blank in `business.ts`).

## 9. Photo assets — done

Real client photos (from `~/Downloads/Instapizza pictures`) are wired in at `public/images/`, resized
for web (long edge capped at 1800px for feature shots / 1200px for gallery, JPEG):

| Site location | File | Source |
|---|---|---|
| Header / footer logo, favicon, apple-touch-icon | `logo.jpg` | client logo (also cropped to `favicon-32.png`, `apple-touch-icon.png`) |
| Hero | `pizza-jamon-cheddar-instapizza.jpg` | pizza + cutter shot, branded boxes visible |
| OG share image | `og-cover.jpg` | 1200×630 crop of the hero photo |
| Sandwiches / Tortugón feature | `tortugon-carne-picada.jpg` | double-decker sandwich, matches the Tortugón description |
| About | `sandwich-instapizza-especial.jpg` | branded sandwich close-up |
| Gallery (6) | `gallery-pizza-langostinos.jpg`, `gallery-burger.jpg`, `gallery-sandwich-artesanal.jpg`, `gallery-sandwich-lomo.jpg`, `gallery-pizza-porcion.jpg`, `gallery-sandwich-pita.jpg` | remaining clean product shots |

**Two images from that folder were excluded on purpose**: a "GARAMOND" type-specimen screenshot and an
"OURA & CO." furniture-site screenshot. Neither is Instapizza content — they look like unrelated design
references that ended up in the same folder — so nothing was published from them. Flag to the client if
that folder wasn't meant to include those.

**Also excluded**: the five Instagram-style promo flyers (Friendly Box, Milanesa Napolitana, Tortugón,
Muzza/Gustos, the full chivito+burger+milanesa "MENU" poster). They're well-designed, but each already
has prices baked into the image as text — using them as photography on the page would duplicate (and
risk drifting out of sync with) the live prices already typeset from `menu.ts`. The raw product photos
were used instead so every price on the page has exactly one source of truth. The flyers themselves are
still great as-is for Instagram/WhatsApp status posts — just not embedded in the site.

## 10. Integrations to configure

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
│   ├── robots.txt
│   └── images/
│       ├── logo.jpg, favicon-32.png, apple-touch-icon.png
│       ├── og-cover.jpg
│       ├── pizza-jamon-cheddar-instapizza.jpg
│       ├── tortugon-carne-picada.jpg
│       ├── sandwich-instapizza-especial.jpg
│       └── gallery-*.jpg (6 files)
└── src/
    ├── components/
    │   ├── CartButton.astro
    │   ├── CartDrawer.astro
    │   ├── Footer.astro
    │   ├── Header.astro
    │   ├── InfoCard.astro
    │   ├── MenuRow.astro
    │   ├── OrderStepper.astro
    │   └── SectionHeading.astro
    ├── layouts/
    │   └── BaseLayout.astro
    ├── lib/
    │   ├── business.ts
    │   ├── menu.ts
    │   ├── schema.ts
    │   └── slug.ts
    ├── pages/
    │   ├── 404.astro
    │   └── index.astro
    ├── scripts/
    │   └── cart.ts
    └── styles/
        └── global.css
```
