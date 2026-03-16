export interface Product {
  id: string;
  name: string;
  price: number;
  discount_rate: number;
  image_url: string;
  category: string;
  description: string;
  created_at: string;
}

export interface Post {
  id: string;
  nickname: string;
  avatar_url: string;
  image_url: string;
  content: string;
  created_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  nickname: string;
  content: string;
  created_at: string;
}
