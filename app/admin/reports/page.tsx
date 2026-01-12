'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockDashboardStats, mockOrders, mockProducts } from '@/lib/mock-data';
import { TrendingUp, DollarSign, ShoppingCart, Users, Package, MapPin } from 'lucide-react';
import { useState } from 'react';

const salesData = [
  { name: 'Jan', sales: 45000 },
  { name: 'Feb', sales: 52000 },
  { name: 'Mar', sales: 48000 },
  { name: 'Apr', sales: 61000 },
  { name: 'May', sales: 55000 },
  { name: 'Jun', sales: 67000 },
];

const topLocations = [
  { city: 'Mumbai', state: 'Maharashtra', orders: 45, sales: 125000 },
  { city: 'Delhi', state: 'Delhi', orders: 38, sales: 98000 },
  { city: 'Bangalore', state: 'Karnataka', orders: 32, sales: 87000 },
  { city: 'Chennai', state: 'Tamil Nadu', orders: 28, sales: 75000 },
  { city: 'Hyderabad', state: 'Telangana', orders: 24, sales: 62000 },
];

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState('month');
  const stats = mockDashboardStats;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Track your store's performance and insights</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold">₹{stats.monthlySales.toLocaleString()}</p>
                <p className="text-sm text-green-600 font-medium">+12% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold">{stats.monthlyOrders}</p>
                <p className="text-sm text-green-600 font-medium">+8% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">New Customers</p>
                <p className="text-2xl font-bold">{stats.newCustomers}</p>
                <p className="text-sm text-green-600 font-medium">+15% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold">₹{Math.round(stats.monthlySales / stats.monthlyOrders).toLocaleString()}</p>
                <p className="text-sm text-green-600 font-medium">+3% from last month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Sales Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.name}</span>
                  <div className="flex items-center gap-3 flex-1 ml-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(item.sales / 70000) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-16 text-right">₹{(item.sales / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Best Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Best Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.popularProducts.map((product:any, index:any) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {index + 1}
                    </span>
                    <span className="font-medium">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{product.sales} sold</p>
                    <p className="text-sm text-gray-600">₹{(product.sales * 2000).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Sales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Sales by Location
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-4 font-medium text-gray-900">City</th>
                  <th className="pb-4 font-medium text-gray-900">State</th>
                  <th className="pb-4 font-medium text-gray-900">Orders</th>
                  <th className="pb-4 font-medium text-gray-900">Sales</th>
                  <th className="pb-4 font-medium text-gray-900">Avg Order Value</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topLocations.map((location, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 font-medium">{location.city}</td>
                    <td className="py-4 text-gray-600">{location.state}</td>
                    <td className="py-4">{location.orders}</td>
                    <td className="py-4 font-semibold">₹{location.sales.toLocaleString()}</td>
                    <td className="py-4">₹{Math.round(location.sales / location.orders).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}