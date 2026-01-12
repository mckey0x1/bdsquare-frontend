"use client";

import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Edit, Trash2, Copy, Calendar, X } from "lucide-react";
import { format } from "date-fns";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COUPONS } from "@/graphql/query/queries";
import {
  CREATE_COUPON_MUTATION,
  UPDATE_COUPON_MUTATION,
  DELETE_COUPON_MUTATION
} from "@/graphql/mutation/mutations";
import { toast } from "sonner";

interface Coupon {
  id: string;
  code: string;
  type: string;
  value: number;
  minAmount: number | null;
  maxDiscount: number | null;
  validFrom: string;
  validTo: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function CouponsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [couponToDelete, setCouponToDelete] = useState<string | null>(null);

  const { data, loading, error, refetch } = useQuery(GET_COUPONS);
  const [createCoupon] = useMutation(CREATE_COUPON_MUTATION);
  const [updateCoupon] = useMutation(UPDATE_COUPON_MUTATION);
  const [deleteCoupon] = useMutation(DELETE_COUPON_MUTATION);

  const coupons: Coupon[] = data?.coupons || [];

  const [formData, setFormData] = useState({
    code: "",
    type: "fixed",
    value: "",
    minAmount: "",
    maxDiscount: "",
    validFrom: "",
    validTo: "",
    usageLimit: "100",
    isActive: true,
    description: ""
  });

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (coupon: Coupon) => {
    if (!coupon.isActive) return "secondary";
    if (isExpired(coupon.validTo)) return "destructive";
    return "default";
  };

