# 🏗️ Arquitectura de Theia Chat

## Visión General

Theia Chat es una aplicación web escalable de tres capas:

```
┌─────────────────────────────────────┐
│     Frontend (React 18)             │
│  ├── Components                     │
│  ├── Pages                          │
│  ├── Context/State Management       │
│  └── Services API                   │
└────────────┬────────────────────────┘
             │ REST API (Axios)
┌────────────▼────────────────────────┐
│     Backend (Node.js + Express)     │
│  ├── Routes & Controllers           │
│  ├── Services (Business Logic)      │
│  ├── Middleware                     │
│  ├── Validators                     │
│  └── Error Handlers                 │
└────────────┬────────────────────────┘
             │ SQL Queries (Prisma)
┌────────────▼────────────────────────┐
│  Database (PostgreSQL)              │
│  ├── Users                          │
│  ├── Chats                          │
│  ├── Messages                       │
│  ├── Projects                       │
│  ├── Settings                       │
│  └── Relationships                  │
└─────────────────────────────────────┘
```

## Frontend Architecture

### Estructura de Carpetas

```
frontend/src/
├── components/
│   ├── chat/
│   │   ├── ChatContainer.jsx
│   │   ├── ChatMessage.jsx
│   │   ├── ChatInput.jsx
│   │   ├── MessageList.jsx
│   │   └── CodeBlock.jsx
│   ├── sidebar/
│   │   ├── Sidebar.jsx
│   │   ├── ChatHistory.jsx
│   │   ├── ProjectTree.jsx
│   │   └── NewChatButton.jsx
│   ├── header/
│   │   ├── Header.jsx
│   │   ├── UserMenu.jsx
│   │   └── ModelSelector.jsx
│   ├── settings/
│   │   ├── SettingsPanel.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── ModelSettings.jsx
│   ├── modals/
│   │   ├── AuthModal.jsx
│   │   ├── ProjectModal.jsx
│   │   ├── RenameModal.jsx
│   │   └── ConfirmModal.jsx
│   └── common/
│       ├── Button.jsx
│       ├── Input.jsx
│       ├── Card.jsx
│       ├── Loading.jsx
│       └── Toast.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Profile.jsx
│   ├── Settings.jsx
│   └── NotFound.jsx
├── hooks/
│   ├── useAuth.js
│   ├── useChat.js
│   ├── useFetch.js
│   ├── useTheme.js
│   └── useLocalStorage.js
├── context/
│   ├── AuthContext.jsx
│   ├── ChatContext.jsx
│   ├── ThemeContext.jsx
│   └── SettingsContext.jsx
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── chatService.js
│   ├── projectService.js
│   ├── userService.js
│   └── aiService.js
├── utils/
│   ├── formatters.js
│   ├── validators.js
│   ├── constants.js
│   └── helpers.js
├── styles/
│   ├── globals.css
│   ├── tailwind.config.js
│   └── variables.css
└── App.jsx
```

### Estado Global (Zustand)

Estructura recomendada de stores:

```javascript
// stores/authStore.js
// - user
// - token
// - isAuthenticated
// - login()
// - logout()
// - register()

// stores/chatStore.js
// - activeChat
// - chats
// - currentMessages
// - createChat()
// - deleteChat()
// - addMessage()
// - updateChat()

// stores/projectStore.js
// - projects
// - activeProject
// - createProject()
// - deleteProject()
// - updateProject()

// stores/settingsStore.js
// - theme
// - preferences
// - updateSettings()
```

## Backend Architecture

### Estructura de Carpetas

