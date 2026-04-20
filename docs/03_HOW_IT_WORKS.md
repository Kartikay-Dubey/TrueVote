# HOW IT WORKS: Step-by-Step

Our system requires exactly ZERO technical knowledge from the end-user. 

### Phase 1: Cryptographic Authentication
Citizens navigate to `/login` to authorize their demographic identity (e.g. `TV1001` linked to simulated Aadhaar datasets mapped in Node server). 
To prevent offline spoofing, the system dynamically generates and outputs a **6-Digit OTP** directly into the admin's backend server console (to emulate an SMS gateway). Upon verifying both the unique ID and the terminal-extracted OTP pin against the network constraints, the backend issues an expiring JWT session. If the identity has *already* recorded a transaction, the server instantly terminates the session with a `403 Forbidden` response.

### Phase 2: Casting the Ballot (Vote)
Inside the secure portal (`/vote`), they evaluate the candidates. They make their selection privately. Once they click 'Cast My Secure Vote', the system securely beams their JWT and their selection to the TrueVote Engine.

### Phase 3: Hash Generation (Backend)
The backend engine verifies their token hasn't voted yet. It then immediately processes the vote, strips the user's personal identity to protect anonymity, and converts the ballot into an indestructible SHA-256 cryptographic seal. The user's token is then burned to prevent double usage.

### Phase 4: Ledger Verification (Verify)
The user receives their 64-character receipt. At any point during or after the election, they can navigate to `/verify`, paste the code, and ping the public ledger to guarantee their ballot is safe and hasn't been modified.
