"use client";

import { useState } from "react";
import { Check, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { useWishlistStore } from "@/store/use-wishlist-store";
import type { Product } from "@/types";

export function AddToCartButton({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const isWishlisted = useWishlistStore((state) => state.productIds.includes(product.id));

  const add = () => {
    addItem({ productId: product.id, quantity, size: selectedSize, color: selectedColor });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return <div className="space-y-7">
    <fieldset><legend className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#716b63] dark:text-[#eee9de]/48">Colour · <span className="text-[#171310] dark:text-[#f7f4ed]">{selectedColor}</span></legend><div className="mt-3 flex flex-wrap gap-2">{product.colors.map((color) => <button key={color} type="button" onClick={() => setSelectedColor(color)} className={`min-h-11 rounded-full border px-4 text-[10px] font-medium transition-colors duration-150 ${selectedColor === color ? "border-[#171310] bg-[#171310] text-[#f7f4ed] dark:border-[#f7f4ed] dark:bg-[#f7f4ed] dark:text-[#171310]" : "border-[#281e16]/14 text-[#716b63] hover:border-[#b98a3d] dark:border-white/15 dark:text-[#eee9de]/55"}`}>{color}</button>)}</div></fieldset>
    <fieldset><div className="flex items-center justify-between"><legend className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#716b63] dark:text-[#eee9de]/48">Select size</legend><button type="button" className="min-h-11 text-[9px] font-semibold uppercase tracking-[0.14em] underline decoration-[#b98a3d]/50 underline-offset-4">Size guide</button></div><div className="mt-2 grid grid-cols-5 gap-2">{product.sizes.map((size) => <button key={size} type="button" onClick={() => setSelectedSize(size)} className={`min-h-12 rounded-lg border text-[10px] font-semibold ${selectedSize === size ? "border-[#171310] bg-[#171310] text-[#f7f4ed] dark:border-[#f7f4ed] dark:bg-[#f7f4ed] dark:text-[#171310]" : "border-[#281e16]/14 hover:border-[#b98a3d] dark:border-white/15"}`}>{size}</button>)}</div></fieldset>
    <div className="flex items-stretch gap-2"><div className="flex min-h-14 items-center rounded-full border border-[#281e16]/14 px-1 dark:border-white/15"><button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity" className="flex h-11 w-10 items-center justify-center"><Minus className="h-3.5 w-3.5" /></button><span className="w-7 text-center text-xs font-semibold">{quantity}</span><button type="button" onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))} aria-label="Increase quantity" className="flex h-11 w-10 items-center justify-center"><Plus className="h-3.5 w-3.5" /></button></div><button type="button" onClick={add} className={`flex min-h-14 flex-1 items-center justify-center gap-3 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] transition-[background-color,transform] duration-150 active:scale-[0.98] ${added ? "bg-emerald-700 text-white" : "bg-[#241b16] text-[#f7f4ed] hover:bg-[#b98a3d] dark:bg-[#f7f4ed] dark:text-[#171310]"}`}>{added ? <><Check className="h-4 w-4" /> Added to bag</> : <><ShoppingBag className="h-4 w-4" /> Add to bag</>}</button><button type="button" onClick={() => toggleWishlist(product.id)} aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"} className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-colors duration-150 ${isWishlisted ? "border-[#b98a3d] bg-[#b98a3d]/8 text-[#b98a3d]" : "border-[#281e16]/14 hover:border-[#b98a3d] hover:text-[#b98a3d] dark:border-white/15"}`}><Heart className={`h-4.5 w-4.5 ${isWishlisted ? "fill-current" : ""}`} /></button></div>
    <p className="text-center text-[9px] uppercase tracking-[0.14em] text-[#716b63] dark:text-[#eee9de]/38">Complimentary insured shipping above ₹15,000</p>
  </div>;
}
