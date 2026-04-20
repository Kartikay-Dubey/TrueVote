# TrueVote – Secure Voting System

## 🚀 Live Demo
*(Insert Live Demo Link Here)*
**👉 Live Link:** [Add deployed link here]

---

## 📸 Screenshots

*(Replace bracketed text with absolute image URLs once hosted)*
- **Landing Page**: [Insert landing-page.png]
- **Voting Portal**: [Insert voting-page.png]
- **Verification Receipt**: [Insert receipt.png]
- **Live Admin Dashboard**: [Insert admin-dashboard.png]

---

## 🧠 Project Overview
**TrueVote** is a production-grade, highly secure civic technology platform designed to eradicate election fraud and restore voter trust. It provides an end-to-end verifiable ecosystem where citizens can cast their ballots anonymously, while simultaneously generating mathematical proof that their specific vote was counted in the final tally.

---

## ❗ Problem Statement
Trust in democratic institutions is failing. Traditional voting systems force citizens to rely on blind trust—dropping a piece of paper into a box or pressing a button on a machine, with zero cryptographic proof that their vote was honestly tallied or protected from post-election ballot stuffing.

---

## 💡 Solution
TrueVote solves this by bringing "Bank-Grade Encryption" to the ballot box. We mathematically isolate voter identities to prevent duplicate voting (using JWT gating). Once a choice is made, our backend engine converts the ballot into an indestructible SHA-256 cryptographic receipt. The voter walks away with proof, making the election 100% transparent and completely anonymous simultaneously.

---

## ✨ Features
- **One Person, One Vote**: Strict Identity validation blocks double-voting at the network boundary.
- **Multi-Party UI Validation**: High-friction confirmation modals prevent accidental votes.
- **Real-Time Results**: The Live Admin Dashboard uses WebSockets and Recharts to map incoming votes in milliseconds.
- **Vote Verification**: Citizens can search the public ledger using their secure hash to verify their vote independently.
- **Secure Storage**: Backend engine natively repels DDoS attacks and prevents database tampering.

---

## ⚙️ Tech Stack
- **Frontend Core**: Next.js 15 (App Router), React, TypeScript
- **Styling & UI**: Tailwind CSS, Framer Motion (3D Physics)
- **Data Visualization**: Recharts
- **Backend Architecture**: Node.js, Express.js
- **Authentication**: JSON Web Tokens (JWT)
- **Real-Time Telemetry**: Socket.io / WebSockets

---

## 🔄 How It Works
1. **Sign In**: User is authenticated mathematically via the system registry at `/login`.
2. **Cast Ballot**: User evaluates candidates and authorizes their choice through a high-friction confirmation modal.
3. **Receipt Generation**: The system strips their identity and encrypts the vote into a 64-character public receipt (SHA-256).
4. **Independent Verification**: The user enters their code into the `/verify` portal to cryptographically prove their vote exists in the final secure tally.

---

## 🔐 Security (Simplified)
Imagine putting your favorite fruit into a blender. You get a smoothie, but you can never "un-blend" it back into the raw fruit. 
When you vote, TrueVote blends your choice into a random-looking 64-character secure code. This code gets locked into the public tally. No one can ever un-blend that code to see who you are. If a malicious hacker tries to change your vote even slightly, the math "tastes wrong" and the system instantly rejects it.

---

## 📊 Future Scope
- **Biometric Integration**: Extending the login portal to support physical FaceID / Thumbprint verification.
- **Zero-Knowledge Proofs (ZKP)**: Allowing even greater anonymity so not even the central servers can link a receipt down to a physical location.
- **Mobile Application**: Native iOS/Android wrapping for remote accessibility.

---

## 👥 Team
- **Kartikay Dubey** – Lead Engineer / Product Architect
- *(Add other team members here)*

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Kartikay-Dubey/TrueVote.git
cd TrueVote
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
# The frontend will run on http://localhost:3000
```

### 3. Backend Setup
```bash
cd ../backend
npm install
node server.js
# The backend will run on port 5000
```

*Note: The backend features auto-shifting port logic. If port 5000 is occupied, it will automatically shift to 5001.*
