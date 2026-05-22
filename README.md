# Theia Chat

**Una plataforma moderna y profesional de chat con IA, inspirada en ChatGPT, construida con React y Node.js.**

## 🚀 Características

- ✨ Interfaz elegante y minimalista tipo ChatGPT
- 🤖 Integración con API de IA (Groq)
- 💬 Múltiples conversaciones con historial persistente
- 👤 Sistema de cuentas de usuario
- 🎨 Tema claro/oscuro
- 📱 Diseño responsive (PC y móvil)
- 📁 Sistema de proyectos
- ⚙️ Configuración personalizable
- 🔐 Seguridad básica implementada

## 📁 Estructura del Proyecto

```
theia-chat/
├── backend/              # Node.js + Express
│   ├── src/
│   │   ├── config/      # Configuraciones
│   │   ├── controllers/ # Controladores
│   │   ├── models/      # Modelos de datos
│   │   ├── routes/      # Rutas API
│   │   ├── middleware/  # Middlewares
│   │   ├── services/    # Lógica de negocio
│   │   ├── utils/       # Utilidades
│   │   └── app.js       # Aplicación principal
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/            # React
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── pages/       # Páginas
│   │   ├── services/    # Servicios API
│   │   ├── hooks/       # Custom hooks
│   │   ├── context/     # Context API
│   │   ├── styles/      # Estilos globales
│   │   ├── utils/       # Utilidades
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
└── docker-compose.yml
```

## 🛠️ Tecnologías

### Frontend
- React 18+
- Vite
- TailwindCSS
- Zustand (State Management)
- Axios

### Backend
- Node.js
- Express
- Groq API
- Dotenv
- Cors

## 📋 Requisitos Previos

- Node.js v18+
- npm o yarn
- Clave de API de Groq

## 🚀 Instalación y Configuración

Ver `backend/README.md` y `frontend/README.md`

## 📝 Licencia

MIT
