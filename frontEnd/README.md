# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Frontend (Vite + React)

Pequeña app para probar el login contra el backend.

## Variables de entorno

La app usa `VITE_API_URL` para apuntar al backend. Por defecto es `http://localhost:3000`.

Para cambiarlo, crea un archivo `.env` en `frontEnd/` con:

```
VITE_API_URL=http://localhost:3000
```

## Cómo correr

1. Backend: asegúrate de tenerlo corriendo.
	- En `backend/`, ejecuta `npm start`.
2. Frontend: en `frontEnd/`, ejecuta:
	- `npm run dev`
3. Abre `http://localhost:5173`.

## Probar Login

1. Ingresa email y contraseña de un usuario existente en tu base de datos.
2. Si el login es exitoso, verás el token y los datos del usuario; puedes cargar el perfil con el botón.

Si necesitas crear usuarios de prueba, utiliza el endpoint `POST /users/register` del backend.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
