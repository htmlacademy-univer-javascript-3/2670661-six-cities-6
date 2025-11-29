import {configureStore} from '@reduxjs/toolkit';
import {Reducer} from 'redux';
import {offersReducer} from '../features/offers-manager/model/offers-slice.ts';
import {ReducerName} from '../shared/enums/reducer-names.ts';
import {ThunkExtraArguments} from '../shared/redux-helpers/typed-thunk.ts';
import {axiosClient} from '../shared/server-interaction/constants.ts';

export const store = configureStore({
  reducer: {
    [ReducerName.offers]: offersReducer,
  } satisfies Record<ReducerName, Reducer>,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {extraArgument: {axios: axiosClient} satisfies ThunkExtraArguments},
  }),
});
