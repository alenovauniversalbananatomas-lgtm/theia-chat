// Server Configuration
export const serverConfig = {
  port: process.env.PORT || 5000,
  host: process.env.HOST || 'localhost',
  nodeEnv: process.env.NODE_ENV || 'development',
  isDevelopment: (process.env.NODE_ENV || 'development') === 'development',
  isProduction: (process.env.NODE_ENV || 'development') === 'production',
};

// JWT Configuration
export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'default-secret-key-change-in-production',
  expiresIn: process.env.JWT_EXPIRE || '7d',
};

// Groq API Configuration
export const groqConfig = {
  apiKey: process.env.GROQ_API_KEY,
  model: process.env.GROQ_MODEL || 'mixtral-8x7b-32768',
  baseUrl: 'https://api.groq.com/openai/v1',
};

// CORS Configuration
export const corsConfig = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Rate Limit Configuration
export const rateLimitConfig = {
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
};
