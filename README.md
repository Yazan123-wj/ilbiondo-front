# IL Biondo frontend

Next.js App Router application for IL Biondo.

## Setup

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The frontend talks to Django only through REST APIs using `NEXT_PUBLIC_API_URL`.

## Environment

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
```
