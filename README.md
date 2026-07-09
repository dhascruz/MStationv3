# Mortgage Station / Kuya Jerry Platform

Monorepo scaffold: Next.js (frontend) + NestJS (backend) + PostgreSQL (via Prisma).

## Structure

```
mstation/
  frontend/   Next.js 14 (App Router) + TypeScript + Tailwind CSS
  backend/    NestJS + Prisma + PostgreSQL
  docker-compose.yml   Optional: containerized Postgres, if you'd rather not install it locally
```

## Prerequisites

- Node.js 18+
- npm
- A local PostgreSQL installation (PostgreSQL 14+ recommended)

## 1. Set up PostgreSQL locally

Make sure PostgreSQL is installed and running on your machine.

- macOS (Homebrew): brew install postgresql@16 && brew services start postgresql@16
- Windows: install via the official installer at https://www.postgresql.org/download/windows/ (this also starts the service automatically)
- Linux (Debian/Ubuntu): sudo apt install postgresql && sudo service postgresql start

Then create the database used by this project:

```bash
# Using createdb
createdb mstationv2

# Or via psql
psql -U postgres -c "CREATE DATABASE mstationv2;"
```

If your local Postgres user/password differ from the defaults (postgres / postgres), update DATABASE_URL in backend/.env accordingly, for example:

```
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/mstationv2?schema=public"
```

Prefer not to install Postgres locally? Run "docker compose up -d" from the project root instead - it spins up a matching Postgres instance on the same port.

## 2. Backend setup

```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed        # creates demo@mortgagestation.com / Password123!
npm run start:dev   # http://localhost:4000
```

## 3. Frontend setup

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev          # http://localhost:3005
```

Visit http://localhost:3005 and log in with the seeded demo account
(demo@mortgagestation.com / Password123!), or register a new user via
POST /auth/register on the backend.

## What's included

- Login page (/login): email/password form with validation (Zod + React Hook Form), calls POST /auth/login, stores JWT + user in cookies.
- Dashboard (/dashboard): protected route (via middleware.ts), sidebar navigation, topbar with search/notifications/profile menu, footer, stat cards, and a profile page (/dashboard/profile).
- Backend: NestJS with auth (JWT login/register), users, and prisma modules. Passwords hashed with bcryptjs.
- Theme: Tailwind CSS with a navy/blue "brand" palette, shadcn-style UI primitives (Button, Input, Label, Card).

## Notes

- Backend auth currently issues a single JWT access token (1 day expiry). Refresh tokens, MFA, Google/Apple sign-in are noted in the original tech plan as follow-up work.
- npx prisma generate and prisma migrate need network access to download Prisma's query engine binaries the first time you run them. If your machine sits behind a restrictive proxy/firewall, allow outbound access to binaries.prisma.sh.
"# Mstationv2" 
