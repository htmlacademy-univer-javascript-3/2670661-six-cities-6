import React, {FC} from 'react';
import {FavoriteStatus} from '../../shared/server-interaction/constants.ts';
import {Offer} from '../../entities/offer/model/types.ts';
import {OfferCard} from './offer-card.tsx';

type OfferCardsProps = {
  offers: Offer[];
  containerClassName?: string;
  onCardHover?: (offerId: Offer['id']) => void;
  onChangeFavoriteStatus?: (offerId: Offer['id'], status: FavoriteStatus) => void;
};

export const OfferCardList: FC<OfferCardsProps> = React.memo(({
  offers,
  containerClassName,
  onCardHover,
  onChangeFavoriteStatus,
}) => {
  return (
    <div className={containerClassName}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => onCardHover?.(offer.id)}
          onChangeFavoriteStatus={onChangeFavoriteStatus}
        />
      ))}
    </div>
  );
});

OfferCardList.displayName = 'OfferCardList';
