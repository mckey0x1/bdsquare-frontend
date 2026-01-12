"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Search, AlertTriangle, Package, Edit } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { Product, ProductVariant } from "@/lib/types"; // Adjust path as needed
import Link from "next/link";

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const { products } = useAuth();

  // Flatten product variants with product info
  const allVariants = products.flatMap((product: Product) =>
    product.variants.map((variant: ProductVariant) => ({
      ...variant,
      productId: product.id,
      productTitle: product.name,
      price: product.price
    }))
  );

  const filteredVariants = allVariants.filter((variant) => {
    const matchesSearch = variant.productTitle
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "low" && variant.stock <= 10 && variant.stock > 0) ||
      (stockFilter === "out" && variant.stock === 0) ||
      (stockFilter === "available" && variant.stock > 10);
    return matchesSearch && matchesStock;
  });

  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return {
        label: "Out of Stock",
        variant: "destructive" as const,
        icon: AlertTriangle
      };
    if (stock <= 10)
      return {
        label: "Low Stock",
        variant: "secondary" as const,
        icon: AlertTriangle
      };
    return { label: "In Stock", variant: "default" as const, icon: Package };
  };

  const lowStockCount = allVariants.filter(
    (v) => v.stock <= 10 && v.stock > 0
  ).length;
  const outOfStockCount = allVariants.filter((v) => v.stock === 0).length;
  const totalVariants = allVariants.length;

  console.log(products)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Inventory Management
          </h1>
          <p className="text-gray-600">
            Track and manage stock levels across all variants
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Variants</p>
                <p className="text-2xl font-bold">{totalVariants}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold">{lowStockCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold">{outOfStockCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Items</SelectItem>
                <SelectItem value="available">In Stock (&gt;10)</SelectItem>
                <SelectItem value="low">Low Stock (≤10)</SelectItem>
                <SelectItem value="out">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-4 font-medium text-gray-900">Product</th>
                  <th className="pb-4 font-medium text-gray-900">Size</th>
                  <th className="pb-4 font-medium text-gray-900">Color</th>
                  <th className="pb-4 font-medium text-gray-900">Stock</th>
                  <th className="pb-4 font-medium text-gray-900">Status</th>
                  <th className="pb-4 font-medium text-gray-900">Price</th>
                  <th className="pb-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredVariants.map((variant) => {
                  const stockStatus = getStockStatus(variant.stock);
                  const StatusIcon = stockStatus.icon;

                  return (
                    <tr key={variant.id} className="hover:bg-gray-50">
                      <td className="py-4">
                        <div className="font-medium">
                          {variant.productTitle}
                        </div>
                        <div className="text-sm text-gray-600">
                          ID: {variant.productId}
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge variant="outline">{variant.size}</Badge>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{
                              backgroundColor: variant.color.toLowerCase()
                            }}
                          />
                          <span className="text-sm">{variant.color}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-lg font-semibold">
                          {variant.stock}
                        </span>
                      </td>
                      <td className="py-4">
                        <Badge
                          variant={stockStatus.variant}
                          className="flex items-center gap-1 w-fit">
                          <StatusIcon className="h-3 w-3" />
                          {stockStatus.label}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <span className="font-medium">
                          ₹{variant.price.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4">
                        <Link href={`/admin/products/${variant.productId}/edit`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1">
                            <Edit className="h-3 w-3" />
                            Update
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredVariants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No inventory items found matching your criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
