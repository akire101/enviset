CREATE TABLE IF NOT EXISTS post_order (id INTEGER PRIMARY KEY CHECK(id=1),value TEXT NOT NULL,revision INTEGER NOT NULL DEFAULT 0);
INSERT OR IGNORE INTO post_order(id,value,revision) VALUES(1,'{"order":[],"pinned":[]}',0);
CREATE TABLE IF NOT EXISTS message_resolutions (id TEXT PRIMARY KEY,resolved_at INTEGER NOT NULL);
