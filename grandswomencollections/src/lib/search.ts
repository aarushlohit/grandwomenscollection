import type { Product, SearchFilters } from "@/types";

export function searchProducts(products: Product[], query: string, filters: SearchFilters = {}) {
  const normalizedQuery = query.trim().toLowerCase();

  return products.filter((product) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [product.title, product.subtitle, product.description, ...product.tags].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      );

    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesColor = !filters.color || product.colors.includes(filters.color);
    const matchesSize = !filters.size || product.sizes.includes(filters.size);
    const matchesPrice = !filters.maxPrice || product.price <= filters.maxPrice;

    return matchesQuery && matchesCategory && matchesColor && matchesSize && matchesPrice;
  });
}
