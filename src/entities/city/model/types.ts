import {Coordinates} from '../../../shared/types/coordinates.ts';

export type City = {
  name: string;
  location: Coordinates;
};

export type CitiesMap = Record<City['name'], City>;
