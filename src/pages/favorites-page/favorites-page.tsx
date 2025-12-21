import {FC} from 'react';
import {OffersByCity} from '../../entities/offer/model/types.ts';
import {HeaderLogoLink} from '../../shared/components/header-logo-link.tsx';
import {useAppSelector} from '../../shared/redux-helpers/typed-hooks.ts';
import {HeaderUserInfo} from '../../widgets/common-components/header-user-info.tsx';
import {FavoriteOfferCardList} from './cards/favorite-offer-card-list.tsx';

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
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {favoritesCounter === 0 && <p>You have not bookmarked any offers yet</p>}
            <FavoriteOfferCardList offers={favorites}/>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};
