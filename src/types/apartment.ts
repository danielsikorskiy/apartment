export type ApartmentStatus =
  | "interesting"
  | "not_interesting"
  | "ask_to_see"
  | "seeing";

export interface ApartmentViewing {
  date: string;
  time: string;
  notes?: string;
  contactName?: string;
  contactPhone?: string;
}

export interface Apartment {
  id: string;
  price: number;
  rooms: number;
  sizeM2: number;
  floor: number;
  totalFloors?: number;
  address: string;
  neighborhood: string;
  lat: number;
  lng: number;
  sourceUrl: string;
  imageUrl?: string;
  images?: string[];
  status: ApartmentStatus;
  viewing?: ApartmentViewing;
  description?: string;
  highlights?: string[];
  dateAdded: string;
  dateUpdated: string;
  addedBy: string;
}

export interface ApartmentDatabase {
  apartments: Apartment[];
  lastUpdated: string;
}
