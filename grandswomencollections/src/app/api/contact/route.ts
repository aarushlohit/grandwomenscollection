import { firebaseBackendOnlyResponse } from "@/lib/firebase/backend-route";

export async function POST() {
  return firebaseBackendOnlyResponse();
}
