import { Component, signal, computed, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartComponent } from './Cart.component';
import { CartService } from '../../store/cart.service';
import type { Prime } from '../../types/tapPayPrimeType';

import api from '../../utils/api';
import getJwtToken from '../../utils/getJwtToken';
import tappay from '../../utils/tappay';

@Component({
  selector: 'Checkout',
  standalone: true,
  imports: [CartComponent, CommonModule],
  template: `
    <div class="Wrapper">
      <Cart></Cart>
      <div class="GrayBlock">
        <label class="Label">配送國家</label>
        <select class="Select">
          <option>臺灣及離島</option>
        </select>
        <label class="Label">付款方式</label>
        <select class="Select">
          <option>信用卡付款</option>
        </select>
      </div>
      <div class="Note">
        ※ 提醒您：
        <br />● 選擇宅配-請填寫正確收件人資訊，避免包裹配送不達
        <br />● 選擇超商-請填寫正確收件人姓名(與證件相符)，避免無法領取
      </div>
      <form>
        <fieldset class="FormFieldSet">
          <legend class="FormLegend">訂購資料</legend>
          <div class="FormGroup" key="input.key" *ngFor="let input of formInputs">
            <label class="FormLabel">{{ input.label }}</label>
            <input class="FormControl" v-model="recipient" />
            <div class="FormText" *ngIf="input.text"> {{ input.text }}</div>
          </div>
          <div class="FormGroup">
            <label class="FormLabel">配送時間</label>
            <div class="FormCheck" *ngFor="let option of timeOptions">
              <input class="FormCheckInput" type="radio" v-model="option.value" name="time" value="option.value" />
              <label class="FormCheckLabel">{{ option.label }}</label>
            </div>
          </div>
        </fieldset>
        <fieldset class="FormFieldSet">
          <legend class="FormLegend">付款資料</legend>
          <div class="FormGroup">
            <label class="FormLabel">信用卡號碼</label>
            <input class="FormControl" as="div" #cardNumberRef ref="cardNumberRef" id="card-number" />
          </div>
          <div class="FormGroup">
            <label class="FormLabel">有效期限</label>
            <input class="FormControl" as="div" #cardExpirationDateRef ref="cardExpirationDateRef" id="card-expiration-date" />
          </div>
          <div class="FormGroup">
            <label class="FormLabel">安全碼 </label>
            <input class="FormControl" as="div" #cardCCVRef id="card-ccv" />
          </div>
        </fieldset>
      </form>
      <div class="SubtotalPrice Price">
        <div class="PriceName">總金額 </div>
        <div class="Currency"> NT.</div>
        <div class="PriceValue">{{ subtotal() }}</div>
      </div>
      <div class="ShippingPrice Price">
        <div class="PriceName">運費 </div>
        <div class="Currency"> NT.</div>
        <div class="PriceValue"> {{ freight() }}</div>
      </div>
      <div class="TotalPrice Price">
        <div class="PriceName">應付金額 </div>
        <div class="Currency"> NT.</div>
        <div class="PriceValue"> {{ subtotal() + freight() }}</div>
      </div>
      <button class="CheckoutButton" (click)="checkout()">確認付款</button>
    </div>
  `,
  styles: [`
    .Wrapper {
      margin: 0 auto;
      padding: 47px 0 263px;
      max-width: 1160px;
      line-height: 19px;
      font-size: 16px;
      color: #3f3a3a;

      @media screen and (max-width: 1279px) {
        padding: 20px 24px 236px;
      }
    }

    .GrayBlock {
      padding: 22px 30px;
      margin-top: 26px;
      background-color: #e8e8e8;
      display: flex;
      align-items: center;
      line-height: 19px;
      font-size: 16px;

      @media screen and (max-width: 1279px) {
        padding: 10px 10px 20px;
        flex-direction: column;
        align-items: flex-start;
        font-size: 14px;
        line-height: 17px;
      }
    }

    .Label {
      color: #3f3a3a;
      margin-left: 30px;

      @media screen and (max-width: 1279px) {
        margin-left: 0;
      }
    }

    .Select {
      width: 171px;
      height: 30px;
      margin-left: 20px;
      padding-left: 17px;
      border-radius: 8px;
      border: solid 1px #979797;
      background-color: #f3f3f3;

      & + .Label {
        margin-left: 82px;

        @media screen and (max-width: 1279px) {
          margin-left: 0;
          margin-top: 20px;
        }
      }

      @media screen and (max-width: 1279px) {
        margin-left: 0;
        margin-top: 10px;
        width: 100%;
      }
    }

    .Note {
      line-height: 26px;
      margin-top: 20px;
      font-size: 16px;
      color: #3f3a3a;
    }

    .FormFieldSet {
      margin-top: 50px;
      border: none;

      @media screen and (max-width: 1279px) {
        margin-top: 20px;
      }
    }

    .FormLegend {
      line-height: 19px;
      font-size: 16px;
      font-weight: bold;
      color: #3f3a3a;
      padding-bottom: 16px;
      border-bottom: 1px solid #3f3a3a;
      width: 100%;
    }

    .FormGroup {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 30px;
      width: 684px;

      .FormLegend + & {
        margin-top: 25px;
      }

      @media screen and (max-width: 1279px) {
        line-height: 17px;
        font-size: 14px;
        margin-top: 20px;
        width: 100%;

        .FormLegend + & {
          margin-top: 20px;
        }
      }
    }

    .FormLabel {
      width: 110px;
      line-height: 19px;
      font-size: 16px;
      color: #3f3a3a;
      display: block;

      @media screen and (max-width: 1279px) {
        width: 100%;
      }
    }

    .FormControl {
      width: 574px;
      height: 30px;
      border-radius: 8px;
      border: solid 1px #979797;

      @media screen and (max-width: 1279px) {
        margin-top: 10px;
        width: 100%;
      }
    }

    .FormText {
      line-height: 19px;
      font-size: 16px;
      color: #8b572a;
      margin-top: 10px;
      width: 100%;
      text-align: right;
    }

    .FormCheck {
      margin-left: 8px;
      display: flex;
      align-items: center;

      & + & {
        margin-left: 30px;
      }

      @media screen and (max-width: 1279px) {
        margin-left: 0;
        margin-top: 10px;

        & + & {
          margin-left: 27px;
        }
      }
    }

    .FormCheckInput {
      margin: 0;
      width: 16px;
      height: 16px;
    }

    .FormCheckLabel {
      margin-left: 10px;
      line-height: 26px;

      @media screen and (max-width: 1279px) {
        font-size: 14px;
      }
    }

    .Price {
      display: flex;
      align-items: center;
      width: 240px;
      margin-left: auto;

      @media screen and (max-width: 1279px) {
        width: 200px;
      }
    }

    .SubtotalPrice {
      margin-top: 40px;

      @media screen and (max-width: 1279px) {
        margin-top: 24px;
      }
    }

    .ShippingPrice {
      margin-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #3f3a3a;

      @media screen and (max-width: 1279px) {
        margin-top: 20px;
        padding-bottom: 24px;
        border-bottom: 1px solid #3f3a3a;
      }
    }

    .TotalPrice {
      margin-top: 20px;

      @media screen and (max-width: 1279px) {
        margin-top: 16px;
      }
    }

    .PriceName {
      line-height: 19px;
      font-size: 16px;
      color: #3f3a3a;

      @media screen and (max-width: 1279px) {
        line-height: 17px;
        font-size: 14px;
      }
    }

    .Currency {
      margin-left: auto;
      line-height: 19px;
      font-size: 16px;
      color: #3f3a3a;
    }

    .PriceValue {
      line-height: 36px;
      margin-left: 10px;
      font-size: 30px;
      color: #3f3a3a;
    }

    .CheckoutButton {
      width: 240px;
      height: 60px;
      margin-top: 50px;
      border: solid 1px #979797;
      background-color: black;
      color: white;
      font-size: 20px;
      letter-spacing: 4px;
      margin-left: auto;
      display: block;
      cursor: pointer;

      @media screen and (max-width: 1279px) {
        width: 100%;
        height: 44px;
        margin-top: 36px;
        border: solid 1px black;
        font-size: 16px;
        letter-spacing: 3.2px;
      }
    }
  `]
})
export class CheckoutComponent implements AfterViewInit {
  cartItems = this.cartService.cartItems;

