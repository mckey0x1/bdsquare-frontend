import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <Link href="/">
                <Image
                  src="/image/bdsquare-white.png"
                  height={50}
                  width={50}
                  alt="logo"
                />
              </Link>
            </div>
            <p className="text-gray-300 mb-4">
              Your premier destination for high-quality clothing and fashion
              accessories.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-red-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-red-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-red-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-red-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-300 hover:text-red-600 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-300 hover:text-red-600 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-red-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-red-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-300 hover:text-red-600 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-300 hover:text-red-600 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="text-gray-300 hover:text-red-600 transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-red-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-gray-300 hover:text-red-600 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-red-600" />
                <span className="text-gray-300">
                  L 111 prem nagar 2 kirari suleman nagar, New Delhi 110086
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-600" />
                <span className="text-gray-300">+919625962784</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-600" />
                <span className="text-gray-300">support@bdsquare.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            <Link
              className="cursor-default
"
              href="/adminauth/login">
              © 2025 bdsquare.
            </Link>{" "}
            All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-gray-300 hover:text-red-600 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-300 hover:text-red-600 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