```
backend/src/
├── config/
│   ├── database.js         # Conexión BD
│   ├── environment.js      # Variables de entorno
│   ├── groq.js            # Config Groq API
│   └── constants.js       # Constantes
├── controllers/
│   ├── authController.js
│   ├── chatController.js
│   ├── messageController.js
│   ├── projectController.js
│   ├── userController.js
│   └── aiController.js
├── middleware/
│   ├── auth.js            # JWT verification
│   ├── errorHandler.js    # Error handling
│   ├── validators.js      # Input validation
│   ├── logger.js          # Request logging
│   ├── rateLimiter.js     # Rate limiting
│   └── cors.js            # CORS setup
├── models/
│   ├── User.js
│   ├── Chat.js
│   ├── Message.js
│   ├── Project.js
│   ├── UserSettings.js
│   └── index.js
├── routes/
│   ├── auth.js
│   ├── chats.js
│   ├── messages.js
│   ├── projects.js
│   ├── users.js
│   ├── ai.js
│   └── index.js
├── services/
│   ├── authService.js
│   ├── chatService.js
│   ├── messageService.js
│   ├── projectService.js
│   ├── userService.js
│   ├── aiService.js
│   ├── tokenService.js
│   └── emailService.js
├── utils/
│   ├── logger.js
│   ├── validators.js
│   ├── responses.js
│   ├── errors.js
│   ├── helpers.js
│   └── encryption.js
├── validators/
│   ├── authValidator.js
│   ├── chatValidator.js
│   ├── messageValidator.js
│   ├── projectValidator.js
│   └── userValidator.js
└── app.js
```

### Flujo de Datos

#### Crear Chat
```
Frontend → POST /api/chats → authMiddleware → chatController 
→ chatValidator → chatService → DB → Response JSON
```

#### Enviar Mensaje
```
Frontend → POST /api/messages → authMiddleware → messageValidator 
→ messageService → aiService → Groq API → Stream Response 
→ Save DB → Frontend
```

#### Autenticación
```
Frontend (Login) → POST /api/auth/login → authValidator 
→ authService (checkPassword, generateToken) → Response (token + user) 
→ Frontend (Store token in localStorage)
```

## Base de Datos (PostgreSQL)

### Esquema Principal

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  username VARCHAR UNIQUE NOT NULL,
  avatar_url VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR NOT NULL,
  description TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Chats
CREATE TABLE chats (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  project_id UUID REFERENCES projects(id),
  title VARCHAR NOT NULL,
  model VARCHAR DEFAULT 'mixtral-8x7b-32768',
  temperature DECIMAL DEFAULT 0.7,
  max_tokens INTEGER DEFAULT 2000,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  chat_id UUID REFERENCES chats(id),
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  role ENUM('user', 'assistant') NOT NULL,
  is_edited BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User Settings
CREATE TABLE user_settings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  theme ENUM('light', 'dark') DEFAULT 'dark',
  language VARCHAR DEFAULT 'es',
  default_model VARCHAR DEFAULT 'mixtral-8x7b-32768',
  notifications BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Seguridad

### Capas de Seguridad

1. **Autenticación**: JWT tokens con expiración
2. **Autorización**: Verificación de permisos por usuario
3. **Validación**: Input validation en frontend y backend
4. **Encriptación**: Contraseñas hasheadas con bcrypt
5. **CORS**: Origen permitido configurado
6. **Rate Limiting**: Prevenir abuso de API
7. **SQL Injection**: ORM (Prisma) protection
8. **XSS**: Sanitización de contenido

## Performance

### Optimizaciones

1. **Frontend**:
   - Code splitting
   - Lazy loading de componentes
   - Caché de API con React Query
   - Virtualización de listas largas
   - Memoization de componentes

2. **Backend**:
   - Índices de base de datos
   - Caching con Redis
   - Pagination de resultados
   - Compression de responses
   - Connection pooling

## Escalabilidad

### Preparado para:

1. **Múltiples usuarios**
2. **Alta concurrencia**
3. **Múltiples regiones** (con CDN)
4. **Microservicios** (estructura modular)
5. **Webhook integrations**
6. **Queue de trabajos** (para processing asincrónico)

---

**Nota**: Esta arquitectura es profesional y escalable, preparada para crecer desde MVP hasta millones de usuarios.
