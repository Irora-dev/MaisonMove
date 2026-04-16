# Maison Move Website — Feature Spec & Content Map

*Last updated: April 2026*

---

## SITE OVERVIEW

Single-page pre-launch website for Maison Move (Collection One: Foundation). Built as a static site — `index.html`, `styles.css`, `script.js`. No backend, no CMS, no e-commerce integration yet.

**Purpose:** Build an email list, communicate the brand and collection, and create a pre-launch presence that feels like a real brand from day one.

---

## PAGE STRUCTURE (top to bottom)

### 1. Loading Screen
- SVG MM monogram (Concept A — one M upright, one inverted, diamond at the crossover)
- Pulse animation, auto-dismisses after 1.4 seconds

### 2. Announcement Bar
- Fixed black bar at top of page
- Content: "Complimentary shipping on orders over £100"

### 3. Navigation
- Fixed nav, hides on scroll down, shows on scroll up
- Logo: MAISON MOVE stacked wordmark (centred)
- Left: hamburger toggle (mobile only)
- Nav links: Collection, Technology, Story, Journal
- Right actions: Search icon, Account icon (opens account modal), Wishlist icon (opens wishlist modal with badge count), Cart icon (placeholder)
- Mobile: full-screen overlay menu with the same four links

### 4. Hero Section
- Full viewport height, centred content
- Rotating text circle: "MAISON MOVE" repeated, spinning continuously, MM monogram SVG centred inside
- Headline: "A House Built for the Body *in Motion*"
- Subtitle: "Designed for the woman who doesn't pause between sets and plans."
- CTA button: "Explore the Collection" (scrolls to collection section)
- Scroll indicator at bottom: "Scroll" text with animated line

### 5. Countdown Section
- Dark background (black)
- Label: "Coming Soon"
- Title: "The House Opens"
- Live countdown timer (days, hours, minutes, seconds) — currently set to 90 days from page load
- Subtitle: "Register for early access and be the first to shop the debut collection."
- Email signup form with "Notify Me" button
- Success message: "You're on the list. Welcome to the house."

### 6. Brand Statement
- Centred, large serif text
- Label: "The House"
- Copy: "Maison Move fuses fashion-house design with genuine fabric innovation. Every piece is engineered to support where you need it and move where you don't. Wrapped in recovery-infused fabric that helps your body restore while you wear it."

### 7. Tech Differentiator
- Dark background (black)
- Header: "What's in your activewear?" / "Most brands start with trends. We start with engineering."
- Two-pillar layout (centred, max-width 800px):
  - **SculptMap™ — Train:** Multi-zone compression with built-in phase-change temperature regulation
  - **MaisonModal™ — Reset:** Heavyweight brushed modal-spandex blend, engineered for drape and comfort
- Detail grid below (2 columns, centred):
  - SculptMap™ expanded description (zoned architecture, contour seams, temperature regulation)
  - MaisonModal™ expanded description (cashmere feel, drape, "You train in SculptMap™. You reset in MaisonModal™.")

### 8. Collection — Foundation
- Label: "Collection One"
- Title: "Foundation"
- Description: "Seven styles designed to work alone or together. Studio to street, without compromise."
- Organised into **three groups**, each with a group header (title left, story right) and product grid below:

#### Group: SculptMap™ (3 items, 3-column grid)
- Story: "Multi-zone compression engineered for how your body actually moves. Every seam marks where the support changes. Pieces that hold, sculpt, and carry you from the gym floor to whatever comes after."
- Products:
  1. **The Sculpt Legging** — SculptMap™ Multi-Zone Compression — £95
  2. **The Perform Bra** — SculptMap™ Compression — £60
  3. **The Racerback Crop** — SculptMap™ Compression — £55

#### Group: MaisonModal™ (2 items, 2-column centred grid)
- Story: "A heavyweight brushed modal blend that drapes like water and feels like cashmere. The fabric of unwinding. Designed for the moments after, when your wardrobe should help you slow down."
- Products:
  4. **The Reset Trouser** — MaisonModal™ Brushed Modal — £75
  5. **The Reset Tee** — MaisonModal™ Brushed Modal — £60

#### Group: The Statement Pieces (2 items, 2-column centred grid)
- Story: "The layers that tie it all together. Wear the jacket and trouser as a matching set, or split them across the rest of the collection. One fabric, two pieces, every plan."
- Products:
  6. **The Maison Statement Jacket** — Lightweight Woven · DWR Finish — £120
  7. **The Maison Statement Trouser** — Lightweight Woven · DWR Finish — £85

- "View All Pieces" button below (opens collection notify modal)

#### Product cards (all items)
- Placeholder image with MM text and "Coming Soon" (no product photography yet)
- Wishlist heart button (toggles, persists in localStorage)
- Product name, tech label, price

