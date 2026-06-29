# ⚡️ Basic Socials

> Creative marketing & consulting agency based in Hyderabad. We handle branding, social, performance, video & AI, talent, and consulting.

This project is a modern, high-performance web application built with **TanStack Start** and configured for serverless deployment on **Cloudflare Workers/Pages**.

---

## 🛠️ Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (React 19 + TanStack Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Runtime/Package Manager**: [Bun](https://bun.sh/)
- **Serverless Platform**: [Cloudflare Workers & Pages](https://workers.cloudflare.com/) (using Nitro `cloudflare_module` preset)

---

## 🚀 Getting Started

### 1. Installation

Install project dependencies using your preferred package manager (Bun is recommended):

```bash
bun install
# or
npm install
```

### 2. Run Development Server

Start the local development server:

```bash
bun run dev
# or
npm run dev
```

Open `http://localhost:8080` in your browser to view the application.

### 3. Build for Production

To compile the client and server assets:

```bash
bun run build
# or
npm run build
```

This outputs the compiled deployment files inside the `.output` directory:

- Static assets: `.output/public/`
- Server module: `.output/server/index.mjs`

---

## ☁️ Cloudflare Deployment Config

This project is configured as a Cloudflare Worker with Assets. Below are the recommended deployment settings for the Cloudflare Pages/Workers Dashboard:

| Setting             | Value                                                 |
| :------------------ | :---------------------------------------------------- |
| **Build command**   | `bun run build`                                       |
| **Deploy command**  | `npx wrangler deploy --config wrangler.toml`          |
| **Version command** | `npx wrangler versions upload --config wrangler.toml` |

### **Wrangler Configuration (`wrangler.toml`)**

```toml
name = "basic-socials"
compatibility_date = "2024-09-24"
compatibility_flags = ["nodejs_compat"]

main = "dist/_worker.js/index.js"

[assets]
directory = "./dist"
not_found_handling = "single-page-application"
```

---

## 🔊 Interactive Features

- **Global Click/Navigation SFX**: Interactive components (like buttons and links) trigger audio click sound effects.
- **High Volume Audio**: Playback volumes are set to maximum (`1.0`) inside `src/routes/__root.tsx`.
