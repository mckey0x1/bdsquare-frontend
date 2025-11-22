"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/cart-context";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Plus,
  Edit,
  Trash2,
  CreditCard,
  Smartphone,
  Building,
  Wallet,
  Check,
  ArrowLeft,
  Tag,
  X
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import CubeSpinner from "@/components/cube-loader";
import Script from "next/script";
import { useLazyQuery } from "@apollo/client";
import { VALIDATE_COUPON } from "@/graphql/query/queries";
import { toast } from "sonner";

function ConfirmDeleteModal({ open, onClose, onConfirm }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Delete Address?</h2>
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete this address?
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

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const {
    addresses,
    setAddresses,
    addressFunc,
    user,
    RedCubeLoader,
    UpdateAddress,
    deleteAddress,
    CreateOrder
  } = useAuth();

  const [activeAccordion, setActiveAccordion] = useState<string>("address");
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [editingAddress, setEditingAddress] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  const [validateCoupon] = useLazyQuery(VALIDATE_COUPON);

  const [newAddress, setNewAddress] = useState({
    name: "",
    mobile: "",
    pincode: "",
    area: "",
    city: "",
    state: "",
    addressType: "Home",
    isDefault: false
  });

  // Initialize selected address with default address
  // useEffect(() => {
  //   const defaultAddress = addresses.find((addr) => addr.isDefault);
  //   if (defaultAddress) {
  //     setSelectedAddress(defaultAddress.id);
  //   }
  // }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const [shipping, setShipping] = useState<number | undefined>(undefined);
  const tax = subtotal * 0.08;
  const total = subtotal + (shipping ?? 0) - discountAmount;

  const paymentOptions = [
    {
      id: "ONLINE",
      name: "Pay Online",
      icon: Smartphone,
      description: "Pay using UPI, Card, Net Banking"
    },
    {
      id: "COD",
      name: "Cash on Delivery",
      icon: Building,
      description: "Pay when you receive"
    }
  ];

  useEffect(() => {
    if (!user && !RedCubeLoader) {
      redirect("/");
    }
  }, [user, RedCubeLoader]);

  // Update delivery charges based on payment method selection
  useEffect(() => {
    if (selectedPayment === "COD") {
      setShipping(49);
    } else if (selectedPayment === "ONLINE") {
      setShipping(0);
    } else {
      setShipping(undefined);
    }
  }, [selectedPayment]);

  if (RedCubeLoader) return <CubeSpinner />;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <button
            onClick={() => router.push("/products")}
            className="bg-red-600 text-white px-8 py-3 font-semibold hover:bg-red-700 transition-colors">
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? "" : section);
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    await addressFunc(newAddress);

    setNewAddress({
      name: "",
      mobile: "",
      pincode: "",
      area: "",
      city: "",
      state: "",
      addressType: "Home",
      isDefault: false
    });

    setShowAddressForm(false);
  };

  const handleEditAddress = async (addressId: string) => {
    const address = user?.addresses?.find((addr) => addr.id === addressId);
    if (address) {
      setNewAddress({
        name: address.name,
        mobile: address.mobile,
        pincode: address.pincode,
        area: address.area,
        city: address.city,
        state: address.state,
        addressType: address.addressType,
        isDefault: address.isDefault
      });
      setEditingAddress(addressId);
      setShowAddressForm(true);
    }
  };

  const handleUpdateAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedAddress = {
      id: editingAddress,
      ...newAddress
    };

    setAddresses(
      addresses.map((addr) =>
        addr.id === editingAddress ? { ...addr, ...newAddress } : addr
      )
    );
    setNewAddress({
      name: "",
      mobile: "",
      pincode: "",
      area: "",
      city: "",
      state: "",
      addressType: "Home",
      isDefault: false
    });
    setEditingAddress("");
    await UpdateAddress(updatedAddress);
    setShowAddressForm(false);
  };

  const handleDeleteAddress = async (addressId: string) => {
    setAddressToDelete(addressId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!addressToDelete) return;

    const updatedAddresses = addresses.filter(
      (addr) => addr.id !== addressToDelete
    );
    setAddresses(updatedAddresses);

    if (selectedAddress === addressToDelete) {
      setSelectedAddress("");
    }
    await deleteAddress(addressToDelete);

    const deletedAddress = addresses.find(
      (addr) => addr.id === addressToDelete
    );
    if (deletedAddress?.isDefault && updatedAddresses.length > 0) {
      const newAddresses = updatedAddresses.map((addr, index) =>
        index === 0
          ? { ...addr, isDefault: true }
          : { ...addr, isDefault: false }
      );
      setAddresses(newAddresses);
      setSelectedAddress(newAddresses[0].id);
    }

    // Reset modal state
    setAddressToDelete(null);
    setShowConfirmModal(false);
  };

  const handleSetDefaultAddress = (addressId: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId
      }))
    );
  };

  const handleCancelEdit = () => {
    setNewAddress({
      name: "",
      mobile: "",
      pincode: "",
      area: "",
      city: "",
      state: "",
      addressType: "Home",
      isDefault: false
    });
    setEditingAddress("");
    setShowAddressForm(false);
  };
  console.log(cartItems);

  const handlePlaceOrder = async () => {
    if (!selectedAddress || !selectedPayment) {
      alert("Please select delivery address and payment method");
      return;
    }

    const selectedAddressDetails = user?.addresses?.find(
      (addr) => addr.id === selectedAddress
    );

    // Convert address object to a single string
    const shippingAddressString = selectedAddressDetails
      ? `${selectedAddressDetails.name}, ${selectedAddressDetails.mobile}, ${selectedAddressDetails.addressType}, ${selectedAddressDetails.area}, ${selectedAddressDetails.city}, ${selectedAddressDetails.state}, ${selectedAddressDetails.pincode}`
      : null;

    const payload = {
      items: cartItems.map((item) => ({
        price: item.product?.price || null,
        productId: item.product?.id || null,
        quantity: item.quantity || null,
        color: item.color || null,
        size: item.size || null,
        name: item.product?.name || null,
        batchNo: item.batchNo || null
      })),
      paymentMethod: selectedPayment || null,
      shippingAddress: shippingAddressString || null,
      name: selectedAddressDetails?.name,
      addressType: selectedAddressDetails?.addressType,
      area: selectedAddressDetails?.area,
      city: selectedAddressDetails?.city,
      state: selectedAddressDetails?.state,
      pincode: selectedAddressDetails?.pincode,
      mobile: selectedAddressDetails?.mobile,
      totalAmount: total || null,
      userId: user?.id || null,
      couponId: appliedCoupon?.id || null,
      discountAmount: discountAmount || null
    };

    try {
      const response = await CreateOrder(payload);

      // Clear the cart
      clearCart();

      // Check if order was created successfully and has an ID
      if (response?.order?.id) {
        // Redirect to order details page
        router.push(`/orders/${response.order.id}`);
      } else {
        console.error("Order created but no ID returned");
        // Fallback to orders page if no specific ID
        router.push("/checkout");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      // alert("There was an error creating your order. Please try again.");
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsValidatingCoupon(true);
    try {
      const { data } = await validateCoupon({
        variables: {
          input: {
            code: couponCode.toUpperCase(),
            totalAmount: subtotal + (shipping ?? 0)
          }
        }
      });

      if (data?.validateCoupon?.valid) {
        setAppliedCoupon(data.validateCoupon.coupon);
        setDiscountAmount(data.validateCoupon.discountAmount);
        toast.success(data.validateCoupon.message || "Coupon applied successfully!");
        setCouponCode("");
      } else {
        toast.error(data?.validateCoupon?.message || "Invalid coupon code");
        setAppliedCoupon(null);
        setDiscountAmount(0);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to validate coupon");
      setAppliedCoupon(null);
      setDiscountAmount(0);
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponCode("");
    toast.success("Coupon removed");
  };

  const canProceedToPayment = selectedAddress !== "";
  const canPlaceOrder = selectedAddress !== "" && selectedPayment !== "";

  const handleAddressFunc = () => {
    setNewAddress({
      name: "",
      mobile: "",
      pincode: "",
      area: "",
      city: "",
      state: "",
      addressType: "Home",
      isDefault: false
    });
    setShowAddressForm(!showAddressForm);
  };

  return (
    <>
      {/* Razorpay Checkout script */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors mr-4">
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Flow */}
          <div className="lg:col-span-2 space-y-4">
            {/* 1. Delivery Address */}
            <div className="border border-gray-200">
              <button
                onClick={() => toggleAccordion("address")}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 flex items-center justify-center text-white font-bold ${
                      selectedAddress ? "bg-green-600" : "bg-red-600"
                    }`}>
                    {selectedAddress ? <Check className="h-5 w-5" /> : "1"}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Delivery Address</h3>
                    {selectedAddress && (
                      <p className="text-sm text-gray-600">
                        {
                          user?.addresses?.find((a) => a.id === selectedAddress)
                            ?.name
                        }
                      </p>
                    )}
                  </div>
                </div>
                {activeAccordion === "address" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              {activeAccordion === "address" && (
                <div className="p-6 space-y-4">
                  {/* Existing Addresses */}
                  <div className="space-y-3">
                    {user?.addresses?.map((address) => (
                      <div
                        key={address.id}
                        className={`border p-4 cursor-pointer transition-colors ${
                          selectedAddress === address.id
                            ? "border-red-600 bg-red-50"
                            : "border-gray-200 hover:border-red-300"
                        }`}
                        onClick={() => setSelectedAddress(address.id)}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-semibold">{address.name}</h4>
                              <span className="bg-gray-200 text-gray-700 px-2 py-1 text-xs">
                                {address.addressType}
                              </span>
                              {address.isDefault && (
                                <span className="bg-green-600 text-white px-2 py-1 text-xs">
                                  DEFAULT
                                </span>
                              )}
                            </div>
                            <p className="text-gray-700 mb-1">
                              {address.area}, {address.city}, {address.state} -{" "}
                              {address.pincode}
                            </p>
                            <p className="text-gray-600 text-sm">
                              Mobile: {address.mobile}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-500 hover:text-red-600 transition-colors">
                              <Edit
                                className="h-4 w-4"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditAddress(address.id);
                                }}
                              />
                            </button>
                            <button
                              className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAddress(address.id);
                              }}>
                              <Trash2 className="h-4 w-4" />
                            </button>
                            {/* {!address?.isDefault && (
                            <button
                              className="px-2 py-1 text-xs border border-gray-300 hover:border-red-600 hover:text-red-600 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetDefaultAddress(address.id);
                              }}>
                              Set Default
                            </button>
                          )} */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Address Button */}
                  <button
                    onClick={() => handleAddressFunc()}
                    className="w-full border border-dashed border-gray-300 p-4 text-gray-600 hover:border-red-600 hover:text-red-600 transition-colors flex items-center justify-center space-x-2">
                    <Plus className="h-5 w-5" />
                    <span>Add New Address</span>
                  </button>

                  {/* New Address Form */}
                  {showAddressForm && (
                    <form
                      onSubmit={
                        editingAddress ? handleUpdateAddress : handleAddAddress
                      }
                      className="border border-gray-200 p-4 space-y-4">
                      <h4 className="font-semibold mb-4">
                        {editingAddress ? "Edit Address" : "Add New Address"}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={newAddress.name}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                name: e.target.value
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 focus:border-red-600 outline-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Mobile Number *
                          </label>
                          <input
                            type="tel"
                            value={newAddress.mobile}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                mobile: e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 10)
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 focus:border-red-600 outline-none"
                            placeholder="10-digit mobile number"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Pincode *
                          </label>
                          <input
                            type="text"
                            value={newAddress.pincode}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                pincode: e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 6)
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 focus:border-red-600 outline-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Area/Locality *
                          </label>
                          <input
                            type="text"
                            value={newAddress.area}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                area: e.target.value
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 focus:border-red-600 outline-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            City *
                          </label>
                          <input
                            type="text"
                            value={newAddress.city}
                            onChange={(e) =>
                              setNewAddress({
                                ...newAddress,
                                city: e.target.value
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 focus:border-red-600 outline-none"
                            required
                          />
                        </div>
                        <div className="relative w-full">
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            State
                          </label>

                          <div className="relative">
                            <select
                              value={newAddress.state}
                              onChange={(e) =>
                                setNewAddress({
                                  ...newAddress,
                                  state: e.target.value
                                })
                              }
                              required
                              className="w-full appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition">
                              <option value="">Select State</option>

                              {/* 🟢 States */}
                              <option value="Andhra Pradesh">
                                Andhra Pradesh
                              </option>
                              <option value="Arunachal Pradesh">
                                Arunachal Pradesh
                              </option>
                              <option value="Assam">Assam</option>
                              <option value="Bihar">Bihar</option>
                              <option value="Chhattisgarh">Chhattisgarh</option>
                              <option value="Goa">Goa</option>
                              <option value="Gujarat">Gujarat</option>
                              <option value="Haryana">Haryana</option>
                              <option value="Himachal Pradesh">
                                Himachal Pradesh
                              </option>
                              <option value="Jharkhand">Jharkhand</option>
                              <option value="Karnataka">Karnataka</option>
                              <option value="Kerala">Kerala</option>
                              <option value="Madhya Pradesh">
                                Madhya Pradesh
                              </option>
                              <option value="Maharashtra">Maharashtra</option>
                              <option value="Manipur">Manipur</option>
                              <option value="Meghalaya">Meghalaya</option>
                              <option value="Mizoram">Mizoram</option>
                              <option value="Nagaland">Nagaland</option>
                              <option value="Odisha">Odisha</option>
                              <option value="Punjab">Punjab</option>
                              <option value="Rajasthan">Rajasthan</option>
                              <option value="Sikkim">Sikkim</option>
                              <option value="Tamil Nadu">Tamil Nadu</option>
                              <option value="Telangana">Telangana</option>
                              <option value="Tripura">Tripura</option>
                              <option value="Uttar Pradesh">
                                Uttar Pradesh
                              </option>
                              <option value="Uttarakhand">Uttarakhand</option>
                              <option value="West Bengal">West Bengal</option>

                              {/* 🔵 Union Territories */}
                              <option value="Andaman and Nicobar Islands">
                                Andaman and Nicobar Islands
                              </option>
                              <option value="Chandigarh">Chandigarh</option>
                              <option value="Dadra and Nagar Haveli and Daman and Diu">
                                Dadra and Nagar Haveli and Daman and Diu
                              </option>
                              <option value="Delhi">Delhi</option>
                              <option value="Jammu and Kashmir">
                                Jammu and Kashmir
                              </option>
                              <option value="Ladakh">Ladakh</option>
                              <option value="Lakshadweep">Lakshadweep</option>
                              <option value="Puducherry">Puducherry</option>
                            </select>

                            {/* Dropdown Icon */}
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                              <svg
                                className="w-4 h-4 text-gray-500"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.24 4.25a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Address Type
                        </label>
                        <div className="flex space-x-4">
                          {["Home", "Work", "Other"].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() =>
                                setNewAddress({
                                  ...newAddress,
                                  addressType: type as "Home" | "Work" | "Other"
                                })
                              }
                              className={`px-4 py-2 border transition-colors ${
                                newAddress.addressType === type
                                  ? "border-red-600 bg-red-600 text-white"
                                  : "border-gray-300 hover:border-red-600"
                              }`}>
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="bg-red-600 text-white px-6 py-2 hover:bg-red-700 transition-colors">
                          {editingAddress ? "Update Address" : "Save Address"}
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="border border-gray-300 px-6 py-2 hover:bg-gray-50 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                  {selectedAddress && (
                    <div className="pt-4">
                      <button
                        onClick={() => toggleAccordion("summary")} // or the next step in your flow
                        className="w-full py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors">
                        Continue
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 2. Order Summary */}
            <div className="border border-gray-200">
              <button
                onClick={() => toggleAccordion("summary")}
                className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${
                  canProceedToPayment
                    ? "bg-gray-50 hover:bg-gray-100"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
                disabled={!canProceedToPayment}>
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 flex items-center justify-center text-white font-bold ${
                      canProceedToPayment ? "bg-red-600" : "bg-gray-400"
                    }`}>
                    2
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Order Summary</h3>
                    <p className="text-sm text-gray-600">
                      {cartItems.length} items
                    </p>
                  </div>
                </div>
                {activeAccordion === "summary" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              {activeAccordion === "summary" && canProceedToPayment && (
                <div className="p-6">
                  <div className="space-y-4">
                    {cartItems.map((item) => {
                      const itemId = `${item.product.id}-${item.size}-${item.color}`;
                      return (
                        <div
                          key={itemId}
                          className="flex items-center space-x-4 border-b pb-4">
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={getImageForColor(item.product, item.color)} // Use the helper function here
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">
                              {item.product.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Size: {item.size} | Color: {item.color}
                            </p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-red-600">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    {selectedAddress && (
                      <div className="pt-4">
                        <button
                          onClick={() => toggleAccordion("payment")} // or the next step in your flow
                          className="w-full py-3 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors">
                          Continue
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Payment Options */}
            <div className="border border-gray-200">
              <button
                onClick={() => toggleAccordion("payment")}
                className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${
                  canProceedToPayment
                    ? "bg-gray-50 hover:bg-gray-100"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
                disabled={!canProceedToPayment}>
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 flex items-center justify-center text-white font-bold ${
                      selectedPayment
                        ? "bg-green-600"
                        : canProceedToPayment
                        ? "bg-red-600"
                        : "bg-gray-400"
                    }`}>
                    {selectedPayment ? <Check className="h-5 w-5" /> : "3"}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Payment Method</h3>
                    {selectedPayment && (
                      <p className="text-sm text-gray-600">
                        {
                          paymentOptions.find((p) => p.id === selectedPayment)
                            ?.name
                        }
                      </p>
                    )}
                  </div>
                </div>
                {activeAccordion === "payment" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              {activeAccordion === "payment" && canProceedToPayment && (
                <div className="p-6 space-y-3">
                  {paymentOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <div
                        key={option.id}
                        className={`border p-4 cursor-pointer transition-colors ${
                          selectedPayment === option.id
                            ? "border-red-600 bg-red-50"
                            : "border-gray-200 hover:border-red-300"
                        }`}
                        onClick={() => setSelectedPayment(option.id)}>
                        <div className="flex items-center space-x-3">
                          <Icon className="h-6 w-6 text-gray-600" />
                          <div>
                            <h4 className="font-semibold">{option.name}</h4>
                            <p className="text-sm text-gray-600">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-200 p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-4">Price Details</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>
                    Price (
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    items)
                  </span>
                  <span>&#8377;{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>
                    {selectedPayment === ""
                      ? "FREE"
                      : shipping === 0
                      ? "FREE"
                      : `₹${shipping?.toFixed(2)}`}
                  </span>
                </div>
                {/* <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>&#8377;{tax.toFixed(2)}</span>
                </div> */}
              </div>

              {/* Coupon Section */}
              <div className="mb-4 border-t pt-4">
                {appliedCoupon ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="text-sm font-semibold text-green-800">
                            {appliedCoupon.code}
                          </p>
                          <p className="text-xs text-green-600">
                            {appliedCoupon.type === "fixed"
                              ? `₹${appliedCoupon.value} off`
                              : `${appliedCoupon.value}% off`}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-green-600 hover:text-green-800">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-semibold">
                        -₹{discountAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Have a coupon code?
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) =>
                          setCouponCode(e.target.value.toUpperCase())
                        }
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleApplyCoupon();
                          }
                        }}
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={isValidatingCoupon || !couponCode.trim()}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                        {isValidatingCoupon ? "..." : "Apply"}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t-2 border-gray-300 pt-3 mb-6">
                <div className="text-sm text-gray-600 mb-4">Delivery charges ₹49 on cash on delivery</div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Amount</span>
                  <span className="text-red-600">₹{total.toFixed(2)}</span>
                </div>
              </div>

              {subtotal < 50 && (
                <p className="text-sm text-gray-600 mb-4">
                  Add &#8377;{(50 - subtotal).toFixed(2)} more to get free
                  shipping!
                </p>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={!canPlaceOrder}
                className={`w-full py-4 px-6 text-lg font-semibold transition-colors ${
                  canPlaceOrder
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}>
                PLACE ORDER
              </button>

              <div className="text-sm text-gray-600 space-y-2 mt-4">
                <p>✓ Safe and secure payments</p>
                <p>✓ Easy returns and exchanges</p>
                <p>✓ 100% authentic products</p>
              </div>
            </div>
          </div>
        </div>
        <ConfirmDeleteModal
          open={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </>
  );
}

// Add this helper function to get the image for the selected color
const getImageForColor = (product: any, color: string) => {
  if (!product?.images) return "/placeholder.jpg";

  // Find the exact color variant's image
  const colorVariant = product.images.find(
    (img: any) => img.color?.toLowerCase() === color?.toLowerCase()
  );

  // Return the first image of the selected color variant
  return colorVariant?.urls?.[0] || "/placeholder.jpg";
};
