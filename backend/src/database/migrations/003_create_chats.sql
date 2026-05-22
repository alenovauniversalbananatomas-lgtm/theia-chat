CREATE TABLE IF NOT EXISTS chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title VARCHAR(64) DEFAULT 'New Chat',
  model VARCHAR(128) DEFAULT 'mixtral-8x7b-32768',
  temperature REAL DEFAULT 0.7,
  max_tokens INTEGER DEFAULT 2048,
  system_prompt TEXT DEFAULT 'You are a helpful AI assistant.',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
