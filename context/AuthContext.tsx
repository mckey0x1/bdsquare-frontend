"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";
import {
  useMutation,
  gql,
  useLazyQuery,
  useApolloClient
} from "@apollo/client";
import axios from "axios";
import { toast, Toaster } from "sonner";
import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  CREATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
  SEND_OTP_MUTATION,
  SIGNUP_MUTATION,
  VERIFY_OTP_MUTATION,
  LOGOUT_USER_MUTATION,
  ADD_ADDRESS,
  UPDATE_USER_PROFILE,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  UPDATE_ADMIN_ACCESS,
  CREATE_ORDER,
  CONFIRM_ONLINE_ORDER,
  CANCEL_ORDER,
  WRITE_REVIEW
} from "@/graphql/mutation/mutations";
import {
  ME_QUERY,
  GET_PRODUCTS,
  GET_USER,
  ALL_ADMINS,
  GET_USER_ORDER,
  GET_ORDERS
} from "@/graphql/query/queries";

import type {
  Product,
  Address,
  User,
  Admin,
  AddressInput,
  Alladmins
} from "@/lib/types";

interface AuthContextType {
  user: User | null;
  admin: Admin | null;
  login: (email: string, password: string) => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  CubeLoader?: boolean;
  RedCubeLoader?: boolean;
  createProduct: (formData: any) => Promise<boolean>;
  UpdateProducts: (formData: any, productId: string) => Promise<void>;
  products: Product[];
  deleteProduct: (id: string) => Promise<void>;
  sendloginOTP: (formData: any) => Promise<void>;
  VerifyloginOTP: (formData: any) => Promise<void>;
  logoutUser: () => Promise<void>;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (value: boolean) => void;
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  addressFunc: (address: AddressInput) => void;
  UpdateProfile: (userInfo: User) => Promise<void>;
  UpdateAddress: (address: Address) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  alladmins: Alladmins[];
  updateAdminAccess: (id: string, isAccess: boolean) => Promise<void>;
  CreateOrder: (
    payload: any
  ) => Promise<
    | { success: boolean; message: string; order: any }
    | { success: boolean; message: any; order: null }
    | null
    | undefined
  >;
  cancelorder: (id: string, reason: string) => Promise<void>;
  orders: any[];
  allOrders: any[];
  submitReview: (newReview: any, productId: string) => Promise<void>;
}

