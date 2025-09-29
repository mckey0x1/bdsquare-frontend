'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { mockCategories, mockCollections, mockProducts } from '@/lib/mock-data';
import { Plus, Search, Edit, Trash2, Tag, Folder } from 'lucide-react';

export default function CategoriesPage() {
  const [categories] = useState(mockCategories);
  const [collections] = useState(mockCollections);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryProductCount = (categoryName: string) => {
    return mockProducts.filter(product => 
      product.category.toLowerCase() === categoryName.toLowerCase()
    ).length;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories & Collections</h1>
          <p className="text-gray-600">Organize your products with categories and collections</p>
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
                  placeholder="Search categories and collections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Categories */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Categories
              </CardTitle>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Category
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCategories.map((category) => {
                const productCount = getCategoryProductCount(category.name);
                
                return (
                  <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <Tag className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{category.name}</h3>
                          {category.description && (
                            <p className="text-sm text-gray-600">{category.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">
                        {productCount} products
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Collections */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Folder className="h-5 w-5" />
                Collections
              </CardTitle>
              <Button size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Collection
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCollections.map((collection) => (
                <div key={collection.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <Folder className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{collection.name}</h3>
                        {collection.description && (
                          <p className="text-sm text-gray-600">{collection.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">
                      {collection.products.length} products
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tags Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Product Tags</CardTitle>
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Tag
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['Winter', 'Summer', 'Sale', 'New Arrival', 'Trending', 'Limited Edition', 'Bestseller', 'Eco-Friendly'].map((tag) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1 text-sm">
                {tag}
                <button className="ml-2 text-gray-500 hover:text-gray-700">
                  <Trash2 className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}