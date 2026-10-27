CREATE TABLE IF NOT EXISTS analytics_views (
 id TEXT PRIMARY KEY, visitor TEXT NOT NULL, session TEXT NOT NULL, path TEXT NOT NULL,
 device TEXT NOT NULL, day TEXT NOT NULL, hour TEXT NOT NULL, started_at INTEGER NOT NULL,
 updated_at INTEGER NOT NULL, sequence INTEGER NOT NULL, seconds INTEGER NOT NULL,
 depth INTEGER NOT NULL, clicks INTEGER NOT NULL, payload TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS analytics_day ON analytics_views(day);
CREATE INDEX IF NOT EXISTS analytics_started ON analytics_views(started_at);
