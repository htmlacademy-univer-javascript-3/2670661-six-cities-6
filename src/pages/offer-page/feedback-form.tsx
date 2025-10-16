import {FC, FormEventHandler, Fragment, useState} from 'react';

const starTitles = [undefined, 'terribly', 'badly', 'not bad', 'good', 'perfect'] as const;

export const FeedbackForm: FC = () => {
  const [, setStars] = useState(0);
  const [, setReviewText] = useState('');

  const handleStarClick: FormEventHandler<HTMLInputElement> = (e) => {
    setStars(parseInt((e.target as HTMLInputElement).value, 10));
  };

  const handleReviewInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
    setReviewText((e.target as HTMLTextAreaElement).value);
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((starCount) => (
          <Fragment key={starCount}>
            <input
              id={`${starCount}-stars`}
              name="rating" value={starCount}
              className="form__rating-input visually-hidden"
              type="radio"
              onInput={handleStarClick}
            />
            <label
              htmlFor={`${starCount}-stars`}
              className="reviews__rating-label form__rating-label"
              title={starTitles[starCount]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        id="review"
        name="review"
        className="reviews__textarea form__textarea"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onInput={handleReviewInput}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
};
