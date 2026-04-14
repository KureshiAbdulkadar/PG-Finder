# PLAN.md — PG Finder Web App (Airbnb-Inspired)

> **Version:** 1.0.0  
> **Last Updated:** 2026-04-14  
> **Design Reference:** `DESIGN.md` (Airbnb Design System)  
> **Stack:** React + Vite + Tailwind CSS + React Router v6  
> **Icons:** Google Material Icons (via Material Symbols)  
> **Target:** Mobile-first PWA feel — looks like an App on phone, Web on desktop

---

## 🎯 Project Vision

Build a **PG (Paying Guest) property listing platform** that:
- Looks and feels exactly like Airbnb on all screen sizes
- On **mobile**: feels like a native app (bottom nav, full-screen cards, app gestures)
- On **desktop**: full Airbnb-style browsing experience
- Has **2 separate panels**: Admin (property manager) + User (PG seeker)
- Uses **psychology-driven UX** on the user side — designed for someone urgently looking for a PG room
- Lets admin **add/manage properties** and users **browse, view details, and contact the PG owner**

---

## 🧠 User Psychology Principle (User Side)

> The target user is someone who just moved to a new city, is stressed, needs a PG urgently, and is on their phone.

Design decisions must reflect this:
- Show **price first** — urgency-driven users scan price before anything else
- Show **availability badge** — "Available Now" in green creates relief
- Show **distance from landmark** — "2km from Station" reduces decision anxiety
- Show **verified badge** — safety is a top concern for PG seekers
- Show **contact button always visible** — never make the user hunt for contact
- Use **warm, trustworthy colors** — Airbnb's Rausch Red (#ff385c) for CTAs
- Limit choices per screen — max 2 primary actions visible at once

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router v6 |
| Styling | Tailwind CSS (utility-first, no Bootstrap) |
| Icons | Google Material Symbols (Outlined) |
| State Management | React Context API + useReducer |
| Auth | JWT-based (mock for now, swappable with real backend) |
| Data | JSON mock data (swap with REST API / Firebase later) |
| Forms | React Hook Form |
| Images | Cloudinary-ready URLs (placeholder via picsum.photos) |
| Animations | Framer Motion (lightweight transitions only) |
| Font | Airbnb Cereal VF (via @fontsource or CDN) |

---

## 📁 Scalable Folder Structure

