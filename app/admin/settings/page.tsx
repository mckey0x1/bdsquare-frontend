"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Save,
  Upload,
  Store,
  Truck,
  CreditCard,
  Mail,
  Shield,
  User
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AdminAccessPanel from "@/components/admin/adminaccesspanel";

export default function SettingsPage() {
  const { admin, alladmins } = useAuth();
  const [settings, setSettings] = useState({
    storeName: "ClothingStore",
    storeEmail: "admin@clothingstore.com",
    supportEmail: "support@clothingstore.com",
    phone: "+91 98765 43210",
    address: "123 Fashion Street, Mumbai, Maharashtra, India",
    currency: "INR",
    taxRate: "18",
    shippingPolicy: "free-above-2000",
    flatShippingRate: "99",
    freeShippingThreshold: "2000",
    enableCOD: true,
    enableUPI: true,
    enableCards: true,
    enableWallets: true,
    autoOrderConfirmation: true,
    lowStockThreshold: "10",
    outOfStockBehavior: "hide"
  });

  useEffect(() => {
    if (admin?.email) {
      setSettings((prev) => ({
        ...prev,
        storeEmail: admin.email
      }));
    }
  }, [admin]);

  const handleSave = () => {
    // Save settings logic
    console.log("Settings saved:", settings);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Store Settings</h1>
        <p className="text-gray-600">
          Configure your store preferences and policies
        </p>
      </div>
    

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Admin Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <Label>Email</Label>
            <div className="text-gray-800">
              {admin?.email || "Not logged in"}
            </div>
          </div>
          <div>
            <Label>User ID</Label>
            <div className="text-gray-800">{admin?.id || "N/A"}</div>
          </div>
        </CardContent>
      </Card>

      <AdminAccessPanel/>

      <div className="space-y-6">
        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Store Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  value={settings.storeName}
                  onChange={(e) =>
                    setSettings({ ...settings, storeName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeEmail">Store Email</Label>
                <Input
                  id="storeEmail"
                  type="email"
                  value={settings.storeEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, storeEmail: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) =>
                    setSettings({ ...settings, supportEmail: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) =>
                    setSettings({ ...settings, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Store Address</Label>
              <Textarea
                id="address"
                value={settings.address}
                onChange={(e) =>
                  setSettings({ ...settings, address: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Store Logo</Label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Store className="h-8 w-8 text-gray-400" />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Logo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Currency & Tax */}
        <Card>
          <CardHeader>
            <CardTitle>Currency & Tax Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={settings.currency}
                  onValueChange={(value) =>
                    setSettings({ ...settings, currency: value })
                  }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INR">INR (₹)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  value={settings.taxRate}
                  onChange={(e) =>
                    setSettings({ ...settings, taxRate: e.target.value })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Shipping Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shippingPolicy">Shipping Policy</Label>
              <Select
                value={settings.shippingPolicy}
                onValueChange={(value) =>
                  setSettings({ ...settings, shippingPolicy: value })
                }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flat-rate">Flat Rate Shipping</SelectItem>
                  <SelectItem value="free-above-2000">
                    Free Shipping Above ₹2000
                  </SelectItem>
                  <SelectItem value="always-free">
                    Always Free Shipping
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {settings.shippingPolicy === "flat-rate" && (
              <div className="space-y-2">
                <Label htmlFor="flatShippingRate">Flat Shipping Rate (₹)</Label>
                <Input
                  id="flatShippingRate"
                  type="number"
                  value={settings.flatShippingRate}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      flatShippingRate: e.target.value
                    })
                  }
                />
              </div>
            )}

            {settings.shippingPolicy === "free-above-2000" && (
              <div className="space-y-2">
                <Label htmlFor="freeShippingThreshold">
                  Free Shipping Threshold (₹)
                </Label>
                <Input
                  id="freeShippingThreshold"
                  type="number"
                  value={settings.freeShippingThreshold}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      freeShippingThreshold: e.target.value
                    })
                  }
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableCOD">Cash on Delivery (COD)</Label>
                  <p className="text-sm text-gray-600">
                    Allow customers to pay on delivery
                  </p>
                </div>
                <Switch
                  id="enableCOD"
                  checked={settings.enableCOD}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enableCOD: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableUPI">UPI Payments</Label>
                  <p className="text-sm text-gray-600">
                    Accept UPI payments (PhonePe, GPay, etc.)
                  </p>
                </div>
                <Switch
                  id="enableUPI"
                  checked={settings.enableUPI}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enableUPI: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableCards">Credit/Debit Cards</Label>
                  <p className="text-sm text-gray-600">Accept card payments</p>
                </div>
                <Switch
                  id="enableCards"
                  checked={settings.enableCards}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enableCards: checked })
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableWallets">Digital Wallets</Label>
                  <p className="text-sm text-gray-600">
                    Accept wallet payments (Paytm, Amazon Pay, etc.)
                  </p>
                </div>
                <Switch
                  id="enableWallets"
                  checked={settings.enableWallets}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, enableWallets: checked })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoOrderConfirmation">
                  Automatic Order Confirmation
                </Label>
                <p className="text-sm text-gray-600">
                  Send email confirmation when orders are placed
                </p>
              </div>
              <Switch
                id="autoOrderConfirmation"
                checked={settings.autoOrderConfirmation}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoOrderConfirmation: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Inventory Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Inventory Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lowStockThreshold">
                  Low Stock Alert Threshold
                </Label>
                <Input
                  id="lowStockThreshold"
                  type="number"
                  value={settings.lowStockThreshold}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      lowStockThreshold: e.target.value
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="outOfStockBehavior">
                  Out of Stock Behavior
                </Label>
                <Select
                  value={settings.outOfStockBehavior}
                  onValueChange={(value) =>
                    setSettings({ ...settings, outOfStockBehavior: value })
                  }>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hide">Hide Product</SelectItem>
                    <SelectItem value="show">Show as Out of Stock</SelectItem>
                    <SelectItem value="backorder">Allow Backorders</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
