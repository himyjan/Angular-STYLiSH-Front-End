import { signal } from '@angular/core';
import type { CartItem } from '../types/cartItemType';

export class CartService {
  cartItems = signal<CartItem[]>(JSON.parse(window.localStorage.getItem('cartItems') ?? '[]') ?? []);

  setCartItem(cartItems: CartItem[]) {
    this.cartItems.set(cartItems);
  }
}
