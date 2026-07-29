# GRAND WOMEN'S COLLECTIONS

Luxury Fashion. Powered by AI. Built Secure.

## Stack

- Next.js App Router + TypeScript + TailwindCSS
- Firebase Auth, Firestore, Storage, Functions
- Razorpay test integration
- OpenCode primary AI provider with NVIDIA fallback
- Vercel deployment target
- GitHub Actions CI

## Run

```bash
npm install
npm run dev
```

## Validate

```bash
npm run lint
npm run typecheck
npm run test
```

## Firebase

Root includes:

- `firestore.rules`
- `storage.rules`
- `firestore.indexes.json`
- `functions/`

For functions:

```bash
cd functions
npm install
npm run build
```

## Environment

Copy `.env.example` to `.env.local` and set all secrets from environment variables only.