  const isExpired = (validTo: string | null | undefined) => {
    if (!validTo) return false;
    try {
      const expiryDate = new Date(validTo);
      if (isNaN(expiryDate.getTime())) {
        return false;
      }
      return expiryDate < new Date();
    } catch (error) {
      return false;
    }
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100);
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    try {
      // Handle ISO string format or other date formats
      let date: Date;
      if (typeof dateString === "string") {
        // Try parsing as ISO string first
        date = new Date(dateString);
        // If invalid, try other common formats
        if (isNaN(date.getTime())) {
          // Try parsing with timezone offset
          date = new Date(dateString.replace(" ", "T"));
        }
      } else {
        date = new Date(dateString);
      }

      if (isNaN(date.getTime())) {
        console.warn("Invalid date:", dateString);
        return "Invalid Date";
      }
      return format(date, "PPP");
    } catch (error) {
      console.error("Error formatting date:", error, dateString);
      return "Invalid Date";
    }
  };

  const handleCreate = async () => {
    try {
      await createCoupon({
        variables: {
          data: {
            code: formData.code,
            type: formData.type,
            value: parseFloat(formData.value),
            minAmount: formData.minAmount ? parseFloat(formData.minAmount) : 0,
            maxDiscount: formData.maxDiscount
              ? parseFloat(formData.maxDiscount)
              : null,
            validFrom: formData.validFrom,
            validTo: formData.validTo,
            usageLimit: parseInt(formData.usageLimit),
            isActive: formData.isActive,
            description: formData.description || null
          }
        }
      });
      toast.success("Coupon created successfully!");
      setIsCreateDialogOpen(false);
      resetForm();
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to create coupon");
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value.toString(),
      minAmount: coupon.minAmount?.toString() || "",
      maxDiscount: coupon.maxDiscount?.toString() || "",
      validFrom: coupon.validFrom.split("T")[0],
      validTo: coupon.validTo.split("T")[0],
      usageLimit: coupon.usageLimit.toString(),
      isActive: coupon.isActive,
      description: coupon.description || ""
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedCoupon) return;

    try {
      await updateCoupon({
        variables: {
          id: selectedCoupon.id,
          data: {
            code: formData.code,
            type: formData.type,
            value: parseFloat(formData.value),
            minAmount: formData.minAmount ? parseFloat(formData.minAmount) : 0,
            maxDiscount: formData.maxDiscount
              ? parseFloat(formData.maxDiscount)
              : null,
            validFrom: formData.validFrom,
            validTo: formData.validTo,
            usageLimit: parseInt(formData.usageLimit),
            isActive: formData.isActive,
            description: formData.description || null
          }
        }
      });
      toast.success("Coupon updated successfully!");
      setIsEditDialogOpen(false);
      setSelectedCoupon(null);
      resetForm();
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to update coupon");
    }
  };

  const handleDelete = (couponId: string) => {
    setCouponToDelete(couponId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!couponToDelete) return;

    try {
      await deleteCoupon({
        variables: { id: couponToDelete }
      });
      toast.success("Coupon deleted successfully!");
      setIsDeleteDialogOpen(false);
      setCouponToDelete(null);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete coupon");
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Coupon code copied to clipboard!");
  };

  const resetForm = () => {
    setFormData({
      code: "",
      type: "fixed",
      value: "",
      minAmount: "",
      maxDiscount: "",
      validFrom: "",
      validTo: "",
      usageLimit: "100",
      isActive: true,
      description: ""
    });
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-gray-600">Loading coupons...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-600">
          Error loading coupons: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Coupons & Discounts
          </h1>
          <p className="text-gray-600">
            Manage promotional codes and discounts
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="flex items-center gap-2"
              onClick={() => resetForm()}>
              <Plus className="h-4 w-4" />
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="code">Coupon Code *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        code: e.target.value.toUpperCase()
                      })
                    }
                    placeholder="SAVE20"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Discount Type *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData({ ...formData, type: value })
                    }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                      <SelectItem value="percentage">Percentage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="value">
                    Discount Value * ({formData.type === "fixed" ? "₹" : "%"})
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) =>
                      setFormData({ ...formData, value: e.target.value })
                    }
                    placeholder={formData.type === "fixed" ? "100" : "20"}
                  />
                </div>
                <div>
                  <Label htmlFor="minAmount">Minimum Order Amount (₹)</Label>
                  <Input
                    id="minAmount"
                    type="number"
                    value={formData.minAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, minAmount: e.target.value })
                    }
                    placeholder="0"
                  />
                </div>
              </div>

              {formData.type === "percentage" && (
                <div>
                  <Label htmlFor="maxDiscount">
                    Maximum Discount (₹) - Optional
                  </Label>
                  <Input
                    id="maxDiscount"
                    type="number"
                    value={formData.maxDiscount}
                    onChange={(e) =>
                      setFormData({ ...formData, maxDiscount: e.target.value })
                    }
                    placeholder="500"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="validFrom">Valid From *</Label>
                  <Input
                    id="validFrom"
                    type="date"
                    value={formData.validFrom}
                    onChange={(e) =>
                      setFormData({ ...formData, validFrom: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="validTo">Valid To *</Label>
                  <Input
                    id="validTo"
                    type="date"
                    value={formData.validTo}
                    onChange={(e) =>
                      setFormData({ ...formData, validTo: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="usageLimit">Usage Limit *</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) =>
                      setFormData({ ...formData, usageLimit: e.target.value })
                    }
                    placeholder="100"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isActive: e.target.checked
                        })
                      }
                      className="w-4 h-4"
                    />
                    <span>Active</span>
                  </label>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Optional description"
                  rows={3}
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreateDialogOpen(false);
                    resetForm();
                  }}>
                  Cancel
                </Button>
                <Button onClick={handleCreate}>Create Coupon</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search coupon codes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coupons List */}
      <div className="space-y-4">
        {filteredCoupons.map((coupon) => {
          const expired = isExpired(coupon.validTo);
          const usagePercent = getUsagePercentage(
            coupon.usedCount,
            coupon.usageLimit
          );

          return (
            <Card key={coupon.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-lg font-semibold">
                      {coupon.code}
                    </div>
                    <div>
                      <p className="text-lg font-semibold">
                        {coupon.type === "fixed"
                          ? `₹${coupon.value} off`
                          : `${coupon.value}% off`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {coupon.type === "fixed"
                          ? "Fixed Amount"
                          : "Percentage"}{" "}
                        Discount
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {expired && <Badge variant="destructive">Expired</Badge>}
                    <Badge variant={getStatusVariant(coupon)}>
                      {coupon.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Validity Period
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>From: {formatDate(coupon.validFrom)}</p>
                      <p>To: {formatDate(coupon.validTo)}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Usage Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Used</span>
                        <span className="font-medium">
                          {coupon.usedCount} / {coupon.usageLimit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min(usagePercent, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600">
                        {usagePercent}% used
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Actions</h4>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => copyToClipboard(coupon.code)}>
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleEdit(coupon)}>
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleDelete(coupon.id)}>
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCoupons.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No coupons found matching your criteria.
          </p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Coupon</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-code">Coupon Code *</Label>
                <Input
                  id="edit-code"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      code: e.target.value.toUpperCase()
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-type">Discount Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-value">
                  Discount Value * ({formData.type === "fixed" ? "₹" : "%"})
                </Label>
                <Input
                  id="edit-value"
                  type="number"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-minAmount">Minimum Order Amount (₹)</Label>
                <Input
                  id="edit-minAmount"
                  type="number"
                  value={formData.minAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, minAmount: e.target.value })
                  }
                />
              </div>
            </div>

            {formData.type === "percentage" && (
              <div>
                <Label htmlFor="edit-maxDiscount">
                  Maximum Discount (₹) - Optional
                </Label>
                <Input
                  id="edit-maxDiscount"
                  type="number"
                  value={formData.maxDiscount}
                  onChange={(e) =>
                    setFormData({ ...formData, maxDiscount: e.target.value })
                  }
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-validFrom">Valid From *</Label>
                <Input
                  id="edit-validFrom"
                  type="date"
                  value={formData.validFrom}
                  onChange={(e) =>
                    setFormData({ ...formData, validFrom: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-validTo">Valid To *</Label>
                <Input
                  id="edit-validTo"
                  type="date"
                  value={formData.validTo}
                  onChange={(e) =>
                    setFormData({ ...formData, validTo: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-usageLimit">Usage Limit *</Label>
                <Input
                  id="edit-usageLimit"
                  type="number"
                  value={formData.usageLimit}
                  onChange={(e) =>
                    setFormData({ ...formData, usageLimit: e.target.value })
                  }
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="w-4 h-4"
                  />
                  <span>Active</span>
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setSelectedCoupon(null);
                  resetForm();
                }}>
                Cancel
              </Button>
              <Button onClick={handleUpdate}>Update Coupon</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Coupon</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Are you sure you want to delete this coupon? This action cannot be
              undone.
            </p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDeleteDialogOpen(false);
                  setCouponToDelete(null);
                }}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
