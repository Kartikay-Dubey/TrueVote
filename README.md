# 🗳️ TrueVote — Secure Blockchain-Verified Polling

<div align="center">

  <h3>Your Vote. Fully Secured.</h3>
  <p>A next-generation digital voting platform powered by cryptographic identity verification, real-time election analytics, and a zero-compromise privacy-first architecture.</p>

  <br/>

  [![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-true--vote--two.vercel.app-6C63FF?style=for-the-badge&logo=vercel&logoColor=white)](https://true-vote-two.vercel.app/)
  [![Status](https://img.shields.io/badge/Status-Live%20%26%20Running-00D4A4?style=for-the-badge)]()
  [![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)]()

</div>

---

## 🌐 Live Application

> **🔗 [https://true-vote-two.vercel.app/](https://true-vote-two.vercel.app/)**

| Route | Description |
|---|---|
| `/` | Landing Page — Hero & Sign In |
| `/vote` | Cast Your Secure Ballot |
| `/verify` | Verify Vote on Blockchain |
| `/admin-login` | Root Access — Restricted Command Center |
| `/admin` | Live Election Dashboard |

---

## 📸 Screenshots

### 🏠 Landing Page
![Landing Page](DemoSS/Screenshot%202026-04-21%20084606.png)

---

### 🗳️ Secure Ballot — Cast Your Vote
![Cast Vote Page](DemoSS/Screenshot%202026-04-21%20084658.png)

---

### 🔐 Admin Root Access Login
![Admin Login](DemoSS/Screenshot%202026-04-21%20084714.png)

---

### 📊 Live Election Dashboard (Production)
![Admin Dashboard Live](DemoSS/Screenshot%202026-04-21%20084728.png)

---

### 📡 Live Dashboard (Local Dev)
![Admin Dashboard Dev](DemoSS/Screenshot%202026-04-21%20071546.png)

---

## 📖 Overview

**TrueVote** is an intelligent, full-stack digital voting platform built for the modern era of secure, transparent, and auditable elections. Every vote is cryptographically linked to a verified identity while remaining permanently anonymous — mathematically guaranteed.

Our core pillars: **Security, Transparency, and Zero-Compromise Privacy.**

---

## 🎯 Problem Statement

We are solving the critical challenge of trust in digital elections:

- **Voter Identity Verification** — Every voter is verified via OTP without storing PII.
- **Tamper-Proof Voting** — Votes are hashed and stored immutably.
- **Real-Time Auditability** — The Admin Dashboard streams live election telemetry.
- **Zero Fraud Architecture** — One vote per verified identity, enforced at the cryptographic layer.

---

## 🏗️ Architecture & Documentation

| Module | Description |
|---|---|
| 🎨 [Frontend Docs](docs/FRONTEND.md) | UI components, animations, and behavioral tracking logic |
| ⚙️ [Backend Docs](docs/BACKEND.md) | API design, overall architecture, and data flow |
| 🧠 [Identity System](docs/09_IDENTITY_SYSTEM.md) | Cryptographic identity verification & OTP system |
| 🗄️ [Database Architecture](docs/DATABASE.md) | Data schema, collections, and tracking relationships |

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14, TypeScript, Recharts |
| **Backend** | Node.js, Express.js, MongoDB |
| **Auth** | OTP-based identity verification |
| **Deployment** | Vercel (Frontend) · Render (Backend) |
| **Styling** | CSS Modules, Glassmorphism, Custom Animations |

---

## ⚡ Key Features

1. **OTP Identity Verification** — Secure, anonymous voter identity gate.
2. **Live Vote Distribution Chart** — Real-time Recharts donut visualization.
3. **Network Velocity Tracker** — Votes-per-minute area chart streaming live data.
4. **Admin Firewall Log** — Live operations & security event feed.
5. **Rural Access Terminal** — Accessible voting mode for remote constituencies.
6. **System Integrity Monitor** — 100% uptime health verification display.
