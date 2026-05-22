import pool from '../database/pool.js';

export async function updateProfile(req, res) {
  const { userId } = req.user;
  const { username, avatar, preferences } = req.body;
  const sets = [];
  const values = [];
  let idx = 1;
  if (username) { sets.push(`username = $${idx}`); values.push(username); idx++; }
  if (avatar) { sets.push(`avatar = $${idx}`); values.push(avatar); idx++; }
  if (preferences) { sets.push(`preferences = $${idx}`); values.push(JSON.stringify(preferences)); idx++; }
  if (sets.length === 0) return res.status(400).json({ error: 'No fields to update' });
  values.push(userId);
  const q = `UPDATE users SET ${sets.join(',')}, updated_at = now() WHERE id = $${idx} RETURNING id, username, email, avatar, preferences, created_at`;
  try {
    const { rows } = await pool.query(q, values);
    return res.json({ user: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Could not update profile' });
  }
}
