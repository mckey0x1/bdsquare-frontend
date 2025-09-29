"use client";

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Upload, X, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const categories = [
  "T-shirts",
  "Hoodies",
  "Caps",
  "Jeans",
  "Jackets",
  "Accessories"
];
const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const availableColors = [
  "White",
  "Black",
  "Gray",
  "Navy",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Pink",
  "Purple",
  "Brown",
  "Orange"
];

export default function AddProductPage() {
  const { createProduct } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    images: [] as File[],
    features: [] as string[],
    inStock: true,
    isNew: false,
    isSale: false,
    status: "active",
    variants: [
      {
        size: "",
        color: "",
        stock: 0
      }
    ] as { size: string; color: string; stock: number }[]
  });

  const [newFeature, setNewFeature] = useState("");
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  // Remove variants with stock 0
  const filteredVariants = formData.variants.filter((v) => v.stock > 0);

  // If no valid variant left, prevent submission
  if (filteredVariants.length === 0) {
    setIsLoading(false);
    alert("At least one variant must have stock greater than 0.");
    return;
  }

  try {
    await createProduct({
      ...formData,
      variants: filteredVariants
    });
    setIsLoading(false);
    router.push("/admin/products");
  } catch (err) {
    setIsLoading(false);
    alert("Failed to create product");
  }
};


  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()]
      });
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };
  const isLastVariantComplete =
    !!formData.variants[formData.variants.length - 1].size &&
    !!formData.variants[formData.variants.length - 1].color &&
    formData.variants[formData.variants.length - 1].stock > 0;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    if (formData.images.length + files.length > 8) return;
    setFormData({
      ...formData,
      images: [...formData.images, ...files]
    });
  };

  // --- Variant Handlers ---
  const handleVariantChange = (
    idx: number,
    field: "size" | "color" | "stock",
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) =>
        i === idx ? { ...v, [field]: value } : v
      )
    }));
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { size: "", color: "", stock: 0 }]
    }));
  };

  const removeVariant = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      variants:
        prev.variants.length > 1
          ? prev.variants.filter((_, i) => i !== idx)
          : prev.variants
    }));
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-black">Add New Product</h1>
          <p className="text-black">Create a new product for your store</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Premium Cotton T-Shirt"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="A comfortable and stylish cotton t-shirt perfect for everyday wear."
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="29.99"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price (Optional)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, originalPrice: e.target.value })
                  }
                  placeholder="39.99"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Images */}
        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square relative overflow-hidden border-2 border-black bg-white">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Product image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-6 w-6 p-0"
                      onClick={() => removeImage(index)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-center mt-1 text-gray-600">
                    Image {index + 1}
                  </p>
                </div>
              ))}
              {formData.images.length < 8 && (
                <label className="aspect-square border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center hover:border-black hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-xs text-gray-600 text-center mb-2">
                    Add Image
                  </p>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    multiple
                    className="hidden"
                    onChange={handleImageChange}
                    disabled={formData.images.length >= 8}
                  />
                  <span className="text-xs text-gray-400">PNG, JPG, JPEG</span>
                </label>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Maximum 8 images allowed. Recommended size: 800x800px or larger.
            </p>
          </CardContent>
        </Card>

        {/* Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Product Variants</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.variants.map((variant, idx) => (
              <div
                key={idx}
                className="flex flex-wrap gap-4 items-end border-b pb-4 mb-4">
                <div>
                  <Label>Size</Label>
                  <Select
                    value={variant.size}
                    onValueChange={(value) =>
                      handleVariantChange(idx, "size", value)
                    }>
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Color</Label>
                  <Select
                    value={variant.color}
                    onValueChange={(value) =>
                      handleVariantChange(idx, "color", value)
                    }>
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Color" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableColors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    min={0}
                    value={variant.stock}
                    onChange={(e) =>
                      handleVariantChange(idx, "stock", Number(e.target.value))
                    }
                    className="w-24"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="h-8"
                  onClick={() => removeVariant(idx)}
                  disabled={formData.variants.length === 1}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addVariant}
              disabled={!isLastVariantComplete}>
              <Plus className="h-4 w-4 mr-1" />
              Add Variant
            </Button>
            {!isLastVariantComplete && (
              <p className="text-xs text-red-500 mt-1">
                Please select size, color, and stock for the current variant
                before adding another.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Product Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="e.g., 100% Cotton"
                className="flex-1"
              />
              <Button type="button" onClick={addFeature} variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            {formData.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="ml-2 text-black hover:text-gray-600">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Status */}
        <Card>
          <CardHeader>
            <CardTitle>Product Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, inStock: checked as boolean })
                  }
                />
                <Label htmlFor="inStock">In Stock</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isNew"
                  checked={formData.isNew}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isNew: checked as boolean })
                  }
                />
                <Label htmlFor="isNew">New Product</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isSale"
                  checked={formData.isSale}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isSale: checked as boolean })
                  }
                />
                <Label htmlFor="isSale">On Sale</Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Visibility Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active (Visible)</SelectItem>
                  <SelectItem value="hidden">Hidden</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-6">
          <Button
            type="submit"
            className="bg-black text-white hover:bg-gray-800"
            disabled={isLoading}>
            {isLoading ? "Creating Product..." : "Create Product"}
          </Button>
          <Link href="/admin/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
