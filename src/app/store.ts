import {configureStore} from '@reduxjs/toolkit';
import {AxiosError, InternalAxiosRequestConfig} from 'axios';
import {Reducer} from 'redux';
import {ReducerName} from '../shared/enums/reducer-names.ts';
import {ThunkExtraArguments} from '../shared/redux-helpers/typed-thunk.ts';
import {axiosClient} from '../shared/server-interaction/constants.ts';
import {showErrorNotification} from '../shared/utils/notifications.ts';
import {currentUserReducer} from '../slices/current-user-slice.ts';
import {favoritesPageReducer} from '../slices/favorites-page-slice.ts';
import {offerPageReducer} from '../slices/offer-page-slice.ts';
import {offersReducer} from '../slices/offers-slice.ts';

export const store = configureStore({
  reducer: {
    [ReducerName.currentUser]: currentUserReducer,
    [ReducerName.offers]: offersReducer,
    [ReducerName.offerPage]: offerPageReducer,
    [ReducerName.favoritesPage]: favoritesPageReducer,
  } satisfies Record<ReducerName, Reducer>,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    thunk: {extraArgument: {axios: axiosClient} satisfies ThunkExtraArguments},
  }),
});

// interceptor to add user token to requests
axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const state = store.getState();
  const token = state.currentUser.userData?.token;

  if (token) {
    config.headers.set('X-Token', token);
  }

  return config;
});

// interceptor to catch some errors on response
axiosClient.interceptors.response.use((r) => r, (error: AxiosError) => {
  if (error.code === 'ERR_NETWORK') {
    showErrorNotification('Connection error');
  }

  if (error.code === 'ECONNABORTED') {
    showErrorNotification('Connection timeout');
  }

  return Promise.reject(error);
});
