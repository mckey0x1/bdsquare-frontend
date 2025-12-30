"use client";

import Image from "next/image";

interface CategoryFilterProps {
  onCategoryChange: (category: string | null) => void;
  selectedCategory: string | null;
}

export default function CategoryFilter({
  onCategoryChange,
  selectedCategory
}: CategoryFilterProps) {
  const categories = [
    {
      name: "Hoodies",
      image:
        "https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg",
      label: "HOODIES"
    },
    {
      name: "T-Shirts",
      image:
        "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
      label: "T-SHIRTS"
    }
  ];

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-wider">
            SHOP BY COLLECTION
          </h2>
        </div>

        {/* Category Boxes - Flex layout for all screen sizes */}
        <div className="flex flex-row gap-2 md:gap-6">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.name;
            return (
              <button
                key={category.name}
                onClick={() => {
                  if (isSelected) {
                    onCategoryChange(null);
                  } else {
                    onCategoryChange(category.name);
                  }
                }}
                className={`group relative overflow-hidden border-2 transition-all duration-300 flex-1 ${
                  isSelected
                    ? "border-red-600 shadow-lg scale-[1.02]"
                    : "border-gray-200 hover:border-red-400"
                }`}
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className={`object-cover transition-transform duration-300 ${
                      isSelected ? "scale-105" : "group-hover:scale-105"
                    }`}
                  />
                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 transition-all duration-300 ${
                      isSelected
                        ? "bg-black/40"
                        : "bg-black/20 group-hover:bg-black/30"
                    }`}
                  />
                  {/* Category Label */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3
                      className={`text-sm md:text-3xl lg:text-4xl font-bold tracking-wider transition-all duration-300 ${
                        isSelected
                          ? "text-white drop-shadow-lg"
                          : "text-white group-hover:drop-shadow-md"
                      }`}
                    >
                      {category.label}
                    </h3>
                  </div>
                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 md:top-4 md:right-4">
                      <div className="bg-red-600 text-white px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-semibold">
                        SELECTED
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {/* Clear Filter Button */}
        {selectedCategory && (
          <div className="mt-4 text-center">
            <button
              onClick={() => onCategoryChange(null)}
              className="text-sm text-gray-600 hover:text-red-600 underline transition-colors"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
