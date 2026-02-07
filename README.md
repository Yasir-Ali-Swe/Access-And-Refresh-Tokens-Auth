# MERN Auth with Access & Refresh Tokens 🔐

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb)](https://www.mongodb.com/)

> Open-source MERN authentication template featuring **JWT access & refresh tokens**, **email verification**, **protected routes**, and **automatic session restoration**.  
> Perfect for learning or using in your own projects.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Register & Email Verification** – Users must verify email via token  
- **Login with JWT** – Access token (short-lived) + refresh token (HTTP-only cookie)  
- **Automatic Token Refresh** – Axios interceptors handle expired access tokens  
- **Protected Routes & Dashboard** – Only authenticated users can access  
- **Logout** – Clears session & tokens  
- **Frontend State Management** – Redux Toolkit + TanStack Query  
- **Global Toast Notifications** – For login, logout, register, email verification  
- **Responsive UI** – Tailwind CSS + custom components

---

## Technologies Used

| Layer           | Technology / Library                  |
|-----------------|--------------------------------------|
| Frontend        | React, React Router DOM, Tailwind CSS|
| State Management| Redux Toolkit, React-Redux            |
| Server State    | TanStack Query (React Query)          |
| HTTP Requests   | Axios, Axios Interceptors             |
| Auth & Tokens   | JWT (access & refresh tokens)         |
| UI Components   | Tailwind UI, Lucide Icons, Sonner Toast|
| Backend         | Node.js, Express, MongoDB             |
| Environment     | Vite, dotenv                          |

---

## How It Works

1. **Register**  
   - User submits name, email, password, and role  
   - Backend sends a verification token via email  
   - User clicks `/verify-email/:token` to verify

2. **Login**  
   - Returns **access token** in response + **refresh token** in HTTP-only cookie  
   - Access token stored in Redux for API calls  
   - Refresh token automatically refreshes access tokens if expired

3. **Dashboard / Protected Routes**  
   - Uses `ProtectedRoute` component  
   - Axios interceptors auto-refresh expired tokens  
   - Redux stores user and access token

4. **Logout**  
   - Calls `/auth/logout`  
   - Clears Redux state and refresh token cookie  
   - Shows toast notification  

5. **Page Refresh Handling**  
   - `useAuth` hook runs on app load  
   - Calls `/auth/refresh` to restore session  
   - Loads user info automatically

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Yasir-Ali-Swe/Access-And-Refresh-Tokens-Auth.git

cd frontend
npm install

cd backend
npm install

PORT=3000
MONGO_URI=mongodb://localhost:27017/mern-auth
JWT_ACCESS_SECRET=your-access-token-secret
JWT_REFRESH_SECRET=your-refresh-token-secret
EMAIL_USER=your-email
EMAIL_PASS=your-email-password
CLIENT_URL=http://localhost:5173

cd backend
npm run dev

cd frontend
npm run dev

mern-auth-jwt/
 ├─ frontend/
 │   ├─ src/
 │   │   ├─ components/       # UI components & spinner
 │   │   ├─ features/auth/    # Redux slice, API functions, hooks
 │   │   ├─ lib/              # Axios instance with interceptors
 │   │   ├─ pages/            # Login, Register, Dashboard, VerifyEmail
 │   │   └─ store/            # Redux store
 │   └─ vite.config.js         # Vite config
 ├─ backend/
 │   ├─ controllers/          # Auth logic (register, login, verify, logout)
 │   ├─ models/               # User & token schemas
 │   ├─ routes/               # Auth routes
 │   └─ server.js             # Express server entry
 └─ README.md


