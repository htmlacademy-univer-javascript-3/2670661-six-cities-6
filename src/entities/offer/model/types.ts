import {Coordinates} from '../../../shared/types/coordinates.ts';

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
  coordinates: Coordinates;

  /** Cost in euro */
  costPerNight: number;

  photoUrl: string;
  isPremium?: boolean;
  isBookmarked?: boolean;
}
