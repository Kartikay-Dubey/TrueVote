# Backend Documentation — TrueVote

## ⚙️ Overview
The TrueVote backend is a Node.js + Express server that acts as the secure nerve centre of the platform. It handles voter authentication, ballot ingestion, cryptographic receipt generation, real-time WebSocket broadcasting, and admin-only data access — all behind a strict JWT-gated API surface.

## 🏗️ Architecture

```
backend/
├── server.js              # Entry point — Express + Socket.io bootstrap
├── routes/
│   ├── auth.js            # Login, admin-login, token verification
│   ├── secure.js          # Vote casting, results, receipt verification
│   └── ingest.js          # Analytics event ingestion (extensible)
└── controllers/
    └── personalize.js     # Session utility helpers
```

## 🔌 API Reference

### Authentication (`/api/v1/auth`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/login` | Accepts `{ email }`, issues a signed voter JWT. Blocks if voter has already voted. |
| `POST` | `/admin-login` | Accepts `{ email, password }`, issues a privileged admin JWT. |
| `GET` | `/admin-verify` | Validates an admin JWT from the `Authorization: Bearer` header. |

### Voting & Results (`/api/v1`)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/vote` | Accepts `{ candidateId }` + voter JWT. Generates SHA-256 hash receipt, stores vote, emits `new_vote_cast` via Socket.io. |
| `GET` | `/results` | Returns `{ total, distribution }` — live vote count and per-party breakdown. |
| `POST` | `/verify` | Accepts `{ hash }`, returns whether the hash exists in the live tally. |
| `GET` | `/health` | Simple health check — returns `{ status: 'TrueVote Secure Backend is running' }`. |

## 🔒 Security Model

- **JWT Gating:** Every vote request must carry a valid voter JWT in the `Authorization` header. The server verifies the token on every request before processing.
- **Anti-Double Voting:** After a valid vote is recorded, the voter's identity (email hash) is added to an in-memory `Set`. Any subsequent vote attempts from that identity are rejected with `403 Forbidden`.
- **CORS:** The server uses the `cors` middleware. In production, `cors({ origin: 'https://truevote.app' })` should be set to restrict access.
- **Payload Validation:** All incoming request bodies are validated before processing. Malformed requests are dropped immediately.

## 📡 Real-Time via Socket.io
The server initialises a Socket.io instance attached to the HTTP server. When a valid vote is cast:
```js
io.emit('new_vote_cast', { hash: voteHash, candidateId });
```
The Admin Dashboard subscribes to this event to update all live charts without polling.

## 🔧 Self-Healing Port Logic
If the default port `5000` is already occupied (`EADDRINUSE`), the server automatically increments and retries (`5001`, `5002`, etc.) until a free port is found — no manual config needed during development.
