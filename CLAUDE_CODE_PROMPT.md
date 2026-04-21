# 🚀 CLAUDE CODE — Barbershop Website Build

> **Usage:** Drop this file in your project root and run `claude` in the terminal.  
> Claude Code will use it as the primary task specification.

---

## ROLE

You are a senior frontend engineer. Your mission: build a **complete, production-ready barbershop website** from the `design.md` specification found in this repository.

`design.md` is the **single source of truth**. Every layout, color, component, and interaction must match it exactly.

---

## TECH STACK

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3 + custom config |
| State | React hooks only (`useState`, `useEffect`, `useReducer`) |
| Images | `next/image` |
| Icons | `lucide-react` |
| Fonts | `next/font/google` |

No additional heavy libraries unless `design.md` explicitly requires them.

---

## PHASE 1 — BOOTSTRAP (run first)

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

npm install lucide-react clsx tailwind-merge
```

---

## PHASE 2 — PROJECT STRUCTURE

Create this exact folder structure:

```
/
├── app/
│   ├── layout.tsx          # Root layout: Navbar + Footer + font vars
│   ├── page.tsx            # Home page
│   ├── services/
│   │   └── page.tsx
│   ├── barbers/
│   │   └── page.tsx
│   ├── booking/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   └── globals.css
├── components/
│   ├── ui/                 # Primitives: Button, Input, Modal, Badge
│   ├── layout/             # Navbar, Footer, MobileMenu
│   ├── sections/           # Hero, Services, Barbers, Testimonials, CTA
│   └── booking/            # BookingForm, WhatsAppButton, BookingModal
├── lib/
│   ├── constants.ts        # Services list, barbers list, nav links
│   ├── types.ts            # All TypeScript interfaces
│   ├── utils.ts            # cn(), formatWhatsAppMessage(), validators
│   └── whatsapp.ts         # WhatsApp URL builder
├── public/
│   └── images/
└── tailwind.config.ts
```

---

## PHASE 3 — TAILWIND CONFIG

Read `design.md` for the exact color palette. Extend `tailwind.config.ts`:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ⚠️ Replace these with the exact values from design.md
        primary:   { DEFAULT: '#REPLACE', dark: '#REPLACE', light: '#REPLACE' },
        secondary: { DEFAULT: '#REPLACE', dark: '#REPLACE' },
        accent:    { DEFAULT: '#REPLACE' },
        neutral:   { 900: '#REPLACE', 800: '#REPLACE', 700: '#REPLACE', 100: '#REPLACE', 50: '#REPLACE' },
      },
      fontFamily: {
        // Use the fonts defined in design.md
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.5s ease forwards',
        'fade-in':    'fadeIn 0.3s ease forwards',
        'slide-in':   'slideIn 0.3s ease forwards',
      },
      keyframes: {
        fadeUp:  { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideIn: { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
}
export default config
```

---

## PHASE 4 — TYPE DEFINITIONS (`lib/types.ts`)

```ts
export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number        // minutes
  category: string
  imageUrl?: string
}

export interface Barber {
  id: string
  name: string
  specialty: string
  bio: string
  imageUrl: string
  available: boolean
  instagram?: string
}

export interface BookingFormData {
  name: string
  phone: string
  service: string
  barberId: string        // optional — empty = no preference
  date: string
  time: string
  notes?: string
}

export interface FormErrors {
  [key: string]: string
}

export type BookingStep = 'service' | 'barber' | 'datetime' | 'contact' | 'confirm'
```

---

## PHASE 5 — COMPONENTS

### 5.1 Button (`components/ui/Button.tsx`)

```ts
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'whatsapp'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
}
```

