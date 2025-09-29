'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockCustomers } from '@/lib/mock-data';
import { Search, Mail, Phone, ShoppingBag, Eye } from 'lucide-react';

export default function CustomersPage() {
  const [customers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCustomerTier = (totalSpent: number) => {
    if (totalSpent >= 10000) return { label: 'VIP', variant: 'default' as const };
    if (totalSpent >= 5000) return { label: 'Gold', variant: 'secondary' as const };
    return { label: 'Silver', variant: 'outline' as const };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600">Manage your customer base</p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => {
          const tier = getCustomerTier(customer.totalSpent);
          
          return (
            <Card key={customer.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{customer.name}</h3>
                      <p className="text-sm text-gray-600">Customer since {new Date(customer.createdAt).toLocaleDateString()}</p>
                    </div>
                    <Badge variant={tier.variant}>
                      {tier.label}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{customer.email}</span>
                    </div>
                    {customer.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{customer.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <ShoppingBag className="h-4 w-4 text-gray-400" />
                      </div>
                      <p className="text-2xl font-bold">{customer.orders}</p>
                      <p className="text-xs text-gray-600">Orders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">₹{customer.totalSpent.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">Total Spent</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No customers found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}