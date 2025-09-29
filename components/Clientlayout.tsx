"use client"; // 👈 required to use hooks

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function ClientLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.includes("/admin");

  return (
    <>
      {!isAdmin && <Header />}
      <main className="min-h-screen">{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
