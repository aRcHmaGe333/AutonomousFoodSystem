-- TimescaleDB / PostgreSQL schema (minimal) for telemetry ingestion

CREATE TABLE telemetry_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  module_id TEXT,
  sensor TEXT,
  value DOUBLE PRECISION,
  unit TEXT,
  quality_flag TEXT,
  meta JSONB,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Hypertable for TimescaleDB
-- SELECT create_hypertable('telemetry_events', 'recorded_at');

-- Retention policy: keep raw events 90 days, aggregated metrics longer
-- SELECT add_retention_policy('telemetry_events', INTERVAL '90 days');

CREATE TABLE telemetry_aggregates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  module_id TEXT,
  day DATE NOT NULL,
  value DOUBLE PRECISION,
  meta JSONB
);

-- Indexes
CREATE INDEX idx_telemetry_sensor_time ON telemetry_events(sensor, recorded_at DESC);
CREATE INDEX idx_telemetry_module_time ON telemetry_events(module_id, recorded_at DESC);
