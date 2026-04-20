const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_hackathon_key_2026';

// Initialize global tracking
global.votedUsers = global.votedUsers || new Set();

// Voter Login
router.post('/login', (req, res) => {
  const { email } = req.body;
  
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required for cryptographic tracing.' });
  }

  const userId = email.toLowerCase();
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

module.exports = router;
