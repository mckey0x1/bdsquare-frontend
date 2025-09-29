'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockCoupons } from '@/lib/mock-data';
import { Plus, Search, Edit, Trash2, Copy, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function CouponsPage() {
  const [coupons] = useState(mockCoupons);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  const isExpired = (validTo: string) => {
    return new Date(validTo) < new Date();
  };

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.round((used / limit) * 100);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Coupons & Discounts</h1>
          <p className="text-gray-600">Manage promotional codes and discounts</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Coupon
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search coupon codes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Coupons List */}
      <div className="space-y-4">
        {filteredCoupons.map((coupon) => {
          const expired = isExpired(coupon.validTo);
          const usagePercent = getUsagePercentage(coupon.usedCount, coupon.usageLimit);
          
          return (
            <Card key={coupon.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 px-4 py-2 rounded-lg font-mono text-lg font-semibold">
                      {coupon.code}
                    </div>
                    <div>
                      <p className="text-lg font-semibold">
                        {coupon.type === 'fixed' 
                          ? `₹${coupon.value} off` 
                          : `${coupon.value}% off`
                        }
                      </p>
                      <p className="text-sm text-gray-600">
                        {coupon.type === 'fixed' ? 'Fixed Amount' : 'Percentage'} Discount
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {expired && (
                      <Badge variant="destructive">Expired</Badge>
                    )}
                    <Badge variant={getStatusVariant(coupon.status)}>
                      {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Validity Period
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>From: {format(new Date(coupon.validFrom), 'PPP')}</p>
                      <p>To: {format(new Date(coupon.validTo), 'PPP')}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Usage Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Used</span>
                        <span className="font-medium">{coupon.usedCount} / {coupon.usageLimit}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${Math.min(usagePercent, 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600">{usagePercent}% used</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Actions</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCoupons.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No coupons found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}