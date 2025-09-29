"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Search, X } from "lucide-react";
import { products } from "@/lib/products";
import { useAuth } from "@/context/AuthContext";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const router = useRouter();
  const { products } = useAuth();

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      onClose();
      setSearchQuery("");
    }
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
    onClose();
    setSearchQuery("");
  };

  const handleClose = () => {
    onClose();
    setSearchQuery("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl p-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Search Products</h2>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              placeholder="Search for products, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 focus:border-red-600 outline-none text-lg"
              autoFocus
            />
            <button type="submit" className="absolute right-3 top-3.5">
              <Search className="h-6 w-6 text-gray-400 hover:text-red-600 transition-colors" />
            </button>
          </form>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="max-h-96 overflow-y-auto">
              <p className="text-sm text-gray-600 mb-3">
                Found {searchResults.length} products
              </p>
              <div className="space-y-2">
                {searchResults.slice(0, 10).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border border-gray-100 flex items-center space-x-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{product.name}</p>
                      <p className="text-xs text-gray-600">
                        {product.category}
                      </p>
                      <p className="text-sm font-bold text-red-600">
                        ₹{product.price}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              {searchResults.length > 10 && (
                <div className="px-4 py-2 text-center text-sm text-gray-600 border-t">
                  +{searchResults.length - 10} more results
                </div>
              )}
            </div>
          )}

          {searchQuery && searchResults.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No products found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
