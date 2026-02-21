# Telemetry Ingestion Service — Spec

This document describes a minimal telemetry ingestion service to collect, validate, and store events from AgroBotGrid pods for KPI computation and real?time monitoring.

Goals
- Simple REST endpoint(s) for time?series events
- Schema validation and quality flags
- Buffering and bulk insert to the timeseries store
- Derived daily aggregates computed asynchronously

API

POST /api/telemetry/events
- Accepts an array of event objects
- Returns 202 Accepted with a processing id

Event schema (JSON Schema simplified)
```
{
  "type": "object",
  "required": ["type","timestamp"],
  "properties": {
    "type": {"type":"string"},
    "timestamp": {"type":"string","format":"date-time"},
    "payload": {"type":"object"}
  }
}
```

Standard event types
- sensor_reading
- dosing_event
- energy_sample
- robot_event
- waste_event
- workorder

Storage
- Raw events persisted in a time?series friendly table (Postgres + timescaledb or InfluxDB)
- Daily aggregates stored in a summary table for dashboard queries

Validation
- Basic schema validation; quality_flag set when heuristics detect anomalies
- Duplicate suppression by event id where available

Processing
- Bulk writers for performance
- Async job to compute daily KPIs from raw events
- Alerting hooks for KPI thresholds

Security
- API key or mTLS for pods
- Rate limiting per pod

Notes
- This is intentionally minimal; expand with full JSON Schema and storage options during implementation.
