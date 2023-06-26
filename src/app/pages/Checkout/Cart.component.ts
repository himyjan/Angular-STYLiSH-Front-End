import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../store/cart.service';

@Component({
  selector: 'Cart',
  standalone: true,
  template: `
    <div class="Header">
      <div class="ItemCount">購物車({{ cartItems().length }})</div>
      <div class="Quantity" hideOnMobile>數量</div>
      <div class="UnitPrice" hideOnMobile>單價</div>
      <div class="Price" hideOnMobile>小計</div>
      <div class="Empty"></div>
    </div>
    <div class="Items">
       <div class="Item" *ngFor="let item of cartItems(); index as index">
        <img class="ItemImage" [src]="item.image" />
        <div class="ItemDetails">
          <div class="ItemName">{{ item.name }}</div>
          <div class="ItemID">{{ item.id }}</div>
          <div class="ItemColorName">顏色｜{{ item.color.name }}</div>
          <div class="ItemSize">尺寸｜{{ item.size }}</div>
        </div>
        <div class="ItemQuantity">
          <div class="ItemQuantityName" hideOnDesktop>數量</div>
          <select class="ItemQuantitySelect"
          (change)="changeItemQuantity(index, $any($event.target).value)">
            <option *ngFor="let i of [].constructor(item.stock); index as index">{{ index + 1 }}</option>
          </select>
        </div>
        <div class="ItemUnitPrice">
          <div class="ItemUnitPriceName" hideOnDesktop>單價</div>
          <div class="ItemUnitPriceValue">NT.{{ item.price }}</div>
        </div>
        <div class="ItemPrice">
          <div class="ItemPriceName" hideOnDesktop>小計</div>
          <div class="ItemPriceValue">NT.{{ item.qty * item.price }}</div>
        </div>
        <button class="DeleteButton" (click)="deleteItem(index)"></button>
      </div>
    </div>
  `,
  styles: [`
    .Header {
      display: flex;

      @media screen and (max-width: 1279px) {
        padding-bottom: 10px;
        border-bottom: 1px solid #3f3a3a;
      }
    }

    .ItemCount {
      flex-grow: 1;
    }

    .Quantity {
      width: 185px;
      padding-left: 20px;
    }

    .UnitPrice {
      width: 166px;
      padding-left: 12px;
    }

    .Price {
      width: 167px;
      padding-left: 15px;
    }

    .Empty {
      width: 70px;
    }

    .Items {
      padding: 40px 30px;
      margin-top: 16px;
      border: solid 1px #979797;

      @media screen and (max-width: 1279px) {
        padding: 0;
        margin-top: 10px;
        border: none;
      }
    }

    .Item {
      display: flex;
      align-items: center;

      @media screen and (max-width: 1279px) {
        align-items: flex-start;
        flex-wrap: wrap;
        padding-bottom: 20px;
        border-bottom: 1px solid #3f3a3a;
        font-size: 14px;
        line-height: 17px;
      }

      & + & {
        margin-top: 30px;

        @media screen and (max-width: 1279px) {
          margin-top: 20px;
        }
      }
    }

    .ItemImage {
      width: 114px;

      @media screen and (max-width: 1279px) {
        order: 1;
      }
    }

    .ItemDetails {
      margin-left: 20px;
      flex-grow: 1;
      align-self: flex-start;

      @media screen and (max-width: 1279px) {
        width: calc(100% - 174px);
        order: 1;
      }
    }

    .ItemID {
      margin-top: 18px;
    }

    .ItemColorName {
      margin-top: 22px;
    }

    .ItemSize {
      margin-top: 10px;
    }

    .ItemQuantity {
      width: 185px;

      @media screen and (max-width: 1279px) {
        margin-top: 20px;
        text-align: center;
        width: calc(100% / 3);
        order: 2;
      }
    }

    .ItemQuantityName {
      @media screen and (max-width: 1279px) {
        display: block;
      }
    }

    .ItemQuantitySelect {
      width: 80px;
      height: 30px;
      padding-left: 17px;
      border-radius: 8px;
      border: solid 1px #979797;
      background-color: #f3f3f3;

      @media screen and (max-width: 1279px) {
        margin-top: 12px;
      }
    }

    .ItemUnitPrice {
      width: 166px;

      @media screen and (max-width: 1279px) {
        margin-top: 20px;
        text-align: center;
        width: calc(100% / 3);
        order: 2;
      }
    }

    .ItemUnitPriceName {
      @media screen and (max-width: 1279px) {
        display: block;
      }
    }

    .ItemUnitPriceValue {
      @media screen and (max-width: 1279px) {
        margin-top: 20px;
      }
    }

    .ItemPrice {
      width: 167px;

      @media screen and (max-width: 1279px) {
        margin-top: 20px;
        text-align: center;
        width: calc(100% / 3);
        order: 2;
      }
    }

    .ItemPriceName {
      @media screen and (max-width: 1279px) {
        display: block;
      }
    }

    .ItemPriceValue {
      @media screen and (max-width: 1279px) {
        margin-top: 20px;
      }
    }

    .DeleteButton {
      width: 40px;
      height: 40px;
      background-image: url('./trash.png');
      background-size: contain;
      cursor: pointer;

      @media screen and (max-width: 1279px) {
        order: 1;
        background-position: center -10px;
      }
    }
  `],
  imports: [CommonModule]
})
export class CartComponent {
  cartItems = this.cartService.cartItems;

  constructor(private cartService: CartService) { }

  changeItemQuantity = (itemIndex: number, itemQuantity: number) => {
    const newCartItems = this.cartItems().map((item, index) =>
      index === itemIndex
        ? {
          ...item,
          qty: itemQuantity,
        }
        : item
    );
    this.cartItems.set(newCartItems);
    window.localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    window.alert('已修改數量');
  }

  deleteItem = (itemIndex: number) => {
    const newCartItems = this.cartItems().filter((_, index) => index !== itemIndex);
    this.cartItems.set(newCartItems);
    window.localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    window.alert('已刪除商品');
  }
}
