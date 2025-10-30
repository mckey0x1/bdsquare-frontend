"use client";
import Link from "next/link";
import Image from "next/image";
import ProductGrid from "@/components/ProductGrid";
import HorizontalProductSlider from "@/components/HorizontalProductSlider";
import { products, categories } from "@/lib/products";
import { ArrowRight, Truck, Shield, RefreshCw, Star } from "lucide-react";
import AnimatedBdsquareText from "@/components/ui/AnimatedBdsquareText";
import HeroSlider from "@/components/HeroSlider";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/cart-context";
import ShowcaseSection from "@/components/showcasesection";
import AutoSlider from "@/components/compSlider";

// Helper to return a single image URL for a product (handles color-specific images)
const getSingleImage = (product: any) => {
  if (!product?.images) return "/placeholder.jpg";

  // If images is array of { color, urls: string[] }
  if (Array.isArray(product.images) && product.images.length > 0) {
    const first = product.images[0];
    if (first && typeof first === "object" && Array.isArray(first.urls)) {
      return first.urls[0] || "/placeholder.jpg";
    }
    // fallback: if images is array of strings
    if (typeof first === "string") return first;
  }

  return "/placeholder.jpg";
};

export default function Home() {
  const { products } = useAuth();

  const filteredProducts = products.filter((product) => {
    // ✅ Only keep if at least one variant is in stock
    const hasStock = product.variants.some((variant) => variant.stock > 0);
    if (!hasStock) return false;

    return true;
  });
  const featuredProducts = filteredProducts.slice(0, 30);
  const newProducts = filteredProducts.filter((p) => p.isNew);

  return (
    <div>
      {/* Hero Section */}
      <HeroSlider />

      {/* Horizontal Products Slider */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              TRENDING NOW
            </h2>
            <p className="text-xl text-gray-600">
              Discover our most popular products
            </p>
          </div>
          <HorizontalProductSlider products={featuredProducts} />
        </div>
      </section> */}

      {/* Features */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                Free shipping on all orders over $50
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">
                Premium quality materials and craftsmanship
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <RefreshCw className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day hassle-free return policy</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* New Arrivals */}
      {/* {newProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                NEW ARRIVALS
              </h2>
              <p className="text-xl text-gray-600">
                Check out our latest collection
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
              {newProducts.map((product) => (
                <div key={product.id} className="group">
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden border border-gray-200">
                      <Image
                        src={getSingleImage(product)}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold">
                          NEW
                        </span>
                      </div>
                    </div>
                    <div className="p-4 bg-white border-x border-b border-gray-200">
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                      <p className="text-red-600 font-bold">₹{product.price}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/products"
                className="bg-red-600 text-white px-8 py-3 font-semibold hover:bg-red-700 transition-colors inline-flex items-center">
                VIEW ALL NEW ARRIVALS
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )} */}

      {/* Categories */}
      {/* <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              SHOP BY CATEGORY
            </h2>
            <p className="text-xl text-gray-600">
              Find exactly what you're looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(1).map((category) => (
              <Link
                key={category}
                href={`/products?category=${category}`}
                className="group text-center">
                <div className="bg-gray-100 aspect-square mb-3 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                  <span className="text-2xl font-bold text-gray-600 group-hover:text-white transition-colors">
                    {category.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold group-hover:text-red-600 transition-colors">
                  {category}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              FEATURED PRODUCTS
            </h2>
            <p className="text-xl text-gray-600">Our most popular items</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {featuredProducts.map((product) => {
              const availableVariants =
                product.variants?.filter((v) => v.stock > 0) || [];
              const availableSizes = Array.from(
                new Set(availableVariants.map((variant) => variant.size))
              );
              return (
                <div key={product.id} className="group">
                  <Link
                    href={`/products/${product.id}`}
                    className="group block">
                    <div className="bg-white border border-gray-200 hover:border-red-600 transition-all duration-300">
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={getSingleImage(product)}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Badges */}
                        <div className="absolute top-2 left-2 space-y-1">
                          {product.isNew && (
                            <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold">
                              NEW
                            </span>
                          )}
                          {product.isSale && (
                            <span className="bg-black text-white px-2 py-1 text-xs font-semibold">
                              SALE
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {product.category}
                        </p>

                        {/* Rating */}
                        {/* <div className="flex items-center mb-2">
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
            <span className="text-sm text-gray-600 ml-1">
              ({product?.reviews?.length ?? 0})
            </span>
          </div> */}

                        {/* Pricing */}
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-red-600">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>

                        {/* Available Sizes */}
                        {availableSizes.length > 0 && (
                          <div className="mt-2">
                            <div className="flex flex-wrap gap-1">
                              {availableSizes.slice(0, 4).map((size) => (
                                <span
                                  key={size}
                                  className="text-xs border border-gray-300 px-2 py-1 text-gray-600">
                                  {size}
                                </span>
                              ))}
                              {availableSizes.length > 4 && (
                                <span className="text-xs text-gray-500">
                                  +{availableSizes.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/products"
              className="bg-red-600 text-white px-8 py-3 font-semibold hover:bg-red-700 transition-colors inline-flex items-center">
              VIEW ALL PRODUCTS
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
      <AutoSlider />
      <ShowcaseSection />
      {/* Newsletter */}
      <AnimatedBdsquareText />
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">STAY IN STYLE</h2>
          <p className="text-xl text-gray-300 mb-8">
            Subscribe to our newsletter and be the first to know about new
            arrivals and exclusive offers
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 text-black outline-none"
              required
            />
            <button
              type="submit"
              className="bg-red-600 text-white px-8 py-3 font-semibold hover:bg-red-700 transition-colors">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
