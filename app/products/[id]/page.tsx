"use client"
import Image from "next/image";
import Link from "next/link";
import ImageSlider from "@/components/ImageSlider";
import ProductComments from "@/components/ProductComments";
import {
  Star,
  ShoppingCart,
  Heart,
  Share,
  Truck,
  Shield,
  RefreshCw,
  ArrowLeft
} from "lucide-react";
import ProductPageClient from "./ProductPageClient";
import { useAuth } from "@/context/AuthContext";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { products } = useAuth();
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products" className="text-red-600 hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return <ProductPageClient product={product} />;
}
