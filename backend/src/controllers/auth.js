import pool from '../database/pool.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';
const REFRESH_EXPIRE_DAYS = parseInt(process.env.REFRESH_EXPIRE_DAYS || '30', 10);

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
}

function generateRefreshToken() {
  return crypto.randomBytes(48).toString('hex');
}

async function saveRefreshToken(userId, token, ip = null, userAgent = null) {
  const q = 'INSERT INTO refresh_tokens (user_id, token, user_agent, ip) VALUES ($1,$2,$3,$4) RETURNING *';
  const { rows } = await pool.query(q, [userId, token, userAgent, ip]);
  return rows[0];
}

async function deleteRefreshToken(token) {
  const { rows } = await pool.query('DELETE FROM refresh_tokens WHERE token = $1 RETURNING id', [token]);
  return rows[0];
}

async function findRefreshToken(token) {
  const { rows } = await pool.query('SELECT * FROM refresh_tokens WHERE token = $1', [token]);
  return rows[0];
}

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
    const token = signToken({ userId: user.id });
    const refreshToken = generateRefreshToken();
    await saveRefreshToken(user.id, refreshToken, req.ip, req.headers['user-agent'] || null);
    return res.status(201).json({ user, token, refreshToken });
  } catch (e) {
    console.error(e);
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
    const token = signToken({ userId: user.id });
    const refreshToken = generateRefreshToken();
    await saveRefreshToken(user.id, refreshToken, req.ip, req.headers['user-agent'] || null);
    return res.json({ user: { id: user.id, username: user.username, email: user.email, avatar: user.avatar, created_at: user.created_at }, token, refreshToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error de servidor' });
  }
}

export async function refreshTokenHandler(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'refreshToken required' });
  try {
    const record = await findRefreshToken(refreshToken);
    if (!record) return res.status(401).json({ error: 'Refresh token inválido' });
    // Optionally check age
    // Issue new JWT
    const newToken = signToken({ userId: record.user_id });
    return res.json({ token: newToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Cannot refresh token' });
  }
}

export async function logoutHandler(req, res) {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'refreshToken required' });
  try {
    const deleted = await deleteRefreshToken(refreshToken);
    if (!deleted) return res.status(404).json({ error: 'Token no encontrado' });
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al cerrar sesión' });
  }
}

export async function getProfile(req, res) {
  try {
    const { userId } = req.user;
    const { rows } = await pool.query('SELECT id, username, email, avatar, preferences, created_at FROM users WHERE id = $1', [userId]);
    if (!rows[0]) return res.status(404).json({ error: 'Usuario no existe' });
    return res.json({ user: rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error al obtener perfil' });
  }
}
