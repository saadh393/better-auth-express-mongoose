# Better Auth + Express + Mongoose Demo

A premium demonstration of integrating **Better Auth** into a modern stack featuring **Express.js**, **Mongoose**, and **Next.js**. This project serves as a reference for implementing Passkeys, Multi-session management, and secure MongoDB persistence.

---

## 🚀 The Stack

- **Backend**: Express.js (TypeScript)
- **Database**: MongoDB via Mongoose
- **Auth**: [Better Auth](https://www.better-auth.com/)
- **Frontend**: Next.js 15 (App Router) + Tailwind CSS + Framer Motion

---

## 🔌 Integrating Better Auth with Mongoose

One of the highlights of this implementation is using the **Better Auth MongoDB Adapter** alongside a standard Mongoose connection. This allows you to leverage Mongoose for your application's business logic while letting Better Auth handle authentication data efficiently.

### 1. Database Connection (`backend/src/libs/database.ts`)

Instead of creating a separate MongoDB client, we extract the native driver's client from the existing Mongoose connection. This ensures both Mongoose and Better Auth use the same connection pool.

```typescript
import mongoose from "mongoose";

// ... connection logic ...

export async function getMongoClient() {
    const conn = await connectDB();
    // Extract the native MongoDB client from Mongoose
    return conn.connection.getClient().db("your-db-name");
}
```

### 2. Better Auth Configuration (`backend/src/libs/auth.ts`)

We then pass this client to the `mongodbAdapter`. This is an asynchronous setup to ensure the database is ready before the auth instance is initialized.

```typescript
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getMongoClient } from "./database";

export default async function getAuth() {
    const client = await getMongoClient();

    return betterAuth({
        database: mongodbAdapter(client),
        emailAndPassword: { enabled: true },
        plugins: [
            passkey(),      // Passwordless & Biometrics
            multiSession()  // Concurrent device management
        ]
    });
}
```

---

## 🔐 Key Features Demonstrated

### 🔑 Passkeys (WebAuthn)
High-security, biometric authentication. Users can register their devices (TouchID, FaceID, or hardware keys) as a replacement for passwords.
- **Frontend**: Utilizes `authClient.passkey.addPasskey()` and `authClient.signIn.passkey()`.
- **Backend**: Handled by the `@better-auth/passkey` plugin.

### 📱 Multi-Session Management
Full transparency and control over active logins.
- Users can view all devices currently logged into their account.
- Each session displays browser info, IP address, and last activity.
- The "Revoke" feature allows users to force sign-out remote devices instantly.

### ⚡ Express Integration
Better Auth is mounted as a set of middleware routes in Express, making it compatible with any standard Node.js server.

---

## 🛠️ Setup Instructions

### Backend
1. `cd backend`
2. `pnpm install`
3. Create a `.env` file with `MONGO_URI`, `BETTER_AUTH_SECRET`, and `CORS_ORIGINS`.
4. `pnpm run dev`

### Frontend
1. `cd frontend`
2. `pnpm install`
3. Update `lib/auth-client.ts` with your backend URL.
4. `pnpm run dev`

---

## 🏗️ Folder Structure

- `/components/ui`: Atomic design primitives (Button, Card, Input).
- `/components/auth`: Feature-specific modules (Passkey Manager, Session List).
- `/lib`: Auth client configuration and shared utilities.
- `/app`: Next.js App Router pages.

---

*This project is for demonstration purposes. Ensure you follow production security guidelines for secret management and CORS configuration.*
