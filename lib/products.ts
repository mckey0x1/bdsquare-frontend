import { Product } from './types';

export const products = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    images: [
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg',
      'https://images.pexels.com/photos/8532608/pexels-photo-8532608.jpeg',
      'https://images.pexels.com/photos/8532614/pexels-photo-8532614.jpeg'
    ],
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Red'],
    description: 'A comfortable and stylish cotton t-shirt perfect for everyday wear.',
    features: ['100% Cotton', 'Machine Washable', 'Comfortable Fit'],
    rating: 4.5,

    inStock: true,
    isNew: true,
    isSale: true
  },
  {
    id: '2',
    name: 'Denim Jacket',
    price: 89.99,
    images: [
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      'https://images.pexels.com/photos/1040949/pexels-photo-1040949.jpeg'
    ],
    category: 'Jackets',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Black'],
    description: 'Classic denim jacket with modern styling.',
    features: ['Durable Denim', 'Multiple Pockets', 'Classic Fit'],
    rating: 4.8,
    reviews: [
      {
        id: '2',
        userId: '2',
        userName: 'Jane Smith',
        rating: 5,
        comment: 'Love this jacket! Perfect fit and quality.',
        date: '2024-01-20',
        verified: true
      }
    ],
    inStock: true,
    isNew: false
  },
  {
    id: '3',
    name: 'Casual Chinos',
    price: 59.99,
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'
    ],
    category: 'Pants',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Khaki', 'Navy', 'Black'],
    description: 'Comfortable chinos for casual and formal occasions.',
    features: ['Stretch Fabric', 'Slim Fit', 'Wrinkle Resistant'],
    rating: 4.3,
    reviews: [],
    inStock: true
  },
  {
    id: '4',
    name: 'Hoodie Sweatshirt',
    price: 49.99,
    images: [
      'https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg'
    ],
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Black', 'Red'],
    description: 'Cozy hoodie perfect for casual wear.',
    features: ['Soft Cotton Blend', 'Kangaroo Pocket', 'Adjustable Hood'],
    rating: 4.6,
    reviews: [],
    inStock: true
  },
  {
    id: '5',
    name: 'Summer Dress',
    price: 79.99,
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'
    ],
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Red', 'Blue', 'Green'],
    description: 'Elegant summer dress for any occasion.',
    features: ['Lightweight Fabric', 'Flowy Design', 'Easy Care'],
    rating: 4.7,
    reviews: [],
    inStock: true,
    isNew: true
  },
  {
    id: '6',
    name: 'Leather Boots',
    price: 129.99,
    images: [
      'https://images.pexels.com/photos/1580267/pexels-photo-1580267.jpeg'
    ],
    category: 'Shoes',
    sizes: ['7', '8', '9', '10', '11'],
    colors: ['Brown', 'Black'],
    description: 'Premium leather boots for style and durability.',
    features: ['Genuine Leather', 'Comfortable Sole', 'Water Resistant'],
    rating: 4.9,
    reviews: [],
    inStock: true
  }
];

export const categories = ['All', 'T-Shirts', 'Jackets', 'Pants', 'Hoodies', 'Dresses', 'Shoes'];