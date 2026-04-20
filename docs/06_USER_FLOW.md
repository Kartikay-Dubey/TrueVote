# USER FLOW SIMULATION

If you are demoing this project to a judge, follow this exact path to show off the Voter Experience:

1. **Enter the Landing Page (`/`)**: Slowly scroll down the landing page to show off the smooth Framer Motion animations and the 4-step "How It Works" graphics featuring the TrueVote branding.
2. **Authenticate (`/login`)**: Click "Sign In to Vote" on the landing page. Type any fake email (e.g., `judge@hackathon.com`) and log in. 
3. **The Vote (`/vote`)**: Hover your mouse over the 5 Indian candidates. Make sure the judge notices the 3D card tilt physics and varying party color themes. Select a candidate and hit the 'Review and Submit' button.
4. **The Confirm Modal**: Point out the background blur. Emphasize that adding physical "friction" to the UI prevents accidental votes. Click "Seal & Cast Vote".
5. **The Receipt (`/success`)**: Do not skip this page too fast. Point out the "Hacker Terminal" decryption animation, explaining that this is the system mathematically sealing their anonymous vote. Copy the hash to your clipboard.
6. **The Verification (`/verify`)**: Navigate to the check your vote page. Paste the hash you just copied. Hit verify, and show the judge the screen lighting up Green, proving that their specific vote made it into the secure tally.
7. **The Double-Vote Block**: Go back to `/login` and type that exact same email again. The system will throw a strict Red error telling the user they are banned from double-voting.
