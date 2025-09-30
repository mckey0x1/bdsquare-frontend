"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  LogIn,
  User2,
  UserCircle2,
  UserCircle
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import LoginModal from "./LoginModal";
import SearchModal from "./SearchModal";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, isLoginModalOpen, setIsLoginModalOpen } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { cartItems } = useCart();
  const pathname = usePathname();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isHomePage = pathname === "/";

  useEffect(() => {
    // Only apply scroll effects on home page
    if (!isHomePage) {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const categories = [
    {
      name: "Men",
      items: ["T-Shirts", "Shirts", "Pants", "Jackets", "Shoes", "Accessories"]
    },
    {
      name: "Women",
      items: ["Dresses", "Tops", "Bottoms", "Outerwear", "Shoes", "Bags"]
    },
    {
      name: "Kids",
      items: ["Boys", "Girls", "Baby", "Shoes", "Accessories"]
    },
    {
      name: "Sports",
      items: ["Athletic Wear", "Footwear", "Equipment", "Outdoor"]
    }
  ];

  const collections = [
    {
      name: "New Arrivals",
      items: ["Latest Trends", "Featured Items",]
    },
    // {
    //   name: "Sale",
    //   items: ["Clearance", "End of Season", "Flash Sale", "Bundle Deals"]
    // },
    // {
    //   name: "Premium",
    //   items: ["Luxury Collection", "Designer Brands", "Exclusive Items"]
    // }
  ];

  return (
    <>
      <header
        className={`py-4 print-header ${
          isHomePage
            ? !isScrolled
              ? "bg-black text-white"
              : "bg-white text-black"
            : "bg-white text-black"
        } ${
          isHomePage
            ? !isScrolled
              ? "border-white"
              : "border-red-600"
            : "border-red-600"
        } sticky top-0 z-50 transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* Categories */}
              {/* <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("categories")}
                onMouseLeave={() => setActiveSubmenu(null)}>
                <button
                  className={`flex items-center space-x-1 ${
                    isHomePage
                      ? !isScrolled
                        ? "text-white hover:text-red-400"
                        : "text-gray-900 hover:text-red-600"
                      : "text-gray-900 hover:text-red-600"
                  } transition-colors`}>
                  <span>Categories</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {activeSubmenu === "categories" && (
                  <div
                    className={`absolute top-full left-0 ${
                      isHomePage
                        ? !isScrolled
                          ? "bg-black border-white"
                          : "bg-white border-gray-200"
                        : "bg-white border-gray-200"
                    } border-t-0 shadow-lg z-50`}>
                    <div className="flex">
                      {categories.map((category) => (
                        <div key={category.name} className="min-w-[200px] p-4">
                          <h3
                            className={`font-semibold mb-3 ${
                              isHomePage
                                ? !isScrolled
                                  ? "text-red-400"
                                  : "text-red-600"
                                : "text-red-600"
                            }`}>
                            {category.name}
                          </h3>
                          <ul className="space-y-2">
                            {category.items.map((item) => (
                              <li key={item}>
                                <Link
                                  href={`/products?category=${item}`}
                                  className={`block ${
                                    isHomePage
                                      ? !isScrolled
                                        ? "text-white hover:text-red-400"
                                        : "text-gray-700 hover:text-red-600"
                                      : "text-gray-700 hover:text-red-600"
                                  } transition-colors`}>
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div> */}

              {/* Collections */}
              <div
                className="relative"
                onMouseEnter={() => setActiveSubmenu("collections")}
                onMouseLeave={() => setActiveSubmenu(null)}>
                <button
                  className={`flex items-center space-x-1 ${
                    isHomePage
                      ? !isScrolled
                        ? "text-white hover:text-red-400"
                        : "text-gray-900 hover:text-red-600"
                      : "text-gray-900 hover:text-red-600"
                  } transition-colors`}>
                  <span>Collections</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {activeSubmenu === "collections" && (
                  <div
                    className={`absolute top-full left-0 ${
                      isHomePage
                        ? !isScrolled
                          ? "bg-black border-white"
                          : "bg-white border-gray-200"
                        : "bg-white border-gray-200"
                    } border-t-0 shadow-lg z-50`}>
                    <div className="flex">
                      {collections.map((collection) => (
                        <div
                          key={collection.name}
                          className="min-w-[200px] p-4">
                          <h3
                            className={`font-semibold mb-3 ${
                              isHomePage ? "text-red-400" : "text-red-600"
                            }`}>
                            {collection.name}
                          </h3>
                          <ul className="space-y-2">
                            {collection.items.map((item) => (
                              <li key={item}>
                                <Link
                                  href={`/products?collection=${item}`}
                                  className={`block ${
                                    isHomePage
                                      ? !isScrolled
                                        ? "text-white hover:text-red-400"
                                        : "text-gray-700 hover:text-red-600"
                                      : "text-gray-700 hover:text-red-600"
                                  } transition-colors`}>
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Centered Logo */}
            <div className="flex-1 flex justify-center">
              <Link
                href="/"
                className={`text-2xl font-bold ${
                  isHomePage
                    ? !isScrolled
                      ? "text-white"
                      : "text-red-600"
                    : "text-red-600"
                } transition-colors duration-300`}>
                {isHomePage ? (
                  !isScrolled ? (
                    <Image
                      width={70}
                      height={70}
                      src="/image/bdsquare-white.png"
                      alt="logo"
                    />
                  ) : (
                    <Image
                      width={70}
                      height={70}
                      src="/image/bdsquare-black.png"
                      alt="logo"
                    />
                  )
                ) : (
                  <Image
                    width={70}
                    height={70}
                    src="/image/bdsquare-black.png"
                    alt="logo"
                  />
                )}
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className={`p-2 ${
                  isHomePage
                    ? !isScrolled
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-100"
                    : "hover:bg-gray-100"
                } transition-colors`}>
                <Search
                  className={`h-6 w-6 ${
                    isHomePage
                      ? !isScrolled
                        ? "text-white"
                        : "text-gray-700"
                      : "text-gray-700"
                  }`}
                />
              </button>
              {user ? (
                <Link
                  href="/profile"
                  className={`p-2 ${
                    isHomePage
                      ? !isScrolled
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-100"
                      : "hover:bg-gray-100"
                  } transition-colors`}>
                  <UserCircle2
                    className={`h-6 w-6 ${
                      isHomePage
                        ? !isScrolled
                          ? "text-white"
                          : "text-gray-700"
                        : "text-gray-700"
                    }`}
                  />
                </Link>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className={`p-2 ${
                    isHomePage
                      ? !isScrolled
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-100"
                      : "hover:bg-gray-100"
                  } transition-colors`}>
                  <User
                    className={`h-6 w-6 ${
                      isHomePage
                        ? !isScrolled
                          ? "text-white"
                          : "text-gray-700"
                        : "text-gray-700"
                    }`}
                  />
                </button>
              )}

              <Link
                href="/cart"
                className={`relative p-2 ${
                  isHomePage
                    ? !isScrolled
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-100"
                    : "hover:bg-gray-100"
                } transition-colors`}>
                <ShoppingCart
                  className={`h-6 w-6 ${
                    isHomePage
                      ? !isScrolled
                        ? "text-white"
                        : "text-gray-700"
                      : "text-gray-700"
                  }`}
                />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden p-2 ${
                  isHomePage
                    ? !isScrolled
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-100"
                    : "hover:bg-gray-100"
                } transition-colors`}>
                {isMenuOpen ? (
                  <X
                    className={`h-6 w-6 ${
                      isHomePage
                        ? !isScrolled
                          ? "text-white"
                          : "text-black"
                        : "text-black"
                    }`}
                  />
                ) : (
                  <Menu
                    className={`h-6 w-6 ${
                      isHomePage
                        ? !isScrolled
                          ? "text-white"
                          : "text-black"
                        : "text-black"
                    }`}
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div
            className={`lg:hidden ${
              isHomePage ? (!isScrolled ? "bg-black" : "bg-white") : "bg-white"
            } border-t ${
              isHomePage
                ? !isScrolled
                  ? "border-white"
                  : "border-gray-200"
                : "border-gray-200"
            }`}>
            <nav className="px-4 py-4 space-y-4">
              {/* Mobile Categories */}
              <div>
                {/* <h3
                  className={`font-semibold mb-2 ${
                    isHomePage
                      ? !isScrolled
                        ? "text-red-400"
                        : "text-red-600"
                      : "text-red-600"
                  }`}>
                  Categories
                </h3>
                <div className="grid grid-cols-2 gap-2 ml-4">
                  {categories.map((category) => (
                    <div key={category.name}>
                      <p
                        className={`font-medium mb-1 ${
                          isHomePage
                            ? !isScrolled
                              ? "text-white"
                              : "text-gray-900"
                            : "text-gray-900"
                        }`}>
                        {category.name}
                      </p>
                      <ul className="space-y-1">
                        {category.items.slice(0, 3).map((item) => (
                          <li key={item}>
                            <Link
                              href={`/products?category=${item}`}
                              className={`text-sm ${
                                isHomePage
                                  ? !isScrolled
                                    ? "text-gray-300 hover:text-red-400"
                                    : "text-gray-600 hover:text-red-600"
                                  : "text-gray-600 hover:text-red-600"
                              } transition-colors`}>
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div> */}
              </div>

              {/* Mobile Collections */}
              <div>
                <h3
                  className={`font-semibold mb-2 ${
                    isHomePage
                      ? !isScrolled
                        ? "text-red-400"
                        : "text-red-600"
                      : "text-red-600"
                  }`}>
                  Collections
                </h3>
                <div className="ml-4 space-y-2">
                  {collections.map((collection) => (
                    <div key={collection.name}>
                      <p
                        className={`font-medium ${
                          isHomePage
                            ? !isScrolled
                              ? "text-white"
                              : "text-gray-900"
                            : "text-gray-900"
                        }`}>
                        {collection.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
}
