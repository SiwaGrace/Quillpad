# 🪶 Quillpad — Vision & Personal Growth App

Quillpad is a full-stack web application that helps users clarify their vision, journal regularly, and track personal growth over time. It combines journaling, goal-setting, and simple analytics in a focused, privacy-first interface.

---

**Status:** In development

**Author:** Grace Esime Djobokou (SiwaGrace)

---

**Tech stack**

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- State & HTTP: Redux Toolkit, Axios
- Auth: JWT, cookie-based session
- Email: Brevo (Transactional emails)

## Key Features

- Journaling: create, edit, delete, search and filter personal entries
- Vision & sub-visions: capture long-term vision items and smaller sub-visions
- Authentication: register/login with JWT, secure cookie storage
- Dashboard: quick overview of recent items and quick actions
- Email: welcome and password-reset workflows via Brevo

## Repository layout (short)

- `backend/` — Express API, controllers, models, routes
- `frontend/` — React + Vite app, components, pages
- `data/` — seed/static data (visions.json)
- `README.md` — this file

## Prerequisites

- Node.js >= 20.x (project `engines` specifies >=20)
- Yarn (recommended) or npm
- MongoDB instance (local or hosted)

## Environment variables

Create a `.env` file for the backend (`/backend/.env`) with at least:

```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=you@yourdomain.com
FRONTEND_URL=http://localhost:5173
```

Frontend environment (`/frontend/.env` or `Vite` env) examples:

```
VITE_API_URL=http://localhost:4000/api
VITE_ENV=development
```

Notes:

- The backend defaults to port `4000` (see `backend/index.js`). Update `VITE_API_URL` if you change backend port.
- `FRONTEND_URL` is used when building email links (password reset, etc.).

## Installation & Run (local development)

From the repository root you can run both server and client concurrently (root scripts use `concurrently`):

```bash
yarn install
yarn dev
```

Or run each part separately:

Backend:

```bash
cd backend
yarn install
yarn dev    # starts nodemon (dev)
# or yarn start for production (node index.js)
```

Frontend:

```bash
cd frontend
yarn install
yarn dev    # starts Vite dev server (default 5173)
```

## Scripts

- Root: `yarn dev` runs server + client concurrently
- Backend: `yarn dev` (nodemon), `yarn start` (node)
- Frontend: `yarn dev` (vite), `yarn build`, `yarn preview`

## API Overview

Base path: `/api`

- Auth: `/api/auth`
  - `POST /register` — register new user
  - `POST /login` — login (returns token, sets cookie)
  - `POST /logout` — clear auth cookie
  - `GET /me` — get current user (requires auth)
  - `POST /forgot-password` — request password reset (sends email)
  - `POST /reset-password/:token` — reset password

- Visions: `/api/visions` — vision and sub-vision routes
- Journals: `/api/journals` — CRUD for journal entries
- Quotes & Scriptures: `/api/*` (see `backend/routes` for exact endpoints)

For detailed request/response formats, consult the controllers in `backend/controllers/` and route files in `backend/routes/`.

## Authentication & Cookies

- Authentication uses JWT tokens signed with `JWT_SECRET` and is sent as an `httpOnly` cookie named `token`.
- In development the frontend reads token from API responses; production deployments should run over HTTPS and set `secure: true` on cookies.

## Emails

- Emails are sent using Brevo (see `backend/utils/brevoEmail.js`). Provide `BREVO_API_KEY` and `BREVO_SENDER_EMAIL` in backend `.env`.

## Tests & Linting

- Frontend tests use `vitest` (`yarn test` in `/frontend`).
- ESLint is configured in the frontend (`yarn lint`).

## Deployment notes

- Frontend can be deployed on Vercel or Netlify; update `VITE_API_URL` to your production API base.
- Backend can be deployed to any Node host (Heroku, Railway, Fly, DigitalOcean). Ensure you set environment variables (MONGO*URI, JWT_SECRET, BREVO*\*).
- If deploying frontend to Vercel, add the production origin to `backend/index.js` CORS allowedOrigins or switch to a more flexible CORS policy for production.

## Roadmap / TODO

- Calendar & activity stats
- Mood & emotion tracking
- Export entries (PDF)
- Public/private vision modes
- Dedicated goals & habits module

## Contributing

- Open an issue to discuss larger changes.
- Fork, create a feature branch, and submit a PR with tests where applicable.

## License

This project is licensed under MIT. See `LICENSE` if present.

---

If you want, I can:

- add a `CONTRIBUTING.md` and `LICENSE` file,
- generate API docs (OpenAPI) from route/controller signatures,
- or open a PR that replaces this README with the file above. Which would you like me to do?
