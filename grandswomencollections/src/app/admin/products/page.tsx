import { Card } from "@/components/ui/card";
import { products } from "@/lib/data/catalog";

export default function AdminProductsPage() {
  return (
    <div>
      <h1 className="font-serif text-5xl">Products</h1>
      <div className="mt-8 grid gap-4">
        {products.map((product) => (
          <Card key={product.id} className="p-6 text-black">
            {product.title} · {product.stock} in stock · ₹{product.price}
          </Card>
        ))}
      </div>
    </div>
  );
}
