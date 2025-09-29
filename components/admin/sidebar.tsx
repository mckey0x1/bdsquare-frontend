"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  Warehouse,
  Image,
  Settings,
  BarChart3,
  LogOut
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Categories", href: "/admin/categories", icon: Tag },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Coupons", href: "/admin/coupons", icon: Tag },
  { name: "Inventory", href: "/admin/inventory", icon: Warehouse },
  { name: "Lookbook", href: "/admin/lookbook", icon: Image },
  { name: "Reports", href: "/admin/reports", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth(); // Assuming you have a logout function in your AuthContext

  return (
    <div className="flex h-full w-64 flex-col bg-black">
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href='/'>
          <h1 className="text-xl font-bold text-white">bdsquare</h1>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col px-4 py-1">
        <ul role="list" className="flex flex-1 flex-col gap-y-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex gap-x-3 p-3 text-sm font-semibold leading-6 transition-colors",
                    isActive
                      ? "bg-white text-black"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  )}>
                  <item.icon className="h-5 w-5 shrink-0" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto">
          <button onClick={logout} className="group flex w-full gap-x-3 text-sm p-3 font-semibold leading-6 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <LogOut className="h-5 w-5 shrink-0" />
            Sign Out
          </button>
        </div>
      </nav>
    </div>
  );
}