import LoadingOverlay from "@/components/LoadingOverlay";
import { set } from "date-fns";
import RedCubeSpinner from "@/components/RedCubeSpinner";
import Script from "next/script";
import { Verified } from "lucide-react";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [CubeLoader, setCubeLoader] = useState<boolean>(true);
  const [OverlayLoading, setOverlayLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [randomId, setRandomId] = useState<string>("");
  const [randomId2, setRandomId2] = useState<string>("");
  const [randomId3, setRandomId3] = useState<string>("");
  const [randomId4, setRandomId4] = useState<string>("");
  const [RedCubeLoader, setRedCubeLoader] = useState<boolean>(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [alladmins, setAllAdmins] = useState([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [allOrders, setallOrders] = useState<any[]>([]);

  const client = useApolloClient();
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const [signupMutation] = useMutation(SIGNUP_MUTATION);
  const [logoutMutation] = useMutation(LOGOUT_MUTATION);
  const [createProductMutation] = useMutation(CREATE_PRODUCT_MUTATION);
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT_MUTATION);
  const [updateProductMutation] = useMutation(UPDATE_PRODUCT_MUTATION);
  const [sendOtpMutation] = useMutation(SEND_OTP_MUTATION);
  const [verifyOTPmutation] = useMutation(VERIFY_OTP_MUTATION);
  const [logoutUserMutation] = useMutation(LOGOUT_USER_MUTATION);
  const [addAddress] = useMutation(ADD_ADDRESS);
  const [updateUserProfileMutation] = useMutation(UPDATE_USER_PROFILE);
  const [updateAddress] = useMutation(UPDATE_ADDRESS);
  const [deleteAddressMutation] = useMutation(DELETE_ADDRESS);
  const [adminAceessMutation] = useMutation(UPDATE_ADMIN_ACCESS);
  const [createOrderMutation] = useMutation(CREATE_ORDER);
  const [confirmOnlineOrderMutation] = useMutation(CONFIRM_ONLINE_ORDER);
  const [cancelOrderMutation] = useMutation(CANCEL_ORDER);
  const [writeReviewMutation] = useMutation(WRITE_REVIEW);

  function generateRandomId(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  useEffect(() => {
    const userId = user?.id;
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data } = await client.query({
          query: GET_USER_ORDER,
          variables: { userId },
          fetchPolicy: "no-cache" // avoid cached results
        });
        // console.log(userId, data.getUserOrders)
        setOrders(data.getUserOrders);
        // console.log(data.getUserOrders);
      } catch (err: any) {
        // console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, randomId4]);

  const [fetchMe] = useLazyQuery(ME_QUERY, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setAdmin(data.me);
      setCubeLoader(false); // Stop loading after fetching admin data
    },
    onError: () => {
      setAdmin(null);
      setCubeLoader(false); // Stop loading if there's an error
    }
  });

  useEffect(() => {
    fetchMe(); // token is sent via cookie
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await client.query({
          query: ALL_ADMINS,
          fetchPolicy: "network-only"
        });
        setAllAdmins(data.allAdmins);
      } catch (error) {
        // console.error("Error fetching user:", error);
      } finally {
        setRedCubeLoader(false); // Always stop the loader
      }
    };

    fetchUser();
  }, [randomId3]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await client.query({
          query: GET_USER,
          fetchPolicy: "network-only"
        });
        // console.log(data.userMe)
        setUser(data.userMe);
        setAddresses([...addresses, data.userMe.addresses]);
        // console.log("User fetched:", data.userMe);
      } catch (error) {
        // console.error("Error fetching user:", error);
      } finally {
        setRedCubeLoader(false); // Always stop the loader
      }
    };

    fetchUser();
  }, [randomId2]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await client.query({
          query: GET_ORDERS,
          fetchPolicy: "network-only"
        });
        setallOrders(data.getOrders);

        // console.log("User fetched:", data.getOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setRedCubeLoader(false);
      }
    };

    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await client.query({
        query: GET_PRODUCTS,
        fetchPolicy: "network-only" // optional: always fetch fresh
      });
      // console.log(data.products);
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [randomId]);

  const login = async (email: string, password: string) => {
    setCubeLoader(true);
    const { data } = await loginMutation({ variables: { email, password } });
    setAdmin(data.login.user);
    setCubeLoader(false);
    return data.login.user;
  };

  const signup = async (email: string, password: string) => {
    setCubeLoader(true);
    const { data } = await signupMutation({
      variables: { email, password }
    });
    setAdmin(data.signup.user);
    setCubeLoader(false);
  };

  const logout = async () => {
    await logoutMutation(); // Invalidate cookie
    setAdmin(null);
  };

  const createProduct = async (formData: any) => {
    setOverlayLoading(true);
    const transformedImages = [];

    try {
      // Handle image uploads for each color
      for (const imageData of formData.images) {
        const { color, urls } = imageData;
        const uploadedUrls = [];

        // Upload each file and get Cloudinary URL
        for (const fileUrl of urls) {
          const response = await fetch(fileUrl);
          const blob = await response.blob();
          const file = new File([blob], "image.jpg", { type: "image/jpeg" });

          const data = new FormData();
          data.append("file", file);
          data.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_PRESETS || ""
          );
          data.append(
            "cloud_name",
            process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
          );

          const uploadResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            data
          );
          uploadedUrls.push(uploadResponse.data.secure_url);
        }

        transformedImages.push({
          color,
          urls: uploadedUrls
        });
      }

      // Send mutation with transformed image URLs
      await createProductMutation({
        variables: {
          data: {
            ...formData,
            price: parseFloat(formData.price),
            originalPrice: parseFloat(formData.originalPrice),
            images: transformedImages,
            variants: formData.variants.map((variant: any) => ({
              size: variant.size,
              color: variant.color,
              stock: parseInt(variant.stock),
              batchNo: variant.batchNo
            }))
          }
        }
      });

      setOverlayLoading(false);
      setRandomId(generateRandomId(6));
      toast.success("Product created successfully!");
      return true;
    } catch (error) {
      setOverlayLoading(false);
      console.error("Error creating product:", error);
      throw error;
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    await deleteProductMutation({ variables: { id } });
    toast.success("Product deleted successfully!");
    setRandomId(generateRandomId(6));
  };

  const UpdateProducts = async (formData: any, productId: string) => {
    try {
      // Show loading
      setOverlayLoading(true);

      const uploadedImageUrls: string[] = [];

      for (const image of formData.images) {
        if (typeof image === "string") {
          // It's already a URL, keep it
          uploadedImageUrls.push(image);
        } else {
          // It's a File, upload to Cloudinary
          const data = new FormData();
          data.append("file", image);
          data.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_PRESETS || ""
          );
          data.append(
            "cloud_name",
            process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
          );

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            data
          );
          uploadedImageUrls.push(res.data.secure_url);
        }
      }

      // Call your mutation or update logic here
      await updateProductMutation({
        variables: {
          id: productId,
          data: {
            ...formData,
            price: parseFloat(formData.price),
            originalPrice: parseFloat(formData.originalPrice),
            images: uploadedImageUrls,
            variants: formData.variants.map((variant: any) => ({
              size: variant.size,
              color: variant.color,
              stock: parseInt(variant.stock)
            }))
          }
        }
      });
      setRandomId(generateRandomId(6));
      toast.success("Product updated!");
    } catch (error) {
      console.error("Failed to update product", error);
      toast.error("Update failed!");
    } finally {
      setOverlayLoading(false);
    }
  };

  const sendloginOTP = async (formData: any) => {
    try {
      const phone = formData.get("phone") as string;
      const response = await sendOtpMutation({
        variables: { phone }
      });
    } catch (error: any) {
      const message = error.message;
      throw new Error(message);
    }
  };
  const VerifyloginOTP = async (formData: FormData) => {
    try {
      const phone = formData.get("phone") as string;
      const otp = formData.get("otp") as string;

      const response = await verifyOTPmutation({
        variables: { phone, otp }
      });
      setRandomId2(generateRandomId(6));
      // handle response if needed
    } catch (error: any) {
      const message = error.message;
      throw new Error(message);
    }
  };

  const logoutUser = async () => {
    try {
      await logoutUserMutation();
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const addressFunc = async (address: AddressInput) => {
    try {
      const { data } = await addAddress({
        variables: { data: address }
      });
      setAddresses([...addresses, data.addAddress]);
      setRandomId2(generateRandomId(6));

      // toast.success("Address added successfully!");
    } catch (error: any) {
      console.error("Error adding address:", error);
      toast.error(error.message);
    }
  };

  const UpdateProfile = async (userInfo: User) => {
    if (!userInfo.phone) {
      toast.error("Phone number is required.");
      return;
    }

    await updateUserProfileMutation({
      variables: {
        data: {
          phone: userInfo.phone,
          name: userInfo.name,
          email: userInfo.email
        }
      }
    });

    toast.success("Profile updated successfully!");
    setRandomId2(generateRandomId(6));
  };

  const UpdateAddress = async (address: Address) => {
    try {
      const { data } = await updateAddress({
        variables: { data: address }
      });
      // setAddresses(addresses.map(addr => addr.id === address.id ? data.updateAddress : addr));
      setRandomId2(generateRandomId(6));
      toast.success("Address updated successfully!");
    } catch (error: any) {
      // console.error("Error updating address:", error);
      toast.error(error.message);
    }
  };

  const deleteAddress = async (addressId: string) => {
    try {
      const { data } = await deleteAddressMutation({
        variables: { deleteAddressId: addressId }
      });
      setAddresses(
        addresses.filter((addr) => addr.id !== data.deleteAddress.id)
      );
      setRandomId2(generateRandomId(6));
      toast.success("Address deleted successfully!");
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address");
    }
  };

  const updateAdminAccess = async (id: string, isAccess: boolean) => {
    try {
      await adminAceessMutation({
        variables: { id, isAccess }
      });

      setRandomId3(generateRandomId(6)); // Trigger re-fetch of all admins
    } catch (error: any) {
      toast.error(error.message);
    }

    // refetch allAdmins or update local state
  };

  const CreateOrder = async (payload: any) => {
    setOverlayLoading(true);
    try {
      // Validate payload before sending
      if (!payload.userId || !payload.totalAmount || !payload.items.length) {
        throw new Error("Invalid order data");
      }

      // Create order first (for both COD and Razorpay)
      const { data } = await createOrderMutation({
        variables: { input: payload }
      });

      const orderResult = data.createOrder;

      if (!orderResult.success) {
        throw new Error(orderResult.message);
      }

      // If payment method is COD, order is already confirmed
      if (payload.paymentMethod === "COD") {
        setOverlayLoading(false);
        setRandomId(generateRandomId(6));
        setRandomId4(generateRandomId(6));
        toast.success("Order placed successfully!");
        // Return the order result with ID
        return {
          success: true,
          message: "Order placed successfully",
          order: {
            id: orderResult.order?.id,
            ...orderResult.order
          } 
        };
      }
      // For Razorpay payments
      else if (payload.paymentMethod === "ONLINE") {
        const paymentData = orderResult.paymentData;

        if (!paymentData || !paymentData.razorpayOrderId) {
          throw new Error("Failed to initialize payment");
        }

        // Prepare Razorpay options
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY, // Public key
          amount: paymentData.amount * 100, // Amount in paise
          currency: paymentData.currency,
          name: "BDSquare",
          description: "Order Payment",
          image: "/image/bdsquare-black.png",
          order_id: paymentData.razorpayOrderId,
          handler: async (response: any) => {
            try {
              // Confirm the order after successful payment
              const confirmResponse = await confirmOnlineOrderMutation({
                variables: {
                  orderId: paymentData.orderId,
                  paymentDetails: {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature
                  }
                }
              });

              setOverlayLoading(false);

              if (confirmResponse.data?.confirmOnlineOrder?.success) {
                setRandomId4(generateRandomId(6));
                setRandomId(generateRandomId(6));
                toast.success(
                  "Order placed and payment completed successfully!"
                );
                // Return the confirmed order with ID
                return {
                  success: true,
                  message: "Payment completed successfully",
                  order: {
                    id: confirmResponse.data.confirmOnlineOrder.order?.id,
                    ...confirmResponse.data.confirmOnlineOrder.order
                  }
                };
              } else {
                toast.error("Payment completed but order confirmation failed");
              }
            } catch (error: any) {
              setOverlayLoading(false);
              toast.error("Payment completed but order confirmation failed");
              console.error("Order confirmation error:", error);
            }
          },
          prefill: {
            name: paymentData.userDetails?.name || user?.name || "",
            email: paymentData.userDetails?.email || user?.email || "",
            contact: paymentData.userDetails?.contact || user?.phone || ""
          },
          notes: {
            address: payload.shippingAddress,
            orderId: paymentData.orderId
          },
          theme: {
            color: "#F37254"
          },
          modal: {
            ondismiss: function () {
              setOverlayLoading(false);
              toast.error("Payment cancelled");
            }
          }
        };
        setRandomId4(generateRandomId(6));
        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();

        return null;
      }
    } catch (error: any) {
      setOverlayLoading(false);
      toast.error(error.message || "Failed to place order");
      return {
        success: false,
        message: error.message || "Failed to place order",
        order: null
      };
    }
  };

  const cancelorder = async (id: string, reason: string) => {
    try {
      const response = await cancelOrderMutation({
        variables: { orderId: id, reason: reason }
      });
      toast.success("Order Cancelled");
      setRandomId(generateRandomId(6));
      setRandomId4(generateRandomId(6));
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const submitReview = async (newReview: any, productId: string) => {
    setOverlayLoading(true);
    const uploadedImageUrls: string[] = [];
    for (const file of newReview.images) {
      const data = new FormData();
      data.append("file", file);
      data.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESETS || ""
      ); // Replace with your preset
      data.append(
        "cloud_name",
        process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
      ); // Replace with your cloud name

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, // Replace with your cloud name
        data
      );
      uploadedImageUrls.push(res.data.secure_url);
    }

    await writeReviewMutation({
      variables: {
        data: {
          productId, // required
          userName: newReview.userName,
          rating: newReview.rating,
          comment: newReview.comment,
          images: uploadedImageUrls,
          verified: true // array of strings (URLs)
        }
      }
    });

    setOverlayLoading(false);
    toast.success("commment done!");
    setRandomId(generateRandomId(6));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        loading,
        isAuthenticated: !!user,
        admin,
        logout,
        CubeLoader,
        createProduct,
        products,
        deleteProduct,
        UpdateProducts,
        sendloginOTP,
        VerifyloginOTP,
        RedCubeLoader,
        logoutUser,
        isLoginModalOpen,
        setIsLoginModalOpen,
        addresses,
        setAddresses,
        addressFunc,
        UpdateProfile,
        UpdateAddress,
        deleteAddress,
        alladmins,
        updateAdminAccess,
        CreateOrder,
        orders,
        cancelorder,
        submitReview,
        allOrders
      }}>
      <Toaster />
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
      {children}
      <RedCubeSpinner CubeLoading={RedCubeLoader} />
      <LoadingOverlay OverlayLoading={OverlayLoading} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
