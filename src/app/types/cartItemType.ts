export type CartItem = {
  id: string;
  color: {
    code: string;
    name: string;
  };
  size: string;
  image: string;
  name: string;
  qty: number;
  price: number;
  stock: number;
}
