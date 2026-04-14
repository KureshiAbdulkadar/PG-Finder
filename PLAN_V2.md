# PLAN_V2.md — PG Finder Web App (Airbnb-Inspired) · Version 2.0

> **Version:** 2.0.0
> **Upgraded From:** PLAN.md v1.0.0
> **Last Updated:** 2026-04-14
> **Design Reference:** `DESIGN.md` (Airbnb Design System)
> **Stack:** React + Vite + Tailwind CSS + React Router v6
> **Icons:** Google Material Symbols (Outlined)
> **Target:** Mobile-first PWA — app feel on phone, full web on desktop
> **New in v2:** Splash Screen · Multi-Language (i18n) · UX Laws Applied · Pixel-Perfect Interface · Full Test Suite · Proper Image System · Loader System

---

## 🆕 What Changed from v1 → v2

| Area | v1 | v2 |
|---|---|---|
| App Entry | Direct render | Animated Splash Screen |
| Language | English only | i18n: English + Hindi + Gujarati |
| Loading | Basic spinners | Multi-layer loader system (skeleton, shimmer, splash) |
| Images | Placeholder picsum URLs | Structured image system with lazy load + fallback |
| UX | Good instinct | 8 UX Laws explicitly applied per component |
| Testing | None defined | Full test suite: unit + integration + E2E |
| Interface | Responsive | Pixel-perfect (8px grid, spacing scale, type scale) |
| Performance | Unspecified | Core Web Vitals targets defined |

---

## 🎯 Project Vision (Unchanged + Extended)

Build a **PG (Paying Guest) property listing platform** that:
- Looks and feels exactly like Airbnb on all screen sizes
- On **mobile**: feels like a native app (bottom nav, full-screen cards, app gestures)
- On **desktop**: full Airbnb-style browsing experience
- Has **2 separate panels**: Admin (property manager) + User (PG seeker)
- Uses **psychology-driven UX** and **proven UX laws** on the user side
- Supports **3 languages**: English, Hindi (हिन्दी), Gujarati (ગુજરાતી)
- Opens with a **branded splash screen** on first load and on PWA launch
- Every data-driven screen has a **proper loading state** (skeleton, not spinner)
- Every image is **optimized, lazy-loaded, and has a fallback**
- **Fully tested** — unit, integration, and E2E coverage

---

## 🧠 UX Laws Applied — Per Component

> These laws are not optional. Every component listed below must explicitly implement the law.

### 1. Fitts's Law — "The larger and closer a target, the easier to hit"
- **ContactBar CTA**: Minimum 56px height on mobile. Full-width button. Never a small icon.
- **Heart/Wishlist icon**: 44×44px tap target (even if visually smaller).
- **Bottom Nav tabs**: Each tab min 64px wide.
- **Filter chips**: Min 36px height, 12px horizontal padding.

### 2. Hick's Law — "More choices = more time to decide"
- **HomeScreen**: Max 2 primary CTAs visible above the fold.
- **CategoryPills**: Max 8 categories visible. Hide overflow behind "More →".
- **FilterPanel**: Group into 3 sections max. Use progressive disclosure (accordion).
- **PropertyCard**: Show only: Photo, Price, Location, Available badge. Nothing more.

### 3. Jakob's Law — "Users spend most of their time on OTHER sites"
- Follow Airbnb patterns exactly: search pill in header, card gallery layout, sticky contact bar.
- Heart icon = wishlist. Red = brand. Bottom nav = Home/Search/Wishlist/Profile.
- Admin panel follows standard dashboard conventions (sidebar on desktop, drawer on mobile).

### 4. Miller's Law — "Working memory holds ~7 items"
- **AmenitiesList**: Show max 6 amenities on card. Show all on detail page.
- **PropertyGallery**: 5 images max in main grid. Full viewer for more.
- **SearchResultsPage**: Paginate at 12 cards. Never infinite-scroll beyond 36 items without a "Load More" break.
- **Filter options**: Max 5 checkboxes visible before "Show more".

### 5. The Peak-End Rule — "People judge an experience by its peak and its end"
- **Peak = PropertyDetailPage**: Photo gallery must be stunning. Smooth swipe. Full-screen.
- **End = ContactPage**: Success screen after form submit. Animated checkmark. Warm message. WhatsApp button.
- **Splash Screen**: First impression (peak of entry). Must be premium.
- **Wishlist Empty State**: Friendly illustration, warm copy — not sterile "No items".

