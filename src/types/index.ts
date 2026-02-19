export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number; // 0-5
  image: string;
  badge?: "Flash Sale" | "Best Value" | "Hot" | "New";
  category: "footwear" | "gear" | "accessories" | "gift-card";
  isNew?: boolean;
  stock?: number;
}

export interface Review {
  id: number;
  text: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

export interface User {
  name: string;
  username: string;
  email?: string;
  mobile?: string;
  role: 'admin' | 'user';
  password?: string;
}
