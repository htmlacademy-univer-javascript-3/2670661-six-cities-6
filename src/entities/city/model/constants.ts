import {City, CityName} from './types.ts';

export const cities: CityName[] = [...Object.values(CityName)];

export const DEFAULT_CITY: City = {
  name: CityName.Amsterdam,
  location: {latitude: 52.37454, longitude: 4.897976, zoom: 13},
};

export const CITY_SEARCH_PARAM = 'city';
