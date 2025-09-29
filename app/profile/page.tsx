"use client";

import { useEffect, useState } from "react";
import {
  User,
  Settings,
  Package,
  LogOut,
  Edit,
  Save,
  X,
  Plus,
  Trash2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import CubeSpinner from "@/components/cube-loader";
import { redirect } from "next/navigation";
import RedCubeSpinner from "@/components/RedCubeSpinner";
import { Address } from "@/lib/types";
import Link from "next/link";
import CancelOrderModal from "@/components/CancelOrderModal";

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

export default function ProfilePage() {
  const {
    user,
    logoutUser,
    RedCubeLoader,
    UpdateProfile,
    addresses,
    setAddresses,
    addressFunc,
    deleteAddress,
    UpdateAddress,
    orders,
    cancelorder
  } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const [activeAccordion, setActiveAccordion] = useState<string>("address");
  // const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [editingAddress, setEditingAddress] = useState<string>("");

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

  const [userInfo, setUserInfo] = useState({
    id: user?.id,
    name: user?.name || "username",
    email: user?.email || "",
    phone: user?.phone || ""
  });

  const [editForm, setEditForm] = useState(userInfo);

  useEffect(() => {
    if (user) {
      const updated = {
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || ""
      };
      setUserInfo(updated);
      setEditForm(updated);
    }
    console.log(user);
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send `editForm` to server
    await UpdateProfile({
      phone: editForm.phone,
      name: editForm.name,
      email: editForm.email
    });

    setUserInfo(editForm); // Update UI
    setIsEditing(false);
  };

  // const orders = [
  //   {
  //     id: "ORD-001",
  //     date: "2024-01-20",
  //     status: "Delivered",
  //     total: 129.99,
  //     items: 3,
  //     trackingNumber: "TRK123456789"
  //   },
  //   {
  //     id: "ORD-002",
  //     date: "2024-01-15",
  //     status: "Shipped",
  //     total: 89.99,
  //     items: 2,
  //     trackingNumber: "TRK987654321"
  //   },
  //   {
  //     id: "ORD-003",
  //     date: "2024-01-10",
  //     status: "Processing",
  //     total: 199.99,
  //     items: 4,
  //     trackingNumber: null
  //   }
  // ];

  const handleCancelEditProfile = () => {
    setEditForm(userInfo);
    setIsEditing(false);
  };

  const handleLogout = () => {
    logoutUser();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-50";
      case "Shipped":
        return "text-blue-600 bg-blue-50";
      case "Processing":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    const address: Address = {
      id: Date.now().toString(),
      ...newAddress,
      isDefault: addresses.length === 0
    };

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
    // setSelectedAddress(address.id);
  };

  const handleEditAddress = (addressId: string) => {
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

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

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

    // if (selectedAddress === addressToDelete) {
    //   setSelectedAddress("");
    // }
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
      // setSelectedAddress(newAddresses[0].id);
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

  const cancelOrder = async (orderId: string, reason: string) => {
    cancelorder(orderId, reason);
  };

  useEffect(() => {
    if (!user && !RedCubeLoader) {
      redirect("/");
    }
  }, [user, RedCubeLoader]);

  if (RedCubeLoader) return <CubeSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white border-2 border-gray-200">
        {/* Header */}
        <div className="border-b-2 border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-red-600 text-white flex items-center justify-center text-2xl font-bold">
              {userInfo.name.charAt(0) || "N"}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{userInfo.name}</h1>
              <p className="text-gray-600">{user?.phone}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b-2 border-gray-200">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === "profile"
                  ? "border-red-600 text-red-600 bg-red-50"
                  : "border-transparent text-gray-600 hover:text-red-600 hover:bg-gray-50"
              }`}>
              <User className="h-5 w-5" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === "orders"
                  ? "border-red-600 text-red-600 bg-red-50"
                  : "border-transparent text-gray-600 hover:text-red-600 hover:bg-gray-50"
              }`}>
              <Package className="h-5 w-5" />
              <span>Orders</span>
            </button>
            {/* <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                activeTab === "settings"
                  ? "border-red-600 text-red-600 bg-red-50"
                  : "border-transparent text-gray-600 hover:text-red-600 hover:bg-gray-50"
              }`}>
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button> */}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm sm:text-xl font-semibold">
                    Personal Information
                  </h2>

                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center sm:text-base text-sm space-x-2 bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors">
                      <Edit className="h-4 w-4" />
                      <span>Update Profile</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition-colors">
                        <Save className="h-4 w-4" />
                        <span>Save</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEditProfile}
                        className="flex items-center space-x-2 border-2 border-gray-300 px-4 py-2 hover:bg-gray-50 transition-colors">
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:border-red-600 outline-none"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 border-2 border-gray-200">
                        {userInfo.name || "username"}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                        className="w-full px-3 py-2 border-2 border-gray-300 focus:border-red-600 outline-none"
                      />
                    ) : (
                      <p className="px-3 py-2 bg-gray-50 border-2 border-gray-200">
                        {userInfo.email || "example@gmail.com"}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <p className="px-3 py-2 bg-gray-50 border-2 border-gray-200">
                      {userInfo.phone}
                    </p>
                  </div>
                </div>
              </form>
              <div className="mt-4 ">
                <h2 className="text-xl font-semibold">Address</h2>

                <div className="pt-4 space-y-4">
                  {/* Existing Addresses */}
                  <div className="space-y-3">
                    {user?.addresses?.map((address) => (
                      <div
                        key={address.id}
                        className={`border p-4 cursor-pointer transition-colorsborder-gray-200 hover:border-red-300`}
                        // onClick={() => setSelectedAddress(address.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-semibold">{address.name}</h4>
                              <span className="bg-gray-200 text-gray-700 px-2 py-1 text-xs">
                                {address.addressType}
                              </span>
                              {/* {address.isDefault && (
                                          <span className="bg-green-600 text-white px-2 py-1 text-xs">
                                            DEFAULT
                                          </span>
                                        )} */}
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
                            {/* {!address.isDefault && (
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
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleLogout()}
                className="flex mt-4 items-center space-x-2 bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Order History</h2>

              <div className="space-y-4">
                {orders
                  .filter((k) => k.status !== "PENDING")
                  .map((order) => (
                    <div
                      key={order.id}
                      className="border-2 border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <h3 className="font-semibold text-lg">
                            Order {order.id.slice(0, 8)}
                          </h3>

                          <span
                            className={`px-3 py-1 text-sm font-medium ${getStatusColor(
                              order.status
                            )}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-lg font-bold text-red-600">
                          ₹{order.totalAmount}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Order Date</p>
                          <p className="font-medium">
                            {new Date(
                              Number(order.createdAt)
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric"
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Items</p>
                          <p className="font-medium">
                            {order.orderItems.reduce(
                              (total: number, item: { quantity: number }) =>
                                total + item.quantity,
                              0
                            )}{" "}
                            items
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Tracking Number</p>
                          <p className="font-medium">
                            {order?.AtrackingNumberWB || "Not available yet"}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-4 mt-4">
                        <button className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 transition-colors">
                          <Link href={`/orders/${order.id}`}>View Details</Link>
                        </button>
                        {order?.trackingNumber && (
                          <button className="border-2 border-gray-300 px-4 py-2 hover:bg-gray-50 transition-colors">
                            <Link href={`/orders/${order.id}`}>
                              Track Order
                            </Link>
                          </button>
                        )}
                        {order.status === "CONFIRMED" && (
                          <CancelOrderModal
                            orderId={order.id}
                            onCancel={cancelOrder}
                          />
                        )}

                        {/* {order.status === "Delivered" && (
                        <button className="border-2 border-gray-300 px-4 py-2 hover:bg-gray-50 transition-colors">
                          Reorder
                        </button>
                      )} */}
                      </div>
                    </div>
                  ))}
              </div>

              {orders.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No orders yet</p>
                  <p className="text-gray-400">
                    Start shopping to see your orders here
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <ConfirmDeleteModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
