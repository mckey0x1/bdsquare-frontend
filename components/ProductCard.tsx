"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { Star, ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  imageUrl?: string;
}

export default function ProductCard({ product, imageUrl }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const availableVariants = product.variants.filter((v) => v.stock > 0);
  const availableSizes = Array.from(
    new Set(availableVariants.map((variant) => variant.size))
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    if (availableVariants.length === 0) {
      alert("Product is out of stock");
      return;
    }

    // Pick first available variant for cart (simplified logic)
    const defaultVariant = availableVariants[0];

    addToCart({
      product,
      quantity: 1,
      size: defaultVariant.size,
      color: defaultVariant.color,
      stock: defaultVariant.stock,
      batchNo: defaultVariant.batchNo
    });

    setAdded(true);
    // Reset back to cart icon after 1.5s (optional)
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-white border border-gray-200 hover:border-red-600 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={
              imageUrl ||
              (Array.isArray(product.images)
                ? product.images[0]
                : "/placeholder.jpg")
            }
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 space-y-1">
            {product.isNew && (
              <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold">
                NEW
              </span>
            )}
            {product.isSale && (
              <span className="bg-black text-white px-2 py-1 text-xs font-semibold">
                SALE
              </span>
            )}
          </div>

          {/* Quick Add Button */}
          {/* <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 bg-red-600 text-white p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-700 rounded">
            {added ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
          </button> */}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{product.category}</p>

          {/* Pricing */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-red-600">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Available Sizes */}
          {availableSizes.length > 0 && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                {availableSizes.slice(0, 4).map((size) => (
                  <span
                    key={size}
                    className="text-xs border border-gray-300 px-2 py-1 text-gray-600">
                    {size}
                  </span>
                ))}
                {availableSizes.length > 4 && (
                  <span className="text-xs text-gray-500">
                    +{availableSizes.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
