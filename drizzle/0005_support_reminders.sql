CREATE TABLE IF NOT EXISTS support_preferences (
  id INTEGER PRIMARY KEY,
  reminder_seconds INTEGER NOT NULL DEFAULT 30
);
INSERT OR IGNORE INTO support_preferences(id,reminder_seconds) VALUES(1,30);
