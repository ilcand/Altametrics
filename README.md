Altametrics Full Stack Technical Assessment
This project is a full-stack web application built as part of a technical assessment for Altametrics.

It includes the following technologies:

• Backend: NestJS, Prisma ORM, PostgreSQL (Dockerized)

• Frontend: Vite + React + TypeScript, Redux Toolkit, React Query, TailwindCSS

• Authentication: JWT-based with Passport.js

• Validation: Zod on frontend and backend

• Testing: Playwright

1. Quick Start
Clone the repository
git clone https://github.com/ilcand/Altametrics.git
cd Altametrics

2. Backend Setup (/server)
Install dependencies
cd server
npm install

3. Set up Docker PostgreSQL
docker-compose up -d

4. Setup Database Schema and Seed Data
Run migrations:
npm run prisma:migrate
Seed the database:
npm run seed

!!! The demo login credentials are: !!!

Email: user@example.com

Password: password123

5. Start Backend Server (NestJS)
npm run start:dev
Runs the NestJS backend server at http://localhost:3000

6. Install Frontend Dependencies
cd ../client
npm install

7. Start Frontend Client (React + Vite)
npm run dev
Runs the React frontend at http://localhost:5173

Features
- Authentication: JWT-based login.

- Invoices:

  /invoices to list all invoices.

  /invoices/:id to fetch a specific invoice (modal display).

- Protected Routes with Redux authentication state.

- Seeding for initial users and invoice data.

- React Query for efficient data fetching.

- TailwindCSS for fast UI development.

- Dockerized PostgreSQL for easy database setup.

Notes
 - Make sure that nothing else is using port 5432 on your machine before running docker-compose up -d.

 - If another Postgres server (like from pgAdmin) is running, you must stop it to avoid conflicts.

 - The project uses .env files for configuration (make sure DATABASE_URL is set correctly in server/.env).
