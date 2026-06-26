export interface Restaurant {
  id: string;
  name: string;
  image: string;
  logo: string;
  rating: number;
  deliveryFee: number;
  waitTime: string;
  categories: string[];
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes?: { name: string; price: number }[];
  extras?: { name: string; price: number }[];
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  meta?: string;
  extras?: { name: string; price: number }[];
  size?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'pending' | 'accepted' | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled';
  total: number;
  deliveryFee: number;
  recipientName: string;
  recipientPhone: string;
  pickupLocation: string;
  deliveryLocation: string;
  paymentMethod: string;
  createdAt: string;
  estimatedDelivery: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
}
