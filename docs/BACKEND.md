# Backend Documentation

## ⚙️ Overview
The backend acts as the central ingestion point for high-volume frontend data streams and serves the calculated personalization configurations securely and efficiently.

## 🏗️ Architecture Design
The backend is structured to be highly concurrent, capable of swallowing thousands of lightweight events per minute without degrading API response times.

- **Gateway Layer:** Handles authentication of API keys and manages rate limiting to prevent abuse.
- **Ingestion Pipeline:** Buffers raw interaction events into a fast memory store (e.g., Redis) before batch-writing to the permanent database.
- **Action Dispatcher:** Exposes endpoints to the frontend to query over WebSocket or REST for the latest UI state JSON.

## 🔌 API Boundaries
1. **`POST /api/v1/ingest`**: Receives batched analytics payloads from the frontend tracking layer.
2. **`GET /api/v1/layout/current`**: Called by the client on hydration to get the dynamic arrangement tailored to their current session.
3. **`WS /socket/live-ui`**: A WebSocket implementation for real-time, mid-session UI shuffling (Optional feature based on performance profiling).

## 🔒 Security & Data Flow
- All endpoints use CORS tightly coupled to the expected production domains.
- We enforce strict payload validation to drop malformed or malicious analytics JSON.
- Since we use a privacy-first methodology, no PII (Personally Identifiable Information) ever passes through the ingestion pipeline. Absolute anonymity is guaranteed.
