import { onObjectFinalized } from "firebase-functions/v2/storage";
import { writeSecurityEvent } from "./audit";
import { bucket, errorMessage, logger, REGION } from "./core";

const VALIDATED_PREFIXES = ["products/", "banners/", "categories/", "profiles/", "visual-search/"];

function hasValidSignature(contentType: string, bytes: Buffer): boolean {
  if (contentType === "image/jpeg") return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (contentType === "image/png") return bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (contentType === "image/webp") return bytes.length >= 12 && bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP";
  return false;
}

export const validateUploadedImage = onObjectFinalized(
  { region: REGION, memory: "256MiB", timeoutSeconds: 30 },
  async (event) => {
    const object = event.data;
    const objectName = object.name;
    if (!objectName || !VALIDATED_PREFIXES.some((prefix) => objectName.startsWith(prefix))) return;
    if (object.metadata?.validated === "true") return;

    const file = bucket.file(objectName);
    try {
      const [header] = await file.download({ start: 0, end: 15 });
      const contentType = object.contentType ?? "";
      if (!hasValidSignature(contentType, header)) {
        await file.delete({ ignoreNotFound: true });
        await writeSecurityEvent({
          type: "invalid-upload-signature",
          severity: "high",
          source: "function",
          details: { objectName: objectName.slice(0, 500), declaredContentType: contentType.slice(0, 100) },
        });
        return;
      }
      await file.setMetadata({ metadata: { ...(object.metadata ?? {}), validated: "true" } });
    } catch (error) {
      logger.error("Upload validation failed", { objectName, error: errorMessage(error) });
      throw error;
    }
  },
);
