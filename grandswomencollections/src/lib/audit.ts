export async function logAuditEvent(event: Record<string, unknown>) {
  console.info("audit-event", JSON.stringify(event));
}
