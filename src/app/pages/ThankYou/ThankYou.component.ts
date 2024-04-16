import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import type { state } from '../../types/stateType';

@Component({
  selector: 'ThankYou',
  standalone: true,
  template: `
   <div class="Wrapper">
      <div class="Title">
          感謝您的購買，我們會盡快將商品送達！
      </div>
      <div class="Content">
          請記住以下訂單編號，以便查詢
      </div>
      <div class="Content">
          <!-- {{(state as state).orderNumber}} -->
      </div>
      <button class="BackButton" (click)="redirect()">
          繼續購物
      </button>
    </div>
  `,
  styles: [`
    .Wrapper {
      padding: 60px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .Title {
      padding-bottom: 16px;
      border-bottom: 1px solid #979797;
      font-size: 24px;
      font-weight: bold;
    }

    .Content {
      margin-top: 24px;
    }

    .BackButton {
      margin-top: 24px;
    }
  `],
})
export class ThankYouComponent {
  state = signal({ orderNumber: '' })

  constructor(private router: Router) { }

  redirect = () => {
    this.router.navigate(['/']);
  }
}
