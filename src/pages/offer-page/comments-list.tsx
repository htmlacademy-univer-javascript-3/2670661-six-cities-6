import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {CommentaryCard} from '../../entities/commentary/ui/commentary-card.tsx';
import {loadComments} from '../../features/offers-manager/model/offer-page-slice.ts';
import {useAppDispatch, useAppSelector} from '../../shared/redux-helpers/typed-hooks.ts';
import {Spinner} from '../../widgets/spinner/ui/spinner.tsx';

export const CommentsList = () => {
  const dispatch = useAppDispatch();
  const {id: offerId = ''} = useParams();
  const comments = useAppSelector((state) => state.offerPage.comments);
  const isLoading = useAppSelector((state) => state.offerPage.isCommentsLoading);

  useEffect(() => {
    dispatch(loadComments(offerId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerId]);

  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {comments.slice(0, 10).map((commentary) => (<CommentaryCard key={commentary.id} commentary={commentary}/>))}
      </ul>
    </>
  );
};
