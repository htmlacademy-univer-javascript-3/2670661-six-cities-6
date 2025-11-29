import {configureStore} from '@reduxjs/toolkit';
import {Reducer} from 'redux';
import {offersReducer} from '../features/offers-manager/model/offers-slice.ts';
import {ReducerName} from '../shared/enums/reducer-names.ts';

export const store = configureStore({
  reducer: {
    [ReducerName.offers]: offersReducer,
  } satisfies Record<ReducerName, Reducer>,
});
