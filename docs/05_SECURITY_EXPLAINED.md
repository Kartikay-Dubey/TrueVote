# SECURITY EXPLAINED (For Normal Users)

You might hear words like "Cryptographic Hashing" or "Verifiable Ledgers" and get confused. Here is exactly how TrueVote protects your vote, explained simply.

### 1. What is a Hash?
Imagine putting your favorite recipe through a blender. You get a smoothie. You can easily blend the recipe into a smoothie, but you **can never** un-blend the smoothie back into the raw ingredients. 

A **Hash** is a mathematical blender. When you vote for a candidate, TrueVote blends your vote into a random-looking 64-character text code (like `0x9b7f5d...`). This code gets locked into the public tally. No one can ever "un-blend" that code to see who you are.

### 2. The Sandbox Rule
If I blend an apple, I get an apple smoothie. If I blend an apple and one tiny grain of sand, I get a completely different tasting smoothie. 
This is why TrueVote is unbreakable. If an evil hacker breaks into the database and tries to change your vote from Candidate A to Candidate B, the math completely breaks. The smoothie tastes wrong, and the entire system instantly rejects the change.

### 3. Proof
Because you possess the exact code the blender made, you can always search the final database to verify your vote is exactly where it should be, untouched.
