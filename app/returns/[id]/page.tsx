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
  ArrowLeft,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const returnTrackingSteps = [
  {
    status: "RETURN_REQUESTED",
    label: "Return Requested",
    completed: false
  },
  {
    status: "RETURN_APPROVED",
    label: "Return Approved",
    completed: false
  },
  {
    status: "PICKUP_SCHEDULED",
    label: "Pickup Scheduled",
    completed: false
  },
  {
    status: "PICKED_UP",
    label: "Picked Up",
    completed: false
  },
  {
    status: "RETURN_RECEIVED",
    label: "Return Received",
    completed: false
  },
  {
    status: "REFUND_PROCESSED",
    label: "Refund Processed",
    completed: false
  }
];

export default function ReturnTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const returnId = params.id as string;
  const [showPrintView, setShowPrintView] = useState(false);
  const { orders } = useAuth();

  // Find the order by ID
  const order = orders.find((order) => order.id === returnId);

  // If order not found or not returned, show error
  if (!order) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border-2 border-gray-200 p-6 text-center">
          <AlertCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Return Not Found</h1>
          <p className="text-gray-600 mb-4">
            The return order you're looking for doesn't exist.
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

  // Determine return status and update tracking steps
  const getReturnStatus = () => {
    if (order.status === "RETURNED") {
      return "RETURN_REQUESTED";
    }
    // You can add more status checks here based on your backend
    return "RETURN_REQUESTED";
  };

  const currentReturnStatus = getReturnStatus();
  const trackingSteps = returnTrackingSteps.map((step, index) => {
    const stepIndex = returnTrackingSteps.findIndex(
      (s) => s.status === currentReturnStatus
    );
    return {
      ...step,
      completed: index <= stepIndex
    };
  });

  const handlePrint = () => {
    setShowPrintView(true);
    setTimeout(() => {
      window.print();
      setShowPrintView(false);
    }, 100);
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="h-6 w-6 text-green-600" />;
    }

    switch (status) {
      case "RETURN_REQUESTED":
        return <RefreshCw className="h-6 w-6 text-orange-500" />;
      case "RETURN_APPROVED":
        return <CheckCircle className="h-6 w-6 text-blue-500" />;
      case "PICKUP_SCHEDULED":
        return <Clock className="h-6 w-6 text-gray-400" />;
      case "PICKED_UP":
        return <Truck className="h-6 w-6 text-gray-400" />;
      case "RETURN_RECEIVED":
        return <Package className="h-6 w-6 text-gray-400" />;
      case "REFUND_PROCESSED":
        return <CheckCircle className="h-6 w-6 text-gray-400" />;
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

        {/* Return Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">RETURN RECEIPT</h2>
          <div className="space-y-1">
            <p>
              <strong>Order ID:</strong> {order.id}
            </p>
            <p>
              <strong>Return Date:</strong>{" "}
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
              <p>
                {order.daddress.area}, {order.daddress.city}
              </p>
              <p>
                {order.daddress.state} - {order.daddress.pincode}
              </p>
              <p>Phone: {order.daddress.mobile}</p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-8">
          <h3 className="font-bold mb-4">RETURN ITEMS</h3>
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
        <div className="text-right">
          <p className="text-2xl font-bold">
            Refund Amount: ₹{order.totalAmount}
          </p>
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
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          <div>
            <h1 className="sm:text-3xl text-xl font-bold">Track Return</h1>
            <p className="text-gray-600">Order ID: {order?.id}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors">
            <Printer className="h-5 w-5" />
            <span>Download Receipt</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Return Status */}
          <div className="bg-white border-2 border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Return Status</h2>

            <div className="space-y-6">
              {trackingSteps.map((step, index) => (
                <div
                  key={step.status}
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
                    </div>
                  </div>
                  {index < trackingSteps.length - 1 && (
                    <div
                      className={`absolute left-3 mt-8 w-0.5 h-6 ${
                        step.completed ? "bg-green-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-orange-50 border border-orange-200">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <span className="font-semibold text-orange-800">
                  Return in Progress
                </span>
              </div>
              <p className="text-sm text-orange-700 mt-2">
                Your return request has been received. We'll process your refund
                within 5-7 business days after we receive the items.
              </p>
            </div>
          </div>

          {/* Return Items */}
          <div className="bg-white border-2 border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Return Items</h2>

            <div className="space-y-4">
              {order?.orderItems.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b pb-4">
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

            <div className="bg-white border-2 border-gray-200 p-6">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Package className="h-5 w-5 text-red-600" />
                <span>Return Information</span>
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Return ID:</span>{" "}
                  <span className="text-gray-600">{order?.id}</span>
                </p>
                <p>
                  <span className="font-semibold">Return Date:</span>{" "}
                  <span className="text-gray-600">
                    {new Date(Number(order?.createdAt)).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                      }
                    )}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="text-orange-600 font-medium">
                    {order?.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border-2 border-gray-200 p-6 sticky top-4">
            <h3 className="text-xl font-semibold mb-4">Return Summary</h3>

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
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{order?.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
            </div>

            <div className="border-t pt-3 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Refund Amount:</span>
                <span className="text-red-600">₹{order?.totalAmount}</span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded">
              <h4 className="font-semibold text-blue-800 mb-2">
                Refund Information
              </h4>
              <p className="text-sm text-blue-700">
                Your refund will be processed to your original payment method
                within 5-7 business days after we receive and inspect the
                returned items.
              </p>
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
