import { NextResponse } from "next/server";

export function firebaseBackendOnlyResponse() {
  return NextResponse.json(
    {
      error: "This operation is available through the authenticated Firebase Functions API only.",
    },
    {
      status: 410,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
