import {FC, useEffect, useMemo} from 'react';
import {NavLink} from 'react-router-dom';
import {groupOffersByCity} from '../../shared/entities/offer/data-mappers.ts';
import {loadFavorites} from '../../slices/favorites-page-slice.ts';
import {HeaderLogoLink} from '../../components/shared/header-logo-link.tsx';
import {RoutePath} from '../../shared/enums/routes.ts';
import {useAppDispatch, useAppSelector} from '../../shared/redux-helpers/typed-hooks.ts';
import {HeaderUserInfo} from '../../components/shared/header-user-info.tsx';
import {FavoriteOfferCardList} from './cards/favorite-offer-card-list.tsx';
import {FavoritesEmpty} from './favorites-empty.tsx';

export const FavoritesPage: FC = () => {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.favoritesPage.favorites);
  const offersByCity = useMemo(() => groupOffersByCity(offers), [offers]);

  useEffect(() => {
    dispatch(loadFavorites());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {offers.length === 0 ? <FavoritesEmpty/> : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoriteOfferCardList offers={offersByCity}/>
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
