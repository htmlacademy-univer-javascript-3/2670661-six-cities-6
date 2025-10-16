export enum PlaceType {
  Room = 'Room',
  Apartment = 'Apartment',
}

export type Offer = {
  id: number;
  title: string;
  type: PlaceType;
  stars: 1 | 2 | 3 | 4 | 5;
  city: string;

  /** Cost in euro */
  costPerNight: number;

  photoUrl: string;
  isPremium?: boolean;
  isBookmarked?: boolean;
}
