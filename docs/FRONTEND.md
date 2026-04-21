# Frontend Documentation — TrueVote

## 🎨 Overview
The TrueVote frontend is a Next.js 16 (App Router) application delivering a premium, security-focused voting interface. It is built to feel trustworthy, snappy, and visually striking — combining glassmorphic dark-mode aesthetics with real-time cryptographic feedback to give voters absolute confidence in the process.

## 📐 Architecture & Principles
- **App Router Structure:** All pages live under `src/app/` using the Next.js file-based routing system (e.g., `/vote`, `/verify`, `/admin`, `/success`).
- **Component Modularity:** UI is composed of three categories of components: `aesthetic/` (background effects), `interactive/` (3D cards, modals), and `secure/` (hash terminal, receipt viewer).
- **Micro-Animations:** Fluid 60fps transitions using Framer Motion prevent layout shifts from feeling jarring. Every state change has a physical presence.
- **Type Safety:** The entire frontend is written in TypeScript with strict typing.

## 🗂️ Key Pages

| Route | Purpose |
|---|---|
| `/` | Landing page — hero section, how-it-works, feature highlights |
| `/login` | Voter authentication via Aadhaar emulation & OTP verification |
| `/vote` | Candidate selection with 3D-tilt cards and confirmation modal |
| `/success` | Post-vote receipt page — Hash Terminal decryption animation |
| `/verify` | Public ledger — paste a hash receipt to prove your vote |
| `/admin-login` | Restricted admin authentication |
| `/admin` | Live election dashboard with anomaly detection |
| `/assisted-vote` | Rural Access Terminal for administratively overriding unequipped voter logins |

## 🔌 Real-Time Integration & Production Configuration
The frontend connects to the backend via **Socket.io** (WebSockets) on the Admin Dashboard page. Every time a new vote is cast, the server emits a `new_vote_cast` event that instantly updates:
1. The 5-party distribution object
2. The UI vote tally charts
3. The real-time activity log

**Live Production Deployments:**
Because the frontend is deployed dynamically on Vercel while the true engine runs on Render, all components now dynamically bridge the networking layers using the `NEXT_PUBLIC_API_URL` environment variable. By default it falls back to `localhost:5000` for offline development, but strictly routes to `https://truevote-backend-fcmt.onrender.com` in production!

## 🔒 Auth Flow
- Voters receive a **JWT** stored in `localStorage` after login.
- The `/vote` page reads this token to gate access and identify the voter server-side.
- The `/admin` page reads an `admin_token` and validates it against `/api/v1/auth/admin-verify` before rendering any data.
- All tokens are single-use for voting — once a vote is cast, the backend flags the voter ID to prevent double-voting.

## 🧩 Key Components

### `AsymmetricCard` (`interactive/`)
A reusable card component with real-time 3D mouse-tilt physics using Framer Motion springs. Used on the vote page for all 5 candidate cards and on the admin dashboard for KPI stats.

### `HashTerminal` (`secure/`)
A cyberpunk-style terminal component that runs a "decryption" animation revealing the SHA-256 receipt character by character. Includes a one-click clipboard copy button that appears only after the animation completes.

### `BackgroundEffect` (`aesthetic/`)
A canvas-based animated background rendered globally via the root layout. Provides a subtle, performance-friendly animated particle/mesh effect without blocking the main UI thread.
