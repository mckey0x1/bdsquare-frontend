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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockOrders } from "@/lib/mock-data";
import { Search, Eye, Printer, Truck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function OrdersPage() {
  const { allOrders } = useAuth();
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [updateStatusDialog, setUpdateStatusDialog] = useState(false);
  const [viewDetailsDialog, setViewDetailsDialog] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [statusNote, setStatusNote] = useState("");

  // filter then sort by createdAt descending so latest orders appear first
const filteredOrders = (allOrders || [])
  .filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.daddress?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.daddress?.mobile?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  })
  .sort((a, b) => {
    // Safely parse dates and handle invalid dates
    let dateA = new Date(a.createdAt).getTime();
    let dateB = new Date(b.createdAt).getTime();

    // If invalid dates, try parsing as timestamps
    if (isNaN(dateA)) dateA = Number(a.createdAt);
    if (isNaN(dateB)) dateB = Number(b.createdAt);

    // Fallback to 0 if still invalid
    if (isNaN(dateA)) dateA = 0;
    if (isNaN(dateB)) dateB = 0;

    return dateB - dateA; // Sort descending (newest first)
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "processing":
        return "default";
      case "shipped":
        return "outline";
      case "delivered":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getPaymentStatusVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const handleUpdateStatus = (order: any) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setTrackingNumber("");
    setStatusNote("");
    setUpdateStatusDialog(true);
  };

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
    setViewDetailsDialog(true);
  };

  const handlePrintInvoice = (order: any) => {
    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${order.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .company-name { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .invoice-title { font-size: 20px; color: #666; }
            .section { margin: 20px 0; }
            .section-title { font-size: 16px; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .info-item { margin-bottom: 5px; }
            .label { font-weight: bold; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f5f5f5; }
            .total-row { font-weight: bold; background-color: #f9f9f9; }
            .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-name">BDsquare</div>
            <div class="invoice-title">INVOICE</div>
          </div>
          
          <div class="section">
            <div class="info-grid">
              <div>
                <div class="section-title">Invoice Details</div>
                <div class="info-item"><span class="label">Invoice #:</span> ${
                  order.id
                }</div>
                <div class="info-item"><span class="label">Date:</span> ${new Date(
                  Number(order.createdAt)
                ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric"
                })}
</div>
                <div class="info-item"><span class="label">Status:</span> ${
                  order.status.charAt(0).toUpperCase() + order.status.slice(1)
                }</div>
                <div class="info-item"><span class="label">Payment:</span> ${
                  order.payment.status.charAt(0).toUpperCase() +
                  order.payment.status.slice(1)
                }</div>
              </div>
              <div>
                <div class="section-title">Customer Details</div>
                <div class="info-item"><span class="label">Name:</span> ${
                  order.daddress.name
                }</div>
                <div class="info-item"><span class="label">Phone:</span> ${
                  order.daddress.mobile
                }</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Shipping Address</div>
            <div>${order.daddress.area}</div>
            <div>${order.daddress.city}, ${order.daddress.state}</div>
            <div>${order.daddress.pincode}</div>
          </div>

          <div class="section">
            <div class="section-title">Order Items</div>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${order.orderItems
                  .map(
                    (item: any) => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.size}</td>
                    <td>${item.color}</td>
                    <td>${item.quantity}</td>
                    <td>₹${item.price.toLocaleString()}</td>
                    <td>₹${(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                `
                  )
                  .join("")}
                <tr class="total-row">
                  <td colspan="5">Total Amount</td>
                  <td>₹${order.totalAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="footer">
            <p>Thank you for your business!</p>
            <p>For any queries, contact us at support@bdsquare.in</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    printWindow.print();
  };

  const saveStatusUpdate = () => {
    if (!selectedOrder) return;

    const updatedOrders = allOrders.map((order) =>
      order.id === selectedOrder.id
        ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
        : order
    );

    setOrders(updatedOrders);
    setUpdateStatusDialog(false);
    setSelectedOrder(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">
            Manage customer orders and fulfillment
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search orders, customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{order.id}</h3>
                  <p className="text-gray-600">
                    {order.daddress.name} • {order.daddress.mobile}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusVariant(order.status)}>
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                  <Badge
                    variant={getPaymentStatusVariant(order.payment?.status)}>
                    Payment {order.payment?.status}
                  </Badge>
                  {(order.AWB || order.ShippingMsg) && (
                    <Badge variant="destructive">
                      AWB {order.AWB || order.ShippingMsg || "N/A"}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h4 className="font-medium mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {order.orderItems.map((item: any, index: any) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">
                            Size: {item.size} • Color: {item.color} • Qty:{" "}
                                {item.quantity} • Batch No: {item.batchNo}      
                          </p>
                        </div>
                        <span className="font-semibold">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Shipping Address</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{order.daddress.area}</p>
                    <p>
                      {order.daddress.city}, {order.daddress.state}
                    </p>
                    <p>{order.daddress.pincode}</p>
                    <p>{order.daddress.country}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between font-semibold">
                      <span>Total:</span>
                      <span>₹{order.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleViewDetails(order)}>
                  <Eye className="h-4 w-4" />
                  View Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleUpdateStatus(order)}>
                  <Truck className="h-4 w-4" />
                  Update Status
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handlePrintInvoice(order)}>
                  <Printer className="h-4 w-4" />
                  Print Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No orders found matching your criteria.
          </p>
        </div>
      )}

      {/* Update Status Dialog */}
      <Dialog open={updateStatusDialog} onOpenChange={setUpdateStatusDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="orderInfo" className="text-sm font-medium">
                Order
              </Label>
              <p className="text-sm text-gray-600">
                {selectedOrder?.id} - {selectedOrder?.daddress.name}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">New Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newStatus === "shipped" && (
              <div className="space-y-2">
                <Label htmlFor="tracking">Tracking Number</Label>
                <Input
                  id="tracking"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="note">Status Note (Optional)</Label>
              <Textarea
                id="note"
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="Add a note about this status update..."
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={saveStatusUpdate} className="flex-1">
                Update Status
              </Button>
              <Button
                variant="outline"
                onClick={() => setUpdateStatusDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={viewDetailsDialog} onOpenChange={setViewDetailsDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Order Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Order ID:</span>{" "}
                      {selectedOrder.id}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{" "}
                      {new Date(
                        Number(selectedOrder.createdAt)
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>
                      <Badge
                        variant={getStatusVariant(selectedOrder.status)}
                        className="ml-2">
                        {selectedOrder.status.charAt(0).toUpperCase() +
                          selectedOrder.status.slice(1)}
                      </Badge>
                    </p>
                    <p>
                      <span className="font-medium">Payment:</span>
                      <Badge
                        variant={getPaymentStatusVariant(
                          selectedOrder.payment.status
                        )}
                        className="ml-2">
                        {selectedOrder.payment.status.charAt(0).toUpperCase() +
                          selectedOrder.payment.status.slice(1)}
                      </Badge>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Name:</span>{" "}
                      {selectedOrder.daddress.name}
                    </p>
                    <p>
                      <span className="font-medium">Mobile:</span>{" "}
                      {selectedOrder.daddress.mobile}
                    </p>
                    <p>
                      <span className="font-medium">Customer ID:</span>{" "}
                      {selectedOrder.daddress.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h4 className="font-medium mb-2">Shipping Address</h4>
                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                  <p>{selectedOrder.daddress.area}</p>
                  <p>
                    {selectedOrder.daddress.city},{" "}
                    {selectedOrder.daddress.state}
                  </p>
                  <p>{selectedOrder.daddress.pincode}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-medium mb-2">Order Items</h4>
                <div className="space-y-2">
                  {selectedOrder.orderItems.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Size: {item.size} • Color: {item.color} • Qty:{" "}
                          {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          ₹{item.price.toLocaleString()} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total Amount:</span>
                  <span>₹{selectedOrder.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button
                  onClick={() => {
                    setViewDetailsDialog(false);
                    handleUpdateStatus(selectedOrder);
                  }}
                  className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  Update Status
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handlePrintInvoice(selectedOrder)}
                  className="flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  Print Invoice
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
