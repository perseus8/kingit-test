export interface IHotelListing extends Document {
    hotelId: string;
    hotelName: string;
    countryName: string;
    countryId: string;
    cityName: string;
    cityId: string;
    price: number;
    starRating: number;
    imageUrl?: string;
    fetchedAt: Date;
    lastFetched: Date;
  }



export interface FilterSchema {
  id: string;
  name: string;
}

export interface FilterItemProps {
  countries: FilterSchema[];
  cities: FilterSchema[];
  onFilterChange: (countryId: string, cityId: string) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SortItemProps {
  onSortChange: (sortBy: string) => void;
  priceSortOrder: "asc" | "desc";
  starsSortOrder: "asc" | "desc";
}

export interface FilterHeaderProps {
    countries: FilterSchema[];
    cities: FilterSchema[];
    onFilterChange: (countryId: string, cityId: string) => void;
    onSortChange: (sortBy: string) => void;
    priceSortOrder: "asc" | "desc";
    starsSortOrder: "asc" | "desc";
    itemsPerPage: number;
    onItemsPerPageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    loading: boolean;
  }

export interface HotelItemSchema {
  id: string;
  name: string;
  imageUrl?: string;
  country: string;
  countryId: string;
  city: string;
  cityId: string;
  price: number;
  stars: number;
}

export interface HotelItemProps {
  HotelItem: HotelItemSchema;
  onClick: () => void; // onClick prop
}

export interface HotelListProps {
  HotelLists: HotelItemSchema[];
}

export interface HotelModalProps {
  open: boolean;
  onClose: () => void;
  selectedHotel: HotelItemSchema;
}
