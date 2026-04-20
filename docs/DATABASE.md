# Database Architecture

## 🗄️ Overview
The database layer captures high-throughput event data and maintains the static configuration catalog for UI layouts. It is optimally designed for heavy write loads and rapid analytical reads.

## 📊 Database Selection Strategy
Due to the unstructured, highly concurrent nature of frontend interaction events, a hybrid or NoSQL-first approach is implemented (e.g., MongoDB for flexible document storage, combined with Redis for sub-millisecond real-time session caching).

## 🏗️ Core Collections / Tables

### 1. `sessions` (Ephemeral Data)
Stores active interaction context for entirely anonymous users.
- `session_id` (UUID - intended to expire/flush in 24h)
- `started_at` (Timestamp)
- `affinity_scores` (Key-Value integer map: e.g., `{ "pricing": 12, "docs": 2 }`)

### 2. `events` (Raw Ingestion)
The immediate write location for batched events arriving from the frontend.
- `_id` (Auto-generated)
- `session_id` (Foreign reference)
- `event_type` (Enum: `dwell`, `click`, `scroll`, `hover`)
- `component_id` (String identifier of the specific UI element interacted with)
- `value` (Numeric representation of the interaction, such as duration in ms or depth in pixels)
- `timestamp` (Indexed)

### 3. `ui_configurations` (Static / Reference Data)
Stores the master list of possible UI permutations and variant definitions.
- `zone_id` (Identifier of where this logic applies on the frontend layout)
- `variants` (Array of component objects and their associated required affinity minimum scores to trigger a visual change)

## ⚡ Indexing Strategy
- Heavy indexing on `session_id` and `timestamp` across the interaction pipeline to maintain ultra-fast query execution.
- Optimized write paths to prevent table/collection locking during spikes in web traffic.
