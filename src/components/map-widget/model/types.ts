import {Key, ReactNode} from 'react';
import {Coordinates} from '../../../shared/types/coordinates.ts';

export type PointOnMap = {
  id: Key;
  coordinates: Coordinates;
  popupNode?: ReactNode;
};
