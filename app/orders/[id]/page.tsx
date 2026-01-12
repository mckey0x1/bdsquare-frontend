"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Printer,
  Download,
  ArrowLeft,
  Calendar,
  CreditCard,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Mock order data - in real app this would come from API
const mockOrder = {
  id: "ORD-2024-001",
  date: "2024-01-20",
  status: "shipped",
  trackingNumber: "TRK123456789",
  estimatedDelivery: "2024-01-25",
  items: [
    {
      id: "1",
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      quantity: 2,
      size: "M",
      color: "White",
      image:
        "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg"
    },
    {
      id: "2",
      name: "Denim Jacket",
      price: 89.99,
      quantity: 1,
      size: "L",
      color: "Blue",
      image:
        "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg"
    }
  ],
  shippingAddress: {
    name: "John Doe",
    mobile: "9876543210",
    address: "123 Fashion Street, Apartment 4B",
    area: "Downtown",
    city: "New York",
    state: "NY",
    pincode: "10001"
  },
  billingAddress: {
    name: "John Doe",
    mobile: "9876543210",
    address: "123 Fashion Street, Apartment 4B",
    area: "Downtown",
    city: "New York",
    state: "NY",
    pincode: "10001"
  },
  payment: {
    method: "Credit Card",
    transactionId: "TXN789012345",
    amount: 149.97
  },
  pricing: {
    subtotal: 149.97,
    shipping: 0,
    tax: 12.0,
    total: 161.97
  }
};