### 6. The Von Restorff Effect — "Items that stand out are remembered"
- **"Available Now" badge**: Bright green (#008a05) on white card. Stands out.
- **Verified badge**: Blue shield icon — contrast against photo.
- **Price**: Largest text on card. Semibold. Always #222222.
- **CTA buttons**: Brand red (#ff385c) only for primary actions. Never repeated for secondary.

### 7. The Zeigarnik Effect — "People remember unfinished tasks"
- **Contact flow**: Multi-step (Step 1 of 2). Progress indicator at top. Motivates completion.
- **Wishlist**: Show "You've saved 3 PGs" badge in nav. Creates loop to return.
- **Admin onboarding**: Checklist on first login: "Add first property → Upload photos → Go live".

### 8. Law of Proximity — "Related items should be grouped visually"
- **PropertyCard**: Price + priceUnit always together. Location + distance always together.
- **AmenitiesList**: Icons grouped by category (Services / Safety / Comfort).
- **Admin PropertyForm**: Fields grouped: Basic Info | Location | Pricing | Amenities | Media.
- **ContactBar**: Price on left, CTA on right. Same visual group, same purpose.

---

## 🌐 Internationalization (i18n) — NEW in v2

### Supported Languages
| Code | Language | Script | Direction |
|---|---|---|---|
| `en` | English | Latin | LTR |
| `hi` | Hindi | Devanagari | LTR |
| `gu` | Gujarati | Gujarati | LTR |

### Library
```
i18next + react-i18next
```

### Folder Structure Addition
```
src/
├── i18n/
│   ├── index.js              ← i18next config (language detection, fallback)
│   ├── locales/
│   │   ├── en/
│   │   │   ├── common.json   ← Shared UI strings
│   │   │   ├── property.json ← Property-related strings
│   │   │   ├── search.json
│   │   │   ├── admin.json
│   │   │   └── contact.json
│   │   ├── hi/
│   │   │   └── (same files)
│   │   └── gu/
│   │       └── (same files)
```

### Language Switcher Component
```
src/components/common/LanguageSwitcher/
└── LanguageSwitcher.jsx
```
- Pill-style switcher: `EN | HI | ગુ`
- Placed in Navbar (desktop: right side, mobile: inside Profile tab)
- Persists selection in localStorage
- Switches instantly (no page reload)
- Applies correct Google Font per language:
  - English: Airbnb Cereal VF
  - Hindi: Noto Sans Devanagari
  - Gujarati: Noto Sans Gujarati

### i18n Rules
- ❌ NEVER hardcode user-visible strings in components
- ✅ Always use `t('key')` from `useTranslation()`
- Numbers format with `Intl.NumberFormat` (₹8,000 → ₹8,000 in EN, ₹8,000 in HI/GU)
- Dates format with `Intl.DateTimeFormat` per locale
- RTL support not needed now but don't hard-code `direction: ltr`

---

## 🌅 Splash Screen — NEW in v2

### Behavior
- Shows on **initial app load** (not on page navigation)
- Shows on **PWA launch** (standalone mode)
- Duration: **2.0 seconds** (1.2s logo animation + 0.8s hold)
- Fades out smoothly into the app

### Files
```
src/components/common/SplashScreen/
└── SplashScreen.jsx
```

### Design Spec
```
Background: #ff385c (Brand Red)
Logo: SVG logo centered, white color
Tagline: "घर जैसा PG खोजें" / "Find Your Home Away" (per active language)
Animation sequence:
  0ms    → Logo scales from 0.6 to 1.0 (ease-out, 600ms)
  600ms  → Tagline fades in (300ms)
  900ms  → Spinner/dot loader appears (300ms)
  2000ms → Entire splash fades out (400ms)
  2400ms → App renders
```

### Implementation
```jsx
// main.jsx
// Show splash only if: first visit OR PWA standalone mode
const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
const hasVisited = sessionStorage.getItem('splashShown');
const showSplash = isStandalone || !hasVisited;
```

### Splash States
- **Loading** (default): Logo + tagline + dot loader
- **Error** (if app fails to init): Logo + "Something went wrong. Please refresh."
- **Slow network** (>3s): Add "Loading slowly... check connection"

---

## ⏳ Loader System — NEW in v2

### Three Loader Types (Use the right one!)

#### 1. Splash Loader
- When: Initial app boot, PWA launch
- Component: `<SplashScreen />`
- Duration: Fixed 2s

#### 2. Skeleton Loader
- When: Data is fetching (property list, detail page)
- Component: `<PropertyCardSkeleton />`, `<PropertyDetailSkeleton />`
- Appearance: Animated shimmer (left-to-right gradient sweep)
- Rule: Every data-driven component MUST have a skeleton version

#### 3. Inline Spinner
- When: Form submit, button action, single item loading
- Component: `<Spinner size="sm|md|lg" />`
- Use ONLY inside buttons or for single-element updates. Never full-page.

### Skeleton Components Required
```
src/components/common/Skeletons/
├── PropertyCardSkeleton.jsx     ← Matches PropertyCard proportions exactly
├── PropertyDetailSkeleton.jsx   ← Full detail page skeleton
├── PropertyTableSkeleton.jsx    ← Admin table rows
├── DashboardStatsSkeleton.jsx   ← Admin stat cards
└── SearchResultsSkeleton.jsx    ← Grid of 8 card skeletons
```

### Shimmer Animation (Tailwind + CSS)
```css
/* variables.css */
@keyframes shimmer {
  0%   { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 1000px 100%;
  animation: shimmer 1.5s infinite linear;
}
```

---

## 🖼️ Image System — NEW in v2

### Image Categories & Sources

| Category | Source Strategy | Fallback |
|---|---|---|
| Property photos | Cloudinary (prod) / `picsum.photos` (dev) | `/assets/images/property-placeholder.jpg` |
| Owner avatar | UI Avatars API or initials component | Generic person icon |
| Category icons | Google Material Symbols | Plain text label |
| Empty states | Local SVG illustrations | Text-only fallback |
| Splash logo | Local SVG | Text "PG Finder" |

### Image Rules (Strict)
- ✅ Every `<img>` must have: `src`, `alt`, `width`, `height`, `loading="lazy"`
- ✅ Property images: always 16:10 aspect ratio (800×500px, 1200×750px)
- ✅ Use `object-fit: cover` for all property photos
- ✅ Use `srcSet` for responsive images: 400w, 800w, 1200w
- ✅ AVIF/WebP format (Cloudinary auto-converts, picsum uses JPEG)
- ❌ Never use `<img>` without dimensions (causes layout shift = bad CLS score)
- ❌ Never load full-size image in card (use thumbnail URL variant)
- ❌ Never show broken image icon — always show placeholder

### PropertyImage Component
```
src/components/common/PropertyImage/
└── PropertyImage.jsx
```
```jsx
// Handles: lazy load, error fallback, blur-up placeholder, loading skeleton
<PropertyImage
  src={imageUrl}
  thumbnailSrc={thumbnailUrl}
  alt="Spacious room in Koramangala"
  aspectRatio="16/10"
  priority={false}  // true = eager load (first visible card only)
/>
```

### Blur-Up Effect
- Load 20px blurred thumbnail first (data URL or very small URL)
- Full image loads in background
- Cross-fade when ready (300ms transition on opacity)
- Same pattern as Next.js `Image` component

---

## 🎨 Pixel-Perfect Interface — NEW in v2

### 8px Grid System
All spacing must be a multiple of 8px. No exceptions.
```
4px  → micro spacing (icon gaps, badge padding)
8px  → xs
16px → sm
24px → md
32px → lg
40px → xl
48px → 2xl
64px → 3xl
```

### Typography Scale
```
10px / 0.625rem → label-xs (legal text, timestamps)
12px / 0.75rem  → label-sm (badges, captions)
14px / 0.875rem → body-sm (secondary text)
16px / 1rem     → body-md (base body text)
18px / 1.125rem → body-lg (lead paragraph)
20px / 1.25rem  → heading-sm (card titles)
24px / 1.5rem   → heading-md (page section titles)
32px / 2rem     → heading-lg (hero text)
40px / 2.5rem   → heading-xl (landing hero)
```

### Touch Target Sizes (Mobile)
| Element | Minimum Size |
|---|---|
| Button (primary) | 56px height, full width |
| Button (secondary) | 44px height |
| Icon button | 44×44px (visual icon can be 24px) |
| Nav tab | 64px wide, 56px tall |
| Checkbox/Radio | 44×44px tap area |
| Input field | 48px height |

### Color Contrast Ratios (WCAG AA)
| Usage | Ratio Required |
|---|---|
| Body text on white | 4.5:1 minimum |
| Heading text | 4.5:1 minimum |
| White text on brand-red | 4.2:1 (acceptable for large text/buttons) |
| Badge text | 4.5:1 minimum |

### Pixel-Perfect Checklist (Per Component)
- [ ] All spacing is a multiple of 8px
- [ ] Font size matches type scale exactly
- [ ] Border radius matches design token exactly
- [ ] Shadow matches design token exactly
- [ ] Color matches hex code exactly (no "close enough")
- [ ] Icon size: 20px (inline), 24px (standalone), 40px (feature)
- [ ] No layout shift on load (all images have explicit dimensions)

---

## 🧪 Testing Strategy — NEW in v2

### Test Levels

#### Level 1 — Unit Tests (Vitest + React Testing Library)
Test every component in isolation.
```
src/
├── components/**/*.test.jsx
├── hooks/**/*.test.js
├── utils/**/*.test.js
└── services/**/*.test.js
```

**Coverage target:** 80% statements, 70% branches

Key tests:
- PropertyCard renders price, location, available badge
- Heart button toggles wishlist state
- SearchBar fires onSearch with correct query
- FilterPanel emits correct filter object
- formatCurrency returns "₹8,000/month"
- truncateText cuts at 60 chars with ellipsis
- validators.js rejects invalid phone, email

#### Level 2 — Integration Tests (Vitest + MSW)
Test pages with mocked API responses.
```
src/pages/**/*.integration.test.jsx
```

Mock Service Worker (MSW) intercepts fetch calls.

Key tests:
- HomePage loads and shows 12 property cards
- SearchResultsPage filters by category pill
- PropertyDetailPage shows gallery, amenities, contact bar
- ContactPage submits form, shows success state
- AdminLoginPage sets JWT on success, redirects to dashboard
- ProtectedRoute redirects unauthenticated users to /admin/login

#### Level 3 — E2E Tests (Playwright)
```
e2e/
├── user-flow.spec.ts
│   ├── user can search for a PG
│   ├── user can filter by price and gender
│   ├── user can view property detail
│   ├── user can add to wishlist
│   └── user can submit contact form
│
├── admin-flow.spec.ts
│   ├── admin can log in
│   ├── admin can add a property with images
│   ├── admin can edit a property
│   ├── admin can delete a property
│   └── admin can view leads
│
└── i18n.spec.ts
    ├── user can switch language to Hindi
    ├── all text updates on language change
    └── language persists on page reload
```

#### Level 4 — Accessibility Tests (axe-core)
```
src/a11y/
└── a11y.test.jsx  ← Run axe on every page component
```
- 0 critical violations allowed
- 0 serious violations allowed
- Moderate/minor: document and accept or fix

### Test Tooling
```json
"devDependencies": {
  "vitest": "^2.0.0",
  "@testing-library/react": "^16.0.0",
  "@testing-library/user-event": "^14.0.0",
  "msw": "^2.0.0",
  "playwright": "^1.44.0",
  "axe-core": "^4.9.0",
  "@axe-core/react": "^4.9.0"
}
```

### Test Scripts
```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "test:e2e": "playwright test",
  "test:a11y": "vitest run src/a11y",
  "test:all": "npm run test && npm run test:e2e && npm run test:a11y"
}
```

### Definition of Done — Testing
A feature is tested-done only when:
- [ ] Unit test written and passing
- [ ] Integration test covers the happy path
- [ ] Integration test covers the error/empty state
- [ ] E2E test covers the user journey
- [ ] axe-core reports 0 critical or serious violations
- [ ] No console errors or warnings in test output

---

## 📁 Updated Folder Structure (v2 additions in bold)

```
pg-finder/
│
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   └── assets/
│       └── images/
│           └── property-placeholder.jpg   ← Fallback image
│
├── src/
│   │
│   ├── assets/
│   │   ├── fonts/
│   │   │   ├── AirbnbCereal.woff2
│   │   │   ├── NotoSansDevanagari.woff2   ← NEW: Hindi font
│   │   │   └── NotoSansGujarati.woff2     ← NEW: Gujarati font
│   │   ├── icons/
│   │   ├── images/
│   │   │   ├── logo.svg
│   │   │   └── illustrations/             ← NEW: Empty state SVGs
│   │   │       ├── empty-search.svg
│   │   │       ├── empty-wishlist.svg
│   │   │       └── success-contact.svg
│   │
│   ├── i18n/                              ← NEW: All i18n files
│   │   ├── index.js
│   │   └── locales/
│   │       ├── en/ (common, property, search, admin, contact)
│   │       ├── hi/ (same)
│   │       └── gu/ (same)
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Badge/
│   │   │   ├── Avatar/
│   │   │   ├── Modal/
│   │   │   ├── Spinner/
│   │   │   ├── Toast/
│   │   │   ├── SplashScreen/              ← NEW
│   │   │   ├── LanguageSwitcher/          ← NEW
│   │   │   ├── PropertyImage/             ← NEW: Lazy + fallback image
│   │   │   └── Skeletons/                 ← NEW: All skeleton components
│   │   │       ├── PropertyCardSkeleton.jsx
│   │   │       ├── PropertyDetailSkeleton.jsx
│   │   │       ├── PropertyTableSkeleton.jsx
│   │   │       ├── DashboardStatsSkeleton.jsx
│   │   │       └── SearchResultsSkeleton.jsx
│   │   │
│   │   ├── layout/ (Navbar, MobileNav, Footer, PageWrapper — unchanged)
│   │   ├── property/ (PropertyCard, PropertyGrid, etc — unchanged)
│   │   ├── search/ (SearchBar, FilterPanel, CategoryPills — unchanged)
│   │   └── admin/ (PropertyForm, PropertyTable, etc — unchanged)
│   │
│   ├── pages/ (unchanged from v1 — same user/ and admin/ pages)
│   │
│   ├── contexts/ (unchanged from v1)
│   │
│   ├── hooks/ (unchanged from v1)
│   │
│   ├── services/ (unchanged from v1)
│   │
│   ├── data/ (unchanged from v1)
│   │
│   ├── utils/
│   │   ├── formatCurrency.js
│   │   ├── formatDate.js
│   │   ├── truncateText.js
│   │   ├── validators.js
│   │   └── getImageUrl.js                 ← NEW: Thumbnail/full URL builder
│   │
│   ├── constants/ (unchanged from v1)
│   │
│   ├── styles/
│   │   ├── globals.css                    ← Add font-face for Hindi/Gujarati
│   │   ├── variables.css                  ← Add shimmer keyframe
│   │   └── typography.css                 ← NEW: Type scale classes
│   │
│   ├── router/ (unchanged from v1)
│   │
│   ├── App.jsx                            ← Wrap with I18nextProvider
│   └── main.jsx                           ← Splash screen logic here
│
├── e2e/                                   ← NEW: Playwright tests
│   ├── user-flow.spec.ts
│   ├── admin-flow.spec.ts
│   └── i18n.spec.ts
│
├── DESIGN.md
├── PLAN_V2.md                             ← This file
├── tailwind.config.js
├── vite.config.js
├── playwright.config.ts                   ← NEW
├── .env.example
├── .gitignore
└── package.json
```

---

## 🗺️ Route Map (Unchanged from v1)

### User Side (Public)
| Route | Page | Description |
|---|---|---|
| `/` | HomePage | Hero, Search, Categories, Listing Grid |
| `/search` | SearchResultsPage | Filtered results with sidebar filters |
| `/property/:id` | PropertyDetailPage | Full details, photos, contact |
| `/wishlist` | WishlistPage | Saved listings |
| `/contact/:id` | ContactPage | Contact form to PG owner |

### Admin Side (Protected)
| Route | Page | Description |
|---|---|---|
| `/admin/login` | AdminLoginPage | Admin login screen |
| `/admin/dashboard` | DashboardPage | Stats, quick actions |
| `/admin/properties` | ManagePropertiesPage | Table of all properties |
| `/admin/properties/add` | AddPropertyPage | Add new property form |
| `/admin/properties/edit/:id` | EditPropertyPage | Edit existing property |
| `/admin/leads` | LeadsPage | Contact requests from users |

---

## ✅ Features to Build — Phase Order (v2 Updated)

### 🔵 Phase 0 — Pre-Foundation (NEW)
0. [ ] **i18n Setup** — Install i18next, create locale files for EN/HI/GU with placeholder strings
1. [ ] **Test Infrastructure** — Install Vitest, RTL, MSW, Playwright. Confirm test:all script works.
2. [ ] **Image Assets** — Add property-placeholder.jpg, 3 empty-state SVGs, logo.svg, splash background

### 🔵 Phase 1 — Foundation
3. [ ] **Project Setup** — Vite + React + Tailwind + Router + folder structure
4. [ ] **tailwind.config.js** — Extend with all Airbnb tokens + 8px grid spacing scale
5. [ ] **globals.css** — Import all 3 fonts, base resets, CSS variables, shimmer keyframe
6. [ ] **Mock Data** — `properties.json` with 12+ realistic PG entries (all schema fields)
7. [ ] **AppRouter.jsx** — All routes defined, ProtectedRoute working, i18n provider wrapping all

### 🔵 Phase 2 — Splash + Loaders (NEW — Do before any page)
8. [ ] **SplashScreen** — Animated logo, tagline from i18n, dot loader. 2s duration. Fade out.
9. [ ] **main.jsx** — Splash logic: show on first visit or PWA standalone mode
10. [ ] **All Skeleton components** — PropertyCardSkeleton, PropertyDetailSkeleton, etc. (5 total)
11. [ ] **Shimmer CSS** — Verify shimmer animation in all 5 skeletons

### 🔵 Phase 3 — Layout Shell
12. [ ] **Navbar** — Desktop: logo + search icon + LanguageSwitcher + profile. Mobile: hidden
13. [ ] **MobileNav** — Bottom tab bar with Wishlist count badge. LanguageSwitcher in Profile tab
14. [ ] **LanguageSwitcher** — Pill `EN | HI | ગુ`. Persists in localStorage.
15. [ ] **Footer** — All copy from i18n. Hidden on mobile.
16. [ ] **PageWrapper** — Max-width 1280px, 8px-grid padding

### 🔵 Phase 4 — User Side Core (Fitts + Hick + Jakob applied)
17. [ ] **PropertyImage** — Lazy load, blur-up, fallback, srcSet, aspect ratio 16:10
18. [ ] **SearchBar** — i18n placeholder, Fitts: full-width, 56px height on mobile
19. [ ] **CategoryPills** — Max 8 visible, "More →" overflow, active state red underline (Hick)
20. [ ] **PropertyCard** — Minimal info (Hick), PropertyImage component, 44px heart tap target (Fitts)
21. [ ] **PropertyGrid** — Skeleton while loading, empty state with illustration (Zeigarnik)
22. [ ] **HomePage** — Hero + SearchBar + CategoryPills + PropertyGrid, all i18n text

### 🔵 Phase 5 — Property Detail (Peak-End applied)
23. [ ] **PropertyGallery** — Full-screen swipe, blur-up effect on all images (Peak: visual peak)
24. [ ] **AmenitiesList** — Max 6 on card, all on detail page, grouped by category (Proximity)
25. [ ] **ContactBar** — 56px height, full-width red CTA, sticky, always visible (Fitts + Von Restorff)
26. [ ] **PropertyDetails** — Full assembled detail, i18n labels
27. [ ] **PropertyDetailPage** — With PropertyDetailSkeleton while loading

### 🔵 Phase 6 — Search & Filter (Miller's Law applied)
28. [ ] **SearchResultsPage** — 12 cards per page, SearchResultsSkeleton while loading
29. [ ] **FilterPanel** — Max 5 visible options per group, "Show more" accordion (Miller)

### 🔵 Phase 7 — Wishlist (Zeigarnik applied)
30. [ ] **WishlistContext** — Save/remove with localStorage persistence
31. [ ] **Heart button** — 44px tap target. Filled red = saved. Animation on toggle.
32. [ ] **WishlistPage** — Empty state SVG + warm i18n copy + CTA to browse (Peak-End)
33. [ ] **Wishlist badge** — Count on MobileNav tab (Zeigarnik loop)

### 🔵 Phase 8 — Contact Flow (Peak-End applied)
34. [ ] **ContactPage** — 2-step form with step indicator. All labels from i18n.
35. [ ] **Success screen** — Animated checkmark + "We'll contact you soon" + WhatsApp button (Peak-End: great ending)

### 🔵 Phase 9 — Admin Panel
36. [ ] **AdminLoginPage** — i18n labels. JWT stored. Skeleton on submit.
37. [ ] **ProtectedRoute** — Redirect with toast message.
38. [ ] **DashboardPage** — Stats with DashboardStatsSkeleton. Admin onboarding checklist (Zeigarnik).
39. [ ] **ManagePropertiesPage** — PropertyTableSkeleton. Confirm delete modal.
40. [ ] **AddPropertyPage** — Form grouped by section (Proximity). Multi-image uploader.
41. [ ] **EditPropertyPage** — Pre-fill form, unsaved changes warning.
42. [ ] **LeadsPage** — Status update inline. Filter by status.

### 🔵 Phase 10 — Polish, PWA + Performance (NEW phase)
43. [ ] **Core Web Vitals** — LCP < 2.5s, CLS < 0.1, FID < 100ms. Measure with Lighthouse.
44. [ ] **manifest.json** — PWA: name, icons, theme_color: #ff385c, display: standalone
45. [ ] **Meta tags** — OG tags per property for share links
46. [ ] **Error Boundary** — `<ErrorBoundary>` at router level. Friendly error page with retry.
47. [ ] **404 Page** — Illustrated 404 with "Go Home" button. i18n text.
48. [ ] **Accessibility audit** — Run axe-core on all pages. Fix all critical/serious.
49. [ ] **Performance audit** — Lighthouse scores: Performance ≥ 90, Accessibility ≥ 95

### 🔵 Phase 11 — Full Test Pass (NEW final phase)
50. [ ] **Unit tests** — All components, hooks, utils. Coverage ≥ 80%.
51. [ ] **Integration tests** — All pages happy path + error/empty states with MSW.
52. [ ] **E2E tests** — user-flow + admin-flow + i18n (Playwright).
53. [ ] **a11y tests** — axe-core on all pages. 0 critical/serious violations.
54. [ ] **Cross-browser test** — Chrome, Firefox, Safari, Chrome Mobile.
55. [ ] **Pixel-perfect audit** — Compare each screen to Figma/DESIGN.md at 375px, 768px, 1280px.

---

## 🏠 Property Data Schema (Unchanged from v1)

```json
{
  "id": "pg-001",
  "title": "Spacious Single Room in Koramangala",
  "type": "Single Room",
  "gender": "Girls Only",
  "price": 8000,
  "priceUnit": "month",
  "deposit": 16000,
  "location": {
    "area": "Koramangala",
    "city": "Bangalore",
    "landmark": "Near Forum Mall",
    "distanceFromLandmark": "0.5km",
    "coordinates": { "lat": 12.934, "lng": 77.612 }
  },
  "images": {
    "thumbnail": "https://picsum.photos/id/1011/400/250",
    "medium":    "https://picsum.photos/id/1011/800/500",
    "full":      "https://picsum.photos/id/1011/1200/750",
    "gallery":   ["url1", "url2", "url3", "url4", "url5"]
  },
  "amenities": ["wifi", "ac", "meals", "laundry", "parking", "cctv"],
  "description": "...",
  "rules": ["No smoking", "No pets", "Gate closes at 11PM"],
  "isAvailable": true,
  "isVerified": true,
  "availableFrom": "2026-05-01",
  "owner": {
    "name": "Ramesh Kumar",
    "phone": "+91 98765 43210",
    "whatsapp": "+91 98765 43210"
  },
  "rating": 4.7,
  "reviewCount": 23,
  "postedAt": "2026-04-10",
  "category": "Girls Only"
}
```

> **v2 change:** `images` is now an object with `thumbnail`, `medium`, `full`, `gallery` — never a flat array.

---

## 🎨 Design Tokens (Unchanged from v1)

```css
colors:
  brand-red: #ff385c
  text-primary: #222222
  text-secondary: #6a6a6a
  text-muted: #b0b0b0
  surface: #ffffff
  background: #f7f7f7
  border: #dddddd
  success: #008a05
  overlay: rgba(0,0,0,0.5)

borderRadius:
  card: 20px
  pill: 999px
  button: 8px
  input: 12px

boxShadow:
  card: 'rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px'
  nav:  '0 -1px 0 rgba(0,0,0,0.08)'

fontFamily:
  sans-en: ['Airbnb Cereal VF', 'Circular', '-apple-system', 'sans-serif']
  sans-hi: ['Noto Sans Devanagari', 'sans-serif']   ← NEW
  sans-gu: ['Noto Sans Gujarati', 'sans-serif']      ← NEW
```

---

## 📱 Responsive Breakpoints (Unchanged from v1)

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | 0–767px | 1 column, bottom nav, full-screen cards |
| Tablet | 768px–1023px | 2 columns, top nav appears |
| Desktop | 1024px–1279px | 3 columns, sidebar filters |
| Wide | 1280px+ | 4 columns, max-width container |

---

## 🚫 Strict DO NOT Rules (v1 rules + new additions)

- ❌ Do NOT use inline styles (`style={{}}`) — use Tailwind classes only
- ❌ Do NOT use Bootstrap, Chakra UI, MUI, or any component library
- ❌ Do NOT create files not in the folder structure
- ❌ Do NOT use font weight 300 or 400 for headings
- ❌ Do NOT use generic colors — always use design tokens
- ❌ Do NOT use `<img>` without `alt`, `width`, `height`, `loading` attributes
- ❌ Do NOT put business logic inside components
- ❌ Do NOT use `any` type or skip PropTypes
- ❌ Do NOT hardcode text strings — always use `t('key')` from i18n
- ❌ Do NOT use `px` in Tailwind where spacing scale exists
- ❌ Do NOT skip loading skeletons — spinners are only for button actions
- ❌ Do NOT use `console.log` in production code
- ❌ Do NOT use flat image array in data — always use `{thumbnail, medium, full, gallery}` object
- ❌ Do NOT hardcode spacing values not on the 8px grid
- ❌ Do NOT skip tests — no feature is done without unit + integration test

---

## ✅ Definition of Done — Per Feature (v2 Updated)

A feature is DONE only when ALL of these are true:

**Visual:**
- [ ] Works on 375px without horizontal scroll
- [ ] Works on 768px with correct layout
- [ ] Works on 1280px with correct layout
- [ ] Follows DESIGN.md: correct colors, fonts, shadows, radius
- [ ] All spacing on 8px grid
- [ ] All interactive states work: hover, active, focus, disabled
- [ ] Loading skeleton shown while data is pending
- [ ] Empty state shown when no data (with illustration)

**i18n:**
- [ ] All visible strings use `t('key')` — zero hardcoded strings
- [ ] Works correctly in EN, HI, and GU
- [ ] Numbers and dates formatted per locale

**Images:**
- [ ] All `<img>` have: src, alt, width, height, loading="lazy"
- [ ] Fallback shows if image fails to load
- [ ] Blur-up effect on property photos

**Tests:**
- [ ] Unit test written and passing
- [ ] Integration test covers happy path + error/empty state
- [ ] axe-core: 0 critical or serious violations
- [ ] No console errors or warnings

---

## 🔗 Component Dependency Order (v2 Updated)

```
i18n Setup
    ↓
Mock Data (with new image schema) → PropertyContext
                                         ↓
SplashScreen (Phase 0)
    ↓
Skeletons (Phase 2, all 5) — built BEFORE any page that needs data
    ↓
PropertyImage component — built BEFORE PropertyCard
    ↓
LanguageSwitcher — built BEFORE Navbar
    ↓
SearchBar → useSearch → SearchResultsPage → PropertyGrid → PropertyCard (uses PropertyImage)
                                                         ↓
                                                 PropertyDetailPage (uses PropertyDetailSkeleton)
                                                         ↓
                                                    ContactBar → ContactPage (2-step, success state)

AdminLogin → AuthContext → ProtectedRoute → AdminRoutes
                                          ↓
                                    AddPropertyPage → PropertyForm → ImageUploader
                                    ManagePropertiesPage → PropertyTable (uses PropertyTableSkeleton)
                                    LeadsPage
```

---

## 🚀 Build Order Summary

Read phases in strict order: **0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11**

> Phase 0 (i18n + tests + images) is new and must run BEFORE anything else.
> Phase 2 (splash + skeletons) runs before any page — you cannot build pages without their loading states.
> Phase 11 (full test pass) is the final gate — no phase is "done" until tests pass.

After each phase, confirm:
1. Visual matches DESIGN.md at 375px, 768px, 1280px
2. All text renders correctly in EN, HI, GU
3. Loading state (skeleton) shown for all data fetches
4. No console errors
5. Unit test passing for all new components

---

## 📎 Files This Project Reads

| File | Purpose |
|---|---|
| `DESIGN.md` | Single source of truth for all visual design decisions |
| `PLAN_V2.md` | This file — architecture and build order |
| `src/data/properties.json` | Mock property data |
| `src/constants/routes.js` | All route strings |
| `src/i18n/locales/en/` | English string keys (source of truth for all i18n keys) |
| `tailwind.config.js` | Extended with design tokens + 8px spacing scale |
| `.env.example` | Environment variable template |
| `playwright.config.ts` | E2E test config |

---

*End of PLAN_V2.md — PG Finder v2.0*