```
pg-finder/
│
├── public/
│   ├── favicon.ico
│   └── manifest.json                  ← PWA manifest for app-like feel
│
├── src/
│   │
│   ├── assets/                        ← Static assets
│   │   ├── fonts/
│   │   │   └── AirbnbCereal.woff2
│   │   ├── icons/
│   │   └── images/
│   │       └── logo.svg
│   │
│   ├── components/                    ← Reusable UI components only
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   └── Button.module.css
│   │   │   ├── Badge/
│   │   │   │   └── Badge.jsx
│   │   │   ├── Avatar/
│   │   │   │   └── Avatar.jsx
│   │   │   ├── Modal/
│   │   │   │   └── Modal.jsx
│   │   │   ├── Spinner/
│   │   │   │   └── Spinner.jsx
│   │   │   └── Toast/
│   │   │       └── Toast.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.jsx         ← Desktop nav
│   │   │   │   └── MobileNav.jsx      ← Bottom tab bar (app-like on mobile)
│   │   │   ├── Footer/
│   │   │   │   └── Footer.jsx
│   │   │   └── PageWrapper/
│   │   │       └── PageWrapper.jsx    ← Consistent page padding/max-width
│   │   │
│   │   ├── property/
│   │   │   ├── PropertyCard/
│   │   │   │   └── PropertyCard.jsx   ← Listing card (photo + details)
│   │   │   ├── PropertyGrid/
│   │   │   │   └── PropertyGrid.jsx   ← Grid of cards
│   │   │   ├── PropertyGallery/
│   │   │   │   └── PropertyGallery.jsx ← Full-screen photo viewer
│   │   │   ├── PropertyDetails/
│   │   │   │   └── PropertyDetails.jsx ← Full detail page component
│   │   │   ├── AmenitiesList/
│   │   │   │   └── AmenitiesList.jsx
│   │   │   └── ContactBar/
│   │   │       └── ContactBar.jsx     ← Sticky "Contact Owner" bar
│   │   │
│   │   ├── search/
│   │   │   ├── SearchBar/
│   │   │   │   └── SearchBar.jsx      ← Hero search input
│   │   │   ├── FilterPanel/
│   │   │   │   └── FilterPanel.jsx    ← Price, type, amenity filters
│   │   │   └── CategoryPills/
│   │   │       └── CategoryPills.jsx  ← Horizontal scroll pill bar
│   │   │
│   │   └── admin/
│   │       ├── PropertyForm/
│   │       │   └── PropertyForm.jsx   ← Add/Edit property form
│   │       ├── PropertyTable/
│   │       │   └── PropertyTable.jsx  ← Admin list view
│   │       ├── ImageUploader/
│   │       │   └── ImageUploader.jsx
│   │       └── StatsCard/
│   │           └── StatsCard.jsx      ← Dashboard metric cards
│   │
│   ├── pages/                         ← Route-level pages
│   │   ├── user/
│   │   │   ├── HomePage.jsx           ← Hero + Search + Categories + Grid
│   │   │   ├── SearchResultsPage.jsx  ← Filtered listing grid
│   │   │   ├── PropertyDetailPage.jsx ← Full property page
│   │   │   ├── WishlistPage.jsx       ← Saved properties
│   │   │   └── ContactPage.jsx        ← Contact form to PG owner
│   │   │
│   │   └── admin/
│   │       ├── AdminLoginPage.jsx
│   │       ├── DashboardPage.jsx      ← Stats overview
│   │       ├── ManagePropertiesPage.jsx
│   │       ├── AddPropertyPage.jsx
│   │       ├── EditPropertyPage.jsx
│   │       └── LeadsPage.jsx          ← Contact requests from users
│   │
│   ├── contexts/                      ← Global state
│   │   ├── AuthContext.jsx            ← Admin auth state
│   │   ├── PropertyContext.jsx        ← Property list state
│   │   └── WishlistContext.jsx        ← User wishlist state
│   │
│   ├── hooks/                         ← Custom React hooks
│   │   ├── useProperties.js           ← Fetch/filter properties
│   │   ├── useSearch.js               ← Search logic
│   │   ├── useWishlist.js             ← Save/unsave properties
│   │   └── useAuth.js                 ← Admin auth
│   │
│   ├── services/                      ← API / data layer
│   │   ├── api.js                     ← Axios instance (base URL config)
│   │   ├── propertyService.js         ← CRUD for properties
│   │   ├── authService.js             ← Login/logout/token
│   │   └── contactService.js         ← Send contact request
│   │
│   ├── data/                          ← Mock data (replace with API)
│   │   ├── properties.json
│   │   ├── categories.json
│   │   └── amenities.json
│   │
│   ├── utils/                         ← Pure utility functions
│   │   ├── formatCurrency.js
│   │   ├── formatDate.js
│   │   ├── truncateText.js
│   │   └── validators.js
│   │
│   ├── constants/                     ← App-wide constants
│   │   ├── routes.js                  ← Route path strings
│   │   ├── categories.js
│   │   └── amenityIcons.js            ← Material icon names map
│   │
│   ├── styles/                        ← Global styles only
│   │   ├── globals.css                ← Tailwind directives + font import
│   │   └── variables.css              ← CSS custom properties (design tokens)
│   │
│   ├── router/
│   │   ├── AppRouter.jsx              ← All routes defined here
│   │   ├── UserRoutes.jsx             ← User-side route group
│   │   ├── AdminRoutes.jsx            ← Admin-side route group (protected)
│   │   └── ProtectedRoute.jsx         ← Auth guard wrapper
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── DESIGN.md                          ← Airbnb design system (READ FIRST)
├── PLAN.md                            ← This file
├── tailwind.config.js                 ← Extend with Airbnb tokens from DESIGN.md
├── vite.config.js
├── .env.example
├── .gitignore
└── package.json
```

---

## 🗺️ Route Map

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

## ✅ Features to Build — In Strict Order

### 🔵 Phase 1 — Foundation (Do first, blocks everything else)
1. [ ] **Project Setup** — Vite + React + Tailwind + Router + folder structure
2. [ ] **tailwind.config.js** — Extend with all Airbnb tokens from DESIGN.md (colors, font, shadows, radius)
3. [ ] **globals.css** — Import Airbnb Cereal font, base resets, CSS variables
4. [ ] **Mock Data** — `properties.json` with 12+ realistic PG entries
5. [ ] **AppRouter.jsx** — All routes defined, ProtectedRoute working

