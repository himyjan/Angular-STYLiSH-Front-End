import { Component, signal, computed, Input, WritableSignal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../store/cart.service';
import type { Color, ProductDetailsData } from '../../types/productType';
import type { CartItem } from '../../types/cartItemType';

@Component({
  selector: 'ProductVariants',
  standalone: true,
  template: `
     <div class="Option">
        <div class="OptionName" hideOnMobile>
            顏色｜
        </div>
        <div class="Color" *ngFor="let color of product()!.colors" [style.backgroundColor]="'#' + color.code" [style.outline]="(color.code === selectedColorCode()) ? '1px solid #979797' : ''"  (click)="selectColor(color)">
        </div>
      </div>
      <div class="Option">
        <div class="OptionName" hideOnMobile>
            尺寸｜
        </div>
        <div class="Size" *ngFor="let size of product()!.sizes" [style.backgroundColor]="size === selectedSize() ? 'black' : '#ececec'" [style.color]="size === selectedSize() ? 'white' : '#3f3a3a'" [style.cursor]="(getStock(selectedColorCode(), size) === 0) ? 'not-allowed' : 'pointer'" [style.opacity]="(getStock(selectedColorCode(), size) === 0) ? '0.25' : '1'" (click)="selectSize(size)">
          {{ size }}
        </div>
      </div>
      <div class="Option">
        <div class="OptionName" hideOnMobile>
            數量｜
        </div>
        <div class="QuantitySelector">
          <button class="Button" [style.backgroundImage]="'url(./app/pages/Product/minus.png)'" (click)="quantityMinus()">
          </button>
          <div class="Quantity">
              {{ quantity() }}
          </div>
          <button class="Button" [style.backgroundImage]="'url(./app/pages/Product/add.png)'" (click)="quantityPlus()">
          </button>
        </div>
      </div>
      <button class="AddToCart" (click)="addToCart()">
        {{ selectedSize() ? '加入購物車' : '請選擇尺寸' }}
      </button>
  `,
  styles: [`
    .Option {
      display: flex;
      align-items: center;
      margin-top: 30px;
    }

    .OptionName {
      line-height: 24px;
      font-size: 20px;
      letter-spacing: 4px;
      color: #3f3a3a;

      @media screen and (max-width: 1279px) {
        line-height: 17px;
        font-size: 14px;
        letter-spacing: 2.8px;
      }
    }

    .Color {
      width: 36px;
      height: 36px;
      padding: 6px;
      border: 6px solid white;
      box-shadow: 0px 0px 1px #bbbbbb;
      cursor: pointer;
      margin-left: 21px;

      & + & {
        margin-left: 15px;
      }
    }

    .Size {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 22px;

      & + & {
        margin-left: 20px;
      }
    }

    .QuantitySelector {
      margin-left: 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 160px;
      height: 44px;
      padding: 0 10px;
      border: 1px solid #979797;
      font-size: 20px;

      @media screen and (max-width: 1279px) {
        margin-left: 0;
        width: 100%;
        padding: 0 30px;
      }
    }

    .Quantity {
      color: #8b572a;
    }

    .Button {
      cursor: pointer;
      background-size: contain;
      width: 16px;
      height: 16px;
    }

    .AddToCart {
      width: 100%;
      height: 60px;
      margin-top: 29px;
      border: solid 1px #979797;
      background-color: black;
      font-size: 20px;
      letter-spacing: 4px;
      color: white;
      cursor: pointer;

      @media screen and (max-width: 1279px) {
        height: 44px;
        margin-top: 10px;
        font-size: 16px;
        letter-spacing: 3.2px;
        color: white;
      }
    }
  `],
  imports: [CommonModule]
})
export class ProductVariantsComponent {
  cartItems = this.cartService.cartItems;

  constructor(private cartService: CartService) { }

  @Input() product: WritableSignal<ProductDetailsData | undefined> = signal(undefined);
  selectedColorCode = signal<string>('');
  selectedSize = signal<string | undefined>(undefined);
  quantity = signal(1);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'].currentValue() != undefined) {
      this.selectedColorCode.set(changes['product'].currentValue().colors[0].code)
    }
  }

  getStock = (colorCode: string, size: string) => {
    // @ts-ignore
    return this.product()!.variants.find(
      (variant: { color_code: string; size: string; }) => variant.color_code === colorCode && variant.size === size
    ).stock;
  }

  selectColor = (color: { code: string; }) => {
    this.selectedColorCode.set(color.code);
    this.selectedSize.set(undefined);
    this.quantity.set(1);
  }

  selectSize = (size: string) => {
    if (this.getStock(this.selectedColorCode(), size) === 0) return;
    this.selectedSize.set(size);
    if (this.getStock(this.selectedColorCode(), size) < this.quantity()) this.quantity.set(1);
  }

  quantityMinus = () => {
    if (!this.selectedSize() || this.quantity() === 1) return;
    this.quantity.update((quantity) => quantity - 1);
  }


  quantityPlus = () => {
    if (!this.selectedSize() || this.quantity() === this.getStock(this.selectedColorCode(), this.selectedSize()!)) return;
    this.quantity.update((quantity) => quantity + 1);
  }

  addToCart = () => {
    if (!this.selectedSize()) {
      window.alert('請選擇尺寸');
      return;
    }

    const newCartItems: CartItem[] = [
      ...this.cartItems(),
      {
        color: this.product()!.colors.find((color: Color) => color.code === this.selectedColorCode()),
        id: this.product()!.id,
        image: this.product()!.main_image,
        name: this.product()!.title,
        price: this.product()!.price,
        qty: this.quantity(),
        size: this.selectedSize(),
        stock: this.getStock(this.selectedColorCode(), this.selectedSize()!),
      },
    ] as CartItem[];
    this.cartItems.set(newCartItems);
    window.localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    window.alert('已加入商品');
  }
}
