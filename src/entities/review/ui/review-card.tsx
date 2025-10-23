import {FC} from 'react';
import {Review} from '../model/types.ts';

type ReviewCardProps = {
  review: Review;
};

export const ReviewCard: FC<ReviewCardProps> = ({review}) => {
  const {stars, text: reviewText, date, user: {name: userName, photoUrl}} = review;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={photoUrl} width="54" height="54" alt="Reviews avatar"/>
        </div>
        <span className="reviews__user-name">{userName}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${20 * stars}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{reviewText}</p>
        <time className="reviews__time" dateTime={date.toISOString().split('T')[0]}>
          {date.toLocaleString('en', {month: 'long'})} {date.getFullYear()}
        </time>
      </div>
    </li>
  );
};
