"use client";

import Image from "next/image";
import Link from "next/link";
// import { products } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import ImageSlider from "@/components/ImageSlider";
import { useEffect, useState } from "react";
import ProductComments from "@/components/ProductComments";
import {
  Star,
  ShoppingCart,
  Heart,
  Share,
  Truck,
  Shield,
  RefreshCw,
  ArrowLeft,
  ShoppingBagIcon
} from "lucide-react";
import { Product } from "@/lib/types";
import { Dialog } from "@headlessui/react";
import { toast, Toaster } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { set } from "date-fns";
import { useRouter } from "next/navigation";

interface ProductPageClientProps {
  product: Product;
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const { addToCart, cartItems } = useCart();
  const { user, isLoginModalOpen, setIsLoginModalOpen } = useAuth();
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedBatchNo, setSelectedBatchNo] = useState("")
  const [quantity, setQuantity] = useState(1);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);

  const variantKey = `${product.id}-${selectedSize}-${selectedColor}`;

  const selectedVariant = product.variants.find(
    (variant) =>
      variant.size === selectedSize && variant.color === selectedColor
  );
  const availableStock = selectedVariant?.stock || 0;

  useEffect(() => {
    const exists = cartItems.find(
      (item) =>
        item.product.id === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );
    setAddedToCart(!!exists);
  }, [variantKey, cartItems]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color.");
      return;
    }

    if (quantity > availableStock) {
      toast.error("Quantity exceeds available stock.");
      return;
    }

    // Check if item already exists in cart
    const existingItem = cartItems.find(
      (item) =>
        item.product.id === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor
    );

    if (existingItem) {
      // Update quantity of existing item
      addToCart({
          product,
          quantity: quantity,
          size: selectedSize,
          color: selectedColor,
          stock: availableStock,
          batchNo: selectedBatchNo
      });
    } else {
      // Add new item
      addToCart({
        product,
        quantity,
        size: selectedSize,
        color: selectedColor,
        stock: availableStock,
        batchNo: selectedBatchNo
      });
    }

    setAddedToCart(true);
    toast.success("Product added to cart!");
  };

  // const relatedProducts = products
  //   .filter((p) => p.category === product.category && p.id !== product.id)
  //   .slice(0, 4);

  const allPossibleSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const availableSizes = Array.from(
    new Set(product.variants.map((variant) => variant.size))
  );

  // Colors available for the selected size
  const availableColors = selectedSize
    ? Array.from(
        new Set(
          product.variants
            .filter(
              (variant) => variant.size === selectedSize && variant.stock > 0
            )
            .map((variant) => variant.color)
        )
      )
    : [];

  // derive image URLs to show based on selectedColor (fallback to first available)
  type ImageType = { color: string; urls: string[] } | string;
  const imagesForSelectedColor: string[] = (() => {
    if (!product?.images) return [];

    // If images is array of { color: string, urls: string[] } or string[]
    if (Array.isArray(product.images) && product.images.length > 0) {
      const first = product.images[0] as ImageType;
      // if items are objects with urls
      if (
        first &&
        typeof first === "object" &&
        'urls' in first &&
        Array.isArray(first.urls)
      ) {
        // prefer images matching selectedColor
        if (selectedColor) {
          const match = (product.images as Array<{ color: string; urls: string[] } | string>).find(
            (img): img is { color: string; urls: string[] } =>
              typeof img === "object" &&
              'color' in img &&
              'urls' in img &&
              img.color.toLowerCase() === selectedColor.toLowerCase()
          );
          if (match?.urls) {
            return match.urls;
          }
        }
        // fallback to first color's urls
        return first.urls || [];
      }
      // fallback: images is an array of strings (legacy)
      if (typeof first === "string") {
        return product.images as string[];
      }
    }
    return [];
  })();

  useEffect(() => {
    if (!selectedSize) {
      const firstInStockSize = allPossibleSizes.find((size) =>
        product.variants.some(
          (variant) => variant.size === size && variant.stock > 0
        )
      );

      if (firstInStockSize) {
        setSelectedSize(firstInStockSize);
      }
    }
  }, [product.variants, selectedSize]);

  const availableBatchNos = product.variants
    .filter(
      (variant) =>
        variant.size === selectedSize && variant.color === selectedColor
    )
    .map((variant) => variant.batchNo);
    
  useEffect(() => {
    if (
      selectedSize &&
      selectedColor &&
      availableBatchNos.length > 0 &&
      !selectedBatchNo
    ) {
      setSelectedBatchNo(availableBatchNos[0]);
    }
  }, [selectedSize, selectedColor, availableBatchNos, selectedBatchNo]);

  useEffect(() => {
    if (selectedSize && availableColors.length > 0 && !selectedColor) {
      const firstAvailableColor = availableColors[0];
      setSelectedColor(firstAvailableColor);
    }
  }, [selectedSize, availableColors, selectedColor]);

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this product: ${product.name}`,
      url: typeof window !== "undefined" ? window.location.href : ""
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Product link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  const handleBuyItem = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return; // Exit early if user is not logged in
    }

    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color.");
      return;
    }

    if (quantity > availableStock) {
      toast.error("Quantity exceeds available stock.");
      return;
    }

    addToCart({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor,
      stock: availableStock,
      batchNo: selectedBatchNo
    });

    setAddedToCart(true);
    router.push("/checkout");
  };

  // Update the quantity handling
  useEffect(() => {
    const cartItem = cartItems.find(
      (item) =>
        item.product.id === product.id &&
        item.size === selectedSize &&
        item.color === selectedColor &&
        item.batchNo === selectedBatchNo
    );

    if (cartItem) {
      setQuantity(cartItem.quantity);
      setAddedToCart(true);
    } else {
      setQuantity(1); // Reset quantity when selecting different variant
      setAddedToCart(false);
    }
  }, [selectedSize, selectedColor, cartItems, product.id]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <div className="flex items-center space-x-2 text-xs">
          <Link href="/" className="text-gray-500 hover:text-red-600">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/products" className="text-gray-500 hover:text-red-600">
            Products
          </Link>
          {/* <span className="text-gray-400">/</span>
          <Link
            href={`/products?category=${product.category}`}
            className="text-gray-500 hover:text-red-600">
            {product.category}
          </Link> */}
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div>
          <ImageSlider
            images={imagesForSelectedColor}
            productName={product.name}
            onImageClick={(src: string) => setZoomedImage(src)}
          />

          {/* Zoom Modal */}
          <Dialog
            open={!!zoomedImage}
            onClose={() => setZoomedImage(null)}
            className="relative z-50">
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
              <Dialog.Panel className="relative bg-white p-4 rounded max-w-4xl w-full max-h-[90vh] overflow-auto">
                <button
                  onClick={() => setZoomedImage(null)}
                  className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2 z-50 hover:bg-red-700">
                  ✕
                </button>
                {zoomedImage && (
                  <div className="w-full h-full overflow-hidden">
                    <Image
                      src={zoomedImage}
                      alt="Zoomed product"
                      width={1000}
                      height={1000}
                      className="object-contain w-full h-full hover:scale-105 transition-transform duration-300 cursor-zoom-out"
                      onClick={() => setZoomedImage(null)}
                    />
                  </div>
                )}
              </Dialog.Panel>
            </div>
          </Dialog>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              {product.isNew && (
                <span className="bg-red-600 text-white px-2 py-0.5 text-xs font-semibold">
                  NEW
                </span>
              )}
              {product.isSale && (
                <span className="bg-black text-white px-2 py-0.5 text-xs font-semibold">
                  SALE
                </span>
              )}
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-3 text-sm">{product.category}</p>

            {/* Rating */}
            {/* <div className="flex items-center mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600 text-sm">
                {product.rating} ({product.reviews.length} reviews)
              </span>
            </div> */}

            {/* Pricing */}
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl font-bold text-red-600">
                &#8377;{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  &#8377;{product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span className="bg-red-600 text-white px-2 py-0.5 text-xs font-semibold">
                  SAVE &#8377;
                  {(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-700 mb-3 text-sm">{product.description}</p>

            <div className="mb-4">
              <h3 className="font-semibold mb-1 text-sm">Features:</h3>
              <ul className="list-disc list-inside space-y-0.5 text-gray-700 text-sm">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold mb-2 text-sm">Size:</h3>
            <div className="flex flex-wrap gap-1.5">
              {allPossibleSizes.map((size) => {
                // Check stock for this size
                const sizeStock = product.variants
                  .filter((variant) => variant.size === size)
                  .reduce((total, variant) => total + variant.stock, 0);

                const isAvailable = sizeStock > 0;

                return (
                  <button
                    key={size}
                    onClick={() => {
                      if (isAvailable) {
                        setSelectedSize(size);
                        setSelectedColor("");
                      }
                    }}
                    className={`border-2 px-3 py-1.5 text-sm font-semibold transition-colors ${
                      selectedSize === size
                        ? "border-red-600 bg-red-600 text-white"
                        : isAvailable
                        ? "border-gray-300 hover:border-red-600 text-gray-900"
                        : "border-gray-200 text-gray-400 line-through cursor-not-allowed"
                    }`}
                    disabled={!isAvailable}>
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="font-semibold mb-2 text-sm">Color:</h3>
            {selectedSize ? (
              <div className="flex flex-wrap gap-1.5">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`border-2 px-3 py-1.5 text-sm font-semibold transition-colors ${
                      selectedColor === color
                        ? "border-red-600 bg-red-600 text-white"
                        : "border-gray-300 hover:border-red-600"
                    }`}>
                    {color}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">
                Please select a size first.
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold mb-2 text-sm">Quantity:</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border border-gray-300 px-2 py-1.5 hover:border-red-600 transition-colors text-sm"
                disabled={quantity <= 1}>
                -
              </button>

              <span className="px-3 py-1.5 border border-gray-300 min-w-[50px] text-center text-sm">
                {quantity}
              </span>

              <button
                onClick={() => {
                  if (quantity < availableStock) {
                    setQuantity(quantity + 1);
                  }
                }}
                className={`border px-2 py-1.5 transition-colors text-sm ${
                  quantity < availableStock
                    ? "border-gray-300 hover:border-red-600"
                    : "border-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                disabled={quantity >= availableStock}>
                +
              </button>
            </div>

            {selectedVariant && (
              <p className="text-xs text-gray-500 mt-1">
                In stock: {availableStock}
              </p>
            )}
          </div>

          {/* Add to Cart */}
          <div className="space-y-3">
            <div className="flex space-x-3">
              {addedToCart ? (
                <Link
                  href="/cart"
                  className="w-full bg-black text-white py-3 px-4 text-xs md:text-base font-semibold hover:bg-black transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Go to Cart</span>
                </Link>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-red-600 text-white py-3 px-4 text-xs md:text-base font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>ADD TO CART</span>
                </button>
              )}

              <button
                onClick={handleBuyItem}
                className="w-full bg-red-600 text-white py-3 px-4 text-xs md:text-base font-semibold hover:bg-red-700 transition-colors flex items-center justify-center space-x-2">
                <ShoppingBagIcon className="h-4 w-4" />
                <span>BUY NOW</span>
              </button>
            </div>
            <div className="flex space-x-3">
              {/* <button className="flex-1 border border-gray-300 py-2 px-3 hover:border-red-600 transition-colors flex items-center justify-center space-x-2 text-sm">
                <Heart className="h-4 w-4" />
                <span>Add to Wishlist</span>
              </button> */}
              <button
                onClick={handleShare}
                className="flex-1 border border-gray-300 py-2 px-3 hover:border-red-600 transition-colors flex items-center justify-center space-x-2 text-sm">
                <Share className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Product Benefits */}
          <div className="border-t pt-4 space-y-3">
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4 text-red-600" />
              <span className="text-xs">Free shipping on prepaid</span>
            </div>
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4 text-red-600" />
              <span className="text-xs">7-day return policy</span>
            </div>
            {/* <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-red-600" />
              <span className="text-xs"></span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Product Reviews */}
      <div className="mb-12">
        <ProductComments reviews={product?.reviews} productId={product.id} />
      </div>

      {/* Related Products */}
      {/* {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group">
                <Link href={`/products/${relatedProduct.id}`}>
                  <div className="relative aspect-square overflow-hidden border border-gray-200">
                    <Image
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 bg-white border-x border-b border-gray-200">
                    <h3 className="font-semibold mb-1 line-clamp-1 text-sm">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-red-600 font-bold text-sm">
                      ${relatedProduct.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}
