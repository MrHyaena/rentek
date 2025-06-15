export interface Item {
  id: number;
  documentId: string;
  name: string;
  basePrice: string;
  pricingType: string;
  description: string;
  excerpt: string;
  slug: string;
  productType: string;
  deposit: string;
  additionalInformation: null;
  amount: string;
  popular: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  details: undefined;
  position: number;
  coverImage: {
    formats: {
      large: {
        url: string;
      };
      small: {
        url: string;
      };
      medium: {
        url: string;
      };
      thumbnail: {
        url: string;
      };
    };
    url: string;
  };
  gallery: undefined;
  uses: [];
  specifications: [];
  accessories: [];
  categories: [];
  subcategories: [];
  engine_type: {};
  brands: [];
}
