import { Product, Category, Collection, Order, Customer, Coupon, DashboardStats, Products } from '@/lib/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Classic Oversized Hoodie',
    description: 'Premium cotton blend oversized hoodie with modern fit',
    price: 2499,
    category: 'hoodies',
    sizes: [
      { size: 'S', stock: 15 },
      { size: 'M', stock: 25 },
      { size: 'L', stock: 20 },
      { size: 'XL', stock: 8 }
    ],
    colors: ['Black', 'White', 'Gray', 'Navy'],
    images: [
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
      'https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg'
    ],
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T15:30:00Z'
  },
  {
    id: '2',
    title: 'Minimalist Cotton T-Shirt',
    description: 'Soft cotton t-shirt with clean minimalist design',
    price: 899,
    category: 'tshirts',
    sizes: [
      { size: 'S', stock: 30 },
      { size: 'M', stock: 35 },
      { size: 'L', stock: 25 },
      { size: 'XL', stock: 15 }
    ],
    colors: ['White', 'Black', 'Olive', 'Beige'],
    images: [
      'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg'
    ],
    status: 'active',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-18T12:00:00Z'
  },
  {
    id: '3',
    title: 'Streetwear Baseball Cap',
    description: 'Adjustable baseball cap with embroidered logo',
    price: 1299,
    category: 'caps',
    sizes: [
      { size: 'One Size', stock: 3 }
    ],
    colors: ['Black', 'White', 'Navy', 'Red'],
    images: [
      'https://images.pexels.com/photos/1038914/pexels-photo-1038914.jpeg'
    ],
    status: 'active',
    createdAt: '2024-01-08T14:00:00Z',
    updatedAt: '2024-01-22T09:15:00Z'
  }
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Hoodies', description: 'Comfortable hoodies and sweatshirts', createdAt: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'T-Shirts', description: 'Classic and trendy t-shirts', createdAt: '2024-01-01T00:00:00Z' },
  { id: '3', name: 'Caps', description: 'Stylish caps and hats', createdAt: '2024-01-01T00:00:00Z' }
];

export const mockCollections: Collection[] = [
  {
    id: '1',
    name: 'Oversized Drop',
    description: 'Latest oversized clothing collection',
    products: ['1'],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Minimalist Pack',
    description: 'Clean and minimal designs',
    products: ['2'],
    createdAt: '2024-01-05T00:00:00Z'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: 'CUST-001',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    items: [
      {
        productId: '1',
        productTitle: 'Classic Oversized Hoodie',
        size: 'M',
        color: 'Black',
        quantity: 1,
        price: 2499
      }
    ],
    total: 2499,
    status: 'processing',
    paymentStatus: 'paid',
    shippingAddress: {
      street: '123 Main St',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      country: 'India'
    },
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-20T15:00:00Z'
  },
  {
    id: 'ORD-002',
    customerId: 'CUST-002',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    items: [
      {
        productId: '2',
        productTitle: 'Minimalist Cotton T-Shirt',
        size: 'S',
        color: 'White',
        quantity: 2,
        price: 899
      }
    ],
    total: 1798,
    status: 'shipped',
    paymentStatus: 'paid',
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Delhi',
      state: 'Delhi',
      zipCode: '110001',
      country: 'India'
    },
    createdAt: '2024-01-19T14:20:00Z',
    updatedAt: '2024-01-21T09:00:00Z'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    orders: 3,
    totalSpent: 7497,
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'CUST-002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+91 87654 32109',
    orders: 1,
    totalSpent: 1798,
    createdAt: '2024-01-19T00:00:00Z'
  }
];

export const mockCoupons: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    validFrom: '2024-01-01T00:00:00Z',
    validTo: '2024-12-31T23:59:59Z',
    usageLimit: 100,
    usedCount: 25,
    status: 'active'
  },
  {
    id: '2',
    code: 'FLAT500',
    type: 'fixed',
    value: 500,
    validFrom: '2024-01-01T00:00:00Z',
    validTo: '2024-03-31T23:59:59Z',
    usageLimit: 50,
    usedCount: 12,
    status: 'active'
  }
];

export const mockDashboardStats: DashboardStats = {
  todayOrders: 8,
  monthlyOrders: 156,
  todaySales: 18750,
  monthlySales: 385600,
  lowStockProducts: 2,
  newCustomers: 3,
  popularProducts: [
    { id: '1', name: 'Classic Oversized Hoodie', sales: 45 },
    { id: '2', name: 'Minimalist Cotton T-Shirt', sales: 38 },
    { id: '3', name: 'Streetwear Baseball Cap', sales: 22 }
  ]
};

export const mockProductss: Products[] = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    title: "Premium Cotton T-Shirt",
    description:
      "A comfortable and stylish cotton t-shirt perfect for everyday wear.",
    price: 29.99,
    originalPrice: 39.99,
    category: "T-Shirts",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Gray", "Navy"],
    images: [
      "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
      "https://images.pexels.com/photos/8532608/pexels-photo-8532608.jpeg",
      "https://images.pexels.com/photos/8532614/pexels-photo-8532614.jpeg"
    ],
    features: ["100% Cotton", "Machine Washable", "Comfortable Fit"],
    rating: 4.5,
    reviews: [
      {
        id: "1",
        userId: "1",
        userName: "John Doe",
        rating: 5,
        comment: "Great quality and comfortable fit!",
        date: "2024-01-15",
        verified: true
      }
    ],
    inStock: true,
    isNew: true,
    isSale: true,
    status: "active",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T15:30:00Z"
  },
  {
    id: "2",
    name: "Classic Hoodie",
    title: "Classic Hoodie",
    description:
      "Premium cotton blend hoodie with modern fit and comfortable design",
    price: 59.99,
    originalPrice: 79.99,
    category: "Hoodies",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Black", "Olive", "Beige"],
    images: [
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg",
      "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg"
    ],
    features: ["Cotton Blend", "Drawstring Hood", "Kangaroo Pocket"],
    rating: 4.3,
    reviews: [
      {
        id: "2",
        userId: "2",
        userName: "Jane Smith",
        rating: 4,
        comment: "Very comfortable and warm!",
        date: "2024-01-10",
        verified: true
      }
    ],
    inStock: true,
    isNew: false,
    isSale: true,
    status: "active",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-18T12:00:00Z"
  },
  {
    id: "3",
    name: "Streetwear Baseball Cap",
    title: "Streetwear Baseball Cap",
    description: "Adjustable baseball cap with embroidered logo",
    price: 24.99,
    category: "Caps",
    sizes: ["One Size"],
    colors: ["Black", "White", "Navy", "Red"],
    images: [
      "https://images.pexels.com/photos/1038914/pexels-photo-1038914.jpeg"
    ],
    features: ["Adjustable Strap", "Embroidered Logo", "Cotton Twill"],
    rating: 4.1,
    reviews: [],
    inStock: true,
    isNew: true,
    isSale: false,
    status: "active",
    createdAt: "2024-01-08T14:00:00Z",
    updatedAt: "2024-01-22T09:15:00Z"
  }
];