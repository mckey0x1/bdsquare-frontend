import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return Details",
  description:
    "Track your return order, view return status, and manage your bdsquare return.",
  keywords: ["return", "return details", "track return", "return status"],
  robots: {
    index: false,
    follow: true
  }
};

export default function ReturnDetailLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

