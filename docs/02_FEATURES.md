# KEY FEATURES: TrueVote

TrueVote is built to scale and defend against malicious attacks natively, featuring enterprise-level data visualization.

## 1. 1-to-1 Voter Isolation (Anti-Double Voting)
Our authentication layer uses JWTs (JSON Web Tokens) to strictly gate the voting mechanism. When an identity casts a ballot, their ID is permanently flagged. Any subsequent attempts to force a POST request are instantly rejected by the server with a `403 Forbidden` response.

## 2. Multi-Party UI with Confirmation Modals
The system natively supports 5 Indian political parties (BJP, INC, AAP, TMC, CPI) with distinct CSS-driven color themes (Saffron, Sky, Cyan, Emerald, Red). Clicking a candidate triggers a strict "Confirm Vote" overlay that halts the UI, forcing explicit user consent and eliminating accidental votes.

## 3. Cryptographic Receipts
Every single vote generates a unique 64-character SHA-256 hash derived from the user's choice and the exact timestamp. Modifying the database physically breaks the hash.

## 4. Real-Time Telemetry Dashboard (Recharts Data Visualization)
Election organizers get access to an intensely secure `/admin` dashboard powered by WebSockets and Recharts. Live distribution is plotted dynamically via interactive Donut and Area Charts, visually displaying network velocity (Votes / Time). The dashboard also displays real-time firewall threat mitigation logs.

## 5. Unalterable Public Ledger
TrueVote provides a public `/verify` portal where citizens can paste their cryptographic receipts to verify their vote independently.
