import type { MetadataRoute } from "next";
import { categories, collections, products } from "@/lib/data/catalog";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes = ["", "/shop", "/collections", "/about", "/contact", "/privacy", "/terms", "/shipping", "/returns"];

  return [
    ...baseRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date()
    })),
    ...products.map((product) => ({
      url: `${SITE_URL}/shop/${product.slug}`,
      lastModified: new Date()
    })),
    ...categories.map((category) => ({
      url: `${SITE_URL}/category/${category.slug}`,
      lastModified: new Date()
    })),
    ...collections.map((collection) => ({
      url: `${SITE_URL}/collections/${collection.slug}`,
      lastModified: new Date()
    }))
  ];
}