### 🔵 Phase 2 — Layout Shell
6. [ ] **Navbar** — Logo left, search icon + profile icon right. Desktop: full nav. Mobile: hidden (replaced by bottom nav)
7. [ ] **MobileNav** — Bottom tab bar: Home | Search | Wishlist | Profile. Visible only on mobile (≤768px)
8. [ ] **Footer** — Links section, copyright. Hidden on mobile.
9. [ ] **PageWrapper** — Consistent max-width (1280px), horizontal padding

### 🔵 Phase 3 — User Side Core
10. [ ] **SearchBar** — Full Airbnb-style: Location | Check-in | Check-out | Guests. Red search button. Card shadow. 32px radius
11. [ ] **CategoryPills** — Horizontal scroll pill bar: Single Room | Double | Girls Only | Boys Only | Couple | AC | Non-AC | Near Metro. Active state: red underline
12. [ ] **PropertyCard** — Photo (16:10 ratio) | Verified badge | Price/month | Location | Distance | Available Now badge | Heart icon
13. [ ] **PropertyGrid** — Responsive grid: 1 col mobile → 2 col tablet → 3-4 col desktop
14. [ ] **HomePage** — Assemble: Hero + SearchBar + CategoryPills + PropertyGrid

### 🔵 Phase 4 — Property Detail Page
15. [ ] **PropertyGallery** — 5-photo grid (1 large + 4 small). Tap → full-screen viewer on mobile
16. [ ] **PropertyDetails** — Title, price, location, verified badge, description, amenities list with Material icons
17. [ ] **AmenitiesList** — Grid of icons: WiFi | AC | Meals | Laundry | Parking | CCTV | Power Backup | etc.
18. [ ] **ContactBar** — Sticky bottom bar: "₹8,000/month · Contact Owner" with red CTA button. Always visible on scroll
19. [ ] **PropertyDetailPage** — Assemble all above components

### 🔵 Phase 5 — Search & Filter
20. [ ] **SearchResultsPage** — URL query params drive filters. Grid + filter sidebar (desktop) / filter bottom sheet (mobile)
21. [ ] **FilterPanel** — Price range | Room type | Gender | Amenities | Sort by

### 🔵 Phase 6 — Wishlist
22. [ ] **WishlistContext** — Save/remove with localStorage persistence
23. [ ] **Heart button** — Toggle on PropertyCard. Filled red = saved
24. [ ] **WishlistPage** — Grid of saved properties. Empty state with illustration

### 🔵 Phase 7 — Contact Flow
25. [ ] **ContactPage** — Form: Name | Phone | Email | Message | Preferred visit date. Submit sends to admin leads
26. [ ] **ContactBar CTA** → navigates to `/contact/:id`

### 🔵 Phase 8 — Admin Panel
27. [ ] **AdminLoginPage** — Email + password. JWT stored in localStorage
28. [ ] **ProtectedRoute** — Redirect to login if not authenticated
29. [ ] **DashboardPage** — Stats cards: Total Properties | Active Listings | Total Leads | This Month's Leads
30. [ ] **ManagePropertiesPage** — Table: Photo thumbnail | Title | Price | Status | Edit | Delete actions
31. [ ] **AddPropertyPage** — Form with all fields (see Property Data Schema below)
32. [ ] **ImageUploader** — Multi-image upload (preview before save, max 5 images)
33. [ ] **EditPropertyPage** — Pre-fill form with existing data
34. [ ] **LeadsPage** — Table of contact requests from users: Name | Phone | Property | Date | Status

