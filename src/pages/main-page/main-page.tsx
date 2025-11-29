import {FC, useEffect, useState} from 'react';
import {City} from '../../entities/city/model/types.ts';
import {CityLinkList} from '../../entities/city/ui/city-link-list.tsx';
import {Offer} from '../../entities/offer/model/types.ts';
import {OfferCardList} from '../../entities/offer/ui/offer-card-list.tsx';
import {loadOffers, setActiveOffer, setCity, setOffers} from '../../features/offers-manager/model/offers-slice.ts';
import {citiesMock} from '../../shared/mocks/cities.ts';
import {useAppDispatch, useAppSelector} from '../../shared/redux-helpers/typed-hooks.ts';
import {Coordinates} from '../../shared/types/coordinates.ts';
import {PointOnMap} from '../../widgets/map/model/types.ts';
import {MapWidget} from '../../widgets/map/ui/map-widget.tsx';
import {SelectorOption} from '../../widgets/selector/model/types.ts';
import {SelectorWidget} from '../../widgets/selector/ui/selector-widget.tsx';

type MainPageProps = {
  initialOffers: Offer[];
};

const amsterdamCityCoordinates: Coordinates = {latitude: 52.372134977537875, longitude: 4.894739637504961};

const sortOptions: SelectorOption[] = [
  {key: 'popular', value: 'Popular'},
  {key: 'price_LtH', value: 'Price: low to high'},
  {key: 'price_HtL', value: 'Price: high to low'},
  {key: 'topRated', value: 'Top rated first'},
];

export const MainPage: FC<MainPageProps> = ({initialOffers}) => {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector((state) => state.offers.currentCity);
  const activeOffers = useAppSelector((state) => state.offers.offers);
  const activeOfferId = useAppSelector((state) => state.offers.activeOfferId);

  const [sort, setSort] = useState<SelectorOption['key']>(sortOptions[0].key);

  const setActiveCity = (city: City) => {
    dispatch(setCity(city));

    const cityName = city.name;
    const newOffers = initialOffers.filter((offer) => offer.city === cityName);
    dispatch(setOffers(newOffers));
  };

  const handleOfferHover = (offerId: Offer['id']) => {
    dispatch(setActiveOffer(offerId));
  };

  // temporary decision to set offers on init
  useEffect(() => {
    const amsterdam = citiesMock.find((city) => city.name === 'Amsterdam');
    if (amsterdam) {
      setActiveCity(amsterdam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(loadOffers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markers: PointOnMap[] = activeOffers.map((offer) => ({
    id: offer.id,
    coordinates: offer.location,
    popupNode: offer.title
  }));

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityLinkList cities={citiesMock} activeCity={currentCity} onCityClick={setActiveCity}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{activeOffers.length} places to stay in {currentCity.name}</b>
              <SelectorWidget
                options={sortOptions}
                activeOptionKey={sort}
                onSelect={(sortOption) => setSort(sortOption)}
              >
                Sort by
              </SelectorWidget>
              <OfferCardList
                offers={activeOffers}
                containerClassName="cities__places-list places__list tabs__content"
                onCardHover={handleOfferHover}
              />
            </section>
            <div className="cities__right-section">
              <MapWidget
                mapCenter={amsterdamCityCoordinates}
                markers={markers}
                activeMarkers={activeOfferId ? [activeOfferId] : []}
                mapContainerClassName="cities__map map"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
