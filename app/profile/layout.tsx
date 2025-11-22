import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile",
  description:
    "Manage your bdsquare profile, addresses, and order history. Update your personal information and preferences.",
  keywords: ["profile", "account", "my account", "user profile", "order history"],
  robots: {
    index: false,
    follow: true
  }
};

export default function ProfileLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

