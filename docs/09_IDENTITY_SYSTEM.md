# Secure Identity Verification

To enforce a strict "One Person = One Vote" mandate, TrueVote simulates a mathematically secure demographic identity verification pipeline.

## 🏦 Aadhaar / Voter ID Validation
Instead of basic email or username registration, the system strictly expects a format simulating a structural identity vector. During login:
1. The user inputs their unique identifier (e.g. `TV1001`).
2. The backend maps this demographic ID into a mock relational dataset (`backend/data/users.js`).
3. If the ID is not mathematically present within the national registry, it firmly throws an `Invalid ID` rejection preventing any API handshakes.

*Note: For the bounds of the presentation, the system utilizes an ethical 20-profile fake dataset composed of synthetic Indian citizens with `TV1001` extending sequentially towards `TV1020`. DO NOT USE REAL AADHAAR DATA in presentations.*

## 🔐 Cryptographic OTP Sequence (2FA)
A simulated two-factor authentication layer handles unauthorized physical access to the ID numbers.
Once the structure is validated, the system requires a `6-digit` temporal passcode (OTP). This guarantees that the user currently possesses the device attached to the Unique ID.

## 🛑 Collision Detection (Double Voting)
Upon a successful identity handshake, the backend queries the immutable `global.votedUsers` Set. 
If the demographic identity has *already* recorded a transaction, the network terminates the connection with a `403 Forbidden` response. 

The frontend catches this API rejection and visually blocks the user, citing cryptographic violation.

## 🌾 Rural Access: Assisted Voting Mode
To solve absolute rural adoption where users lack smartphones, TrueVote introduces **Assisted Voting Terminals**.
1. An authenticated administrator logs into the Live Dashboard.
2. The admin launches a restricted `/assisted-vote` kiosk.
3. The voter provides physical demographics to the admin offline.
4. The admin plugs the demographic ID into the kiosk, alongside an administrative override key (simulating local verification).
5. The backend generates a temporary, 1-to-1 secure voter token bound to the voter's identity, *not* the admin's identity.
6. The admin securely makes the selection on the unequipped voter's behalf, receives the cryptographic receipt, and the system instantly snaps back to the dashboard context perfectly securely.
