import {Review} from '../../entities/review/model/types.ts';
import {usersMock} from './users.ts';

export const reviewsMock: Review[] = [
  {
    id: 0,
    stars: 4,
    user: usersMock[0],
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: new Date('2019-07-12'),
  },
  {
    id: 1,
    stars: 3,
    user: usersMock[1],
    text: 'Not bad',
    date: new Date('2020-10-10'),
  }
];
