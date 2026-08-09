# Security model

## Trust boundaries

- Browser totals, stock, roles, payment status, AI output, and audit events are untrusted.
- Firebase callable functions enforce Authentication, App Check, validation, rate limits, and resource authorization.
- Firestore and Storage deny all unspecified paths.
- Commerce and security collections are server-write-only.
- Razorpay signatures use HMAC-SHA256 with constant-time comparison and raw webhook bodies.
- AI providers receive a bounded catalog and a controlled image; provider output can reference only existing product IDs.
- Uploads are owner/role scoped and type/size limited. A Storage finalize function verifies JPEG/PNG/WebP magic bytes, deletes disguised payloads, and marks valid objects before reads or AI processing. Visual-search images remain private and are deleted after processing.

## Retention and privacy

Security events use a 30-day TTL. Visual-search images are deleted immediately after processing. The isolated honeypot must not collect request bodies, credentials, cookies, authorization headers, or production data. Restrict SOC visibility to `staff`, `admin`, `soc_admin`, and `super_admin` claims.

## Production controls outside Firebase

- Enable Firebase App Check enforcement only after valid web tokens are observed in staging.
- Require MFA for privileged Firebase Auth accounts.
- Configure Cloudflare managed rules, bot controls, rate limits, TLS, and decoy routing.
- Configure Google Cloud budgets; the in-app cost number is only an estimate.
- Enable Secret Manager rotation and GitHub protected environments.
- Send Cloud Functions logs and Error Reporting alerts to the operations team.
- Use a dedicated backup bucket with versioning, retention, and restore drills.

## Incident response

For payment-signature, honeypot, WAF burst, downtime, or backup alerts: preserve the event ID and logs, revoke affected credentials, block malicious sources at Cloudflare, verify order state directly with Razorpay, and document the response in an immutable incident record. Never paste secrets or full customer data into tickets or chat.
