import {FC} from 'react';
import {Offer} from '../model/types.ts';
import {OfferCard} from './offer-card.tsx';

type OfferCardsProps = {
  offers: Offer[];
  containerClassName?: string;
  onCardHover?: (offerId: Offer['id']) => void;
};

export const OfferCardList: FC<OfferCardsProps> = ({offers, containerClassName, onCardHover}) => {
  return (
    <div className={containerClassName}>
      {offers.map((offer) =>
        <OfferCard key={offer.id} offer={offer} onMouseEnter={() => onCardHover?.(offer.id)}/>
      )}
    </div>
  );
};

