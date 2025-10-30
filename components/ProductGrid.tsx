"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";
import { Filter, Grid, List, ChevronDown, X } from "lucide-react";

interface ProductGridProps {
  products: Product[];
}

// Helper to return a single image URL for a product (handles color-specific images)
const getSingleImage = (product: any) => {
  if (!product?.images) return "/placeholder.jpg";

  // If images is array of { color, urls: string[] }
  if (Array.isArray(product.images) && product.images.length > 0) {
    const first = product.images[0];
    if (first && typeof first === "object" && Array.isArray(first.urls)) {
      return first.urls[0] || "/placeholder.jpg";
    }
    // fallback: if images is array of strings
    if (typeof first === "string") return first;
  }

  return "/placeholder.jpg";
};

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name-asc");
  const [gridView, setGridView] = useState<"2" | "3" | "4">("4");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Optional fallback categories if you're not passing any from props
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // All unique sizes
  const allSizes = Array.from(
    new Set(
      products.flatMap((product) =>
        product.variants.map((variant) => variant.size)
      )
    )
  );

  const minPrice = Math.min(...products.map((p) => p.price));
  const maxPrice = Math.max(...products.map((p) => p.price));

  const filteredProducts = products.filter((product) => {
    // ✅ Only keep if at least one variant is in stock
    const hasStock = product.variants.some((variant) => variant.stock > 0);
    if (!hasStock) return false;

    if (selectedCategory !== "All" && product.category !== selectedCategory)
      return false;

    if (product.price < priceRange.min || product.price > priceRange.max)
      return false;

    if (
      selectedSizes.length > 0 &&
      !product.variants.some(
        (variant) => selectedSizes.includes(variant.size) && variant.stock > 0 // also check stock here
      )
    )
      return false;

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "date-old":
        return a.id.localeCompare(b.id);
      case "date-new":
        return b.id.localeCompare(a.id);
      // case "rating":
      //   return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };
  const clearFilters = () => {
    setSelectedCategory("All");
    setSortBy("name-asc");
    setPriceRange({ min: minPrice, max: maxPrice });
    setSelectedSizes([]);
  };

  const gridCols = {
    "2": "grid-cols-2",
    "3": "grid-cols-2 md:grid-cols-3",
    "4": "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  };

  const sortOptions = [
    { value: "name-asc", label: "A-Z" },
    { value: "name-desc", label: "Z-A" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "date-old", label: "Date: Old to New" },
    { value: "date-new", label: "Date: New to Old" },
    { value: "rating", label: "Highest Rated" }
  ];

  const priceRanges = [
    { min: 0, max: 500, label: "Under ₹500" },
    { min: 500, max: 1000, label: "₹500 - ₹1000" },
    { min: 1000, max: 2000, label: "₹1000 - ₹2000" },
    { min: 2000, max: 5000, label: "₹2000 - ₹5000" },
    { min: 5000, max: Infinity, label: "Over ₹5000" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* --- Filters and Controls --- */}
      <div className="bg-white border-2 border-gray-200 p-4 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          {/* ---- Sort Filter ---- */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "sort" ? null : "sort")
              }
              className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 hover:border-red-600 transition-colors min-w-[140px] justify-between">
              <span className="text-sm font-medium">Sort By</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {openDropdown === "sort" && (
              <div className="absolute top-full left-0 mt-1 bg-white border-2 border-gray-300 shadow-lg z-50 min-w-[200px]">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                      sortBy === option.value
                        ? "bg-red-50 text-red-600 font-medium"
                        : ""
                    }`}>
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ---- Price Filter ---- */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "price" ? null : "price")
              }
              className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 hover:border-red-600 transition-colors min-w-[120px] justify-between">
              <span className="text-sm font-medium">Price</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {openDropdown === "price" && (
              <div className="absolute top-full left-0 mt-1 bg-white border-2 border-gray-300 shadow-lg z-50 min-w-[250px] p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          min: Number(e.target.value)
                        }))
                      }
                      className="w-20 px-2 py-1 border border-gray-300 text-sm focus:border-red-600 outline-none"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange((prev) => ({
                          ...prev,
                          max: Number(e.target.value)
                        }))
                      }
                      className="w-20 px-2 py-1 border border-gray-300 text-sm focus:border-red-600 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => {
                          setPriceRange({ min: range.min, max: range.max });
                          setOpenDropdown(null);
                        }}
                        className="w-full text-left px-2 py-1 text-sm hover:bg-gray-50">
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ---- Size Filter ---- */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenDropdown(openDropdown === "size" ? null : "size")
              }
              className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 hover:border-red-600 transition-colors min-w-[100px] justify-between">
              <span className="text-sm font-medium">Size</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            {openDropdown === "size" && (
              <div className="absolute top-full left-0 mt-1 bg-white border-2 border-gray-300 shadow-lg z-50 min-w-[200px] p-4">
                <div className="grid grid-cols-3 gap-2">
                  {allSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeToggle(size)}
                      className={`px-3 py-2 text-sm border-2 transition-colors ${
                        selectedSizes.includes(size)
                          ? "border-red-600 bg-red-600 text-white"
                          : "border-gray-300 hover:border-red-600"
                      }`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ---- Grid View Toggle ---- */}
          <div className="flex items-center border-2 border-gray-300 ml-auto">
            {(["2", "3", "4"] as const).map((view) => (
              <button
                key={view}
                onClick={() => setGridView(view)}
                className={`p-2 ${
                  gridView === view
                    ? "bg-red-600 text-white"
                    : "hover:bg-gray-100"
                } transition-colors`}>
                {view === "4" ? (
                  <List className="h-5 w-5" />
                ) : (
                  <Grid className="h-4 w-4" />
                )}
              </button>
            ))}
          </div>

          {/* ---- Clear Filters ---- */}
          {(selectedCategory !== "All" ||
            selectedSizes.length > 0 ||
            priceRange.min !== minPrice ||
            priceRange.max !== maxPrice) && (
            <button
              onClick={clearFilters}
              className="text-red-600 hover:text-red-800 text-sm font-semibold px-4 py-2 border-2 border-red-600 hover:bg-red-50 transition-colors">
              Clear All
            </button>
          )}
        </div>

        {/* ---- Active Filter Tags ---- */}
        {(selectedCategory !== "All" ||
          selectedSizes.length > 0 ||
          priceRange.min !== minPrice ||
          priceRange.max !== maxPrice) && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
            {selectedCategory !== "All" && (
              <span className="inline-flex items-center space-x-1 bg-red-600 text-white px-3 py-1 text-sm">
                <span>Category: {selectedCategory}</span>
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="hover:bg-red-700 p-0.5">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {(priceRange.min !== minPrice || priceRange.max !== maxPrice) && (
              <span className="inline-flex items-center space-x-1 bg-red-600 text-white px-3 py-1 text-sm">
                <span>
                  Price: ₹{priceRange.min} - ₹
                  {priceRange.max === Infinity ? "∞" : priceRange.max}
                </span>
                <button
                  onClick={() =>
                    setPriceRange({ min: minPrice, max: maxPrice })
                  }
                  className="hover:bg-red-700 p-0.5">
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedSizes.map((size) => (
              <span
                key={size}
                className="inline-flex items-center space-x-1 bg-red-600 text-white px-3 py-1 text-sm">
                <span>Size: {size}</span>
                <button
                  onClick={() => handleSizeToggle(size)}
                  className="hover:bg-red-700 p-0.5">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ---- Product Grid ---- */}
      <div className={`grid ${gridCols[gridView]} gap-0`}>
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            imageUrl={getSingleImage(product)} // pass a single image URL
          />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found matching your filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 bg-red-600 text-white px-6 py-2 hover:bg-red-700 transition-colors">
            Clear Filters
          </button>
        </div>
      )}

      {openDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setOpenDropdown(null)}
        />
      )}
    </div>
  );
}
