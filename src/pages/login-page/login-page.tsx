import {FC} from 'react';
import {Navigate} from 'react-router-dom';
import {HeaderLogoLink} from '../../shared/components/header-logo-link.tsx';
import {RoutePath} from '../../shared/enums/routes.ts';
import {useAppSelector} from '../../shared/redux-helpers/typed-hooks.ts';
import {LoginForm} from './login-form.tsx';

export const LoginPage: FC = () => {
  const isAuthorize = useAppSelector((state) => !!state.currentUser.userData);

  if (isAuthorize) {
    return <Navigate to={'/' + RoutePath.MainPage}/>;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <HeaderLogoLink/>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm/>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

