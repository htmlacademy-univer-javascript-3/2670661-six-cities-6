import {FC} from 'react';
import {NavLink} from 'react-router-dom';
import {RoutePath} from '../enums/routes.ts';

export const HeaderLogoLink: FC = () => {
  return (
    <NavLink className="header__logo-link" to={'/' + RoutePath.MainPage}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </NavLink>
  );
};