### 🔵 Phase 9 — Polish & PWA
35. [ ] **Loading states** — Skeleton cards while data loads (not spinners)
36. [ ] **Empty states** — Illustrated empty screens (no results, no wishlist items)
37. [ ] **Error boundary** — Catch render errors gracefully
38. [ ] **manifest.json** — PWA config: name, icons, theme_color (#ff385c), display: standalone
39. [ ] **Meta tags** — OG tags for property share links

---

## 🏠 Property Data Schema

Every property object must have these fields:

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
  "images": ["url1", "url2", "url3", "url4", "url5"],
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

---

## 🎨 Design Tokens (from DESIGN.md — Airbnb)

```css
/* Copy these into tailwind.config.js extend block */

colors:
  brand-red: #ff385c       /* Primary CTA, active states */
  text-primary: #222222    /* Headings, primary text */
  text-secondary: #6a6a6a  /* Descriptions, labels */
  text-muted: #b0b0b0      /* Placeholder, inactive */
  surface: #ffffff         /* Card backgrounds */
  background: #f7f7f7      /* Page background */
  border: #dddddd          /* Dividers, input borders */
  success: #008a05         /* Available Now badge */
  overlay: rgba(0,0,0,0.5) /* Photo overlays */

borderRadius:
  card: 20px
  pill: 999px
  button: 8px
  input: 12px

boxShadow:
  card: 'rgba(0,0,0,0.02) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 6px, rgba(0,0,0,0.1) 0px 4px 8px'
  nav:  '0 -1px 0 rgba(0,0,0,0.08)'

fontFamily:
  sans: ['Airbnb Cereal VF', 'Circular', '-apple-system', 'sans-serif']

fontWeight:
  medium: 500
  semibold: 600
  bold: 700

/* Never use weight 300 or 400 for headings */
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | 0–767px | 1 column, bottom nav, full-screen cards |
| Tablet | 768px–1023px | 2 columns, top nav appears |
| Desktop | 1024px–1279px | 3 columns, sidebar filters |
| Wide | 1280px+ | 4 columns, max-width container |

### Mobile-Specific Rules
- Bottom navigation bar always visible (Home / Search / Wishlist / Profile)
- PropertyCard: full-width swipeable
- SearchBar: compact pill on homepage, expands on tap (like Airbnb app)
- FilterPanel: opens as bottom sheet (not sidebar)
- PropertyGallery: horizontal swipe gesture, full-screen on tap
- ContactBar: fixed bottom, above mobile nav
- No hover states — use active/tap states instead on mobile

---

## 🚫 Strict DO NOT Rules

- ❌ Do NOT use inline styles (`style={{}}`) anywhere — use Tailwind classes only
- ❌ Do NOT use Bootstrap, Chakra UI, MUI, or any component library
- ❌ Do NOT create files not listed in the folder structure above
- ❌ Do NOT use weight 300 or 400 for any heading element
- ❌ Do NOT use generic colors — always use the design tokens above
- ❌ Do NOT use `<img>` without `alt`, `width`, `height` attributes
- ❌ Do NOT put business logic inside components — use hooks and services
- ❌ Do NOT use `any` type or skip PropTypes
- ❌ Do NOT hardcode text strings — use constants or data files
- ❌ Do NOT use `px` in Tailwind where a spacing scale value exists
- ❌ Do NOT skip loading and empty states for any data-driven component
- ❌ Do NOT use `console.log` in production code

---

## ✅ Definition of Done — Per Feature

A feature is DONE only when ALL of these are true:

- [ ] Works on 375px (mobile) without horizontal scroll
- [ ] Works on 768px (tablet) with correct column layout
- [ ] Works on 1280px (desktop) with correct column layout
- [ ] Follows DESIGN.md strictly — correct colors, fonts, shadows, radius
- [ ] Uses Material Symbols icons (not emojis, not custom SVGs for standard icons)
- [ ] All interactive states work: hover, active, focus, disabled
- [ ] Loading skeleton shown while data is pending
- [ ] Empty state shown when no data
- [ ] No console errors or warnings
- [ ] Tailwind classes only — zero inline styles

---

## 🔗 Component Dependency Order

```
Mock Data → PropertyContext
         ↓
SearchBar → useSearch → SearchResultsPage → PropertyGrid → PropertyCard
                                                         ↓
                                                 PropertyDetailPage
                                                         ↓
                                                    ContactBar → ContactPage
                                                    
AdminLogin → AuthContext → ProtectedRoute → AdminRoutes
                                          ↓
                                    AddPropertyPage → PropertyForm → ImageUploader
                                    ManagePropertiesPage → PropertyTable
                                    LeadsPage
```

**Rule: Build dependencies BEFORE the component that uses them.**

---

## 🚀 Build Order for Agent

Read this file top to bottom. Execute phases in strict order 1 → 9.  
After each phase, confirm with a summary of what was built before proceeding.  
Always reference `DESIGN.md` before writing any CSS or Tailwind class.  
When in doubt about a design decision — check `DESIGN.md` first.

---

## 📎 Files This Project Reads

| File | Purpose |
|---|---|
| `DESIGN.md` | Single source of truth for all visual design decisions |
| `PLAN.md` | This file — architecture and build order |
| `src/data/properties.json` | Mock property data |
| `src/constants/routes.js` | All route strings — never hardcode routes |
| `tailwind.config.js` | Extended with all design tokens from DESIGN.md |
| `.env.example` | Environment variable template |
