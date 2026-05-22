# Theia Chat Frontend

Frontend profesional en React 18+, Vite y TailwindCSS para Theia Chat.

## Inicio Rápido

1. Instala dependencias:

```bash
cd frontend
npm install
```

2. Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

3. Configura la URL de la API:
- `VITE_API_URL` (ejemplo: http://localhost:5000)

4. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

La app correrá en `http://localhost:3000`

## Seguridad y variables de entorno
- No guardes secretos ni claves aquí.
- Solo usa un VITE_API_URL confiable.

## Estructura del proyecto

- `src/components/` - UI y componentes reutilizables
- `src/pages/` - Páginas principales
- `src/context/` - React Context API (auth, settings)
- `src/services/` - API y lógica de datos
- `src/hooks/` - Custom hooks
- `src/styles/` - Tailwind config y globales

---
MIT
