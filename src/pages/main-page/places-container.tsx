import React, {FC, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {DEFAULT_CITY} from '../../entities/city/model/constants.ts';
import {OfferSortOption} from '../../entities/offer/model/constants.ts';
import {Offer} from '../../entities/offer/model/types.ts';
import {OfferCardList} from '../../entities/offer/ui/offer-card-list.tsx';
import {changeFavoriteStatus} from '../../slices/favorites-page-slice.ts';
import {setActiveOffer, setOffersSort} from '../../slices/offers-slice.ts';
import {RoutePath} from '../../shared/enums/routes.ts';
import {useAppDispatch, useAppSelector} from '../../shared/redux-helpers/typed-hooks.ts';
import {FavoriteStatus} from '../../shared/server-interaction/constants.ts';
import {SelectorOption} from '../../widgets/selector/model/types.ts';
import {SelectorWidget} from '../../widgets/selector/ui/selector-widget.tsx';
import {MapWrapper} from './map-wrapper.tsx';

const sortOptions: SelectorOption[] = [
  {key: OfferSortOption.popular, value: 'Popular'},
  {key: OfferSortOption.price_LtH, value: 'Price: low to high'},
  {key: OfferSortOption.price_HtL, value: 'Price: high to low'},
  {key: OfferSortOption.topRated, value: 'Top rated first'},
] satisfies Array<{key: OfferSortOption; value: string}>;

export const PlacesContainer: FC = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.offers.cities[state.offers.currentCity]) ?? DEFAULT_CITY;
  const offers = useAppSelector((state) => state.offers.currentCityOffers);
  const sort = useAppSelector((state) => state.offers.sortOption);
  const isAuthorized = useAppSelector((state) => !!state.currentUser.userData);

  const handleOfferHover = useCallback((offerId: Offer['id']) => {
    dispatch(setActiveOffer(offerId));
  }, [dispatch]);

  const handleChangeSort = useCallback((sortOption: SelectorOption['key']) => {
    dispatch(setOffersSort(sortOption as OfferSortOption));
  }, [dispatch]);

  const onChangeFavoriteStatus = useCallback((offerId: Offer['id'], status: FavoriteStatus) => {
    if (isAuthorized) {
      dispatch(changeFavoriteStatus({offerId, status}));
    } else {
      navigate('/' + RoutePath.LoginPage);
    }
  }, [navigate, dispatch, isAuthorized]);

  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {currentCity.name}</b>
        <SelectorWidget
          options={sortOptions}
          activeOptionKey={sort}
          onSelect={handleChangeSort}
        >
          Sort by
        </SelectorWidget>
        <OfferCardList
          offers={offers}
          containerClassName="cities__places-list places__list tabs__content"
          onCardHover={handleOfferHover}
          onChangeFavoriteStatus={onChangeFavoriteStatus}
        />
      </section>
      <div className="cities__right-section">
        <MapWrapper/>
      </div>
    </>
  );
});

PlacesContainer.displayName = 'PlacesContainer';
