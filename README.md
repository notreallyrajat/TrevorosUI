# TrevorosUI

> **TrevorosUI** – A premium, institutional‑style trading and analytics dashboard built with React 19, TypeScript, and Vite. The app showcases high‑density charts, real‑time watchlist management, portfolio simulations, and a learning centre, all wrapped in a sleek dark‑mode UI with glass‑morphic accents.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
- [Architecture & Core Concepts](#architecture--core-concepts)
  - [State Management](#state-management)
  - [Routing](#routing)
  - [Design System & CSS Variables](#design-system--css-variables)
  - [Responsive Layouts](#responsive-layouts)
- [Key Components](#key-components)
  - [App.tsx](#apptsx)
  - [TradeView](#tradeview)
  - [PortfolioView](#portfolioview)
  - [DisciplineReportView](#disciplinereportview)
  - [LearningCenterView](#learningcenterview)
- [Adding New Features](#adding-new-features)
  - [New View / Tab](#new-view--tab)
  - [Extending the Design System](#extending-the-design-system)
- [Testing & Linting](#testing--linting)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

TrevorosUI is an **institutional‑OS** style web app that mimics a professional trading platform. It includes:

* **Three‑column Trade view** – watchlist, list view, and detailed right‑panel with charts and buy/sell actions.
* **Portfolio view** – sidebar navigation with sub‑tabs: Linked Banks, Mutual Funds/ETFs, Support Desk, Settings (2FA/API keys).
* **Discipline report** – performance metrics, radar charts, and notices.
* **Learning centre** – grid of courses with progress tracking.
* **Mobile‑first experience** – a bottom navigation bar appears on screens ≤ 768 px and layouts collapse gracefully.

All UI elements follow a single **design system** defined in `src/index.css`:
* Dark‑mode palette with custom CSS variables.
* Glass‑morphic cards, subtle micro‑animations, and premium typography.
* Utility classes for spacing, typography, and component states.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 19 (hooks, functional components) |
| **Language** | TypeScript (strict) |
| **Bundler** | Vite 8 (fast HMR, ES‑module dev server) |
| **Styling** | Vanilla CSS with CSS variables (no CSS‑in‑JS) |
| **Icons** | Lucide‑React (lightweight SVG icon set) |
| **Charts** | Hand‑crafted SVG components (candlestick, radar, bar) – easy to replace with Chart.js / d3 if needed |
| **Linting** | ESLint 10 with React & TypeScript plugins |
| **Package Manager** | npm (v9+) |
| **Version Control** | Git (remote: https://github.com/notreallyrajat/TrevorosUI.git) |

---

## Project Structure

```
TrevorosUI/
├─ public/                     # static assets (favicon, index.html)
├─ src/
│  ├─ components/             # React component library
│  │   ├─ TradeView.tsx        # Trade view – watchlist, list, details
│  │   ├─ PortfolioView.tsx    # Portfolio layout + sub‑tabs
│  │   ├─ DisciplineReportView.tsx
│  │   ├─ LearningCenterView.tsx
│  │   └─ ... (shared UI utilities)
│  ├─ index.css                # Global design system & responsive media queries
│  ├─ App.tsx                  # Root component – state, header, routing, mobile nav
│  ├─ main.tsx                 # Vite entry point (ReactDOM.createRoot)
│  └─ utils/                  # Helper functions (e.g., mock data generators)
├─ vite.config.ts               # Vite configuration (React plugin)
├─ tsconfig.json                # TypeScript compiler options
├─ package.json                 # Dependencies & scripts
└─ README.md                    # <-- THIS FILE
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18 (recommended LTS) and **npm** ≥ 9.
- **Git** for version control.

### Installation

```bash
# Clone the repository (if you haven't already)
git clone https://github.com/notreallyrajat/TrevorosUI.git
cd TrevorosUI

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev   # Starts Vite dev server (usually http://localhost:5173)
```

Vite provides **Hot Module Replacement** – changes to `.tsx` or `.css` files are reflected instantly.

### Production Build

```bash
npm run build   # Generates an optimized static bundle in ./dist
npm run preview # Serves the built bundle locally for final verification
```

---

## Architecture & Core Concepts

### State Management

All **global state** lives in `App.tsx` using the `useState` hook:

* `watchlist` – array of stock objects shared across Trade, Discipline, and Learning views.
* `activeTab` – current hash‑based route (`Dashboard`, `Trade`, `Portfolio`, `Learn`).
* `theme` – `'light' | 'dark'`, persisted in `localStorage`.
* Additional UI flags (modal open/close, notifications, streak animation).

Components receive the relevant slice of state via **props** (prop‑drilling). This keeps the app lightweight without introducing Redux or Context for now. When expanding, consider moving to React Context or Zustand.

### Routing

The app uses **hash‑based client‑side routing** (no external router library). The navigation links set `window.location.hash` which triggers a `hashchange` listener in `App.tsx` to update `activeTab`.

* Routes: `#dashboard`, `#trade`, `#portfolio`, `#learn`.
* Mobile bottom navigation mirrors these hash links.

### Design System & CSS Variables

`src/index.css` defines the visual language:

```css
:root {
  --bg-page: #0a0b10;
  --bg-card: #11131a;
  --bg-sidebar: #0d0e14;
  --border-color: #25293c;
  --primary: #3b82f6;   /* blue */
  --primary-light: #e0f2fe;
  --primary-hover: #2563eb;
  --orange: #f97316;
  --orange-light: #fff7ed;
  --text-primary: #e5e7eb;
  --text-secondary: #9ca3af;
  --radius: 8px;
  --transition: all 0.2s ease;
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.15);
}
```

All components use **BEM‑style class names** (`.trade-sidebar-left`, `.action-trigger-btn.buy`, etc.) to stay consistent.

### Responsive Layouts

Media queries (see the bottom of `index.css`) handle three breakpoints:

| Max‑width | Adjustments |
|-----------|-------------|
| 1024 px | Collapse the three‑column Trade view into a vertical stack; sidebar becomes full‑width. |
| 768 px | Switch to **mobile bottom navigation**, hide top nav, and turn all major containers into single‑column layouts (Dashboard, Discipline, Learn, Portfolio). |
| 480 px | Force single‑column grids for indices, tables, and cards; hide non‑essential text (e.g., streak label). |

---

## Key Components

### `App.tsx`
* Holds the global state & theme toggling.
* Renders the **header** (`app-header`) with logo, navigation (`app-nav`), theme button, and notification bell.
* Switches between the four main views based on `activeTab`.
* Inserts the **mobile bottom navigation bar** (visible on ≤ 768 px).

### `TradeView`
* Layout: `<aside class="trade-sidebar-left">` → watchlist; `<section class="trade-center-list-panel">` → list of stocks; `<aside class="trade-right-details-panel">` → candlestick chart, metrics, action buttons.
* Uses `selectedStock`, `selectedListTab`, and `searchQuery` local state.
* **Buy/Sell buttons** use the `.action-trigger-btn` classes for premium styling.
* Range‑slider component (low/high) added in the right panel – styles defined in `index.css`.

### `PortfolioView`
* Grid container `.portfolio-view-container` with a left sidebar and right content area.
* Internal **sub‑tab state** (`activeSubTab`) renders one of four panels:
  * Linked Banks
  * Mutual Funds / ETFs
  * Support Desk (simple contact form)
  * Settings (2FA toggle, API key input)
* Each sub‑panel follows the same card style (`.detail-card`).

### `DisciplineReportView`
* Two‑column layout (`.discipline-report-container`).
* Left sidebar contains navigation shortcuts and a summary banner.
* Right side hosts performance charts, radar chart, and a notice banner.
* Grid `.discipline-grid` arranges cards; collapses to a single column on tablets.

### `LearningCenterView`
* Similar two‑column layout (`.learning-center-container`).
* Right side displays a grid of courses (`.learning-courses-grid`).
* Responsive grid uses `repeat(auto-fill, minmax(280px, 1fr))`.

---

## Adding New Features

### New View / Tab
1. **Create a component** under `src/components/` (e.g., `NewFeatureView.tsx`).
2. **Export** it from the file and add an import in `App.tsx`.
3. Extend the hash‑routing switch:
   ```tsx
   {activeTab === 'NewFeature' && <NewFeatureView />}
   ```
4. Add a navigation entry in the header (`app-nav`) and the mobile bottom bar (`mobile-bottom-nav`).
5. Define any required CSS classes in `index.css` following the existing naming convention.

### Extending the Design System
* Add new CSS variables in `:root` if you need extra colours or spacing.
* Create a utility class (e.g., `.badge-primary`) and document it in a comment block at the top of `index.css`.
* For complex components, consider a **component‑specific CSS module** that imports the variables.

---

## Testing & Linting

The repository currently does **not** include a test suite, but you can add one quickly:

```bash
npm install -D jest @testing-library/react @testing-library/jest-dom ts-jest
```

Create a `jest.config.ts` and write unit tests for pure functions (e.g., mock data generators) and component snapshots.

**Linting** is already configured via `eslint.config.js`. Run:

```bash
npm run lint   # or npx eslint src/**/*.tsx
```

Set up a pre‑commit hook with `husky` if you want linting to run automatically.

---

## Deployment

TrevorosUI can be deployed to any static‑host provider (Vercel, Netlify, Cloudflare Pages):

1. Push the repository to GitHub.  
2. Connect the repo to your chosen platform.  
3. The platform will run `npm install && npm run build` and serve the `dist/` folder.

If you need environment variables (e.g., API keys for future real‑time data), add them as **public** variables prefixed with `VITE_` (Vite automatically injects them into the client bundle).

---

## Contributing

1. **Fork** the repository.
2. Create a **feature branch** (`git checkout -b feature/awesome‑thing`).
3. Follow the coding conventions:
   * Use functional components & hooks.
   * Keep class names BEM‑style.
   * Write concise TypeScript interfaces for props.
   * Run `npm run lint` before committing.
4. Submit a **Pull Request** with a clear description and screenshots (especially for responsive changes).

---

## License

MIT License – feel free to use, modify, and distribute.

---

*Prepared by the Antigravity coding assistant – ready for further development and onboarding of new contributors.*
