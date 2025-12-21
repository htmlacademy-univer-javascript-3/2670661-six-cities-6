import {FC, ReactNode} from 'react';
import {HeaderLogoLink} from '../../shared/components/header-logo-link.tsx';
import {HeaderUserInfo} from '../../widgets/common-components/header-user-info.tsx';

export const OfferPageWrapper: FC<{children: ReactNode}> = ({children}) => {
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
      {children}
    </div>
  );
};
