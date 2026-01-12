import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details",
  description:
    "View your order details, track shipment, and manage your bdsquare order.",
  keywords: ["order", "order details", "track order", "order status"],
  robots: {
    index: false,
    follow: true
  }
};

export default function OrderDetailLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

