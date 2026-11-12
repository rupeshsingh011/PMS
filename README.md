# PMS (Printer Management System)

A full-stack Printer Management System with Admin and Client portals built with React, Vite, Tailwind CSS, Express, and MongoDB. The project is structured with decoupled `frontend/` and `backend/` directories for independent development and deployment (e.g., Vercel for `frontend/` and Render/Railway for `backend/`).

## Project Structure

```text
PMS/
├── frontend/                   # React + Vite + Tailwind CSS client (Vercel-ready)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Bundled images/SVGs
│   │   ├── components/
│   │   │   ├── common/         # Reusable UI components (DataTable, Modal, PageHeader)
│   │   │   └── layouts/        # Portal layouts (AdminLayout, ClientLayout)
│   │   ├── config/             # API URL configuration (VITE_API_URL)
│   │   ├── features/           # Feature-based UI modules
│   │   │   ├── auth/           # LoginPage, LoginForm
│   │   │   ├── admin/          # dashboard, accounts, clients, management, notifications, printers, reports, sales, settings, support
│   │   │   └── client/         # Client portal views
│   │   ├── routes/             # Centralized React Router configuration
│   │   ├── services/           # API & auth business logic (authService)
│   │   └── utils/              # Storage & helper utilities
│   ├── .env.example
│   ├── vercel.json             # SPA rewrite rules for Vercel
│   └── vite.config.js          # Vite config with /api proxy for local dev
├── backend/                    # Express 5 + Mongoose API server
│   ├── src/
│   │   ├── config/             # Env & MongoDB connection (env.js, db.js)
│   │   ├── controllers/        # HTTP route controllers
│   │   ├── middlewares/        # Validation & centralized error handling
│   │   ├── models/             # Mongoose schemas (User.js)
│   │   ├── routes/             # API routers (/api/health, /api/auth)
│   │   ├── services/           # Business logic (authService.js)
│   │   └── app.js              # Express app setup (CORS, JSON, routes, errors)
│   ├── .env.example
│   └── server.js               # Server entry point
├── database/                   # MongoDB schema documentation
├── .env.example                # Consolidated environment variable reference
├── .gitignore
└── package.json                # Root orchestration scripts
```

## Getting Started

### 1. Install Dependencies

```bash
npm run install:all
```

### 2. Configure Environment Variables

- Copy `backend/.env.example` to `backend/.env` and set `PORT`, `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URL`.
- *(Optional for local dev)* Copy `frontend/.env.example` to `frontend/.env`. When `VITE_API_URL` is unset locally, Vite proxies `/api` requests to `http://localhost:5000`.

### 3. Run the Application

Start both `frontend/` and `backend/` together from the root:

```bash
npm run dev
```

Or run them individually:

```bash
npm run frontend
npm run backend
```

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Run both frontend and backend in parallel |
| `npm run frontend` | Start the Vite frontend dev server |
| `npm run backend` | Start the Express backend server (`node --watch`) |
| `npm run build` | Build the frontend production bundle (`frontend/dist/`) |
| `npm run lint` | Run `oxlint` across `frontend/` |
| `npm run preview` | Preview the frontend production build locally |
| `npm run install:all` | Install dependencies for both `frontend/` and `backend/` |

## Deployment

- **Frontend (Vercel)**: Set Root Directory to `frontend`, Build Command to `npm run build`, Output Directory to `dist`, and add `VITE_API_URL` pointing to your deployed backend URL. `frontend/vercel.json` handles SPA routing.
- **Backend (Render / Railway / Fly.io / VPS)**: Set Root Directory to `backend`, Build Command to `npm install`, Start Command to `npm start`, and configure `NODE_ENV=production`, `PORT`, `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URL`.

## Demo Credentials & API

- **Demo Admin**: `admin` / `password123`
- **Demo Client**: `client` / `password123`
- **Health Check**: `GET /api/health`
- **Login**: `POST /api/auth/login`
