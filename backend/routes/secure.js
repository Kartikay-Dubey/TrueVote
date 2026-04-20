const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_hackathon_key_2026';

// Mock Ledger State
global.voteLedger = global.voteLedger || {};
global.votedUsers = global.votedUsers || new Set();

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access Denied: Missing Bearer Token. Ensure you are logged in.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Access Denied: Cryptographic Token Mutated or Expired.' });
    req.user = user;
    next();
  });
};

// POST /vote - NOW STRICTLY PROTECTED BY JWT
router.post('/vote', authenticateToken, (req, res) => {
  const { candidateId, timestamp } = req.body;
  const voterId = req.user.userId; // Securely extracted from token

  if (!candidateId) {
    return res.status(400).json({ error: 'Payload rejected: Missing candidate vector.' });
  }

  // Strict Double Voting Check enforced at Identity Level
  if (global.votedUsers.has(voterId)) {
    return res.status(403).json({ error: 'VIOLATION DETECTED: This identity has already cast a ballot. Connection terminated.' });
  }

  const rawData = `${voterId}-${candidateId}-${timestamp || Date.now()}-${Math.random()}`;
  const hash = '0x' + crypto.createHash('sha256').update(rawData).digest('hex');

  // Store in immutable ledger
  global.voteLedger[hash] = { candidateId, voterId, timestamp: Date.now(), verified: true };
  global.votedUsers.add(voterId);

  if (req.app.get('io')) {
    req.app.get('io').emit('new_vote_cast', { hash, candidateId });
  }

  setTimeout(() => {
    res.status(200).json({ success: true, hash });
  }, 1000); 
});

// GET /verify/:hash (Public API, validates receipt)
router.get('/verify/:hash', (req, res) => {
  const { hash } = req.params;
  setTimeout(() => {
    if (global.voteLedger[hash]) {
      return res.status(200).json({ verified: true, data: global.voteLedger[hash] });
    } else {
      return res.status(404).json({ verified: false });
    }
  }, 1200); 
});

// GET /results (Public currently, could be admin protected but dashboard is protected instead)
router.get('/results', (req, res) => {
  const total = Object.keys(global.voteLedger).length;
  const distribution = {};
  for (const hash in global.voteLedger) {
    const cid = global.voteLedger[hash].candidateId;
    distribution[cid] = (distribution[cid] || 0) + 1;
  }
  return res.status(200).json({ total, distribution });
});

module.exports = router;
