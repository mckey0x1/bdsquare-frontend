import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your purchase at bdsquare. Enter shipping details, select payment method, and place your order securely.",
  keywords: ["checkout", "payment", "place order", "buy now", "purchase"],
  robots: {
    index: false,
    follow: true
  }
};

export default function CheckoutLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

