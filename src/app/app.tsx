import {FC} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Offer} from '../entities/offer/model/types.ts';
import {PrivateRoute} from '../features/private-route/private-route.tsx';
import {FavoritesPage} from '../pages/favorites-page/favorites-page.tsx';
import {LoginPage} from '../pages/login-page/login-page.tsx';
import {MainPage} from '../pages/main-page/main-page.tsx';
import {NotFound404Page} from '../pages/not-found-404-page/not-found-404-page.tsx';
import {OfferPage} from '../pages/offer-page/offer-page.tsx';
import {PropertyPage} from '../pages/property-page/property-page.tsx';
import {RoutePath} from '../shared/enums/routes.ts';

type AppProps = {
  offers: Offer[];
};

export const App: FC<AppProps> = ({offers}) => {
  const favorites = offers.filter((offer) => offer.isFavorite);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage initialOffers={offers}/>}/>
        <Route path={RoutePath.LoginPage} element={<LoginPage/>}/>
        <Route path={RoutePath.FavoritesPage} element={<PrivateRoute isAuthorized={true}/>}>
          <Route path="" element={<FavoritesPage offers={favorites}/>}/>
        </Route>
        <Route path={RoutePath.OfferPage} element={<OfferPage/>}>
          <Route path=":id" element={<OfferPage/>}/>
        </Route>
        <Route path={RoutePath.PropertyPage} element={<PropertyPage/>}/>
        <Route path="*" element={<NotFound404Page/>}/>
      </Routes>
    </BrowserRouter>
  );
};
