export enum Size {
  S = "S",
  M = "M",
  L = "L",
  Xl = "XL",
}

export type Color = {
  code: string;
  name: string;
};

export type Variant = {
  color_code: string;
  size: Size;
  stock: number;
}

export type ProductDetailsData = {
  value: ProductDetailsData;
  id: number;
  category: string;
  title: string;
  description: string;
  price: number;
  texture: string;
  wash: string;
  place: string;
  note: string;
  story: string;
  main_image: string;
  images: string[];
  variants: Variant[];
  colors: Color[];
  sizes: string[];
}

export type ProductsSearch = {
  data: ProductDetailsData[];
  next_paging?: number;
}

export type ProductDetails = {
  data: ProductDetailsData;
}

// export type Product = {
//   id?: number;
//   product_id?: number;
//   picture?: string;
//   story?: string;
//   category?: string;
//   title?: string;
//   price?: number;
//   main_image?: string;
//   colors?: Color[];
//   color?: Color;
//   note?: string;
//   texture?: string;
//   description?: string;
//   wash?: string;
//   place?: string;
//   images?: string[];
//   sizes?: string[];
//   size?: string;
//   qty?: number;
//   stock?: number;
//   name?: string;
//   image?: string;
// };
