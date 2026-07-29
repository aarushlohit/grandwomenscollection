"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Heart, Check } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { useWishlistStore } from "@/store/use-wishlist-store";
import type { Product } from "@/types";

export function AddToCartButton({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = useWishlistStore((s) => s.productIds.includes(product.id));

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity: 1,
      size: selectedSize,
      color: selectedColor
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}
          className={`flex flex-1 items-center justify-center gap-3 rounded-full py-4 text-[13px] uppercase tracking-[0.2em] font-medium transition-all duration-500 ${
            added
              ? "bg-success text-white"
              : "bg-ink text-cream hover:bg-gold dark:bg-cream dark:text-ink dark:hover:bg-gold"
          }`}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" />
              Added to Bag
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              Add to Bag
            </>
          )}
        </motion.button>
        <button
          onClick={() => toggleWishlist(product.id)}
          className={`flex h-14 w-14 items-center justify-center rounded-full border transition-all ${
            isWishlisted
              ? "border-rose bg-rose/10 text-rose"
              : "border-ink/15 text-ink/50 hover:border-gold hover:text-gold dark:border-cream/15 dark:text-cream/50"
          }`}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? "fill-rose" : ""}`} />
        </button>
      </div>

      <p className="text-center text-[12px] text-ink/30 dark:text-cream/30">
        Complimentary shipping on orders above ₹15,000
      </p>
    </div>
  );
}
