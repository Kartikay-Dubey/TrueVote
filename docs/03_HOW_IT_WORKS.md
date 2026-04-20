# HOW IT WORKS: Step-by-Step

Our system requires exactly ZERO technical knowledge from the end-user. 

### Phase 1: Identity Generation (Login)
Citizens navigate to `/login` and enter their officially registered email. The TrueVote authentication server checks the registry and securely signs a JSON Web Token granting them one-time access to the Voting Portal.

### Phase 2: Casting the Ballot (Vote)
Inside the secure portal (`/vote`), they evaluate the candidates. They make their selection privately. Once they click 'Cast My Secure Vote', the system securely beams their JWT and their selection to the TrueVote Engine.

### Phase 3: Hash Generation (Backend)
The backend engine verifies their token hasn't voted yet. It then immediately processes the vote, strips the user's personal identity to protect anonymity, and converts the ballot into an indestructible SHA-256 cryptographic seal. The user's token is then burned to prevent double usage.

### Phase 4: Ledger Verification (Verify)
The user receives their 64-character receipt. At any point during or after the election, they can navigate to `/verify`, paste the code, and ping the public ledger to guarantee their ballot is safe and hasn't been modified.
