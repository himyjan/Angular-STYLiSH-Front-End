type Card = {
  prime: string;
  bincode: string;
  lastfour: string;
  issuer: string;
  issuer_zh_tw: string;
  bank_id: string;
  funding: number;
  type: number;
  level: string;
  country: string;
  countrycode: string;
};

type Affiliate_codes = {
  affiliate_codes: [];
};

export type Prime = {
  status?: number;
  card?: Card;
  clientip?: string;
  card_identifier?: string;
  merchant_reference_info?: Affiliate_codes;
};
