import {Coordinates} from '../../../shared/types/coordinates.ts';

export type City = {
  // TODO: remove id to sync with dto
  id: number | string;
  name: string;
  location: Coordinates;
};

export type CitiesMap = Record<City['name'], City>;
