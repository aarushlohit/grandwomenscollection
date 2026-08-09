const { applicationDefault, initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const [projectId, uid, confirmation] = process.argv.slice(2);
if (!projectId || !uid || confirmation !== `--confirm-project=${projectId}`) {
  console.error("Usage: node scripts/bootstrap-super-admin.cjs <project-id> <uid> --confirm-project=<project-id>");
  process.exit(2);
}

if (projectId.startsWith("demo-") || !/^[a-z][a-z0-9-]{4,29}$/.test(projectId) || uid.length < 20) {
  console.error("Project ID or Firebase Auth UID is invalid.");
  process.exit(2);
}

initializeApp({ credential: applicationDefault(), projectId });

getAuth()
  .getUser(uid)
  .then((user) => getAuth().setCustomUserClaims(uid, { ...user.customClaims, role: "super_admin" }))
  .then(() => {
    console.info(`Granted super_admin to ${uid} in explicitly confirmed project ${projectId}.`);
  })
  .catch((error) => {
    console.error("Bootstrap failed:", error instanceof Error ? error.message : "Unknown error");
    process.exitCode = 1;
  });
