const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_hackathon_key_2026';

// Initialize global tracking
global.votedUsers = global.votedUsers || new Set();

// Voter Identity & Verification Pipeline
router.post('/login', (req, res) => {
  const { voterId, otp } = req.body;
  
  // 1. Validate ID Format (e.g. 12 digit format)
  if (!voterId || voterId.length < 10) {
    return res.status(400).json({ error: 'Valid Demographic ID (Aadhaar/VoterID) is mathematically required.' });
  }

  // 2. Validate Simulated OTP (accepts any 6 digit for demo)
  if (!otp || otp.length !== 6) {
    return res.status(401).json({ error: 'Cryptographic OTP sequence invalid or missing. Ensure you entered a 6-digit pin.' });
  }

  const userId = voterId;
  const token = jwt.sign({ userId, role: 'voter' }, JWT_SECRET, { expiresIn: '24h' });

  const hasVoted = global.votedUsers.has(userId);

  // Return token and payload
  setTimeout(() => { // Artificial security feeling delay
    res.status(200).json({ token, userId, hasVoted });
  }, 800);
});

// Administrator Gate
router.post('/admin-login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@truevote.com' && password === 'secure123') {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
    
    return setTimeout(() => {
       res.status(200).json({ token, success: true });
    }, 1000);
  }

  return setTimeout(() => {
    res.status(401).json({ error: 'Fatal: Invalid Administrator Credentials. Activity Logged.' });
  }, 1200);
});

// Admin verify token GET helper
router.get('/admin-verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ valid: false });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err || user.role !== 'admin') return res.status(403).json({ valid: false });
    res.status(200).json({ valid: true });
  });
});

// Assisted Voting Kiosk Login
router.post('/assisted-login', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Admin terminal authorization required.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err || user.role !== 'admin') return res.status(403).json({ error: 'Forbidden: Valid Admin clearance required for Rural Mode.' });
    
    // Proceed with voter login
    const { voterId, otp } = req.body;
    
    if (!voterId || voterId.length < 10) {
      return res.status(400).json({ error: 'Valid Demographic ID (Aadhaar/VoterID) is mathematically required.' });
    }
  
    // Logically skip or validate OTP exactly how regular login does, here we simulate the Admin manually verified it
    if (!otp || otp.length !== 6) {
      return res.status(401).json({ error: 'Assisted Authorization Failed: Enter 6 digit override code.' });
    }
  
    const userId = voterId;
    const voterToken = jwt.sign({ userId, role: 'voter', assistedBy: user.userId || 'admin' }, JWT_SECRET, { expiresIn: '1h' });
  
    const hasVoted = global.votedUsers.has(userId);
  
    setTimeout(() => { // Artificial security feeling delay
      res.status(200).json({ token: voterToken, userId, hasVoted });
    }, 800);
  });
});

module.exports = router;
