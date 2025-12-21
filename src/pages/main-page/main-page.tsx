import {FC, useEffect} from 'react';
import {City} from '../../entities/city/model/types.ts';
import {CityLinkList} from '../../entities/city/ui/city-link-list.tsx';
import {loadOffers, setCity} from '../../features/offers-manager/model/offers-slice.ts';
import {useAppDispatch, useAppSelector} from '../../shared/redux-helpers/typed-hooks.ts';
import {FullSpaceSpinner} from '../../widgets/spinner/ui/full-space-spinner.tsx';
import {HeaderUserInfo} from '../../widgets/common-components/header-user-info.tsx';
import {PlacesContainer} from './places-container.tsx';

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.offers.isOffersLoading);
  const cities = useAppSelector((state) => state.offers.cities);
  const currentCity = useAppSelector((state) => state.offers.currentCity);

  const setActiveCity = (city: City) => {
    dispatch(setCity(city));
  };

  useEffect(() => {
    dispatch(loadOffers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <HeaderUserInfo/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityLinkList cities={cities} activeCity={currentCity} onCityClick={setActiveCity}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            {isLoading ? <FullSpaceSpinner/> : <PlacesContainer/>}
          </div>
        </div>
      </main>
    </div>
  );
};
