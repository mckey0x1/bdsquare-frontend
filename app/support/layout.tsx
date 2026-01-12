import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Support",
  description:
    "Get help from bdsquare customer support. Contact us for assistance with orders, products, or any questions you may have.",
  keywords: [
    "customer support",
    "help",
    "support",
    "contact support",
    "customer service"
  ],
  openGraph: {
    title: "Customer Support | bdsquare",
    description:
      "Get help from bdsquare customer support.",
    type: "website"
  }
};

export default function SupportLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

