# TrevorosUI

TrevorosUI is a high-fidelity, premium trading and institutional analytics dashboard. Built with a modern, responsive "Institutional OS" aesthetic, it features high-density charts, real-time simulated price fluctuations, structured discipline reports, and professional training resources.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed on your system.

### Installation

1. Navigate to the project root directory:
   ```bash
   cd TrevorosUI
   ```

2. Install the necessary package dependencies:
   ```bash
   npm install
   ```

### Running Locally (Development Mode)

Start the Vite development server:
```bash
npm run dev
```
The application will normally run on `http://localhost:5173/` or `http://localhost:5174/`.

### Production Build

Compile the TypeScript files and bundle the production assets:
```bash
npm run build
```

Verify the production build using Vite's preview:
```bash
npm run preview
```

---

## 📦 Package Details & Libraries

The application leverages a lightweight, modular package footprint to maintain high performance and quick load times.

### Dependencies
- **[React](https://react.dev/) (`^19.2.6`)**: Core UI library for components and state management.
- **[React DOM](https://reactjs.org/) (`^19.2.6`)**: React rendering entry point.
- **[Lucide React](https://lucide.dev/) (`^1.17.0`)**: Comprehensive, unified svg iconography system.

### DevDependencies
- **[TypeScript](https://www.typescriptlang.org/) (`~6.0.2`)**: Type safety, interface contracts, and module compilation.
- **[Vite](https://vitejs.dev/) (`^8.0.12`)**: Ultra-fast next-generation frontend toolchain.
- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) (`^6.0.1`)**: Official React plugin for Fast Refresh.
- **ESLint (`^10.3.0`)**: JavaScript/TypeScript code linter and quality analysis.

---

## 🛠️ Architecture & Routing

The project follows a modular, single-page application structure powered by a client-side hash routing system:

1. **Hash Routing (`#dashboard`, `#trade`, `#portfolio`, `#learn`):**
   - Synchronizes URL hashes directly with the central `activeTab` React state.
   - Prevents nested layout overlapping, rendering only the requested view.
2. **Modular Views (`src/components/`):**
   - `DisciplineReportView.tsx`: Displays comprehensive performance logs, user metrics, and trading discipline data.
   - `TradeView.tsx`: Interactive 3-column layout featuring candle SVG charts, order books, and depth charts.
   - `PortfolioView.tsx`: Sidebar-driven navigation highlighting investments, performance matrix, and transaction histories.
   - `LearningCenterView.tsx`: Tab-driven learning platform with course grids, status trackers, and structured SVG graphics.
3. **Design System (`src/index.css`):**
   - Uses a dark-mode palette, premium typography, CSS-variable-based colors, custom rounded corners, hover transitions, and glassmorphic modals.
