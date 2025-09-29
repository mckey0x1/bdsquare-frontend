'use client';

import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Header() {
  return (
    <header className="bg-white border-b border-black px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black" />
            <Input
              placeholder="Search products, orders, customers..."
              className="pl-10 border-black"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-black text-white text-xs flex items-center justify-center">
              3
            </span>
          </Button>
          
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}