export interface ListingsInterface {
  address: string;
  bathrooms: number;
  bedrooms: number;
  city: string;
  home_type: string;
  photo_main: string;
  price: number;
  sale_type: string;
  slug: string;
  sqft: string;
  state: string;
  title: string;
}

export interface PaginationProps {
  count: number;
  previous_page: () => void;
  next_page: () => void;
  itemsPerPage: number;
  visitPage: (page: number) => void;
  active: number;
}

export interface ListingDetailsInterface {
  title: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  home_type: string;
  sale_type: string;
  bedrooms: number;
  bathrooms: string;
  sqft: string;
  description: string;
  price: number;

  photo_main: string;
  photo_1: string;
  photo_2: string;
  photo_3: string;
  photo_4: string;
  photo_5: string;
  photo_6: string;
  photo_7: string;
  photo_8: string;
  photo_9: string;
  photo_10: string;

  realtor: object;
}

export interface RealtorInterface {
  id?: number;
  photo: string;
  name: string;
  phone: string;
  email: string;
  description: string;
}
