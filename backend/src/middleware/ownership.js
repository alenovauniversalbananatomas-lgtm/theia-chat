import pool from '../database/pool.js';

export async function ensureProjectOwner(req, res, next) {
  const userId = req.user && req.user.userId;
  const projectId = req.params.id || req.params.projectId;
  if (!userId || !projectId) return res.status(400).json({ error: 'Missing project or user' });
  try {
    const { rows } = await pool.query('SELECT id, user_id FROM projects WHERE id = $1', [projectId]);
    const project = rows[0];
    if (!project) return res.status(404).json({ error: 'Project not found' });
    if (project.user_id !== userId) return res.status(403).json({ error: 'No tienes permisos para acceder a este proyecto' });
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'DB error validating ownership' });
  }
}

export async function ensureChatOwner(req, res, next) {
  const userId = req.user && req.user.userId;
  const chatId = req.params.id || req.params.chatId;
  if (!userId || !chatId) return res.status(400).json({ error: 'Missing chat or user' });
  try {
    const { rows } = await pool.query(
      `SELECT c.id, p.user_id FROM chats c JOIN projects p ON c.project_id = p.id WHERE c.id = $1`,
      [chatId]
    );
    const rec = rows[0];
    if (!rec) return res.status(404).json({ error: 'Chat not found' });
    if (rec.user_id !== userId) return res.status(403).json({ error: 'No tienes permisos para acceder a este chat' });
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'DB error validating ownership' });
  }
}
