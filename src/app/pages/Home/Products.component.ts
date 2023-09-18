import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import api from '../../utils/api';
import type { ProductDetailsData, ProductsSearch } from '../../types/productType';

@Component({
  selector: 'Products',
  standalone: true,
  template: `
    <div class="Wrapper">
      <a class="Product" [href]="'/products/' + product.id" *ngFor="let product of products()" >
          <img [src]="product.main_image" class="ProductImage" />
          <div class="ProductColors">
              <div class="ProductColor" *ngFor="let color of product.colors" [style.backgroundColor]="'#' + color.code">
              </div>
          </div>
          <div class="ProductTitle">
              {{ product.title }}
          </div>
          <div class="ProductPrice">
              TWD.{{ product.price }}
          </div>
      </a>
    </div>
  `,
  styles: [`
    .Wrapper {
      max-width: 1200px;
      margin: 0 auto;
      padding: 70px 0 46px;
      display: flex;
      flex-wrap: wrap;

      @media screen and (max-width: 1279px) {
        padding: 15px 21px 6px;
      }
    }

    .Product {
      width: calc((100% - 120px) / 3);
      margin: 0 20px 50px;
      flex-shrink: 0;
      text-decoration: none;

      @media screen and (max-width: 1279px) {
        width: calc((100% - 12px) / 2);
        margin: 0 3px 24px;
      }
    }

    .ProductImage {
      width: 100%;
      vertical-align: middle;
    }

    .ProductColors {
      margin-top: 20px;
      display: flex;

      @media screen and (max-width: 1279px) {
        margin-top: 8px;
      }
    }

    .ProductColor {
      width: 24px;
      height: 24px;
      box-shadow: 0px 0px 1px #bbbbbb;

      @media screen and (max-width: 1279px) {
        width: 12px;
        height: 12px;
      }

      & + & {
        margin-left: 10px;

        @media screen and (max-width: 1279px) {
          margin-left: 6px;
        }
      }
    }

    ProductColor.props = {
      colorCode: String,
    };

    .ProductTitle {
      margin-top: 20px;
      font-size: 20px;
      letter-spacing: 4px;
      color: #3f3a3a;
      line-height: 24px;

      @media screen and (max-width: 1279px) {
        margin-top: 10px;
        font-size: 12px;
        letter-spacing: 2.4px;
        line-height: 14px;
      }
    }

    .ProductPrice {
      margin-top: 10px;
      font-size: 20px;
      letter-spacing: 4px;
      color: #3f3a3a;
      line-height: 24px;

      @media screen and (max-width: 1279px) {
        margin-top: 8px;
        font-size: 12px;
        letter-spacing: 2.4px;
        line-height: 14px;
      }
    }

    .Loading {
      margin: 0 auto;
    }
  `],
  imports: [CommonModule]
})
export class ProductsComponent {
  products = signal<ProductDetailsData[]>([]);
  isLoading = signal(false);
  keyword = signal<string>('');
  category = signal<string>('');

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['keyword']) {
        this.category.set(params['keyword']);
        console.log(params['keyword'])
      }
      else {
        this.category.set(params['category'] ?? 'all');
      }
    });
  }

  async ngOnInit() {
    this.executeSideEffect();
  }

  async ngOnChanges() {
    this.executeSideEffect();
  }

  private executeSideEffect = () => {
    let nextPaging: number | undefined = 0;
    let isFetching = false;

    const fetchProducts = async () => {
      isFetching = true;
      this.isLoading.set(true);
      const response: ProductsSearch = this.keyword() != ''
        ? await api.searchProducts(this.keyword(), nextPaging!)
        : await api.getProducts(this.category(), nextPaging!);
      console.log(this.keyword())
      if (nextPaging === 0) {
        this.products.set(response.data);
      } else {
        this.products.set([...this.products(), ...response.data]);
      }
      nextPaging = response.next_paging;
      isFetching = false;
      this.isLoading.set(false);
    }

    const scrollHandler = async () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (nextPaging === undefined) return;
        if (isFetching) return;

        fetchProducts();
      }
    }

    fetchProducts();

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    }
  }
}
