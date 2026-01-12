import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details",
  description:
    "View product details, sizes, colors, and reviews. Add to cart and shop premium fashion at bdsquare.",
  keywords: ["product", "product details", "buy", "fashion item"],
  openGraph: {
    title: "Product Details | bdsquare",
    description: "View product details and shop premium fashion at bdsquare.",
    type: "website"
  }
};

export default function ProductDetailLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

