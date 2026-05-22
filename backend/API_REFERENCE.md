# Theia Chat Backend - API Reference

This file contains a short reference of key endpoints for development.

Authentication
- POST /api/auth/register
  - body: { username, email, password }
  - returns: { user, token, refreshToken }

- POST /api/auth/login
  - body: { email, password }
  - returns: { user, token, refreshToken }

- POST /api/auth/refresh
  - body: { refreshToken }
  - returns: { token }

- POST /api/auth/logout
  - body: { refreshToken }
  - returns: { success }

User
- GET /api/auth/profile (auth required)
- PUT /api/user/profile (auth required)
  - body: { username?, avatar?, preferences? }

Projects
- GET /api/projects (auth required)
- POST /api/projects (auth required)
- PUT /api/projects/:id
- DELETE /api/projects/:id

Chats
- POST /api/projects/:id/chats
- GET /api/projects/:id/chats
- GET /api/projects/chat/:id
- PUT /api/projects/chat/:id
- DELETE /api/projects/chat/:id

Messages
- GET /api/:chatId/messages
- POST /api/:chatId/messages
  - body: { content, temperature?, max_tokens?, model? }