### 9. SculptMap™ Zones Section
- Label: "Technology"
- Title: "SculptMap™"
- Description: "Four compression zones, engineered for how you move. Each zone is mapped to the body's natural mechanics. Supporting where you need it, releasing where you don't."
- 2x2 grid of zone cards, each with a number (01-04), zone name, compression tag, and description:
  1. **Core & Waist** — High Compression
  2. **Glutes & Hips** — High Compression
  3. **Calves & Ankles** — Light Compression
  4. **Behind the Knees** — Breathable Zone

### 10. Marquee Strip
- Scrolling horizontal text: "Studio to Street · SculptMap™ Compression · MaisonModal™ Comfort · Designed in the UK" (repeating)

### 11. Story Section
- Two-column layout: image left, content right
- Image: `assets/storyC.jpg` (woman training with barbell, parallax scroll effect)
- Label: "Our Story"
- Title: "Why We Exist."
- Four paragraphs of brand story copy
- Closing line: "The house was built for the woman who refuses to pause."
- Signature: Sapphira Mort, Founder

### 12. Values
- 4-column grid (stacks on mobile):
  1. **Fabric-First** — Oeko-Tex and GRS certified materials
  2. **Engineered, Not Decorated** — Compression zones based on body mechanics
  3. **Studio to Street** — Gym to brunch without compromise
  4. **Quiet Luxury** — Clean lines, intelligent design, materials that speak for themselves

### 13. Lookbook
- Horizontal drag-scrollable carousel with arrow navigation
- 7 slides (mix of standard and tall aspect ratios) with placeholder images and captions:
  - The Sculpt Legging in Sand
  - The Maison Statement Jacket in Charcoal
  - The Reset Trouser in Cloud
  - The Racerback Crop in Sand
  - The Reset Tee in Onyx
  - The Perform Bra in Taupe
  - The Reset Tee in Espresso
- Progress bar below

### 14. Testimonials
- Horizontal drag-scrollable carousel
- 5 testimonial cards, each with: 5-star rating, quote, name, location
- All attributed to "Fit Tester" + UK city
- Progress bar below

### 15. Sustainability
- Label: "Responsibility"
- Title: "Built to Last. Sourced with Care."
- Three certification badges:
  1. **OEKO-TEX 100** — fabrics tested and certified free from harmful substances
  2. **GRS** — Global Recycled Standard certified materials
  3. **Low Waste** — small-batch production, no overstock

### 16. Loyalty Programme — The House Rewards
- Label: "Rewards"
- Title: "The House Rewards"
- Three-tier grid:
  1. **Move** (0–499 points) — 1 point per £1, early access, birthday reward, members-only content
  2. **Maison** (500–999 points) — plus complimentary shipping, priority access to limited editions, seasonal gift
  3. **Maison Elite** (1,000+ points) — plus VIP event invitations, first access to collaborations, personal styling
- CTA: "Join the House" (opens account modal)

### 17. FAQ
- Accordion (one open at a time), 6 questions:
  1. When does the collection launch?
  2. What sizes do you offer? (XS–XL, UK 6–14)
  3. How should I care for my Maison Move pieces? (wash cold 30°C, no tumble dry, no fabric softener)
  4. What is your shipping policy? (free over £100, standard £4.95, express £7.95)
  5. What is your returns policy? (30-day, unworn, tags attached)
  6. Are your fabrics sustainable? (Oeko-Tex, GRS, small-batch)

### 18. Instagram Grid
- 6-column placeholder grid (no live feed)
- @maisonmove handle
- Title: "The World of Maison Move"

### 19. Newsletter
- Label: "The Journal"
- Title: "Be the first to know."
- Subtitle about early access, fabric stories, and private events
- Email signup form
- Success message: "Welcome to the house."

### 20. Footer
- 5-column layout:
  - Brand column: MAISON MOVE logo + tagline
  - Shop: All Pieces, Activewear, Loungewear, Accessories
  - The House: Our Story, Technology, Sustainability, Stockists
  - Support: Size Guide (opens modal), Shipping & Returns, Care Guide, Contact
  - Connect: Instagram, TikTok, Pinterest
- Bottom bar: © 2026 Maison Move Ltd, Privacy Policy, Terms of Service

---

## MODALS

### Account Modal
- Tab toggle: Sign Up / Log In
- **Sign Up:** first name, last name, email, password → creates localStorage user with 0 points at "Move" tier
- **Log In:** email, password → retrieves localStorage user
- **Dashboard (logged in):** welcome message, current tier badge, points count, progress bar to next tier, log out button
- Loyalty tier logic: Move (0–499), Maison (500–999), Maison Elite (1,000+)

### Wishlist Modal
- Title: "Saved Pieces"
- Lists wishlisted products with name, price, colour swatch, and remove button
- Empty state: "You haven't saved any pieces yet."
- Persisted in localStorage

