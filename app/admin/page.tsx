"use client";
import { StatsCard } from "@/components/admin/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { mockDashboardStats } from "@/lib/mock-data";
import {
  ShoppingCart,
  DollarSign,
  AlertTriangle,
  Users,
  TrendingUp
} from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const stats = mockDashboardStats;
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>
        <p className="text-black">Welcome to your clothing store admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Today's Orders"
          value={stats.todayOrders}
          change="+12% from yesterday"
          changeType="positive"
          icon={<ShoppingCart className="h-6 w-6 text-black" />}
        />
        <StatsCard
          title="Today's Sales"
          value={`₹${stats.todaySales.toLocaleString()}`}
          change="+8% from yesterday"
          changeType="positive"
          icon={<DollarSign className="h-6 w-6 text-black" />}
        />
        <StatsCard
          title="Low Stock Items"
          value={stats.lowStockProducts}
          change="2 items need restock"
          changeType="negative"
          icon={<AlertTriangle className="h-6 w-6 text-black" />}
        />
        <StatsCard
          title="New Customers"
          value={stats.newCustomers}
          change="+5% this month"
          changeType="positive"
          icon={<Users className="h-6 w-6 text-black" />}
        />
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-black">Total Orders</span>
              <span className="font-semibold">{stats.monthlyOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-black">Total Sales</span>
              <span className="font-semibold">
                ₹{stats.monthlySales.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-black">Average Order Value</span>
              <span className="font-semibold">
                ₹
                {Math.round(
                  stats.monthlySales / stats.monthlyOrders
                ).toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.popularProducts.map((product:any, index:any) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 bg-black text-white text-xs font-medium">
                      {index + 1}
                    </span>
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <span className="text-black">{product.sales} sold</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-gray-100">
              <ShoppingCart className="h-8 w-8 text-black" />
              <div>
                <p className="font-medium">New order #ORD-003 received</p>
                <p className="text-sm text-black">₹2,499 • 2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-100">
              <Users className="h-8 w-8 text-black" />
              <div>
                <p className="font-medium">New customer registered</p>
                <p className="text-sm text-black">
                  Alice Johnson • 15 minutes ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-100">
              <AlertTriangle className="h-8 w-8 text-black" />
              <div>
                <p className="font-medium">Low stock alert</p>
                <p className="text-sm text-black">
                  Streetwear Baseball Cap (One Size) • 1 hour ago
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
