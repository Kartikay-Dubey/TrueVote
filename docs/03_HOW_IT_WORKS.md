# HOW IT WORKS: Step-by-Step

Our system requires exactly ZERO technical knowledge from the end-user. 

### Phase 1: Identity Verification
When a user launches the app, they must log in using their **Voter ID** or **Simulated Aadhaar Number**. The system hits the demographic API registry (`/api/v1/auth/login/init`). If identified, a simulated SMS gateway immediately generates and transmits a secure 6-digit One Time Password (OTP) to the terminal.

> **Note on Simulated Aadhaar:** For hackathon demonstration purposes, realistic 12-digit Aadhaar values have been seeded for all 20 profile entities to show seamless compatibility with Indian national identity schema parameters without using real privacy data.

Because the application is now in Live Production, the **Frontend (Vercel)** sends secure cross-domain HTTPS requests to the **Backend Engine (Render)** at `https://truevote-backend-fcmt.onrender.com`.

To prevent offline spoofing, the system dynamically generates and outputs a **6-Digit OTP** directly into the Render backend server logs (to emulate an SMS gateway). Upon verifying both the unique ID and the terminal-extracted OTP pin against the network constraints, the backend issues an expiring JWT session. If the identity has *already* recorded a transaction, the server instantly terminates the session with a `403 Forbidden` response.

### Phase 2: Casting the Ballot (Vote)
Inside the secure portal (`/vote`), they evaluate the candidates. They make their selection privately. Once they click 'Cast My Secure Vote', the system securely beams their JWT and their selection to the TrueVote Engine.

### Phase 3: Hash Generation (Backend)
The backend engine verifies their token hasn't voted yet. It then immediately processes the vote, strips the user's personal identity to protect anonymity, and converts the ballot into an indestructible SHA-256 cryptographic seal. The user's token is then burned to prevent double usage.

### Phase 4: Ledger Verification (Verify)
The user receives their 64-character receipt. At any point during or after the election, they can navigate to `/verify`, paste the code, and ping the public ledger to guarantee their ballot is safe and hasn't been modified.