const trackingSteps = [
  {
    status: "confirmed",
    label: "Order Confirmed",
    date: "2024-01-20",
    completed: true
  },
  {
    status: "processing",
    label: "Processing",
    date: "2024-01-21",
    completed: true
  },
  { status: "shipped", label: "Shipped", date: "2024-01-22", completed: true },
  {
    status: "delivered",
    label: "Delivered",
    date: "2024-01-25",
    completed: false
  }
];

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const [showPrintView, setShowPrintView] = useState(false);
  const { orders } = useAuth();

  // const order = mockOrder;

  const order = orders.find((order) => order.id === orderId);

  // Show error if order not found
  if (!order) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border-2 border-gray-200 p-6 text-center">
          <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
          <p className="text-gray-600 mb-4">
            The order you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.push("/profile")}
            className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors">
            Go to Profile
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    setShowPrintView(true);
    setTimeout(() => {
      window.print();
      setShowPrintView(false);
    }, 100);
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    // Handle both uppercase (backend) and lowercase statuses
    const statusUpper = status?.toUpperCase();

    // If completed, show green checkmark, otherwise show gray icon
    if (completed) {
      return <CheckCircle className="h-6 w-6 text-green-600" />;
    }

    // For incomplete statuses, show gray icons
    switch (statusUpper) {
      case "PENDING":
        return <Package className="h-6 w-6 text-gray-400" />;
      case "CONFIRMED":
        return <CheckCircle className="h-6 w-6 text-gray-400" />;
      case "SHIPPED":
        return <Truck className="h-6 w-6 text-gray-400" />;
      case "OUT_FOR_DELIVERY":
        return <Truck className="h-6 w-6 text-gray-400" />;
      case "DELIVERED":
        return <CheckCircle className="h-6 w-6 text-gray-400" />;
      case "CANCELLED":
        return <AlertCircle className="h-6 w-6 text-red-600" />; // Keep red for cancelled even if not completed
      case "RETURNED":
        return <RefreshCw className="h-6 w-6 text-gray-400" />;
      default:
        return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  if (showPrintView) {
    return (
      <div className="print-only bg-white p-8 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-2">BDSquare</h1>
        </div>

        {/* Invoice Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">INVOICE</h2>
          <div className="space-y-1">
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(Number(order.createdAt)).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              })}
            </p>
          </div>
        </div>

        {/* Addresses */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-3">SHIPPING ADDRESS</h3>
            <div className="text-sm space-y-1">
              <p className="font-semibold">{order.daddress.name}</p>
              {/* <p>{order.daddress.address}</p> */}
              <p>
                {order.daddress.area}, {order.daddress.city}
              </p>
              <p>
                {order.daddress.state} - {order.daddress.pincode}
              </p>
              <p>Phone: {order.daddress.mobile}</p>
            </div>
          </div>
          {/* <div>
            <h3 className="font-bold mb-3">SHIPPING ADDRESS</h3>
            <div className="text-sm space-y-1">
              <p className="font-semibold">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.area}, {order.shippingAddress.city}
              </p>
              <p>
                {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
              <p>Phone: {order.shippingAddress.mobile}</p>
            </div>
          </div> */}
        </div>

        {/* Order Items */}
        <div className="mb-8">
          <h3 className="font-bold mb-4">ORDER DETAILS</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-3 text-left">Item</th>
                <th className="border border-gray-300 p-3 text-center">Size</th>
                <th className="border border-gray-300 p-3 text-center">
                  Color
                </th>
                <th className="border border-gray-300 p-3 text-center">Qty</th>
                <th className="border border-gray-300 p-3 text-right">Price</th>
                <th className="border border-gray-300 p-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item: any) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 p-3">{item.name}</td>
                  <td className="border border-gray-300 p-3 text-center">
                    {item.size}
                  </td>
                  <td className="border border-gray-300 p-3 text-center">
                    {item.color}
                  </td>
                  <td className="border border-gray-300 p-3 text-center">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300 p-3 text-right">
                    ₹{item.price}
                  </td>
                  <td className="border border-gray-300 p-3 text-right">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="text-right space-y-2">
          {(() => {
            const subtotal = order.orderItems.reduce(
              (sum: number, item: any) => sum + item.price * item.quantity,
              0
            );
            const deliveryCharges = order.paymentMethod === "COD" ? 49 : 0;
            const discountAmount = order.discountAmount || 0;
            const total = subtotal + deliveryCharges - discountAmount;

            return (
              <>
                <div className="flex justify-end space-x-4">
                  <span>
                    Price (
                    {order.orderItems.reduce(
                      (sum: number, item: any) => sum + item.quantity,
                      0
                    )}{" "}
                    items):
                  </span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-end space-x-4">
                  <span>Delivery Charges:</span>
                  <span>
                    {deliveryCharges === 0
                      ? "FREE"
                      : `₹${deliveryCharges.toFixed(2)}`}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-end space-x-4 text-green-600">
                    <span>Discount:</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-end space-x-4 text-2xl font-bold border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span>₹{order.totalAmount}</span>
                </div>
              </>
            );
          })()}
        </div>

        <style jsx global>{`
          @media print {
            header,
            footer {
              display: none !important;
            }
            body * {
              visibility: hidden;
            }
            .print-only,
            .print-only * {
              visibility: visible;
            }
            .print-only {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex md:flex-row flex-col md:space-y-0 space-y-5 items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          {/* <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button> */}
          <div>
            <h1 className="sm:text-3xl text-xl font-bold">Track Order</h1>
            <p className="text-gray-600">Order ID: {order?.id}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors">
            <Printer className="h-5 w-5" />
            <span>Download Bill</span>
          </button>
          {/* <button
            onClick={handlePrint}
            className="flex items-center space-x-2 border-2 border-gray-300 px-4 py-2 hover:border-red-600 transition-colors">
            <Download className="h-5 w-5" />
            <span>Download</span>
          </button> */}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Status */}
          <div className="bg-white border-2 border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Order Status</h2>

            <div className="space-y-6">
              {(() => {
                // Sort tracking steps by their order: PENDING -> CONFIRMED -> SHIPPED -> OUT_FOR_DELIVERY -> DELIVERED
                const statusOrder: { [key: string]: number } = {
                  PENDING: 0,
                  CONFIRMED: 1,
                  SHIPPED: 2,
                  OUT_FOR_DELIVERY: 3,
                  DELIVERED: 4,
                  RETURNED: 6
                };

                // Filter out CANCELLED status from tracking steps
                const filteredSteps = (order?.trackingSteps || []).filter(
                  (step: any) => step.status?.toUpperCase() !== "CANCELLED"
                );

                const sortedSteps = [...filteredSteps].sort(
                  (a: any, b: any) => {
                    const orderA = statusOrder[a.status?.toUpperCase()] ?? 999;
                    const orderB = statusOrder[b.status?.toUpperCase()] ?? 999;
                    return orderA - orderB;
                  }
                );

                return sortedSteps.map((step: any, index: number) => (
                  <div
                    key={`${step.status}-${index}`}
                    className="flex items-center space-x-4 relative">
                    <div className="flex-shrink-0">
                      {getStatusIcon(step.status, step.completed)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`font-semibold ${
                            step.completed ? "text-green-600" : "text-gray-600"
                          }`}>
                          {step.label}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {step.date ? new Date(Number(step.date)).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric"
                            }
                          ) : "Pending"}
                        </span>
                      </div>
                    </div>
                    {index < sortedSteps.length - 1 && (
                      <div
                        className={`absolute left-3 mt-8 w-0.5 h-6 ${
                          step.completed ? "bg-green-600" : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                ));
              })()}
            </div>

            {/* {order.status === "shipped" && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">
                    Estimated Delivery: {order.estimatedDelivery}
                  </span>
                </div>
              </div>
            )} */}
          </div>

          {/* Order Items */}
          <div className="bg-white border-2 border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Order Items</h2>

            <div className="space-y-4">
              {order?.orderItems.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b pb-4">
                  {/* <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div> */}
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} | Color: {item.color} | Qty:{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">₹{item.price} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-gray-200 p-6">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-red-600" />
                <span>Shipping Address</span>
              </h3>
              <div className="space-y-1 text-sm">
                <p className="font-semibold">{order?.daddress.name}</p>
                <p>{order?.daddress.addressType}</p>
                <p>
                  {order?.daddress.area}, {order?.daddress.city}
                </p>
                <p>
                  {order?.daddress.state} - {order?.daddress.pincode}
                </p>
                <p className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>{order?.daddress.mobile}</span>
                </p>
              </div>
            </div>

            {/* <div className="bg-white border-2 border-gray-200 p-6">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-red-600" />
                <span>Billing Address</span>
              </h3>
              <div className="space-y-1 text-sm">
                <p className="font-semibold">{order.billingAddress.name}</p>
                <p>{order.billingAddress.address}</p>
                <p>
                  {order.billingAddress.area}, {order.billingAddress.city}
                </p>
                <p>
                  {order.billingAddress.state} - {order.billingAddress.pincode}
                </p>
                <p className="flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>{order.billingAddress.mobile}</span>
                </p>
              </div>
            </div> */}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border-2 border-gray-200 p-6 sticky top-4">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>Order Date:</span>
                <span>
                  {new Date(Number(order?.createdAt)).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric"
                    }
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span>{order?.paymentMethod}</span>
              </div>
            </div>

            <div className="border-t pt-4 space-y-3 mb-4">
              {/* Calculate subtotal from order items */}
              {(() => {
                const subtotal =
                  order?.orderItems?.reduce(
                    (sum: number, item: any) =>
                      sum + item.price * item.quantity,
                    0
                  ) || 0;
                const deliveryCharges = order?.paymentMethod === "COD" ? 49 : 0;
                const discountAmount = order?.discountAmount || 0;
                const total = subtotal + deliveryCharges - discountAmount;

                return (
                  <>
                    <div className="flex justify-between">
                      <span>
                        Price (
                        {order?.orderItems?.reduce(
                          (sum: number, item: any) => sum + item.quantity,
                          0
                        ) || 0}{" "}
                        items)
                      </span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Charges</span>
                      <span>
                        {deliveryCharges === 0
                          ? "FREE"
                          : `₹${deliveryCharges.toFixed(2)}`}
                      </span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-₹{discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            <div className="border-t pt-3 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="text-red-600">₹{order?.totalAmount}</span>
              </div>
            </div>

            <div className="space-y-3">
              {/* <button className="w-full bg-red-600 text-white py-3 px-4 hover:bg-red-700 transition-colors">
                Reorder Items
              </button> */}
              {/* <button className="w-full border-2 border-gray-300 py-3 px-4 hover:border-red-600 transition-colors">
                Need Help?
              </button> */}
            </div>

            <div className="text-sm text-gray-600 space-y-2 mt-6">
              <p className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@bdsquare.in</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+919625962784</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
