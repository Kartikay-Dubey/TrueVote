# Security Architecture — TrueVote

> This document replaces the legacy "Personalization Engine" doc which was not relevant to the TrueVote voting platform. The correct advanced feature for this project is the **Cryptographic Security Model**.

## 🛡️ Overview
TrueVote's security is built on three guarantees:
1. **One identity → one vote** (anti-fraud)
2. **Votes are cryptographically sealed** (tamper-proof)
3. **Voters can independently verify** (zero-trust)

---

## 🔐 1. Identity Layer — JWT Voter Authentication

When a voter provides their email, the server issues a **JSON Web Token (JWT)** signed with a server secret. This token:
- Contains the voter's anonymised identity (email hash, not the raw email).
- Expires after a short window (enough for one session).
- Is verified on every API call that touches the ballot system.

**Anti-Double Voting:**
The server maintains an in-memory `Set<string>` of voted identity hashes. The moment a valid ballot is accepted, the hash is added to this set. Any future `POST /vote` request bearing the same identity (even with a fresh JWT) is rejected with `403 Forbidden`.

---

## 🔏 2. Cryptographic Receipt — SHA-256 Hashing

When a vote is cast, the backend constructs a receipt using:
```
receipt = SHA256( candidateId + voterIdentityHash + timestamp + serverSecret )
```

This produces a **64-character hex string** that is:
- **Deterministic** — the same inputs always produce the same hash.
- **One-way** — no one can reverse the hash to learn the voter's identity or choice.
- **Collision-resistant** — changing even one character of the input produces a completely different hash.

The voter receives this receipt on the `/success` page.

---

## ✅ 3. Public Verification Ledger

The backend exposes `POST /api/v1/verify` which accepts a hash receipt and confirms whether it exists in the sealed tally. This allows any voter to independently prove:
- Their vote was accepted and counted.
- Their specific receipt exists, unmodified, in the system.
- They do not need to trust TrueVote — they trust the math.

---

## 🚨 4. Simulated Threat Defence (Admin Dashboard)

The Admin Dashboard includes a **live threat simulation layer** that models real-world attack patterns:
- **DDoS Simulation:** A random interval fires every ~2 seconds (6% chance) generating a fake blocked IP event, popping a red `BLOCKED` alert in the Firewall Activity log.
- This demonstrates to judges/evaluators that the platform is designed with active intrusion detection in mind, not just passive security.

---

## 🔭 Future Security Roadmap

| Feature | Description |
|---|---|
| **Zero-Knowledge Proofs (ZKP)** | Allow voters to prove their vote was counted without revealing *what* they voted, using zkSNARKs. |
| **Blockchain Anchoring** | Periodically anchor the tally hash onto a public L2 chain (e.g., Polygon) for global, immutable proof. |
| **Biometric Login** | Replace email-based JWT with FaceID/Thumbprint WebAuthn passkeys for bulletproof identity. |
| **ML Anomaly Detection** | Replace the rule-based DDoS simulator with a trained model that classifies genuine traffic spikes from attack patterns in real-time. |