### Size Guide Modal
- Tab toggle: Bottoms / Tops & Bras
- Tables with sizes XS–XL showing UK size, waist/hips/inside leg (bottoms) and bust/underbust/shoulder (tops)

### Collection Notify Modal
- Label: "Coming Soon"
- Title: "Be the first to shop the collection."
- Email signup form
- Success message: "You're on the list. Welcome to the house."

---

## INTERACTIVE FEATURES (JavaScript)

| Feature | How it works |
|---------|-------------|
| **Loading screen** | Displays for 1.4s then fades out and removes from DOM |
| **Mobile menu** | Hamburger toggle, full-screen overlay, links close the menu |
| **Nav hide/show** | Hides on scroll down (past 200px), shows on scroll up |
| **Fade-in on scroll** | IntersectionObserver adds `.visible` class to elements as they enter viewport |
| **Text reveal animations** | Section titles wrapped in reveal spans, triggered by IntersectionObserver |
| **Staggered grid animation** | Collection items, tech cards, and value items get staggered transition delays |
| **Countdown timer** | Updates every second, counts down to a date 90 days from page load |
| **Parallax story image** | Story section image translates vertically based on scroll position |
| **Lookbook carousel** | Mouse/touch drag scrolling, arrow button navigation, progress bar |
| **Testimonials carousel** | Mouse/touch drag scrolling, progress bar |
| **Wishlist system** | Heart buttons toggle products in/out of wishlist, badge count updates, modal lists saved items, all persisted in localStorage |
| **Account system** | Sign up creates localStorage user, log in retrieves it, dashboard shows tier/points/progress, log out clears state |
| **FAQ accordion** | Click to expand one answer at a time, others collapse |
| **Size guide tabs** | Toggle between Bottoms and Tops & Bras tables |
| **Smooth scroll** | Anchor links scroll to sections with nav height offset and page transition effect |
| **Cookie banner** | Appears after 2s, accept/decline saves preference to localStorage, banner hides |
| **Back to top** | Appears after 600px scroll, smooth scrolls to top on click |
| **Modal close** | All modals close on overlay click |

---

## CONTENT INVENTORY

### Copy that needs review before launch
- Brand statement (line 166–169) — still mentions "recovery-infused fabric" which may need updating since MineralSoft was dropped
- Testimonial from Jade W. (line 656) — still references "recovery fabric" for the Reset Trouser

### Placeholder content (needs replacing)
- All product images (currently MM placeholder boxes)
- Lookbook images (same placeholders)
- Instagram grid (placeholder boxes)
- Story image (`assets/storyC.jpg` — confirm this is final)
- Countdown date (currently auto-set to 90 days from load — needs a fixed launch date)

### Product data (7 styles)

| Product | Tech | Price | Wishlist key |
|---------|------|-------|-------------|
| The Sculpt Legging | SculptMap™ Multi-Zone Compression | £95 | sculpt-legging |
| The Perform Bra | SculptMap™ Compression | £60 | perform-bra |
| The Racerback Crop | SculptMap™ Compression | £55 | racerback-crop |
| The Reset Trouser | MaisonModal™ Brushed Modal | £75 | wide-leg-trouser |
| The Reset Tee | MaisonModal™ Brushed Modal | £60 | lounge-tee |
| The Maison Statement Jacket | Lightweight Woven · DWR Finish | £120 | cropped-jacket |
| The Maison Statement Trouser | Lightweight Woven · DWR Finish | £85 | statement-trouser |

---

## FILE STRUCTURE

```
maison-move/
├── index.html          — Single page, all sections
├── styles.css          — All styling, responsive breakpoints at 768px and 480px
├── script.js           — All interactivity (no dependencies, vanilla JS)
├── assets/
│   └── storyC.jpg      — Story section image
├── SITE_SPEC.md        — This file
├── GTM_STRATEGY.md
├── HURDLE_MAP.md
├── VAULT_SYSTEM.md
├── RESEARCH_1_CUSTOMER_AND_MARKET.md
├── RESEARCH_2_TECHNOLOGY_AND_MATERIALS.md
├── RESEARCH_3_SUPPLIERS_AND_MANUFACTURING.md
├── RESEARCH_4_DESIGN_AND_PRODUCTION.md
└── RESEARCH_5_FUNDING.md
```

---

## WHAT THIS SITE DOES NOT HAVE (yet)

- No backend / server
- No e-commerce (no cart, no checkout, no payments)
- No CMS (all content is hardcoded in HTML)
- No real email collection (forms prevent default, show success message, but don't send data anywhere)
- No analytics (no Google Analytics, no Meta Pixel)
- No real authentication (account system is localStorage only)
- No product photography
- No live Instagram feed
- No fixed launch date (countdown is relative)
