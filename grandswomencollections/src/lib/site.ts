import { categories, collections, featuredReviews, products, instagramPosts, testimonials, securityEvents } from "@/lib/data/catalog";

export function getHomePageData() {
  return {
    categories,
    collections,
    featuredProducts: products.filter((p) => p.featured),
    trendingProducts: products.slice(0, 4),
    bestSellers: products.filter((p) => p.rating >= 4.7).slice(0, 4),
    newArrivals: products.slice(6, 10),
    allProducts: products,
    featuredReviews,
    instagramPosts,
    testimonials
  };
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export function getRelatedProducts(productId: string, limit = 4) {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];
  return products
    .filter((p) => p.id !== productId && (p.category === product.category || p.collection === product.collection))
    .slice(0, limit);
}

export function getAllProducts() {
  return products;
}

export function getDashboardMetrics() {
  return {
    revenue: 182450,
    orders: 164,
    averageOrderValue: 6120,
    conversionRate: 3.4,
    securityEvents
  };
}
