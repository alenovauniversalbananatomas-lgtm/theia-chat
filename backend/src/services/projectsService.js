import pool from '../database/pool.js';

export async function getProjectById(id) {
  const { rows } = await pool.query('SELECT * FROM projects WHERE id = $1', [id]);
  return rows[0];
}

// keep existing exported functions (createProject, getProjectsByUser, ...)
export async function createProject(userId, name, description = '', color = '#3B82F6') {
  const { rows } = await pool.query(
    `INSERT INTO projects (user_id, name, description, color) VALUES ($1,$2,$3,$4) RETURNING *`,
    [userId, name, description, color]
  );
  return rows[0];
}

export async function getProjectsByUser(userId) {
  const { rows } = await pool.query('SELECT * FROM projects WHERE user_id = $1 ORDER BY updated_at DESC', [userId]);
  return rows;
}

export async function updateProject(id, userId, fields = {}) {
  const allowed = ['name', 'description', 'color'];
  const sets = [];
  const values = [];
  let idx = 1;
  for (const [k, v] of Object.entries(fields)) {
    if (!allowed.includes(k)) continue;
    sets.push(`${k} = $${idx}`);
    values.push(v);
    idx++;
  }
  if (sets.length === 0) return null;
  values.push(id, userId);
  const q = `UPDATE projects SET ${sets.join(',')}, updated_at = now() WHERE id = $${idx} AND user_id = $${idx+1} RETURNING *`;
  const { rows } = await pool.query(q, values);
  return rows[0];
}

export async function deleteProject(id, userId) {
  const { rows } = await pool.query('DELETE FROM projects WHERE id = $1 AND user_id = $2 RETURNING id', [id, userId]);
  return rows[0];
}
