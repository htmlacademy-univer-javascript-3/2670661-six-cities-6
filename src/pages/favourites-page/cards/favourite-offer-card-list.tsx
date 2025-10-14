import {FC} from 'react';
import {Offer} from '../../../entities/offer/model/types.ts';
import {FavouriteOfferCard} from './favourite-offer-card.tsx';

type FavouriteOfferCardListProps = {
  offers: Offer[];
};

type OffersByCity = Record<Offer['city'], Offer[]>;

export const FavouriteOfferCardList: FC<FavouriteOfferCardListProps> = ({offers}) => {
  const offersByCity: OffersByCity = offers.reduce((result, offer) => {
    const city = offer.city;
    if (!result[city]) {
      result[city] = [];
    }
    result[city].push(offer);
    return result;
  }, {} as OffersByCity);

  return (
    <ul className="favorites__list">
      {Object.entries(offersByCity).map(([city, cityOffers]) => (
        <li key={city} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {cityOffers.map((offer) => (
              <FavouriteOfferCard key={offer.id} offer={offer}/>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

