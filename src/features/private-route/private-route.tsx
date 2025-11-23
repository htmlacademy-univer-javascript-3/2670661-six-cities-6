import {FC} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {RoutePath} from '../../shared/enums/routes.ts';

type PrivateRouteProps = {
  isAuthorized: boolean;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({isAuthorized}) => {
  return isAuthorized ? <Outlet/> : <Navigate to={`/${RoutePath.LoginPage}`}/>;
};

