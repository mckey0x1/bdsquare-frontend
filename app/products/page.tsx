"use client";

import ProductGrid from "@/components/ProductGrid";
import { useSearchParams } from "next/navigation";
import { Product } from "@/lib/types";
import { useState, useEffect } from "react";
import AnimatedBdsquareText from "@/components/ui/AnimatedBdsquareText";
import { useAuth } from "@/context/AuthContext";

export default function ProductsPage() {
  const { products } = useAuth();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery]);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          {searchQuery ? `Search Results for "${searchQuery}"` : "ALL PRODUCTS"}
        </h1>
        <p className="text-base text-gray-600">
          {searchQuery
            ? `Found ${filteredProducts.length} products matching your search`
            : "Discover our complete collection of premium clothing"}
        </p>
      </div>

      <ProductGrid products={products} />
      <AnimatedBdsquareText />
    </div>
  );
}
