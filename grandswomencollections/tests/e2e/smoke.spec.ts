import { expect, test } from "@playwright/test";

test("homepage renders the Grand Women's Collections campaign headline", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Woven for the moments");
});
