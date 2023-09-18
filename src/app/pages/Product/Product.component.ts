import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductVariantsComponent } from './ProductVariants.component';
import api from '../../utils/api';
import type { ProductDetailsData } from '../../types/productType';

@Component({
  selector: 'Product',
  standalone: true,
  imports: [ProductVariantsComponent, CommonModule],
  template: `
    <div class="Wrapper">
        <img [src]="product()?.main_image"
        class="MainImage">
        <div class="Details">
          <div class="Title">
              {{ product()?.title }}
          </div>
          <div class="ID">
              {{ product()?.id }}
          </div>
          <div class="Price">
              TWD.{{ product()?.price }}
          </div>
          <ProductVariants *ngIf="product()?.colors" [product]="product"></ProductVariants>
          <div class="Note">
              {{ product()?.note }}
          </div>
          <div class="Texture">
              {{ product()?.texture }}
          </div>
          <div class="Description">
              {{ product()?.description }}
          </div>
          <div class="Place">
              素材產地 / {{ product()?.place }}
          </div>
          <div class="Place">
              加工產地 / {{ product()?.place }}
          </div>
        </div>
        <div class="Story">
          <div class="StoryTitle">
              細部說明
          </div>
          <div class="StoryContent">
              {{ product()?.story }}
          </div>
        </div>
        <div class="Images">
            <img [src]="image" class="Image" *ngFor="let image of product()?.images"/>
        </div>
    </div>
  `,
  styles: [
    `
      .Wrapper {
        max-width: 960px;
        margin: 0 auto;
        padding: 65px 0 49px;
        display: flex;
        flex-wrap: wrap;

        @media screen and (max-width: 1279px) {
          padding: 0 0 32px;
        }
      }

      .MainImage {
        width: 560px;

        @media screen and (max-width: 1279px) {
          width: 100%;
        }
      }

      .Details {
        margin-left: 42px;
        flex-grow: 1;

        @media screen and (max-width: 1279px) {
          margin: 17px 24px 0;
        }
      }

      .Title {
        line-height: 38px;
        font-size: 32px;
        letter-spacing: 6.4px;
        color: #3f3a3a;

        @media screen and (max-width: 1279px) {
          line-height: 24px;
          font-size: 20px;
          letter-spacing: 4px;
        }
      }

      .ID {
        line-height: 24px;
        margin-top: 16px;
        font-size: 20px;
        letter-spacing: 4px;
        color: #bababa;

        @media screen and (max-width: 1279px) {
          line-height: 19px;
          margin-top: 10px;
          font-size: 16px;
          letter-spacing: 3.2px;
        }
      }

      .Price {
        line-height: 36px;
        margin-top: 40px;
        font-size: 30px;
        color: #3f3a3a;
        padding-bottom: 20px;
        border-bottom: 1px solid #3f3a3a;

        @media screen and (max-width: 1279px) {
          line-height: 24px;
          margin-top: 20px;
          font-size: 20px;
          padding-bottom: 10px;
        }
      }

      .Detail {
        line-height: 30px;
        font-size: 20px;
        color: #3f3a3a;

        @media screen and (max-width: 1279px) {
          line-height: 24px;
          font-size: 14px;
        }
      }

      .Note {
        margin-top: 40px;

        @media screen and (max-width: 1279px) {
          margin-top: 28px;
        }
      }

      .Texture {
        margin-top: 30px;

        @media screen and (max-width: 1279px) {
          margin-top: 24px;
        }
      }

      .Description {
        white-space: pre;
      }

      .Place {
        .Description + & {
          margin-top: 30px;

          @media screen and (max-width: 1279px) {
            margin-top: 24px;
          }
        }
      }

      .Story {
        margin: 50px 0 0;
        width: 100%;

        @media screen and (max-width: 1279px) {
          margin: 28px 24px 0;
        }
      }

      .StoryTitle {
        line-height: 30px;
        font-size: 20px;
        letter-spacing: 4px;
        color: #8b572a;
        display: flex;
        align-items: center;

        @media screen and (max-width: 1279px) {
          font-size: 16px;
          letter-spacing: 3.2px;
        }

        &::after {
          content: '';
          height: 1px;
          flex-grow: 1;
          background-color: #3f3a3a;
          margin-left: 64px;

          @media screen and (max-width: 1279px) {
            margin-left: 35px;
          }
        }
      }

      .StoryContent {
        line-height: 30px;
        margin-top: 28px;
        font-size: 20px;
        color: #3f3a3a;

        @media screen and (max-width: 1279px) {
          line-height: 25px;
          margin-top: 12px;
          font-size: 14px;
        }
      }

      .Images {
        margin: 30px 0 0;

        @media screen and (max-width: 1279px) {
          margin: 20px 24px 0;
          width: 100%;
        }
      }

      .Image {
        @media screen and (max-width: 1279px) {
          width: 100%;
        }

        & + & {
          margin-top: 30px;

          @media screen and (max-width: 1279px) {
            margin-top: 20px;
          }
        }
      }
    `,
  ]
})
export class ProductComponent {
  id = signal(this.route.snapshot.params['id']);
  product = signal<ProductDetailsData | undefined>(undefined);

  constructor(private route: ActivatedRoute) { }

  async ngOnInit() {
    const fetchtDetails = async () => {
      const { data } = await api.getProduct(this.id());
      this.product.set(data);
    }
    fetchtDetails();
  }
}