- `primary`: filled with brand color, hover darkens
- `secondary`: outlined, hover fills
- `ghost`: transparent, hover shows background
- `whatsapp`: green (#25D366), WhatsApp icon on left
- `loading`: shows spinner, disables click
- All variants: `transition-all duration-200`, `focus-visible` ring

### 5.2 Input / Select / Textarea (`components/ui/Input.tsx`)

- Controlled via `value` + `onChange`
- Props: `label`, `error`, `required`, `hint`
- Error state: red border + error message below
- Focus state: brand-colored ring

### 5.3 Modal (`components/ui/Modal.tsx`)

- Backdrop: `bg-black/60 backdrop-blur-sm`
- Trap focus inside modal (accessibility)
- Close on `Escape` key and backdrop click
- Enter animation: `fadeUp`, exit: `fadeIn` reversed
- Portal via `createPortal` to `document.body`

### 5.4 Navbar (`components/layout/Navbar.tsx`)

- Links defined in `lib/constants.ts`
- Sticky: `sticky top-0 z-50`
- Scroll effect: adds `shadow` + slight background blur after 50px scroll
- Mobile: hamburger → full-screen slide-in menu
- Active link: underline or color indicator
- CTA "Book Now" button always visible

### 5.5 Hero (`components/sections/Hero.tsx`)

- Full-viewport height
- Background: image with dark overlay (from `design.md`)
- Headline + subheadline + two CTAs ("Book Now" → modal, "See Services" → /services)
- Subtle entrance animation on load

### 5.6 ServiceCard (`components/sections/ServiceCard.tsx`)

- Shows: name, description, price, duration
- Hover: slight scale + shadow elevation
- CTA: "Book This" → opens modal pre-filled with this service

### 5.7 BarberCard (`components/sections/BarberCard.tsx`)

- Shows: photo, name, specialty, availability badge
- Hover: overlay with "Book with [Name]" button
- Instagram link if available

### 5.8 TestimonialCard (`components/sections/TestimonialCard.tsx`)

- Star rating, quote, customer name + date
- Subtle card styling

---

## PHASE 6 — BOOKING SYSTEM

### 6.1 WhatsApp Integration (`lib/whatsapp.ts`)

```ts
export function buildWhatsAppURL(data: Partial<BookingFormData>, phone: string): string {
  // Build human-readable pre-filled message
  // Include: service name, barber preference, date, time, customer name
  // Encode with encodeURIComponent
  // Return: `https://wa.me/${phone}?text=${message}`
}
```

### 6.2 BookingForm (`components/booking/BookingForm.tsx`)

**Fields (in order):**
1. Full name (text, required)
2. Phone (tel, required, basic format validation)
3. Service (select from `SERVICES` constant, required)
4. Barber preference (select, optional — include "No preference")
5. Date (date input, min = today, required)
6. Time (select from available slots, required)
7. Notes (textarea, optional)

**Validation rules:**
- Run on submit AND on blur per field
- Name: min 2 chars
- Phone: 7–15 digits, allows +, spaces, dashes
- Date: cannot be in the past
- Time: required if date is selected

**Submit behavior:**
1. Show inline field errors if validation fails
2. If valid: show loading state on button
3. On success: show success message + offer WhatsApp fallback
4. Prepare `onSubmit(data: BookingFormData)` prop for parent to handle (API or webhook)

### 6.3 BookingModal (`components/booking/BookingModal.tsx`)

- Triggered by `useBookingModal` hook (global state via React context or simple prop drilling)
- Header: "Book Your Appointment"
- Body: `<BookingForm />`
- Secondary option: "Prefer WhatsApp?" → `<WhatsAppButton />`

### 6.4 WhatsApp Button (`components/booking/WhatsAppButton.tsx`)

- Reads current form state if inside modal
- Falls back to default message if no form data
- Opens `wa.me` URL in new tab
- Styling: variant `whatsapp` from Button

---

## PHASE 7 — PAGES

### `app/page.tsx` — Home
Sections in order (all from `design.md`):
1. `<Hero />`
2. `<ServicesPreview />` — show top 3–4 services + "See All" link
3. `<BarbersPreview />` — show all or top barbers
4. `<Testimonials />` — carousel or grid
5. `<CTABanner />` — "Ready for a fresh cut?" + Book Now button

### `app/services/page.tsx`
- Page header with title + breadcrumb
- Filter bar by category (if design.md includes categories)
- Grid of all `<ServiceCard />`s

### `app/barbers/page.tsx`
- Page header
- Grid of all `<BarberCard />`s
- Each card links to book with that barber

### `app/booking/page.tsx`
- Standalone booking page (not modal)
- Same `<BookingForm />` component
- WhatsApp option displayed alongside

### `app/contact/page.tsx`
- Address, phone, hours from `lib/constants.ts`
- Embedded map OR static map image
- Simple contact form (name, email, message)
- Social links

---

## PHASE 8 — UX DETAILS

### Animations
- Page sections: `animate-fade-up` with staggered `animation-delay` per card
- Cards: `hover:scale-[1.02] hover:shadow-xl transition-all duration-300`
- Modal: `animate-fade-up` on open
- Button loading: spinning SVG icon replaces label

### Accessibility
- All interactive elements: keyboard navigable
- `aria-label` on icon-only buttons
- Modal: `role="dialog"`, `aria-modal="true"`, focus trap
- Images: meaningful `alt` text
- Color contrast: WCAG AA minimum

### Mobile Menu
- Full-screen overlay
- Links stacked vertically with large tap targets
- Close button top-right
- Prevent body scroll when open (`overflow-hidden` on `<body>`)

---

## PHASE 9 — CONSTANTS (`lib/constants.ts`)

Populate with realistic barbershop data:

```ts
export const WHATSAPP_PHONE = '1234567890' // replace with real number

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Barbers', href: '/barbers' },
  { label: 'Contact', href: '/contact' },
]

export const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM',  '1:30 PM',  '2:00 PM',  '2:30 PM',
  '3:00 PM',  '3:30 PM',  '4:00 PM',  '4:30 PM',
  '5:00 PM',  '5:30 PM',
]

export const SERVICES: Service[] = [ /* from design.md */ ]
export const BARBERS: Barber[]   = [ /* from design.md */ ]
```

---

## PHASE 10 — QA CHECKLIST

Before finishing, verify:

- [ ] All 5 pages render without errors
- [ ] Booking modal opens from every "Book Now" button
- [ ] Form validates all fields correctly
- [ ] WhatsApp button generates correct pre-filled message
- [ ] Mobile menu opens/closes correctly
- [ ] No layout breaks at 320px, 768px, 1024px, 1440px
- [ ] All images use `next/image` with width/height
- [ ] TypeScript: zero `any` types, zero `ts-ignore`
- [ ] ESLint: zero errors
- [ ] `npm run build` completes successfully

---

## HOW TO RUN

```bash
npm run dev     # Development server → http://localhost:3000
npm run build   # Production build
npm run start   # Production server
npm run lint    # ESLint check
```

---

## EXECUTION ORDER FOR CLAUDE CODE

1. Read `design.md` fully before writing any code
2. Run Phase 1 bootstrap commands
3. Create folder structure (Phase 2)
4. Write `lib/types.ts` and `lib/constants.ts` first
5. Write `lib/utils.ts` and `lib/whatsapp.ts`
6. Configure `tailwind.config.ts` with colors from `design.md`
7. Build UI primitives (Button, Input, Modal)
8. Build layout components (Navbar, Footer)
9. Build section components
10. Build booking components
11. Wire up all pages
12. Run QA checklist

> ⚠️ **Important:** Every color, font, spacing value, and copy string must come from `design.md`. Do not invent values. If `design.md` is ambiguous, make the most logical choice for a premium barbershop brand and leave a `// TODO:` comment.
