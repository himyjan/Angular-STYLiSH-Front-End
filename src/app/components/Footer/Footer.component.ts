import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'Footer',
  standalone: true,
  template: `
    <div class="Wrapper">
      <div class="Content">
        <div class="SiteLinks">
          <div
            class="SiteLink"
            *ngFor="
              let text of [
                '關於 Stylish',
                '服務條款',
                '隱私政策',
                '聯絡我們',
                'FAQ'
              ]
            "
          >
            {{ text }}
          </div>
        </div>
        <div class="SocialLinks">
          <div
            class="SocialLink"
            *ngFor="let icon of ['line', 'twitter', 'facebook']"
            [style.backgroundImage]="'url(./app/components/Footer/' + icon + '.png)'"
          ></div>
        </div>
        <div class="Copywright">© 2023. All rights reserved.</div>
      </div>
    </div>
  `,
  styles: [
    `
      .Wrapper {
        bottom: 0;
        width: 100%;
        background-color: #313538;

        @media screen and (max-width: 1279px) {
          bottom: 60px;
        }
      }

      .Content {
        max-width: 1200px;
        height: 115px;
        padding-left: 24px;
        padding-right: 20px;
        margin: 0 auto;
        display: flex;
        align-items: center;

        @media screen and (max-width: 1279px) {
          height: 148px;
          padding: 23px 0 20px;
          flex-wrap: wrap;
          justify-content: center;
        }
      }

      .SiteLinks {
        display: flex;

        @media screen and (max-width: 1279px) {
          width: 168px;
          height: 84px;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          align-content: space-between;
          margin-left: 16px;
        }
      }

      .SiteLink {
        width: 134px;
        text-align: center;
        position: relative;
        color: #f5f5f5;
        cursor: pointer;

        @media screen and (max-width: 1279px) {
          width: auto;
          line-height: 20px;
          margin-bottom: 8px;
          text-align: left;
          color: white;
          font-size: 14px;
        }

        & + &::before {
          content: '|';
          position: absolute;
          left: 0;

          @media screen and (max-width: 1279px) {
            content: '';
          }
        }
      }

      .SocialLinks {
        display: flex;
        margin-left: auto;

        @media screen and (max-width: 1279px) {
          margin-left: 40px;
          margin-bottom: 28px;
        }
      }

      .SocialLink {
        width: 50px;
        height: 50px;
        background-size: contain;
        cursor: pointer;

        @media screen and (max-width: 1279px) {
          width: 20px;
          height: 20px;
        }

        & + & {
          margin-left: 30px;

          @media screen and (max-width: 1279px) {
            margin-left: 14px;
          }
        }
      }

      .Copywright {
        margin-left: 30px;
        line-height: 17px;
        font-size: 12px;
        color: #828282;

        @media screen and (max-width: 1279px) {
          margin-left: 0;
          margin-top: 7px;
          line-height: 14px;
          font-size: 10px;
          color: #828282;
          width: 100%;
          text-align: center;
        }
      }
    `,
  ],
  imports: [CommonModule]
})
export class FooterComponent { }
