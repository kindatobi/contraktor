<<<<<<< HEAD
# Contraktor - Artisan Marketplace

A responsive responsive web application connecting customers with skilled local artisans. Built with React, TypeScript, and Vite.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd contraktor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm test
   ```

## 🏗 Architecture & Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 (Zero-config utility classes) + `clsx` + `tailwind-merge`
- **Routing**: React Router DOM v7
- **State Management**:
  - **Server State**: React Query (TanStack Query) for data fetching, caching, and loading states.
  - **Client State**: Zustand with persistence middleware for user preferences (filters, view mode).
- **Forms**: React Hook Form + Zod validation.
- **Charts**: Recharts.
- **Icons**: Phosphor React.
- **Testing**: Vitest + React Testing Library.

### Key Decisions
- **Mock API**: Implemented a service layer (`src/services/api.ts`) that simulates network delays using static JSON data (`src/db/`). This allows for realistic async UI states (loading skeletons, error handling).
- **Component Separation**:
  - `features/`: Domain-specific components (Artisans, Profile, Admin).
  - `components/`: Generic shared components (Layout, inputs).
  - `pages/`: Route controllers that assemble features.
- **Debounced Search**: Implemented a custom `useDebounce` hook to prevent excessive filtering operations during user input.

### Development Notes

**Context**: My recent work has primarily been in Next.js, so I took a focused crash course on React Query to refresh my knowledge for this project, which contributed to the submission timeline.

**Architectural Approach**: I adapted the patterns I typically use in Next.js applications (server actions, server components, DAL/queries) to this React SPA context:
- **Caching Strategy**: In place of Next.js's server-side cache, I implemented React Query with a 30-second `staleTime` for client-side caching. This keeps data fresh while reducing unnecessary refetches.
- **State Management**: Filter state is managed through URL search parameters rather than `useState`, providing better UX through shareable URLs, browser history support, and persistence across page refreshes.
- **Data Layer**: Separated concerns with a dedicated `services/api.ts` layer and `queries/query.ts` hooks, mirroring the server/client data boundary pattern from Next.js.

**Testing**: Test suites were generated with assistance from Claude Sonnet 3.5, then reviewed and refined to ensure comprehensive coverage of core functionality.


## 🔮 Tradeoffs & Future Improvements (With More Time)
1. **Real Backend**: Replace the mock service with a real Node.js/Express or Supabase backend.
2. **Advanced Filtering**: Add multi-select for trades and range sliders for pricing/ratings.
3. **Authentication**: Implement real user auth (Auth0 or similar) for the Admin dashboard and Request features.
4. **Testing Coverage**: Expand test suite to cover all pages and edge cases (currently covers core filter logic and form validation).
5. **Accessibility**: Conduct a full a11y audit (contrast, screen reader testing).

## 📂 Project Structure
```
src/
├── components/   # Shared UI components (Layout, Navbar)
├── db/           # Mock JSON data
├── features/     # Feature-specific components
│   ├── admin/    # Admin charts
│   ├── artisans/ # Artisan cards, filters, lists
│   └── profile/  # Portfolio, Request Form
├── hooks/        # Custom hooks (useDebounce)
├── pages/        # Page components (Explore, Profile, Admin)
├── services/     # API simulation
├── store/        # Global state (Zustand)
└── utils/        # Helper functions
```
=======
# contraktor
artisan marketplace
>>>>>>> 8aa560a52658d30e4c50223e492aeb3e857539cd
