export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "Free Size";
export type ProductColor = "Ivory" | "Black" | "Rose" | "Emerald" | "Gold" | "Navy";
export type OrderStatus = "pending" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  collection: string;
  tags: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  stock: number;
  featured: boolean;
  rating: number;
  reviewCount: number;
  images: ProductImage[];
  description: string;
  specifications: string[];
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  season: string;
  image?: string;
  products?: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  size: ProductSize;
  color: ProductColor;
}

export interface Order {
  id: string;
  userId: string;
  amount: number;
  status: OrderStatus;
  createdAt: string;
  items: CartItem[];
}

export interface SecurityEvent {
  id: string;
  type: "failed-login" | "honeypot" | "blocked-request";
  severity: "low" | "medium" | "high";
  createdAt: string;
  sourceIp: string;
  details: string;
}

export interface SearchFilters {
  category?: string;
  color?: ProductColor;
  maxPrice?: number;
  size?: ProductSize;
}

export interface InstagramPost {
  id: string;
  image: string;
  likes: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}
