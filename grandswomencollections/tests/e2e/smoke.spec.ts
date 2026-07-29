import { expect, test } from "@playwright/test";

test("homepage renders luxury commerce headline", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Editorial commerce");
});
