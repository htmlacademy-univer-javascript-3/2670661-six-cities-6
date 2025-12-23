import {FC} from 'react';
import {NavLink} from 'react-router-dom';
import {OffersByCity} from '../../entities/offer/model/types.ts';
import {HeaderLogoLink} from '../../shared/components/header-logo-link.tsx';
import {RoutePath} from '../../shared/enums/routes.ts';
import {useAppSelector} from '../../shared/redux-helpers/typed-hooks.ts';
import {HeaderUserInfo} from '../../widgets/common-components/header-user-info.tsx';
import {FavoriteOfferCardList} from './cards/favorite-offer-card-list.tsx';
import {FavoritesEmpty} from './favorites-empty.tsx';

export const FavoritesPage: FC = () => {
  const offers = useAppSelector((state) => state.offers.offers);

  let favoritesCounter = 0;
  const favorites: OffersByCity = Object.entries(structuredClone(offers)).reduce((
    favByCity, [city, cityOffers]
  ) => {
    favByCity[city] = cityOffers.filter((offer) => offer.isFavorite);
    favoritesCounter += favByCity[city].length;
    return favByCity;
  }, {} as OffersByCity);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <HeaderLogoLink/>
            </div>
            <HeaderUserInfo/>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favoritesCounter === 0 ? <FavoritesEmpty/> : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoriteOfferCardList offers={favorites}/>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <NavLink className="footer__logo-link" to={'/' + RoutePath.MainPage}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </NavLink>
      </footer>
    </div>
  );
};
