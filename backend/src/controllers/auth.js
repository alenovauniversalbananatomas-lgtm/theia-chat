import pool from '../database/pool.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

export async function registerUser(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos requeridos' });
  }
  try {
    const found = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
    if (found.rows.length > 0) return res.status(409).json({ error: 'Email ya registrado' });
    const hash = await bcryptjs.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1,$2,$3) RETURNING id,username,email,avatar,created_at',
      [username, email, hash]
    );
    const user = result.rows[0];
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
    return res.status(201).json({ user, token });
  } catch (e) {
    return res.status(500).json({ error: 'Error de servidor' });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Faltan campos' });
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'Usuario o clave incorrecta' });
    const valid = await bcryptjs.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Usuario o clave incorrecta' });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
    return res.json({ user: {
      id: user.id, username: user.username, email: user.email, avatar: user.avatar, created_at: user.created_at }, token });
  } catch(err) {
    return res.status(500).json({ error: 'Error de servidor' });
  }
}

export async function getProfile(req, res) {
  try {
    const { userId } = req.user;
    const { rows } = await pool.query('SELECT id, username, email, avatar, preferences, created_at FROM users WHERE id = $1', [userId]);
    if (!rows[0]) return res.status(404).json({ error: 'Usuario no existe' });
    return res.json({ user: rows[0] });
  } catch {
    return res.status(500).json({ error: 'Error al obtener perfil' });
  }
}
