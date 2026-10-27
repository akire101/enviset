CREATE TABLE IF NOT EXISTS support_users (username TEXT PRIMARY KEY,salt TEXT NOT NULL,hash TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS support_sessions (id TEXT PRIMARY KEY,username TEXT NOT NULL,expires_at INTEGER NOT NULL,seen_at INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS support_rooms (id TEXT PRIMARY KEY,token_hash TEXT NOT NULL,created_at INTEGER NOT NULL,updated_at INTEGER NOT NULL,status TEXT NOT NULL DEFAULT 'open',rating INTEGER,note TEXT NOT NULL DEFAULT '');
CREATE TABLE IF NOT EXISTS support_messages (seq INTEGER PRIMARY KEY AUTOINCREMENT,id TEXT UNIQUE NOT NULL,room TEXT NOT NULL,sender TEXT NOT NULL,text TEXT NOT NULL,created_at INTEGER NOT NULL,read_at INTEGER,operator TEXT);
CREATE INDEX IF NOT EXISTS support_messages_room ON support_messages(room,seq);
CREATE INDEX IF NOT EXISTS support_rooms_updated ON support_rooms(updated_at);
