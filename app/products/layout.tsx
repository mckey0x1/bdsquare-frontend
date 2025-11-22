import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Products",
  description:
    "Browse our complete collection of premium fashion at bdsquare. Discover trending styles, new arrivals, and exclusive deals.",
  keywords: [
    "products",
    "fashion",
    "clothing",
    "shop",
    "browse products",
    "all products"
  ],
  openGraph: {
    title: "All Products | bdsquare",
    description:
      "Browse our complete collection of premium fashion at bdsquare.",
    type: "website"
  }
};

export default function ProductsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

