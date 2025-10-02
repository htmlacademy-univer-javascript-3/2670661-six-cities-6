import {FC, ReactNode} from 'react';
import {Navigate} from 'react-router-dom';
import {RoutePath} from '../../app/routes.ts';

type PrivateRouteProps = {
  isAuthorized: boolean;
  children: ReactNode;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({isAuthorized, children}) => {
  return isAuthorized ? children : <Navigate to={`/${RoutePath.LoginPage}`}/>;
};

