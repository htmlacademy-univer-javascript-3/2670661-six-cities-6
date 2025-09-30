import {FC} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Place} from '../entities/place/model/types.ts';
import {PrivateRoute} from '../features/private-route/private-route.tsx';
import {FavouritesPage} from '../pages/favourites-page/favourites-page.tsx';
import {LoginPage} from '../pages/login-page/login-page.tsx';
import {MainPage} from '../pages/main-page/main-page.tsx';
import {NotFound404Page} from '../pages/not-found-404-page/not-found-404-page.tsx';
import {OfferPage} from '../pages/offer-page/offer-page.tsx';
import {PropertyPage} from '../pages/property-page/property-page.tsx';
import {RoutePath} from './routes.ts';

type AppProps = {
  places: Place[];
};

export const App: FC<AppProps> = ({places}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage places={places}/>}/>
        <Route path={RoutePath.LoginPage} element={<LoginPage/>}/>
        <Route
          path={RoutePath.FavouritesPage} element={
            <PrivateRoute isAuthorized={false}>
              <FavouritesPage/>
            </PrivateRoute>
          }
        />
        <Route path={RoutePath.OfferPage} element={<OfferPage/>}>
          <Route path=":id" element={<OfferPage/>}/>
        </Route>
        <Route path={RoutePath.PropertyPage} element={<PropertyPage/>}/>
        <Route path="*" element={<NotFound404Page/>}/>
      </Routes>
    </BrowserRouter>
  );
};