  @ViewChild('cardNumberRef')
  cardNumberRef!: ElementRef;
  @ViewChild('cardExpirationDateRef')
  cardExpirationDateRef!: ElementRef;
  @ViewChild('cardCCVRef') cardCCVRef!: ElementRef;

  constructor(private cartService: CartService, private router: Router) { }

  formInputs = [
    {
      label: '收件人姓名',
      key: 'name',
      text: '務必填寫完整收件人姓名，避免包裹無法順利簽收',
    },
    { label: 'Email', key: 'email' },
    { label: '手機', key: 'phone' },
    { label: '地址', key: 'address' },
  ];

  timeOptions = [
    {
      label: '08:00-12:00',
      value: 'morning',
    },
    {
      label: '14:00-18:00',
      value: 'afternoon',
    },
    {
      label: '不指定',
      value: 'anytime',
    },
  ];

  recipient = signal({
    name: '',
    email: '',
    phone: '',
    address: '',
    time: '',
  });

  ngAfterViewInit() {
    tappay.setupSDK();
    tappay.setupCard(
      this.cardNumberRef.nativeElement,
      this.cardExpirationDateRef.nativeElement,
      this.cardCCVRef.nativeElement
    );
  }

  subtotal = signal(this.cartItems().reduce(
    (prev, item) => prev + item.price * item.qty,
    0
  ));

  freight = computed(() => this.subtotal() > 0 ? 30 : 0);

  checkout = async () => {
    let jwtToken = window.localStorage.getItem('jwtToken');

    if (!jwtToken) {
      try {
        jwtToken = await getJwtToken();
      } catch (e: unknown) {
        if (e instanceof Error) {
          window.alert(e.message);
        } else {
          window.alert('An unknown error occurred');
        }
        return;
      }
    }
    window.localStorage.setItem('jwtToken', jwtToken!);

    if (this.cartItems().length === 0) {
      window.alert('尚未選購商品');
      return;
    }

    if (Object.values(this.recipient()).some((value) => !value)) {
      window.alert('請填寫完整訂購資料');
      return;
    }

    if (!tappay.canGetPrime()) {
      window.alert('付款資料輸入有誤');
      return;
    }

    const result: Prime = await tappay.getPrime();
    if (result.status !== 0) {
      window.alert('付款資料輸入有誤');
      return;
    }

    const { data } = await api.checkout(
      {
        prime: result!.card!.prime,
        order: {
          shipping: 'delivery',
          payment: 'credit_card',
          subtotal: this.subtotal(),
          freight: this.freight(),
          total: this.subtotal() + this.freight(),
          recipient: this.recipient(),
          list: this.cartItems(),
        },
      },
      jwtToken!
    );
    window.alert('付款成功' + data);
    this.cartItems.set([]);
    this.router.navigate(['/thankyou']); //, { state: { orderNumber: data.number } }
  }
}
