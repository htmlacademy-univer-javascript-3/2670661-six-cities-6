import {FC} from 'react';
import {Offer} from '../model/types.ts';
import {OfferCard} from './offer-card.tsx';

type OfferCardsProps = {
  offers: Offer[];
};

export const OfferCards: FC<OfferCardsProps> = ({offers}) => {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <OfferCard key={offer.id} offer={offer}/>
      )}
    </div>
  );
};

