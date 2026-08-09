# Grand Women's Collections

Secure boutique commerce built with Next.js, Firebase Authentication, Firestore, Storage, Cloud Functions, Razorpay, provider-fallback AI, and a separate Firebase honeypot codebase.

## Local verification

```bash
npm ci
npm ci --prefix functions
npm ci --prefix honeypot
npm run lint
npm run typecheck
npm run test
npm run test:firebase
npm run build
npm run build --prefix functions
npm run build --prefix honeypot
```

Firebase emulator tests always use `demo-grand-womens`; Firebase rejects any attempt by a demo project to reach live services.

## Deployment

The frontend deploys to Vercel. Firebase CLI deploys only the `backend` codebase, rules, indexes, and Storage configuration. The honeypot must be deployed to a different Firebase project.

See [Firebase backend operations](docs/FIREBASE_BACKEND.md) and [security model](docs/SECURITY.md) before configuring a staging or production project.
