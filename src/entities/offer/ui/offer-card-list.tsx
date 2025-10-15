import {FC, useState} from 'react';
import {Offer} from '../model/types.ts';
import {OfferCard} from './offer-card.tsx';

type OfferCardsProps = {
  offers: Offer[];
  containerClassName?: string;
};

export const OfferCardList: FC<OfferCardsProps> = ({offers, containerClassName}) => {
  const [, setActiveCardId] = useState<Offer['id'] | null>(null);

  return (
    <div className={containerClassName}>
      {offers.map((offer) =>
        <OfferCard key={offer.id} offer={offer} onMouseEnter={() => setActiveCardId(offer.id)}/>
      )}
    </div>
  );
};

