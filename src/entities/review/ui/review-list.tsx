import {FC} from 'react';
import {Review} from '../model/types.ts';
import {ReviewCard} from './review-card.tsx';

type ReviewListProps = {
  reviews: Review[];
};

export const ReviewList: FC<ReviewListProps> = ({reviews}) => {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => (<ReviewCard key={review.id} review={review}/>))}
      </ul>
    </>
  );
};
