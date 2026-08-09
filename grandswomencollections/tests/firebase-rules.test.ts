import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { getBytes, ref, uploadBytes } from "firebase/storage";
import { afterAll, beforeAll, beforeEach, describe, it } from "vitest";

const PROJECT_ID = "demo-grand-womens";
let testEnvironment: RulesTestEnvironment;

beforeAll(async () => {
  testEnvironment = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: { rules: readFileSync(resolve("firestore.rules"), "utf8") },
    storage: { rules: readFileSync(resolve("storage.rules"), "utf8") },
  });
});

beforeEach(async () => {
  await testEnvironment.clearFirestore();
  await testEnvironment.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), "products/active-product"), {
      title: "Active product",
      active: true,
    });
    await setDoc(doc(context.firestore(), "products/draft-product"), {
      title: "Draft product",
      active: false,
    });
    await setDoc(doc(context.firestore(), "users/customer-a"), {
      displayName: "Customer A",
      email: "customer@example.com",
      role: "customer",
      status: "active",
      updatedAt: serverTimestamp(),
    });
  });
});

afterAll(async () => {
  await testEnvironment.cleanup();
});

describe("Firestore deny-by-default rules", () => {
  it("allows public active products but hides drafts", async () => {
    const anonymous = testEnvironment.unauthenticatedContext().firestore();
    await assertSucceeds(getDoc(doc(anonymous, "products/active-product")));
    await assertFails(getDoc(doc(anonymous, "products/draft-product")));
  });

  it("prevents customers from forging orders or security events", async () => {
    const customer = testEnvironment.authenticatedContext("customer-a", { role: "customer" }).firestore();
    await assertFails(setDoc(doc(customer, "orders/fake-order"), { userId: "customer-a", amountPaise: 100, status: "paid" }));
    await assertFails(setDoc(doc(customer, "securityEvents/fake-event"), { type: "fake", severity: "low" }));
  });

  it("prevents profile role escalation while allowing safe profile changes", async () => {
    const customer = testEnvironment.authenticatedContext("customer-a", { role: "customer" }).firestore();
    await assertFails(updateDoc(doc(customer, "users/customer-a"), { role: "super_admin", updatedAt: serverTimestamp() }));
    await assertSucceeds(updateDoc(doc(customer, "users/customer-a"), { displayName: "Updated Name", updatedAt: serverTimestamp() }));
  });

  it("keeps catalog writes server-owned even for admins", async () => {
    const admin = testEnvironment.authenticatedContext("admin-a", { role: "admin" }).firestore();
    await assertFails(updateDoc(doc(admin, "products/active-product"), { title: "Bypassed backend" }));
  });

  it("isolates wishlists by owner", async () => {
    const customer = testEnvironment.authenticatedContext("customer-a", { role: "customer" }).firestore();
    await assertSucceeds(setDoc(doc(customer, "wishlists/customer-a"), { productIds: ["active-product"], updatedAt: serverTimestamp() }));
    await assertFails(setDoc(doc(customer, "wishlists/customer-b"), { productIds: [], updatedAt: serverTimestamp() }));
    await assertSucceeds(deleteDoc(doc(customer, "wishlists/customer-a")));
  });
});

describe("Storage upload rules", () => {
  it("allows an owner image upload and rejects cross-user uploads", async () => {
    const customerStorage = testEnvironment.authenticatedContext("customer-a", { role: "customer" }).storage();
    const image = new Uint8Array([0xff, 0xd8, 0xff, 0xd9]);
    await assertSucceeds(uploadBytes(ref(customerStorage, "visual-search/customer-a/look.jpg"), image, { contentType: "image/jpeg" }));
    await assertFails(uploadBytes(ref(customerStorage, "visual-search/customer-b/look.jpg"), image, { contentType: "image/jpeg" }));
  });

  it("rejects non-image product uploads", async () => {
    const adminStorage = testEnvironment.authenticatedContext("admin-a", { role: "admin" }).storage();
    await assertFails(uploadBytes(ref(adminStorage, "products/payload.html"), new TextEncoder().encode("<script></script>"), { contentType: "text/html" }));
  });

  it("keeps uploaded product media private until server validation", async () => {
    const adminStorage = testEnvironment.authenticatedContext("admin-a", { role: "admin" }).storage();
    const anonymousStorage = testEnvironment.unauthenticatedContext().storage();
    const image = new Uint8Array([0xff, 0xd8, 0xff, 0xd9]);
    await assertSucceeds(uploadBytes(ref(adminStorage, "products/unvalidated.jpg"), image, { contentType: "image/jpeg" }));
    await assertFails(getBytes(ref(anonymousStorage, "products/unvalidated.jpg")));
  });
});
