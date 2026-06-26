# 🍽️ Feastly – Mini Food Ordering Hub

> Week 2 Assignment | Web Development Course
> Built by Raj Achliya (Roll: 24B0706)

A responsive food ordering SPA built with **React + Vite**, featuring a live cart, search/filtering, Framer Motion micro-animations, and localStorage persistence.

---

## Features

- **Menu Grid** – 12 food items across 6 categories, rendered dynamically from a single data file
- **Search** – real-time search across item name, description and category
- **Category Filter** – tab-based filtering with animated active state
- **Cart Sidebar** – slides in on mobile, always visible on desktop
  - Add / increment / decrement / remove items
  - Live item count badge with spring-physics bounce
  - Real-time subtotal, delivery fee, and grand total
  - "Clear all" shortcut
- **Framer Motion animations** – card hover lift, Add→Added button swap, cart item enter/exit, order success overlay
- **localStorage persistence** – cart survives page refreshes
- **Dummy checkout flow** – loading spinner → success screen → cart auto-clears
- **Responsive** – single-column on mobile, 2-col grid on tablet, 3-col + fixed sidebar on desktop
- **Skeleton loading** – image placeholder while photos load

---

## Tech Stack

| Tool | Version | Why |
|------|---------|-----|
| React | 19 | UI library |
| Vite | 8 | Build tool / dev server |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | 12 | Animations |
| Lucide React | latest | Icons |

---

## Getting Started

```bash
# install dependencies
npm install

# start dev server
npm run dev

# production build
npm run build
```

---

## File Structure

```
food-ordering-hub/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/              # branding / global assets
│   ├── components/
│   │   ├── FoodCard.jsx     # individual menu card with Add button & animations
│   │   ├── MenuGrid.jsx     # renders the full grid; owns search + category state
│   │   └── CartSidebar.jsx  # cart drawer with qty controls and checkout flow
│   ├── data/
│   │   └── menuData.js      # all menu items + category list (single source of truth)
│   ├── hooks/
│   │   └── useCart.js       # cart logic + localStorage persistence
│   ├── App.jsx              # root component; holds cart state, passes handlers down
│   ├── index.css            # Tailwind directives + global utilities
│   └── main.jsx             # React DOM entry point
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## Extra Features (Innovation)

1. **Framer Motion micro-interactions** – Add button morphs into "Added!" with a checkmark, then resets. Cards lift on hover. Cart items animate in/out individually.
2. **localStorage persistence** – Cart state is saved and restored automatically on reload.
3. **Live search + category filter** – Both work simultaneously; result count updates in real time.
4. **Image skeleton loader** – Prevents layout shift while images fetch.
5. **Dummy checkout modal states** – Idle → loading spinner → animated success screen → cart clears.
6. **Spring-physics cart badge** – Badge bounces with `type: spring` each time an item is added.
7. **Mobile-first drawer** – Cart is a slide-in drawer on mobile with a backdrop, always-on panel on desktop.
