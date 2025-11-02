import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {City} from '../../../entities/city/model/types.ts';
import {Offer} from '../../../entities/offer/model/types.ts';
import {ReducerName} from '../../../shared/enums/reducer-names.ts';
import {citiesMock} from '../../../shared/mocks/cities.ts';

type OffersState = {
  city: City;
  offers: Offer[];
};

const initialState: OffersState = {
  city: citiesMock[0],
  offers: [],
};

export const offersSlice = createSlice({
  name: ReducerName.offers,
  initialState,
  reducers: {
    setCity: (state: OffersState, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setOffers: (state: OffersState, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
  },
});

export const offersReducer = offersSlice.reducer;
export const {setCity, setOffers} = offersSlice.actions;
