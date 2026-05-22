import pool from '../database/pool.js';

export async function getUserById(id) {
  const { rows } = await pool.query('SELECT id, username, email, avatar, preferences, created_at FROM users WHERE id = $1', [id]);
  return rows[0];
}
