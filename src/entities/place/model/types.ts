export enum PlaceType {
  Room = 'Room',
  Apartment = 'Apartment',
}

export type Place = {
  id: number;
  title: string;
  type: PlaceType;
  stars: 1 | 2 | 3 | 4 | 5;

  /** Cost in euro */
  costPerNight: number;

  photoUrl: string;
  isPremium?: boolean;
  isBookmarked?: boolean;
}
