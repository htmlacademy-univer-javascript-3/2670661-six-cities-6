import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {App} from './app/app.tsx';
import {store} from './app/store.ts';
import {offersMock} from './shared/mocks/offers.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={offersMock}/>
    </Provider>
  </React.StrictMode>
);
