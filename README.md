# 🚀 Theia Chat - Professional AI Chat Application

**Theia Chat** es una aplicación web completa, moderna y escalable para interactuar con modelos de IA. Construida con React, Node.js y Express, ofrece una experiencia similar a ChatGPT, Claude o Gemini.

## ✨ Características Principales

### 🎨 Interfaz de Usuario
- Chat moderno estilo ChatGPT/Claude
- Diseño limpio, minimalista y profesional
- Interfaz responsive (PC, tablet, móvil)
- Tema claro/oscuro
- Animaciones suaves
- Soporte para código y markdown

### 💬 Sistema de Chats
- Múltiples conversaciones simultáneas
- Historial persistente
- Guardado automático
- Renombrar y eliminar chats
- Organización por fechas
- Búsqueda en historial

### 📁 Sistema de Proyectos
- Crear y organizar proyectos
- Múltiples chats por proyecto
- Carpetas y subcarpetas
- Vista jerárquica en sidebar

### 👤 Sistema de Cuentas
- Registro e inicio de sesión
- Autenticación JWT
- Perfil de usuario personalizable
- Avatar y preferencias
- Recuperación de contraseña

### ⚙️ Configuración Avanzada
- Selección de modelo IA
- Ajuste de temperatura
- Longitud máxima de respuesta
- Personalidad del asistente
- Preferencias de privacidad

### 🤖 Integración con IA
- Integración Groq API
- Soporte para múltiples modelos
- Streaming de respuestas
- Manejo de errores

## 📋 Requisitos Previos

- Node.js 16+
- npm o yarn
- PostgreSQL
- Groq API Key

## 🔧 Instalación

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales
npm run migrate
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

## 📁 Estructura del Proyecto

```
theia-chat/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuración
│   │   ├── controllers/       # Controladores
│   │   ├── middleware/        # Middleware
│   │   ├── models/           # Modelos de base de datos
│   │   ├── routes/           # Rutas API
│   │   ├── services/         # Lógica de negocio
│   │   ├── utils/            # Utilidades
│   │   ├── validators/       # Validadores
│   │   └── app.js            # Aplicación principal
│   ├── migrations/           # Migraciones de BD
│   ├── seeds/                # Datos semilla
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── pages/            # Páginas
│   │   ├── hooks/            # Custom hooks
│   │   ├── context/          # Context API
│   │   ├── services/         # Servicios API
│   │   ├── styles/           # Estilos globales
│   │   ├── utils/            # Utilidades
│   │   ├── App.jsx           # App principal
│   │   └── index.jsx         # Entry point
│   └── package.json
└── docs/                     # Documentación
```

## 🚀 Stack Tecnológico

### Frontend
- React 18+
- React Router v6
- Axios
- TailwindCSS
- Zustand (State Management)
- React Query

### Backend
- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Groq API

## 📚 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Inicio de sesión
- `POST /api/auth/logout` - Cierre de sesión
- `POST /api/auth/refresh` - Refrescar token

### Chats
- `GET /api/chats` - Obtener chats
- `POST /api/chats` - Crear chat
- `GET /api/chats/:id` - Obtener chat
- `PUT /api/chats/:id` - Actualizar chat
- `DELETE /api/chats/:id` - Eliminar chat

### Mensajes
- `POST /api/messages` - Enviar mensaje
- `GET /api/chats/:chatId/messages` - Obtener mensajes
- `PUT /api/messages/:id` - Regenerar respuesta

### Proyectos
- `GET /api/projects` - Obtener proyectos
- `POST /api/projects` - Crear proyecto
- `PUT /api/projects/:id` - Actualizar proyecto
- `DELETE /api/projects/:id` - Eliminar proyecto

### Usuario
- `GET /api/user/profile` - Perfil del usuario
- `PUT /api/user/profile` - Actualizar perfil
- `PUT /api/user/settings` - Actualizar configuración

## 🔐 Seguridad

- JWT Authentication
- CORS configurado
- Rate limiting
- Input validation
- SQL Injection prevention
- XSS Protection
- HTTPS ready

## 🧪 Testing

```bash
# Backend
cd backend
npm run test

# Frontend
cd frontend
npm run test
```

## 📦 Deployment

Consulta la documentación en `/docs/deployment.md` para instrucciones de deployment.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

## 📄 Licencia

MIT License

## 🙋 Soporte

Para soporte, abre un issue en el repositorio.

---

**Theia Chat** - Potenciado por Groq API ⚡
