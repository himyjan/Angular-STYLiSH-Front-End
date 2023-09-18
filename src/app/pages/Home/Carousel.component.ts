import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import api from '../../utils/api';
import type { CarouselDetails } from '../../types/marketingType';

@Component({
  selector: 'Carousel',
  standalone: true,
  template: `
    <div class="Wrapper">
       <a [href]="'/products/'+ data.product_id" class="Campaign" *ngFor="let data of campaigns(); index as index" [style.opacity]="index === activeCampaignIndex() ? 1 : 0" [style.backgroundImage]="'url(' + data.picture + ')'">
          <div class="Story">
              <div class="StoryContent">
                  {{ data.story.split('\r\n').slice(0, 3).join('\r\n') }}
              </div>
              <div class="StoryTitle">
                  {{ data.story.split('\r\n')[3] }}
              </div>
          </div>
      </a>
      <div class="Dots">
          <div class="Dot" *ngFor="let data of campaigns(); index as index" (click)="clickDot(index)" [style.backgroundColor]="index === activeCampaignIndex() ? '#8b572a' : 'white'">
          </div>
      </div>
    </div>
  `,
  styles: [`
    .Wrapper {
      height: 500px;
      position: relative;

      @media screen and (max-width: 1279px) {
        height: 185px;
      }
    }

    .Campaign {
      width: 100%;
      height: 100%;
      position: absolute;
      background-size: cover;
      background-position: center;
      transition: opacity 1s;
      text-decoration: none;
      color: #070707;
    }

    .Story {
      max-width: 1200px;
      margin: 0 auto;
      padding-top: 166px;
      padding-left: 47px;
      font-weight: 100;

      @media screen and (max-width: 1279px) {
        padding-top: 30px;
        padding-left: 23px;
      }
    }

    .StoryContent {
      font-size: 30px;
      white-space: pre;
      line-height: 57px;

      @media screen and (max-width: 1279px) {
        font-size: 15px;
        line-height: 28px;
      }
    }

    .StoryTitle {
      font-size: 20px;
      line-height: 64px;

      @media screen and (max-width: 1279px) {
        font-size: 10px;
        line-height: 32px;
      }
    }

    .Dots {
        position: absolute;
        bottom: 34px;
        left: 50%;
        transform: translateX(-50 %);
        display: flex;
        z-index: 2;

        @media screen and (max-width: 1279px) {
          bottom: 18px;
        }
    }

    .Dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      cursor: pointer;

      @media screen and (max-width: 1279px) {
        width: 4px;
        height: 4px;
      }

      & + & {
        margin-left: 22px;

        @media screen and (max-width: 1279px) {
          margin-left: 8.8px;
        }
      }
    }
  `],
  imports: [CommonModule]
})
export class CarouselComponent {
  campaigns = signal<CarouselDetails[]>([]);
  activeCampaignIndex = signal<number>(0);
  intervalRef = signal<number | undefined>(undefined);

  async ngOnInit() {
    this.campaigns.set((await api.getCampaigns()).data)
    this.intervalRef.set(window.setInterval(() => {
      this.activeCampaignIndex.set(this.activeCampaignIndex() === this.campaigns().length - 1 ? 0 : this.activeCampaignIndex() + 1)
    }, 5000))
  }

  clickDot = (index: number) => {
    this.activeCampaignIndex.set(index);
    window.clearInterval(this.intervalRef());
    this.intervalRef.set(window.setInterval(() => {
      this.activeCampaignIndex.set(
        this.activeCampaignIndex() === this.campaigns().length - 1 ? 0 : this.activeCampaignIndex() + 1)
    }, 5000));
  }
}
