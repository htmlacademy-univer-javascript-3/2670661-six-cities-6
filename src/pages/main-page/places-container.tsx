import {FC, useState} from 'react';
import {Offer} from '../../entities/offer/model/types.ts';
import {OfferCardList} from '../../entities/offer/ui/offer-card-list.tsx';
import {setActiveOffer} from '../../features/offers-manager/model/offers-slice.ts';
import {useAppDispatch, useAppSelector} from '../../shared/redux-helpers/typed-hooks.ts';
import {PointOnMap} from '../../widgets/map/model/types.ts';
import {MapWidget} from '../../widgets/map/ui/map-widget.tsx';
import {SelectorOption} from '../../widgets/selector/model/types.ts';
import {SelectorWidget} from '../../widgets/selector/ui/selector-widget.tsx';

const sortOptions: SelectorOption[] = [
  {key: 'popular', value: 'Popular'},
  {key: 'price_LtH', value: 'Price: low to high'},
  {key: 'price_HtL', value: 'Price: high to low'},
  {key: 'topRated', value: 'Top rated first'},
];

export const PlacesContainer: FC = () => {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.offers.currentCity);
  const offers = useAppSelector((state) => state.offers.currentCityOffers);
  const activeOfferId = useAppSelector((state) => state.offers.activeOfferId);

  const [sort, setSort] = useState<SelectorOption['key']>(sortOptions[0].key);

  const handleOfferHover = (offerId: Offer['id']) => {
    dispatch(setActiveOffer(offerId));
  };

  const markers: PointOnMap[] = offers.map((offer) => ({
    id: offer.id,
    coordinates: offer.location,
    popupNode: offer.title
  }));

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {currentCity.name}</b>
        <SelectorWidget
          options={sortOptions}
          activeOptionKey={sort}
          onSelect={(sortOption) => setSort(sortOption)}
        >
          Sort by
        </SelectorWidget>
        <OfferCardList
          offers={offers}
          containerClassName="cities__places-list places__list tabs__content"
          onCardHover={handleOfferHover}
        />
      </section>
      <div className="cities__right-section">
        <MapWidget
          mapCenter={currentCity.location}
          markers={markers}
          activeMarkers={activeOfferId ? [activeOfferId] : []}
          mapContainerClassName="cities__map map"
        />
      </div>
    </>
  );
};
