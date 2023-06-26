import type { MarketingCampaigns } from "../types/marketingType";
import type { ProductDetails, ProductsSearch } from "../types/productType";
import type { profile } from "../types/profileType";

type CheckoutData = {
  prime: string;
  order: {
    shipping: string;
    payment: string;
    subtotal: number;
    freight: number;
    total: number;
    recipient: {
      name: string;
      email: string;
      phone: string;
      address: string;
      time: string;
    };
    list: {
      id: number | string;
      name: string;
      price: string | number;
      color: {
        code: string;
        name: string;
      };
      size: string;
      qty: number | string;
    }[];
  };
}

type SignInData = {
  access_token: string;
  provider: string;
}

const api = {
  hostname: 'https://api.appworks-school.tw/api/1.0',
  async getProducts(category: string, paging: number): Promise<ProductsSearch> {
    const response = await fetch(
      `${this.hostname}/products/${category}?paging=${paging}`
    );
    return await response.json();
  },
  async getCampaigns(): Promise<MarketingCampaigns> {
    const response = await fetch(`${this.hostname}/marketing/campaigns`);
    return await response.json();
  },
  async searchProducts(keyword: string, paging: number): Promise<ProductsSearch> {
    const response = await fetch(
      `${this.hostname}/products/search?keyword=${keyword}&paging=${paging}`
    );
    return await response.json();
  },
  async getProduct(id: string): Promise<ProductDetails> {
    const response = await fetch(`${this.hostname}/products/details?id=${id}`);
    return await response.json();
  },
  async checkout(data: CheckoutData, jwtToken: string): Promise<any> {
    const response = await fetch(`${this.hostname}/order/checkout`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
      method: 'POST',
    });
    return await response.json();
  },
  async signin(data: SignInData): Promise<any> {
    const response = await fetch(`${this.hostname}/user/signin`, {
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'POST',
    });
    return await response.json();
  },
  async getProfile(jwtToken: string): Promise<{ data: profile }> {
    const response = await fetch(`${this.hostname}/user/profile`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      }),
    });
    return await response.json();
  },
};

export default api;
