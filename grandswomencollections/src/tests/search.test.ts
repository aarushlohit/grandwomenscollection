import { describe, expect, it } from "vitest";
import { products } from "@/lib/data/catalog";
import { searchProducts } from "@/lib/search";

describe("searchProducts", () => {
  it("filters products by query and category", () => {
    const results = searchProducts(products, "gown", { category: "occasionwear" });
    expect(results).toHaveLength(1);
    expect(results[0]?.slug).toBe("velora-satin-gown");
  });
});
