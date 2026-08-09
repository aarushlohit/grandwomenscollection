import functions from "firebase-functions/v1";
import { auth, db, FieldValue, REGION } from "./core";
import { writeAuditEvent } from "./audit";

export const createCustomerProfile = functions
  .region(REGION)
  .auth.user()
  .onCreate(async (user) => {
    const existingRole = typeof user.customClaims?.role === "string" ? user.customClaims.role : "customer";
    await Promise.all([
      auth.setCustomUserClaims(user.uid, { ...user.customClaims, role: existingRole }),
      db.collection("users").doc(user.uid).set(
        {
          displayName: user.displayName ?? "",
          email: user.email ?? "",
          photoUrl: user.photoURL ?? "",
          role: existingRole,
          status: "active",
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        },
        { merge: true },
      ),
    ]);
    await writeAuditEvent({ actorId: user.uid, actorRole: existingRole, action: "user.create", resourceType: "user", resourceId: user.uid, result: "success" });
  });

export const disableDeletedCustomerProfile = functions
  .region(REGION)
  .auth.user()
  .onDelete(async (user) => {
    await db.collection("users").doc(user.uid).set(
      {
        displayName: "Deleted customer",
        email: FieldValue.delete(),
        photoUrl: FieldValue.delete(),
        status: "deleted",
        deletedAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  });
