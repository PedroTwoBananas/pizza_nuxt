export type ProductSize = '20' | '30' | '40';
export type ProductType = 'hot' | 'vegan' | 'cheese' | 'meat';

export interface Product {
  id: number;
  title: string;
  subtitle: string;
  size: ProductSize[];
  price: [number, number, number];
  type: ProductType;
  image: string;
  imageAlt?: string;
}

export interface CartPizza {
  id: string;
  title: string;
  subtitle: string;
  size: ProductSize;
  price: number;
  image: string;
  quantity: number;
  addedAt: Date;
}
