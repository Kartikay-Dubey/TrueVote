const express = require('express');
const jwt = require('jsonwebtoken');
const { fakeUsers } = require('../data/users');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_hackathon_key_2026';

// Attach fakeUsers to global so it can be mutated by secure.js
if (!global.fakeUsers) {
  global.fakeUsers = fakeUsers;
}

// Temporary memory for OTP mappings { "TV1001": "123456" }
global.otpCache = global.otpCache || {};

// Step 1: Voter Identity Validation & OTP Generation
router.post('/login/init', (req, res) => {
  const { voterId } = req.body;
  
  if (!voterId) {
    return res.status(400).json({ error: 'Voter ID is required.' });
  }

  const inputId = voterId;
  let resolvedUserId = null;
  let userRecord = null;
  
  if (global.fakeUsers[inputId]) {
    resolvedUserId = inputId;
    userRecord = global.fakeUsers[inputId];
  } else {
    // Identity resolution via simulated Aadhaar
    resolvedUserId = Object.keys(global.fakeUsers).find(k => global.fakeUsers[k].aadhaarNumber === inputId);
    if (resolvedUserId) userRecord = global.fakeUsers[resolvedUserId];
  }

  if (!userRecord) {
    return res.status(404).json({ error: 'Invalid ID: Demographic record not found in national registry.' });
  }

  // Generate 6-digit simulated OTP - Hardcoded for prototype demo
  const generatedOtp = "507410";
  global.otpCache[inputId] = generatedOtp; // Cache against exact string they typed

  // Log in terminal for the hackathon demo exactly as requested
  console.log(`\n[SMS GATEWAY SIMULATION]`);
  console.log(`📡 Sending OTP to ${userRecord.name} ending in ...${userRecord.phone.slice(-4)}`);
  console.log(`🔑 SECURE OTP: ${generatedOtp}\n`);

  setTimeout(() => { // Artificial network delay
    res.status(200).json({ success: true, message: 'OTP sent to registered mobile.' });
  }, 800);
});

// Step 2: OTP Verification & JWT Issuance
router.post('/login/verify', (req, res) => {
  const { voterId, otp } = req.body;

  if (!voterId || !otp) {
    return res.status(400).json({ error: 'Voter ID and OTP are required.' });
  }

  const cachedOtp = global.otpCache[voterId];
  
  if (!cachedOtp || cachedOtp !== otp) {
    return res.status(401).json({ error: 'Invalid OTP or session expired.' });
  }

  // Clear OTP
  delete global.otpCache[voterId];

  const inputId = voterId;
  let resolvedUserId = null;
  let userRecord = null;
  
  if (global.fakeUsers[inputId]) {
    resolvedUserId = inputId;
    userRecord = global.fakeUsers[inputId];
  } else {
    // Identity resolution via simulated Aadhaar
    resolvedUserId = Object.keys(global.fakeUsers).find(k => global.fakeUsers[k].aadhaarNumber === inputId);
    if (resolvedUserId) userRecord = global.fakeUsers[resolvedUserId];
  }
  
  const userId = resolvedUserId;
  
  const token = jwt.sign({ userId, role: 'voter', name: userRecord.name }, JWT_SECRET, { expiresIn: '24h' });
  const hasVoted = userRecord.hasVoted;

  setTimeout(() => { 
    res.status(200).json({ token, userId, hasVoted, name: userRecord.name });
  }, 600);
});

// Administrator Gate
router.post('/admin-login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@truevote.com' && password === 'secure123') {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
    return setTimeout(() => res.status(200).json({ token, success: true }), 1000);
  }
  return setTimeout(() => res.status(401).json({ error: 'Invalid Credentials.' }), 1200);
});

// Admin verify token helper
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
// Note: Bypasses the temporal SMS OTP because physical identity was established by Admin.
router.post('/assisted-login', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Admin terminal authorization required.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err || user.role !== 'admin') return res.status(403).json({ error: 'Forbidden.' });
    
    const { voterId } = req.body;
    
    if (!voterId) {
      return res.status(400).json({ error: 'Voter ID is required.' });
    }

    const inputId = voterId;
    let resolvedUserId = null;
    let userRecord = null;
    
    if (global.fakeUsers[inputId]) {
      resolvedUserId = inputId;
      userRecord = global.fakeUsers[inputId];
    } else {
      // Identity resolution via simulated Aadhaar
      resolvedUserId = Object.keys(global.fakeUsers).find(k => global.fakeUsers[k].aadhaarNumber === inputId);
      if (resolvedUserId) userRecord = global.fakeUsers[resolvedUserId];
    }

    if (!userRecord) {
      return res.status(404).json({ error: 'Invalid ID: Record not found.' });
    }
  
    const userId = resolvedUserId;
    const voterToken = jwt.sign({ userId, role: 'voter', assistedBy: user.userId || 'admin', name: userRecord.name }, JWT_SECRET, { expiresIn: '1h' });
    const hasVoted = userRecord.hasVoted;
  
    setTimeout(() => { 
      res.status(200).json({ token: voterToken, userId, hasVoted, name: userRecord.name });
    }, 800);
  });
});

module.exports = router;
