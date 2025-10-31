"use client";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/admin/sidebar";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import CubeSpinner from "@/components/cube-loader";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { admin, CubeLoader, alladmins, logout } = useAuth();

  if (
    alladmins.find((k) => k.email === admin?.email)?.isAccess === false &&
    admin?.email !== "bdsquare@gmail.com"
  ) {
    logout();
    return <div>You are not authorized to login!</div>;
  }

  useEffect(() => {
    if (!admin && !CubeLoader) {
      redirect("/adminauth/login");
    }
  }, [admin, CubeLoader]);

  if (CubeLoader) return <CubeSpinner />;

  return (
    <div className="h-screen flex bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <Header /> */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
