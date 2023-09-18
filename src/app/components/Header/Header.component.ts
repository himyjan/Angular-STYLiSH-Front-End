import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from 'src/app/store/cart.service';
import type { CartItem } from '../../types/cartItemType';

@Component({
  selector: 'Header',
  standalone: true,
  template: `
    <div class="Wrapper">
      <a href="/" class="Logo"> </a>
      <div class="CategoryLinks">
        <a class="CategoryLink" [href]="'/?category=' + category.name" *ngFor="let category of categories">{{ category.displayText }}</a>
      </div>
      <input class="SearchInput" value="" #inputValue (keyup.enter)="search(inputValue.value)" />
      <div class="PageLinks">
        <a href="/checkout" class="PageLink">
          <div class="PageLinkCartIcon PageLinkIcon">
            <div class="PageLinkIconNumber">{{ cartItems.length }}</div>
          </div>
          <div class="PageLinkText">購物車</div>
        </a>
        <a href="/profile" class="PageLink">
          <div class="PageLinkProfileIcon PageLinkIcon"></div>
          <div class="PageLinkText">會員</div>
        </a>
      </div>
    </div>
  `,
  styles: [
    `
      .Wrapper {
        position: fixed;
        top: 0;
        left: 0;
        height: 140px;
        width: 100%;
        padding: 0 54px 0 60px;
        border-bottom: 40px solid #313538;
        z-index: 99;
        background-color: white;
        display: flex;
        align-items: center;

        @media screen and (max-width: 1279px) {
          height: 52px;
          padding: 0;
          border: none;
          justify-content: center;
        }
      }

      .Logo {
        width: 258px;
        height: 48px;
        background-image: url('./logo.png');
        background-size: contain;

        @media screen and (max-width: 1279px) {
          width: 129px;
          height: 24px;
        }
      }

      .CategoryLinks {
        margin: 16px 0 0 57px;

        @media screen and (max-width: 1279px) {
          margin: 0;
          position: fixed;
          top: 52px;
          left: 0;
          width: 100%;
          height: 50px;
          display: flex;
          background-color: #313538;
        }
      }

      .CategoryLink {
        font-size: 20px;
        letter-spacing: 30px;
        padding-left: 39px;
        padding-right: 11px;
        position: relative;
        text-decoration: none;
        color: ;

        @media screen and (max-width: 1279px) {
          font-size: 16px;
          letter-spacing: normal;
          padding: 0;
          text-align: center;
          color: ;
          line-height: 50px;
          flex-grow: 1;
        }

        &:hover {
          color: #8b572a;

          @media screen and (max-width: 1279px) {
            color: white;
          }
        }

        & + &::before {
          content: '|';
          position: absolute;
          left: 0;
          color: #3f3a3a;

          @media screen and (max-width: 1279px) {
            color: #828282;
          }
        }
      }

      .SearchInput {
        height: 40px;
        width: 214px;
        border: none;
        outline: none;
        margin-left: auto;
        border-radius: 20px;
        padding: 6px 45px 6px 20px;
        border: solid 1px #979797;
        background-image: url('./search.png');
        background-size: 44px;
        background-position: 160px center;
        background-repeat: no-repeat;
        font-size: 20px;
        line-height: 24px;
        color: #8b572a;

        @media screen and (max-width: 1279px) {
          width: 0;
          border: none;
          position: fixed;
          right: 16px;
          background-size: 32px;
          background-position: right center;
        }

        &:focus {
          @media screen and (max-width: 1279px) {
            width: calc(100% - 20px);
            border: solid 1px #979797;
          }
        }
      }

      .PageLinks {
        margin-left: 42px;
        display: flex;

        @media screen and (max-width: 1279px) {
          width: 100%;
          margin-left: 0;
          height: 60px;
          position: fixed;
          left: 0;
          bottom: 0;
          background-color: #313538;
        }
      }

      .PageLink {
        @media screen and (max-width: 1279px) {
          width: 50%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        & + & {
          margin-left: 42px;

          @media screen and (max-width: 1279px) {
            margin-left: 0;
          }
        }

        & + &::before {
          @media screen and (max-width: 1279px) {
            content: '';
            position: absolute;
            left: 0;
            width: 1px;
            height: 24px;
            margin: 10px 51px 10px 0;
            background-color: #828282;
          }
        }
      }

      .PageLinkIcon {
        width: 44px;
        height: 44px;
        cursor: pointer;
        background-size: contain;
        position: relative;
      }

      .PageLinkCartIcon {
        background-image: url('./cart.png');

        @media screen and (max-width: 1279px) {
          background-image: url('./cart-mobile.png');
        }
      }

      .PageLinkProfileIcon {
        background-image: url('./profile.png');

        @media screen and (max-width: 1279px) {
          background-image: url('./profile-mobile.png');
        }
      }

      .PageLinkIconNumber {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 24px;
        height: 24px;
        background-color: #8b572a;
        color: white;
        border-radius: 50%;
        text-align: center;
        line-height: 24px;
      }

      .PageLinkText {
        display: none;

        @media screen and (max-width: 1279px) {
          display: block;
          color: white;
        }
      }
    `,
  ],
  imports: [CommonModule],
})
export class HeaderComponent {
  cartItems = this.cartService.cartItems;

  constructor(private cartService: CartService, private router: Router) { }

  categories = [
    {
      name: 'women',
      displayText: '女裝',
    },
    {
      name: 'men',
      displayText: '男裝',
    },
    {
      name: 'accessories',
      displayText: '配件',
    },
  ];

  search(keyword: string) {
    this.router.navigate([''], { queryParams: { keyword } });
  }
}
