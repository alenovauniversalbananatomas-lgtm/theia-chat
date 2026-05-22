// Database Configuration
// This is a placeholder for database connection setup
// In production, implement with proper connection pooling

export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'theia',
  password: process.env.DB_PASSWORD || 'theia_dev_password',
  database: process.env.DB_NAME || 'theia_chat',
};

export const connectionString = process.env.DB_URL || 
  `postgresql://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`;
