# 🚀 TypeScript + Express Boilerplate

A **scalable, linted, and production-ready Express.js boilerplate** built with **TypeScript**.  
Designed to **bootstrap your dream projects** quickly — with sensible defaults, clear structure, and modern developer tooling.

---

## ✨ Features

- ⚡ **TypeScript Ready** — type-safe from day one
- 🧩 **Express 5** — minimal yet powerful routing
- 🧠 **Clean Architecture** — organized by configs, controllers, middlewares, services, and utils
- 🔄 **Hot Reloading** with `nodemon` + `ts-node`
- 🧹 **Linting & Formatting** — ESLint 9 (Flat Config) + Prettier
- 🧰 **Environment Config** with `dotenv` and Zod validation
- 🛡️ **Security Middleware** — Helmet, CORS, Cookie-Parser
- 🪵 **Logging** via Morgan
- 🐳 **Docker Ready** — simple `Dockerfile` for containerization

---

## 📁 Project Structure

```
/src
├── app.ts                     # Express app setup
├── index.ts                   # Entry point
├── configs/                   # Config & environment utilities
│   ├── envs-config.ts
│   ├── cors-config.ts
│   └── _index.ts
├── controllers/               # Request handlers
│   └── _index.ts
├── middlewares/               # Global error & 404 handling
│   ├── errorhandle-middleware.ts
│   ├── notfound-middleware.ts
│   └── _index.ts
├── routes/                    # Route definitions
│   └── _index.ts
├── services/                  # Business logic layer
│   └── _index.ts
├── libs/                      # Third-party integrations
│   └── _index.ts
└── utils/                     # Helpers, custom errors
└── api-error.ts

```

## 🧑‍💻 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/saadh393/express-typescript-boilerplate.git
cd express-typescript-boilerplate
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

This starts the app using **ts-node** with live reloading from **nodemon**.

### 4️⃣ Build for Production

```bash
npm run build
npm start
```

---

## 🧠 Linting & Formatting

### Check Lint

```bash
npm run lint
```

### Auto-fix Issues

```bash
npm run lint:fix
```

### Format Code

```bash
npm run format
```

All linting is configured via **Flat Config** (`eslint.config.js`) for ESLint v9+, ensuring top-tier TypeScript support and Prettier integration.

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

All env values are validated via **Zod** in `envs-config.ts`.

---

## 🐳 Docker Support

Build and run with Docker:

```bash
docker build -t express-typescript-boilerplate .
docker run -p 4000:4000 express-typescript-boilerplate
```

---

## 🧭 Scripts Overview

| Script     | Description                                   |
| ---------- | --------------------------------------------- |
| `dev`      | Run development server with nodemon + ts-node |
| `build`    | Compile TypeScript to JavaScript              |
| `start`    | Run compiled JS from `dist`                   |
| `lint`     | Run ESLint check                              |
| `lint:fix` | Fix ESLint issues automatically               |
| `format`   | Format all files using Prettier               |

---

## 🧩 Tech Stack

- **Node.js** 20+
- **Express** 5.x
- **TypeScript** 5.9+
- **ESLint 9 + Prettier 3**
- **Zod**, **dotenv**, **helmet**, **cors**, **morgan**, **cookie-parser**

---

## 🧠 Suggested Aliases (Optional)

You can define path aliases in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@configs/*": ["configs/*"],
      "@controllers/*": ["controllers/*"],
      "@middlewares/*": ["middlewares/*"],
      "@services/*": ["services/*"],
      "@utils/*": ["utils/*"]
    }
  }
}
```

and load them in `nodemon` via:

```json
"exec": "ts-node -r tsconfig-paths/register src/index.ts"
```

---

## 🧑‍🚀 Author

**Saad Hasan**
Software Engineer @ Learn With Sumit
Focused on scalable Node.js + TypeScript architecture.

---

## 🛠️ License

This project is licensed under the **MIT License**.
Feel free to clone, modify, and use it to kickstart your next backend idea 🚀

---

> “A good boilerplate saves you days.
> A great one helps you dream bigger.” ✨
