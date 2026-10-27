CREATE TABLE IF NOT EXISTS support_settings (id INTEGER PRIMARY KEY,override_until INTEGER NOT NULL DEFAULT 0);
INSERT OR IGNORE INTO support_settings(id,override_until) VALUES(1,0);
CREATE TABLE IF NOT EXISTS support_presence (username TEXT PRIMARY KEY,last_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS support_online_days (username TEXT NOT NULL,day TEXT NOT NULL,milliseconds INTEGER NOT NULL DEFAULT 0,PRIMARY KEY(username,day));
CREATE TABLE IF NOT EXISTS support_reviews (room TEXT NOT NULL,operator TEXT NOT NULL,rating INTEGER NOT NULL,note TEXT NOT NULL,PRIMARY KEY(room,operator));
