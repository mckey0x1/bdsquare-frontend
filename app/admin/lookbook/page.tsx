"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Plus,
  Upload,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  X
} from "lucide-react";
import Image from "next/image";
import { useMutation, useQuery, useApolloClient } from "@apollo/client";
import { GET_BANNERS, GET_PRODUCTS } from "@/graphql/query/queries";
import {
  CREATE_BANNER_MUTATION,
  UPDATE_BANNER_MUTATION,
  DELETE_BANNER_MUTATION,
  TOGGLE_PRODUCT_TRENDING_MUTATION
} from "@/graphql/mutation/mutations";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Search, Star, StarOff } from "lucide-react";

interface Banner {
  id: string;
  imageUrl: string;
  position: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function LookbookPage() {
  const [activeTab, setActiveTab] = useState("banners");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, loading, error, refetch } = useQuery(GET_BANNERS);
  const { products } = useAuth();
  const client = useApolloClient();
  const [createBanner] = useMutation(CREATE_BANNER_MUTATION);
  const [updateBanner] = useMutation(UPDATE_BANNER_MUTATION);
  const [deleteBanner] = useMutation(DELETE_BANNER_MUTATION);
  const [toggleTrending] = useMutation(TOGGLE_PRODUCT_TRENDING_MUTATION, {
    refetchQueries: [{ query: GET_PRODUCTS }],
    awaitRefetchQueries: true,
    update: (cache, { data }) => {
      if (data?.toggleProductTrending) {
        // Update the cache immediately for instant UI update
        const existingProducts = cache.readQuery<{ products: any[] }>({
          query: GET_PRODUCTS
        });

        if (existingProducts) {
          cache.writeQuery({
            query: GET_PRODUCTS,
            data: {
              products: existingProducts.products.map((product) =>
                product.id === data.toggleProductTrending.id
                  ? {
                      ...product,
                      isTrending: data.toggleProductTrending.isTrending
                    }
                  : product
              )
            }
          });
        }
      }
    }
  });

  const banners: Banner[] = data?.banners || [];

  // Local state for products to enable immediate UI updates
  const [localProducts, setLocalProducts] = useState(products);

