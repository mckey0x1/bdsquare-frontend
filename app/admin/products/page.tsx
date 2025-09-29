"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import CubeSpinner from "@/components/cube-loader";

// ✅ Modal stays unchanged
function ConfirmDeleteModal({ open, onClose, onConfirm }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Delete Product?</h2>
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete this product?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300">
            No
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700">
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const { products, deleteProduct } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const handleDelete = (productId: string) => {
    setSelectedProductId(productId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    deleteProduct(selectedProductId);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ||
      product.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // ✅ Updated stock calculation based on variants
  const getTotalStock = (product: (typeof products)[0]) => {
    return product.variants.reduce((sum, v) => sum + v.stock, 0);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return { label: "Out of Stock", variant: "destructive" as const };
    if (stock <= 10)
      return { label: "Low Stock", variant: "secondary" as const };
    return { label: "In Stock", variant: "default" as const };
  };

  // ✅ Helper to extract unique values
  const getUnique = (arr: string[]) => [...new Set(arr)];

  if (!products) return <CubeSpinner />;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your clothing inventory</p>
        </div>
        <Link href="/admin/products/add">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="hoodies">Hoodies</SelectItem>
                <SelectItem value="t-shirts">T-Shirts</SelectItem>
                <SelectItem value="caps">Caps</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts
          .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
          .map((product) => {
            const totalStock = getTotalStock(product);
            const stockStatus = getStockStatus(totalStock);
            const sizes = getUnique(product.variants.map((v) => v.size));
            const colors = getUnique(product.variants.map((v) => v.color));

            return (
              <Card key={product.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={
                        product.status === "active" ? "default" : "secondary"
                      }>
                      {product.status === "active" ? (
                        <>
                          <Eye className="h-3 w-3 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3 mr-1" />
                          Hidden
                        </>
                      )}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">
                        ₹{product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Badge variant={stockStatus.variant}>
                      {stockStatus.label}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Category:</span>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>

                  {(product.isNew || product.isSale) && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Tags:</span>
                      {product.isNew && <Badge variant="outline">New</Badge>}
                      {product.isSale && <Badge variant="outline">Sale</Badge>}
                    </div>
                  )}

                  <div className="pt-2">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">
                      Variants:
                    </h4>
                    <div className="overflow-auto">
                      <table className="w-full text-sm text-left border border-gray-200 rounded overflow-hidden">
                        <thead className="bg-gray-100 text-gray-600">
                          <tr>
                            <th className="px-2 py-1 border">Size</th>
                            <th className="px-2 py-1 border">Color</th>
                            <th className="px-2 py-1 border">Stock</th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.variants.map((variant, index) => (
                            <tr key={index} className="border-t">
                              <td className="px-2 py-1 border">
                                {variant.size}
                              </td>
                              <td className="px-2 py-1 border">
                                {variant.color}
                              </td>
                              <td className="px-2 py-1 border">
                                {variant.stock}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link className="w-[100%]" href={`/admin/products/${product.id}/edit`}>
                      <Button variant="outline" size="sm" className="flex-1 w-full">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleDelete(product.id)}
                      variant="outline"
                      size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>

      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No products found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}
