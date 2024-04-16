export type CarouselDetails = {
  id: number;
  product_id: number;
  picture: string;
  story: string;
}

export type MarketingCampaigns = {
  data: CarouselDetails[];
}
