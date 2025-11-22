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
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Image as ImageIcon
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
  desktopImageUrl?: string | null;
  mobileImageUrl?: string | null;
  position: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function LookbookPage() {
  const [activeTab, setActiveTab] = useState<"desktop" | "mobile" | "trending">(
    "desktop"
  );
  const [isDesktopUploadDialogOpen, setIsDesktopUploadDialogOpen] =
    useState(false);
  const [isMobileUploadDialogOpen, setIsMobileUploadDialogOpen] =
    useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedDesktopFile, setSelectedDesktopFile] = useState<File | null>(
    null
  );
  const [selectedMobileFile, setSelectedMobileFile] = useState<File | null>(
    null
  );
  const [desktopPreviewUrl, setDesktopPreviewUrl] = useState<string | null>(
    null
  );
  const [mobilePreviewUrl, setMobilePreviewUrl] = useState<string | null>(null);
  const uploadDesktopInputRef = useRef<HTMLInputElement>(null);
  const uploadMobileInputRef = useRef<HTMLInputElement>(null);
  const editDesktopInputRef = useRef<HTMLInputElement>(null);
  const editMobileInputRef = useRef<HTMLInputElement>(null);
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

  // Filter banners by type - only show banners with specific device images
  const desktopBanners = banners.filter((banner) => !!banner.desktopImageUrl);
  const mobileBanners = banners.filter((banner) => !!banner.mobileImageUrl);

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

  const validateImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be less than 10MB");
      return false;
    }
    return true;
  };

  const handleDesktopSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputRef: React.RefObject<HTMLInputElement> = uploadDesktopInputRef
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateImageFile(file)) {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      return;
    }

    setSelectedDesktopFile(file);
    setDesktopPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  const handleMobileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputRef: React.RefObject<HTMLInputElement> = uploadMobileInputRef
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateImageFile(file)) {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      return;
    }

    setSelectedMobileFile(file);
    setMobilePreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  };

  const resetUploadFields = () => {
    setSelectedDesktopFile(null);
    setSelectedMobileFile(null);
    setDesktopPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setMobilePreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });

    [
      uploadDesktopInputRef,
      uploadMobileInputRef,
      editDesktopInputRef,
      editMobileInputRef
    ].forEach((ref) => {
      if (ref.current) {
        ref.current.value = "";
      }
    });
  };

  const handleDesktopUpload = async () => {
    if (!selectedDesktopFile) {
      toast.error("Please select a desktop image");
      return;
    }

    setUploading(true);
    try {
      const desktopImageUrl = await uploadImageToCloudinary(
        selectedDesktopFile
      );

      await createBanner({
        variables: {
          data: {
            imageUrl: desktopImageUrl,
            desktopImageUrl: desktopImageUrl,
            isActive: true,
            position: banners.length + 1
          }
        }
      });

      toast.success("Desktop banner uploaded successfully!");
      setIsDesktopUploadDialogOpen(false);
      setSelectedDesktopFile(null);
      setDesktopPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      if (uploadDesktopInputRef.current) {
        uploadDesktopInputRef.current.value = "";
      }
      refetch();
    } catch (error) {
      console.error("Error uploading desktop banner:", error);
      toast.error("Failed to upload desktop banner");
    } finally {
      setUploading(false);
    }
  };

  const handleMobileUpload = async () => {
    if (!selectedMobileFile) {
      toast.error("Please select a mobile image");
      return;
    }

    setUploading(true);
    try {
      const mobileImageUrl = await uploadImageToCloudinary(selectedMobileFile);

      await createBanner({
        variables: {
          data: {
            imageUrl: mobileImageUrl,
            mobileImageUrl: mobileImageUrl,
            isActive: true,
            position: banners.length + 1
          }
        }
      });

      toast.success("Mobile banner uploaded successfully!");
      setIsMobileUploadDialogOpen(false);
      setSelectedMobileFile(null);
      setMobilePreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      if (uploadMobileInputRef.current) {
        uploadMobileInputRef.current.value = "";
      }
      refetch();
    } catch (error) {
      console.error("Error uploading mobile banner:", error);
      toast.error("Failed to upload mobile banner");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (banner: Banner) => {
    resetUploadFields();
    setSelectedBanner(banner);
    setDesktopPreviewUrl(banner.desktopImageUrl ?? banner.imageUrl ?? null);
    setMobilePreviewUrl(banner.mobileImageUrl ?? null);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async (bannerId: string) => {
    setUploading(true);
    try {
      let desktopImageUrl = selectedBanner?.desktopImageUrl ?? null;
      let mobileImageUrl = selectedBanner?.mobileImageUrl ?? null;
      let primaryImageUrl = selectedBanner?.imageUrl ?? null;

      if (selectedDesktopFile) {
        desktopImageUrl = await uploadImageToCloudinary(selectedDesktopFile);
        primaryImageUrl = desktopImageUrl ?? primaryImageUrl;
      }

      if (selectedMobileFile) {
        mobileImageUrl = await uploadImageToCloudinary(selectedMobileFile);
        if (!primaryImageUrl) {
          primaryImageUrl = mobileImageUrl;
        }
      }

      if (!primaryImageUrl) {
        toast.error("Banner must include at least one image");
        return;
      }

      await updateBanner({
        variables: {
          id: bannerId,
          data: {
            imageUrl: primaryImageUrl,
            desktopImageUrl,
            mobileImageUrl,
            isActive: selectedBanner?.isActive
          }
        }
      });

      toast.success("Banner updated successfully!");
      setIsEditDialogOpen(false);
      setSelectedBanner(null);
      resetUploadFields();
      refetch();
    } catch (error) {
      console.error("Error updating banner:", error);
      toast.error("Failed to update banner");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (bannerId: string, banner: Banner) => {
    const isDesktopTab = activeTab === "desktop";
    const isMobileTab = activeTab === "mobile";

    // Check what images the banner has
    const hasDesktopImage = !!banner.desktopImageUrl;
    const hasMobileImage = !!banner.mobileImageUrl;

    // Determine what to delete
    let confirmMessage = "";
    if (isDesktopTab) {
      confirmMessage = "Are you sure you want to delete this desktop banner?";
    } else if (isMobileTab) {
      confirmMessage = "Are you sure you want to delete this mobile banner?";
    } else {
      confirmMessage = "Are you sure you want to delete this banner?";
    }

    if (!confirm(confirmMessage)) {
      return;
    }

    try {
      // If deleting from desktop tab, only remove desktop image
      if (isDesktopTab) {
        // If banner also has mobile image, just remove desktop image and keep mobile
        if (hasMobileImage) {
          await updateBanner({
            variables: {
              id: bannerId,
              data: {
                desktopImageUrl: null,
                // Keep mobile image as primary
                imageUrl: banner.mobileImageUrl
              }
            }
          });
          toast.success("Desktop banner removed successfully!");
        } else {
          // If no mobile image, delete the entire banner
          await deleteBanner({
            variables: { id: bannerId }
          });
          toast.success("Desktop banner deleted successfully!");
        }
      }
      // If deleting from mobile tab, only remove mobile image
      else if (isMobileTab) {
        // If banner also has desktop image, just remove mobile image and keep desktop
        if (hasDesktopImage) {
          await updateBanner({
            variables: {
              id: bannerId,
              data: {
                mobileImageUrl: null,
                // Keep desktop image as primary
                imageUrl: banner.desktopImageUrl
              }
            }
          });
          toast.success("Mobile banner removed successfully!");
        } else {
          // If no desktop image, delete the entire banner
          await deleteBanner({
            variables: { id: bannerId }
          });
          toast.success("Mobile banner deleted successfully!");
        }
      }
      // If deleting from other tabs (trending), delete entire banner
      else {
        await deleteBanner({
          variables: { id: bannerId }
        });
        toast.success("Banner deleted successfully!");
      }

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
          onClick={() => setActiveTab("desktop")}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === "desktop"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}>
          Desktop Banners
        </button>
        <button
          onClick={() => setActiveTab("mobile")}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === "mobile"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}>
          Mobile Banners
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

      {/* Desktop Banners Tab */}
      {activeTab === "desktop" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Dialog
              open={isDesktopUploadDialogOpen}
              onOpenChange={(open) => {
                setIsDesktopUploadDialogOpen(open);
                if (!open) {
                  setSelectedDesktopFile(null);
                  setDesktopPreviewUrl((prev) => {
                    if (prev) URL.revokeObjectURL(prev);
                    return null;
                  });
                  if (uploadDesktopInputRef.current) {
                    uploadDesktopInputRef.current.value = "";
                  }
                }
              }}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Upload Desktop Banner
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Desktop Banner</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Upload a banner image optimized for desktop views
                    (recommended: 1920×800px)
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="desktop-banner-upload">
                      Desktop Banner Image
                    </Label>
                    <Input
                      id="desktop-banner-upload"
                      type="file"
                      accept="image/*"
                      ref={uploadDesktopInputRef}
                      onChange={handleDesktopSelect}
                    />
                    <div className="relative w-full h-64 border rounded-lg overflow-hidden flex items-center justify-center bg-muted">
                      {desktopPreviewUrl ? (
                        <Image
                          src={desktopPreviewUrl}
                          alt="Desktop preview"
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-sm text-gray-500">
                          Select a desktop image to preview
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsDesktopUploadDialogOpen(false);
                        setSelectedDesktopFile(null);
                        setDesktopPreviewUrl((prev) => {
                          if (prev) URL.revokeObjectURL(prev);
                          return null;
                        });
                        if (uploadDesktopInputRef.current) {
                          uploadDesktopInputRef.current.value = "";
                        }
                      }}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDesktopUpload}
                      disabled={!selectedDesktopFile || uploading}>
                      {uploading ? "Uploading..." : "Upload"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {desktopBanners.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  No desktop banners yet. Upload your first desktop banner!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {desktopBanners.map((banner) => {
                const desktopPreview =
                  banner.desktopImageUrl?.trim() || banner.imageUrl;

                return (
                  <Card key={banner.id} className="overflow-hidden">
                    <div className="relative h-64">
                      <Image
                        src={desktopPreview}
                        alt={`Desktop Banner ${banner.id}`}
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
                        {banner.position !== null && (
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
                          onClick={() => handleDelete(banner.id, banner)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Mobile Banners Tab */}
      {activeTab === "mobile" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Dialog
              open={isMobileUploadDialogOpen}
              onOpenChange={(open) => {
                setIsMobileUploadDialogOpen(open);
                if (!open) {
                  setSelectedMobileFile(null);
                  setMobilePreviewUrl((prev) => {
                    if (prev) URL.revokeObjectURL(prev);
                    return null;
                  });
                  if (uploadMobileInputRef.current) {
                    uploadMobileInputRef.current.value = "";
                  }
                }
              }}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Upload Mobile Banner
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Mobile Banner</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Upload a banner image optimized for mobile views
                    (recommended: 1080×1350px)
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="mobile-banner-upload">
                      Mobile Banner Image
                    </Label>
                    <Input
                      id="mobile-banner-upload"
                      type="file"
                      accept="image/*"
                      ref={uploadMobileInputRef}
                      onChange={handleMobileSelect}
                    />
                    <div className="relative w-full h-64 border rounded-lg overflow-hidden flex items-center justify-center bg-muted">
                      {mobilePreviewUrl ? (
                        <Image
                          src={mobilePreviewUrl}
                          alt="Mobile preview"
                          fill
                          className="object-contain"
                        />
                      ) : (
                        <span className="text-sm text-gray-500">
                          Select a mobile image to preview
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsMobileUploadDialogOpen(false);
                        setSelectedMobileFile(null);
                        setMobilePreviewUrl((prev) => {
                          if (prev) URL.revokeObjectURL(prev);
                          return null;
                        });
                        if (uploadMobileInputRef.current) {
                          uploadMobileInputRef.current.value = "";
                        }
                      }}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleMobileUpload}
                      disabled={!selectedMobileFile || uploading}>
                      {uploading ? "Uploading..." : "Upload"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {mobileBanners.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  No mobile banners yet. Upload your first mobile banner!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mobileBanners.map((banner) => {
                const mobilePreview =
                  banner.mobileImageUrl?.trim() || banner.imageUrl;

                return (
                  <Card key={banner.id} className="overflow-hidden">
                    <div className="relative h-64">
                      <Image
                        src={mobilePreview}
                        alt={`Mobile Banner ${banner.id}`}
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
                        {banner.position !== null && (
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
                          onClick={() => handleDelete(banner.id, banner)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
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
      <Dialog
        open={isEditDialogOpen}
        onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) {
            setSelectedBanner(null);
            resetUploadFields();
          }
        }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Banner</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="edit-desktop-banner-upload">
                  Desktop Banner
                </Label>
                <div className="relative w-full h-48 border rounded-lg overflow-hidden flex items-center justify-center bg-muted">
                  {desktopPreviewUrl ||
                  selectedBanner?.desktopImageUrl ||
                  selectedBanner?.imageUrl ? (
                    <Image
                      src={
                        desktopPreviewUrl ??
                        selectedBanner?.desktopImageUrl ??
                        selectedBanner?.imageUrl ??
                        ""
                      }
                      alt="Desktop banner preview"
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-sm text-gray-500">
                      Upload a desktop banner image
                    </span>
                  )}
                </div>
                <Input
                  id="edit-desktop-banner-upload"
                  type="file"
                  accept="image/*"
                  ref={editDesktopInputRef}
                  onChange={(event) =>
                    handleDesktopSelect(event, editDesktopInputRef)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-mobile-banner-upload">Mobile Banner</Label>
                <div className="relative w-full h-48 border rounded-lg overflow-hidden flex items-center justify-center bg-muted">
                  {mobilePreviewUrl || selectedBanner?.mobileImageUrl ? (
                    <Image
                      src={
                        mobilePreviewUrl ?? selectedBanner?.mobileImageUrl ?? ""
                      }
                      alt="Mobile banner preview"
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-sm text-gray-500">
                      Upload a mobile banner image
                    </span>
                  )}
                </div>
                <Input
                  id="edit-mobile-banner-upload"
                  type="file"
                  accept="image/*"
                  ref={editMobileInputRef}
                  onChange={(event) =>
                    handleMobileSelect(event, editMobileInputRef)
                  }
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Uploading only one image will apply it across both views. Add both
              to optimize for each device.
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setSelectedBanner(null);
                  resetUploadFields();
                }}>
                Cancel
              </Button>
              <Button
                onClick={() =>
                  selectedBanner && handleUpdate(selectedBanner.id)
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
