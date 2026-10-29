CREATE TABLE IF NOT EXISTS article_images (
  id TEXT PRIMARY KEY NOT NULL,
  mime TEXT NOT NULL CHECK (mime IN ('image/jpeg', 'image/png', 'image/webp')),
  data BLOB NOT NULL CHECK (length(data) > 0 AND length(data) <= 768000),
  created_at INTEGER NOT NULL
);
