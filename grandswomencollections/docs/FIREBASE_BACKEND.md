# Firebase backend operations

## Implemented services

The `backend` codebase provides:

- Firebase Auth profile provisioning and custom-claim RBAC.
- Server-priced, idempotent Razorpay checkout creation.
- Constant-time payment and webhook signature verification.
- Transactional inventory deduction and coupon consumption.
- Verified-purchase reviews.
- Admin catalog, coupon, banner, order, inventory, and role operations.
- OpenCode Vision, NVIDIA NIM, then keyword-search AI fallback.
- App Check enforcement and Firestore-backed rate limiting.
- SOC event ingestion, Cloudflare event synchronization, uptime monitoring, usage/cost estimates, audit logs, and alert history.
- Telegram and SMTP alerts.
- Scheduled Firestore export initiation and backup status.
- Signed deployment notifications.

## Collections

Client-readable collections are `products`, `categories`, `banners`, published `reviews`, owned `users`, `wishlists`, `carts`, and owned `orders`. All payment, coupon, audit, security, alert, rate-limit, webhook, backup, and metrics writes are server-only.

Prices are integers in paise (`pricePaise`). The server never accepts a customer-provided total.

## Safe staging setup

Do not use the globally selected Firebase alias. Pass `--project` on every command.

```bash
firebase login
firebase projects:list
firebase use --add
cp functions/.env.example functions/.env.<staging-project-id>
```

Enable Blaze billing, Firestore, Authentication, Storage, App Check, Secret Manager, Cloud Scheduler, and the Firestore Admin API in the staging project. Configure the default Firestore region before importing data.

Set `OPENCODE_BASE_URL` and `OPENCODE_MODEL` to the current OpenAI-compatible vision endpoint/model issued for your OpenCode account; they are intentionally not guessed in source control. If either is absent, the backend moves to NVIDIA NIM and then keyword search.

Set secrets interactively so values do not appear in shell history:

```bash
firebase functions:secrets:set RAZORPAY_KEY_ID --project <staging-project-id>
firebase functions:secrets:set RAZORPAY_SECRET --project <staging-project-id>
firebase functions:secrets:set RAZORPAY_WEBHOOK_SECRET --project <staging-project-id>
firebase functions:secrets:set OPENCODE_API_KEY --project <staging-project-id>
firebase functions:secrets:set NVIDIA_NIM_API_KEY --project <staging-project-id>
firebase functions:secrets:set TELEGRAM_BOT_TOKEN --project <staging-project-id>
firebase functions:secrets:set TELEGRAM_CHAT_ID --project <staging-project-id>
firebase functions:secrets:set SMTP_PASSWORD --project <staging-project-id>
firebase functions:secrets:set CLOUDFLARE_API_TOKEN --project <staging-project-id>
firebase functions:secrets:set CLOUDFLARE_ZONE_ID --project <staging-project-id>
firebase functions:secrets:set DEPLOYMENT_WEBHOOK_SECRET --project <staging-project-id>
firebase functions:secrets:set SOC_INGEST_SECRET --project <staging-project-id>
```

Deploy staging only after emulator verification:

```bash
npm run test:firebase
firebase deploy --only functions:backend,firestore:rules,firestore:indexes,storage --project <staging-project-id>
```

Set Razorpay's webhook URL to the deployed `razorpayWebhook` URL and subscribe to `payment.captured` plus the refund events used by operations. Use Razorpay test mode until a full order has been paid, reconciled, and refunded in staging.

## First super-admin

The role mutation callable requires an existing `super_admin`, so bootstrap exactly one staging account using Application Default Credentials and the explicit project confirmation guard:

```bash
cd functions
node scripts/bootstrap-super-admin.cjs <staging-project-id> <firebase-auth-uid> --confirm-project=<staging-project-id>
```

After any claim change, sign out and sign in again. The admin role callable revokes the target's existing refresh tokens.

## Isolated honeypot

Create a separate Firebase project with no Firestore, Storage, production service account, or production secrets. Copy `honeypot/.env.example` to `honeypot/.env.<isolated-project-id>` and set only the SOC ingestion URL. Store the same random HMAC secret in the main and isolated projects:

```bash
firebase functions:secrets:set SOC_INGEST_SECRET --project <isolated-honeypot-project-id>
firebase deploy --only functions:honeypot --project <isolated-honeypot-project-id>
```

Route decoy paths through Cloudflare to the isolated `trap` URL. Firebase Functions requires `firebase-admin` as a runtime peer, but the trap never imports it, makes no Firestore/Storage/Auth calls, and receives no production service-account credential. It forwards only IP, route, method, user-agent, timestamp, and a random event ID to the signed `socIngest` endpoint.

## Backups

`BACKUP_BUCKET` should name a dedicated, versioned Google Cloud Storage bucket with retention and lifecycle policies. The backend service account needs Firestore export permission and write access only to that bucket. One scheduled function starts and records the long-running export; a second verifies completion and sends confirmation or failure alerts. Google Cloud monitoring should remain a second alerting path.

Restore drills must use a disposable staging project. Never test a restore over production.

## CI secrets

Configure these protected GitHub environment secrets: `FIREBASE_PROJECT_ID`, `FIREBASE_SERVICE_ACCOUNT`, `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `DEPLOYMENT_WEBHOOK_URL`, and `DEPLOYMENT_WEBHOOK_SECRET`. The service account should have only the permissions required for Functions, rules, indexes, Storage rules, Scheduler, and Secret Manager bindings.
