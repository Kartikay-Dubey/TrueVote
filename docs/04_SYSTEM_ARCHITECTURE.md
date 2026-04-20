# SYSTEM ARCHITECTURE

TrueVote is built utilizing a high-performance modern tech stack meant for scale, speed, and immense flexibility.

## 1. The Frontend (Next.js 15 + React)
- **Framework**: Next.js App Router providing lightning-fast server-side rendering and isolated client components.
- **Styling**: Tailwind CSS combined with raw CSS `clip-path` logic to construct the non-rectangular, asymmetrical cyberpunk UI.
- **Animation**: `Framer Motion` physics engine for 3D card tilting, layout staggering, and scroll-triggered narrative sections.
- **Components**: Separated securely into interactive client boundary borders protecting sensitive states.

## 2. The Backend Engine (Node.js + Express)
- **Server**: Express.js handling strict RESTful endpoints.
- **Authentication**: `jsonwebtoken` (JWT) generating encrypted stateful tokens for both Administrators and Voters.
- **Self-Healing Port Mapping**: Standard Node crash errors (`EADDRINUSE`) are mitigated via recursive target mapping, ensuring 100% uptime regardless of environment overlaps.

## 3. Real-Time Layer (Socket.io)
- **WebSockets**: Integrated directly into the Express HTTP server, pushing bi-directional events to the Next.js frontend instantly without heavy HTTP polling, conserving server resources while preserving real-time accuracy.