  // Sync local products with AuthContext products
  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  // Filter products for trending section
  const filteredProducts = localProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const trendingProducts = filteredProducts.filter((p) => p.isTrending);
  const nonTrendingProducts = filteredProducts.filter((p) => !p.isTrending);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size must be less than 10MB");
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image");
      return;
    }

    setUploading(true);
    try {
      // Upload to Cloudinary
      const imageUrl = await uploadImageToCloudinary(selectedFile);

      // Create banner with the Cloudinary URL
      await createBanner({
        variables: {
          data: {
            imageUrl,
            isActive: true,
            position: banners.length + 1
          }
        }
      });

      toast.success("Banner uploaded successfully!");
      setIsUploadDialogOpen(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      refetch();
    } catch (error) {
      console.error("Error uploading banner:", error);
      toast.error("Failed to upload banner");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (banner: Banner) => {
    setSelectedBanner(banner);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async (bannerId: string, newFile: File | null) => {
    setUploading(true);
    try {
      let imageUrl = selectedBanner?.imageUrl;

      // If a new file is selected, upload it to Cloudinary
      if (newFile) {
        imageUrl = await uploadImageToCloudinary(newFile);
      }

      await updateBanner({
        variables: {
          id: bannerId,
          data: {
            imageUrl,
            isActive: selectedBanner?.isActive
          }
        }
      });

      toast.success("Banner updated successfully!");
      setIsEditDialogOpen(false);
      setSelectedBanner(null);
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      refetch();
    } catch (error) {
      console.error("Error updating banner:", error);
      toast.error("Failed to update banner");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (bannerId: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) {
      return;
    }

    try {
      await deleteBanner({
        variables: { id: bannerId }
      });
      toast.success("Banner deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Error deleting banner:", error);
      toast.error("Failed to delete banner");
    }
  };

  const handleToggleActive = async (banner: Banner) => {
    try {
      await updateBanner({
        variables: {
          id: banner.id,
          data: {
            isActive: !banner.isActive
          }
        }
      });
      toast.success(
        `Banner ${!banner.isActive ? "activated" : "deactivated"}!`
      );
      refetch();
    } catch (error) {
      console.error("Error toggling banner status:", error);
      toast.error("Failed to update banner status");
    }
  };

  const handleToggleTrending = async (
    productId: string,
    currentStatus: boolean
  ) => {
    // Optimistically update local state for immediate UI feedback
    setLocalProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, isTrending: !currentStatus }
          : product
      )
    );

    try {
      await toggleTrending({
        variables: {
          id: productId,
          isTrending: !currentStatus
        }
      });

      // Refetch products to sync with server
      const { data } = await client.query({
        query: GET_PRODUCTS,
        fetchPolicy: "network-only"
      });

      // Update local state with fresh data
      if (data?.products) {
        setLocalProducts(data.products);
      }

      toast.success(
        `Product ${
          !currentStatus ? "marked as trending" : "removed from trending"
        }!`
      );
    } catch (error) {
      console.error("Error toggling trending status:", error);
      // Revert optimistic update on error
      setLocalProducts(products);
      toast.error("Failed to update trending status");
    }
  };

  const getProductImage = (product: any) => {
    if (!product?.images || product.images.length === 0)
      return "/placeholder.jpg";
    const firstImage = product.images[0];
    if (firstImage?.urls && firstImage.urls.length > 0) {
      return firstImage.urls[0];
    }
    return "/placeholder.jpg";
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-gray-600">Loading banners...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600">
          Error loading banners: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Lookbook & Banners
          </h1>
          <p className="text-gray-600">
            Manage your homepage banners and trending products
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("banners")}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === "banners"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}>
          Homepage Banners
        </button>
        <button
          onClick={() => setActiveTab("trending")}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === "trending"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}>
          Trending Products
        </button>
      </div>

      {activeTab === "banners" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Dialog
              open={isUploadDialogOpen}
              onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Upload Banner
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Banner Image</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="banner-upload">Select Image</Label>
                    <Input
                      id="banner-upload"
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="mt-2"
                    />
                  </div>
                  {previewUrl && (
                    <div className="relative w-full h-64 border rounded-lg overflow-hidden">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsUploadDialogOpen(false);
                        setSelectedFile(null);
                        setPreviewUrl(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = "";
                        }
                      }}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleUpload}
                      disabled={!selectedFile || uploading}>
                      {uploading ? "Uploading..." : "Upload"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {banners.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  No banners yet. Upload your first banner image!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {banners.map((banner) => (
                <Card key={banner.id} className="overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={banner.imageUrl}
                      alt={`Banner ${banner.id}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Badge
                        variant={banner.isActive ? "default" : "secondary"}>
                        {banner.isActive ? (
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
                      {banner.position && (
                        <Badge variant="outline">
                          Position {banner.position}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleEdit(banner)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleActive(banner)}>
                        {banner.isActive ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(banner.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "trending" && (
        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Trending Products Section */}
          {trendingProducts.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Currently Trending</h2>
                <Badge variant="default" className="bg-red-600">
                  {trendingProducts.length} products
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trendingProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={getProductImage(product)}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="default" className="bg-red-600">
                          <Star className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1 truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        ₹{product.price}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleToggleTrending(product.id, true)}>
                        <StarOff className="h-4 w-4 mr-1" />
                        Remove from Trending
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* All Products Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">All Products</h2>
              <Badge variant="outline">
                {nonTrendingProducts.length} products
              </Badge>
            </div>
            {nonTrendingProducts.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-600">
                    {searchTerm
                      ? "No products found matching your search"
                      : "All products are marked as trending"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nonTrendingProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={getProductImage(product)}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1 truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        ₹{product.price}
                      </p>
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full bg-red-600 hover:bg-red-700"
                        onClick={() => handleToggleTrending(product.id, false)}>
                        <Star className="h-4 w-4 mr-1" />
                        Mark as Trending
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Banner</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedBanner && (
              <div className="relative w-full h-64 border rounded-lg overflow-hidden">
                <Image
                  src={previewUrl || selectedBanner.imageUrl}
                  alt="Banner"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div>
              <Label htmlFor="edit-banner-upload">
                Replace Image (optional)
              </Label>
              <Input
                id="edit-banner-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (!file.type.startsWith("image/")) {
                      toast.error("Please select an image file");
                      return;
                    }
                    if (file.size > 10 * 1024 * 1024) {
                      toast.error("Image size must be less than 10MB");
                      return;
                    }
                    setSelectedFile(file);
                    const url = URL.createObjectURL(file);
                    setPreviewUrl(url);
                  }
                }}
                className="mt-2"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setSelectedBanner(null);
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}>
                Cancel
              </Button>
              <Button
                onClick={() =>
                  selectedBanner &&
                  handleUpdate(selectedBanner.id, selectedFile)
                }
                disabled={uploading}>
                {uploading ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
