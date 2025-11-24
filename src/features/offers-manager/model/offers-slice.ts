import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {City} from '../../../entities/city/model/types.ts';
import {Offer} from '../../../entities/offer/model/types.ts';
import {ReducerName} from '../../../shared/enums/reducer-names.ts';
import {citiesMock} from '../../../shared/mocks/cities.ts';

type OffersState = {
  city: City;
  offers: Offer[];
  activeOfferId: Offer['id'] | null;
};

const initialState: OffersState = {
  city: citiesMock[0],
  offers: [],
  activeOfferId: null,
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
    setActiveOffer: (state: OffersState, action: PayloadAction<Offer['id']>) => {
      state.activeOfferId = action.payload;
    },
  },
});

export const offersReducer = offersSlice.reducer;
export const {setCity, setOffers, setActiveOffer} = offersSlice.actions;
