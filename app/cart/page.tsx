"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { redirect, useRouter } from "next/navigation";

const getImageForColor = (product: any, color: string) => {
  if (!product?.images) return "/placeholder.jpg";

  // Find the exact color variant's image
  if (Array.isArray(product.images)) {
    const colorVariant = product.images.find(
      (img: any) => img.color?.toLowerCase() === color?.toLowerCase()
    );

    // Return the first image of the selected color variant
    if (colorVariant?.urls?.[0]) {
      return colorVariant.urls[0];
    }
  }

  // If no matching color image found, return placeholder
  return "/placeholder.jpg";
};

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, isLoginModalOpen, setIsLoginModalOpen } = useAuth();

  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-xl text-gray-600 mb-8">
            Start shopping to add items to your cart
          </p>
          <Link
            href="/products"
            className="bg-red-600 text-white px-8 py-3 font-semibold hover:bg-red-700 transition-colors">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  const Checkout = () => {
    if (!user) {
      setIsLoginModalOpen(true);
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="md:text-3xl text-xl font-bold">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-red-600 hover:text-red-800 font-semibold">
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => {
              const itemId = `${item.product.id}-${item.size}-${item.color}`;
              return (
                <div
                  key={itemId}
                  className="bg-white border border-gray-200 p-2 sm:p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-10 h-10 sm:w-24 sm:h-24 flex-shrink-0">
                      <Image
                        src={getImageForColor(item.product, item.color)}
                        alt={`${item.product.name} - ${item.color}`}
                        fill
                        className="object-cover"
                        priority // Add priority to load cart images first
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="sm:text-lg text-xs font-semibold mb-1">
                        <Link
                          href={`/products/${item.product.id}`}
                          className="hover:text-red-600 transition-colors">
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-2 sm:text-base text-xs">
                        {item.product.category}
                      </p>
                      <div className="flex items-center space-x-4 sm:text-sm text-xs text-gray-600">
                        <span>Size: {item.size}</span>
                        <span>Color: {item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() =>
                          updateQuantity(itemId, item.quantity - 1)
                        }
                        className="border border-gray-300 p-2 hover:border-red-600 transition-colors">
                        <Minus className="sm:h-4 sm:w-4 h-2 w-2" />
                      </button>
                      <span className="px-3 py-2 border border-gray-300 sm:text-base text-xs sm:min-w-[60px] min-w-[10px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(itemId, item.quantity + 1)
                        }
                        className="border border-gray-300 p-2 hover:border-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item.quantity >= item.stock}>
                        <Plus className="sm:h-4 sm:w-4 h-2 w-2" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="sm:text-lg text-xs font-bold text-red-600">
                        &#8377;{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="sm:text-sm text-[9px] text-gray-600">
                        &#8377;{item.product.price} each
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(itemId)}
                      className="text-red-600 hover:text-red-800 p-2">
                      <Trash2 className="sm:h-5 sm:w-5 w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <Link
              href="/products"
              className="text-red-600 hover:text-red-800 font-semibold">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span>
                  Subtotal (
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                  items)
                </span>
                <span>&#8377;{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>&#8377;{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t pt-3 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-red-600">&#8377;{total.toFixed(2)}</span>
              </div>
            </div>

            {subtotal < 50 && (
              <p className="text-sm text-gray-600 mb-4">
                Add &#8377;{(50 - subtotal).toFixed(2)} more to get free
                shipping!
              </p>
            )}

            <button
              onClick={() => {
                Checkout();
              }}
              className="w-full bg-red-600 text-white py-4 px-6 text-lg font-semibold hover:bg-red-700 transition-colors mb-4">
              PROCEED TO CHECKOUT
            </button>

            <div className="text-sm text-gray-600 space-y-2">
              <p>✓ Secure checkout</p>
              <p>✓ 30-day return policy</p>
              <p>✓ Free shipping on orders over &#8377;50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
