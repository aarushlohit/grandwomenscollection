import type { CallableRequest } from "firebase-functions/v2/https";
import { HttpsError } from "firebase-functions/v2/https";

export type AppRole = "customer" | "staff" | "admin" | "soc_admin" | "super_admin";

export function requireAuthenticated(request: CallableRequest<unknown>): string {
  if (!request.auth?.uid) {
    throw new HttpsError("unauthenticated", "Sign in is required.");
  }

  return request.auth.uid;
}

export function requireRole(request: CallableRequest<unknown>, allowedRoles: AppRole[]): AppRole {
  requireAuthenticated(request);
  const role = request.auth?.token.role;
  if (typeof role !== "string" || !allowedRoles.includes(role as AppRole)) {
    throw new HttpsError("permission-denied", "You do not have permission for this action.");
  }

  return role as AppRole;
}

export function requireAdmin(request: CallableRequest<unknown>): AppRole {
  return requireRole(request, ["admin", "super_admin"]);
}

export function requireOperationsAccess(request: CallableRequest<unknown>): AppRole {
  return requireRole(request, ["staff", "admin", "soc_admin", "super_admin"]);
}

export function requireSuperAdmin(request: CallableRequest<unknown>): AppRole {
  return requireRole(request, ["super_admin"]);
}
