import {FC, useState} from 'react';
import {Offer} from '../model/types.ts';
import {OfferCard} from './offer-card.tsx';

type OfferCardsProps = {
  offers: Offer[];
};

export const OfferCardList: FC<OfferCardsProps> = ({offers}) => {
  const [, setActiveCardId] = useState<Offer['id'] | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) =>
        <OfferCard key={offer.id} offer={offer} onMouseEnter={() => setActiveCardId(offer.id)}/>
      )}
    </div>
  );
};

