const express = require('express');
const router = express.Router();
const { processEventBatch } = require('../controllers/personalize');

router.post('/', async (req, res) => {
  try {
    const { sessionId, events } = req.body;
    
    if (!sessionId || !events || !Array.isArray(events)) {
      return res.status(400).json({ error: 'Malformed payload' });
    }

    // Process events and asynchronously push UI changes if threshold met
    processEventBatch(sessionId, events, req.app.get('io'));

    return res.status(200).json({ success: true, processed: events.length });
  } catch (err) {
    console.error('Ingestion Error:', err);
    res.status(500).json({ error: 'Server error during ingestion' });
  }
});

module.exports = router;
