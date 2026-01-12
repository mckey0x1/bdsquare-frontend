"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminAuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { admin } = useAuth();

  useEffect(() => {
    if (admin) {
      redirect("/admin");
    }
  }, [admin]);

  return (
    <div className="h-screen flex bg-white">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
