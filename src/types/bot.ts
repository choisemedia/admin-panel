export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  stock?: number;
  category?: string;
}

export interface Bot {
  id: string;
  name: string;
  username: string;
  token: string;
  description: string;
  avatar: string;
  followers: number;
  following: number;
  likes: number;
  products: Product[];
  createdAt: string;
  updatedAt: string;
}

export interface BotsState {
  items: Bot[];
  loading: boolean;
  error: string | null;
}