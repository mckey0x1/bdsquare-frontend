'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Upload, Edit, Trash2, Eye, EyeOff, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

const mockBanners = [
  {
    id: '1',
    title: 'Winter Collection 2024',
    description: 'Stay warm and stylish with our latest winter collection',
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
    status: 'active',
    link: '/collections/winter-2024',
    position: 1
  },
  {
    id: '2',
    title: 'Flash Sale - 50% Off',
    description: 'Limited time offer on selected items',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    status: 'active',
    link: '/sale',
    position: 2
  },
  {
    id: '3',
    title: 'New Arrivals',
    description: 'Check out our latest products',
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg',
    status: 'hidden',
    link: '/new-arrivals',
    position: 3
  }
];

const mockLookbook = [
  {
    id: '1',
    title: 'Street Style Essentials',
    description: 'Urban looks for the modern trendsetter',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    products: ['1', '2'],
    tags: ['streetwear', 'casual', 'urban']
  },
  {
    id: '2',
    title: 'Minimalist Comfort',
    description: 'Clean lines and comfortable fits',
    image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg',
    products: ['2'],
    tags: ['minimal', 'comfort', 'basics']
  }
];

export default function LookbookPage() {
  const [banners] = useState(mockBanners);
  const [lookbook] = useState(mockLookbook);
  const [activeTab, setActiveTab] = useState('banners');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lookbook & Banners</h1>
          <p className="text-gray-600">Manage your homepage banners and lookbook content</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('banners')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'banners' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Homepage Banners
        </button>
        <button
          onClick={() => setActiveTab('lookbook')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'lookbook' 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Lookbook Gallery
        </button>
      </div>

      {activeTab === 'banners' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Banner
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {banners.map((banner) => (
              <Card key={banner.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Badge variant={banner.status === 'active' ? 'default' : 'secondary'}>
                      {banner.status === 'active' ? (
                        <>
                          <Eye className="h-3 w-3 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-3 w-3 mr-1" />
                          Hidden
                        </>
                      )}
                    </Badge>
                    <Badge variant="outline">
                      Position {banner.position}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{banner.title}</h3>
                      <p className="text-sm text-gray-600">{banner.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Link:</span>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">{banner.link}</code>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'lookbook' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Lookbook Entry
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {lookbook.map((entry) => (
              <Card key={entry.id} className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={entry.image}
                    alt={entry.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{entry.title}</h3>
                      <p className="text-sm text-gray-600">{entry.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Products:</span>
                      <Badge variant="outline">{entry.products.length} linked</Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upload New Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Upload New Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Drop images here or click to browse</p>
                  <p className="text-sm text-gray-600">Support for JPG, PNG, WebP up to 10MB</p>
                </div>
                <Button variant="outline" className="mt-4">
                  Select Images
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}