// Minimal example controller for telemetry ingestion (Express.js)

const express = require('express');
const router = express.Router();

// Simple in-memory queue for demo; replace with DB writer
const queue = [];

router.post('/events', (req, res) => {
  const events = req.body;
  if (!Array.isArray(events)) return res.status(400).send({ error: 'Expected array' });
  // basic validation
  for (const e of events) {
    if (!e.type || !e.timestamp) return res.status(400).send({ error: 'Missing fields' });
  }
  // enqueue
  queue.push(...events);
  res.status(202).send({ accepted: events.length, queueLength: queue.length });
});

module.exports = router;
