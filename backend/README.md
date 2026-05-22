# Theia Chat - Backend

Backend profesional con Node.js y Express para Theia Chat.

## 🚀 Inicio Rápido

### 1. Instalación

```bash
cd backend
npm install
```

### 2. Configuración de Variables de Entorno

```bash
cp .env.example .env
```

Edita `.env` y añade tu clave de API de Groq.

### 3. Ejecutar en Desarrollo

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

## 📁 Estructura de Directorios

```
src/
├── config/          # Configuraciones
├── controllers/      # Controladores (lógica de rutas)
├── models/          # Modelos de datos
├── routes/          # Definición de rutas
├── middleware/      # Middlewares personalizados
├── services/        # Lógica de negocio
├── utils/           # Utilidades
├── database/        # Configuración de BD
└── app.js           # Aplicación principal
```

## 🔐 Seguridad

- JWT para autenticación
- Validación de entrada
- Rate limiting
- CORS configurado
- Helmet para headers de seguridad

## 📚 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `POST /api/auth/refresh` - Renovar token

### Chats
- `GET /api/chats` - Obtener todos los chats
- `POST /api/chats` - Crear nuevo chat
- `GET /api/chats/:id` - Obtener un chat específico
- `PUT /api/chats/:id` - Actualizar chat
- `DELETE /api/chats/:id` - Eliminar chat

### Mensajes
- `GET /api/chats/:chatId/messages` - Obtener mensajes
- `POST /api/chats/:chatId/messages` - Enviar mensaje
- `DELETE /api/chats/:chatId/messages/:id` - Eliminar mensaje

### Proyectos
- `GET /api/projects` - Obtener todos los proyectos
- `POST /api/projects` - Crear nuevo proyecto
- `PUT /api/projects/:id` - Actualizar proyecto
- `DELETE /api/projects/:id` - Eliminar proyecto

### Usuario
- `GET /api/user/profile` - Obtener perfil de usuario
- `PUT /api/user/profile` - Actualizar perfil
- `PUT /api/user/settings` - Actualizar configuración

## 🗄️ Base de Datos

PostgreSQL 15+

## 🔑 Variables de Entorno Principales

- `GROQ_API_KEY` - Tu clave de API de Groq
- `JWT_SECRET` - Clave secreta para JWT
- `DB_URL` - URL de conexión a PostgreSQL
- `FRONTEND_URL` - URL del frontend para CORS
