import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {extractCities} from '../../../entities/city/model/data-mappers.ts';
import {CitiesMap, City} from '../../../entities/city/model/types.ts';
import {groupOffersByCity, mapDtoToOffer} from '../../../entities/offer/model/data-mappers.ts';
import {Offer, OfferDto} from '../../../entities/offer/model/types.ts';
import {ReducerName} from '../../../shared/enums/reducer-names.ts';
import {citiesMock} from '../../../shared/mocks/cities.ts';
import {axiosConfig, offersUrl} from '../../../shared/server-interaction/constants.ts';

type OffersState = {
  currentCity: City;
  cities: CitiesMap;
  offers: Offer[];
  activeOfferId: Offer['id'] | null;
  isLoading: boolean;
};

const initialState: OffersState = {
  currentCity: citiesMock[0],
  cities: {},
  offers: [],
  activeOfferId: null,

  isLoading: false,
};

export const loadOffers = createAsyncThunk('loadOffer', async (_, thunkApi) => {
  try {
    const response = await axios.get<OfferDto[]>(offersUrl.offers, axiosConfig);
    const cities = extractCities(response.data);
    return {cities, offers: groupOffersByCity(response.data.map(mapDtoToOffer))};
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error', error);
    return thunkApi.rejectWithValue(error);
  }
});

export const offersSlice = createSlice({
  name: ReducerName.offers,
  initialState,
  reducers: {
    setCity: (state: OffersState, action: PayloadAction<City>) => {
      state.currentCity = action.payload;
    },
    setOffers: (state: OffersState, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    setActiveOffer: (state: OffersState, action: PayloadAction<Offer['id']>) => {
      state.activeOfferId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadOffers.pending, (state) => {
      state.isLoading = true;
    }).addCase(loadOffers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cities = action.payload.cities;
      console.log(action.payload);
    }).addCase(loadOffers.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });
  },
});

export const offersReducer = offersSlice.reducer;
export const {setCity, setOffers, setActiveOffer} = offersSlice.actions;
