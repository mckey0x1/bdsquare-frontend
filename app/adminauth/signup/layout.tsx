import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Signup",
  description: "Create an admin account for bdsquare.",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminSignupLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

