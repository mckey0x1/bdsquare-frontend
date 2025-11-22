import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description:
    "Review your shopping cart at bdsquare. Add or remove items, update quantities, and proceed to checkout.",
  keywords: ["shopping cart", "cart", "checkout", "basket", "my cart"],
  robots: {
    index: false,
    follow: true
  }
};

export default function CartLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

