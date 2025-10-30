export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  stock: number;
  batchNo: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  images: string[]; // updated to array of image URLs
  features: string[];
  inStock: boolean;
  isNew: boolean;
  isSale: boolean;
  status: string;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  variants: ProductVariant[];

  reviews: Review[]
}


export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  images:string[];
  verified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
  stock: number;
  batchNo: string;
}

export interface Address {
  id: string;
  name: string;
  mobile: string;
  pincode: string;
  area: string;
  city: string;
  state: string;
  addressType: string;
  isDefault: boolean;
}
export interface AddressInput {
  name: string;
  mobile: string;
  pincode: string;
  area: string;
  city: string;
  state: string;
  addressType: string;
  isDefault?: boolean; // Optional, defaults to false if not provided
}

export interface User  {
  id?: string;
  name: string;
  email: string;
  phone?: string; // Optional, if user has a phone number
  addresses?: Address[]; // Optional, if user has an address
};
export interface Admin  {
  id: string;
  email: string;
};

export interface Alladmins {
  id:string;
  email:string;
  isAccess:Boolean;
}