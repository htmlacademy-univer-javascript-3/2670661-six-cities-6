import {FC} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Offer} from '../entities/offer/model/types.ts';
import {PrivateRoute} from '../features/private-route/private-route.tsx';
import {FavouritesPage} from '../pages/favourites-page/favourites-page.tsx';
import {LoginPage} from '../pages/login-page/login-page.tsx';
import {MainPage} from '../pages/main-page/main-page.tsx';
import {NotFound404Page} from '../pages/not-found-404-page/not-found-404-page.tsx';
import {OfferPage} from '../pages/offer-page/offer-page.tsx';
import {PropertyPage} from '../pages/property-page/property-page.tsx';
import {RoutePath} from './routes.ts';

type AppProps = {
  offers: Offer[];
};

export const App: FC<AppProps> = ({offers}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage offers={offers}/>}/>
        <Route path={RoutePath.LoginPage} element={<LoginPage/>}/>
        <Route path={RoutePath.FavouritesPage} element={<PrivateRoute isAuthorized={false}/>}>
          <Route path="" element={<FavouritesPage/>}/>
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
