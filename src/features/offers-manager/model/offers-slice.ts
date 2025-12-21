import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DEFAULT_CITY} from '../../../entities/city/model/constants.ts';
import {extractCities} from '../../../entities/city/model/data-mappers.ts';
import {CitiesMap, City} from '../../../entities/city/model/types.ts';
import {groupOffersByCity, mapDtoToOffer} from '../../../entities/offer/model/data-mappers.ts';
import {Offer, OfferDto, OffersByCity} from '../../../entities/offer/model/types.ts';
import {ReducerName} from '../../../shared/enums/reducer-names.ts';
import {createAppThunk} from '../../../shared/redux-helpers/typed-thunk.ts';
import {offersUrl} from '../../../shared/server-interaction/constants.ts';

type OffersState = {
  cities: CitiesMap;
  currentCity: City;
  offers: OffersByCity;
  favoriteOffersCount: number;
  currentCityOffers: Offer[];
  activeOfferId: Offer['id'] | null;
  isOffersLoading: boolean;
};

const initialState: OffersState = {
  cities: {},
  currentCity: DEFAULT_CITY,
  offers: {},
  favoriteOffersCount: 0,
  currentCityOffers: [],
  activeOfferId: null,
  isOffersLoading: false,
};

export const loadOffers = createAppThunk(ReducerName.offers + '/loadOffers', async (_, thunkApi) => {
  try {
    const response = await thunkApi.extra.axios.get<OfferDto[]>(offersUrl.offers);
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const offersSlice = createSlice({
  name: ReducerName.offers,
  initialState,
  reducers: {
    setCity: (state: OffersState, action: PayloadAction<City>) => {
      const city = action.payload;
      state.currentCity = city;
      state.currentCityOffers = state.offers[city.name];
    },
    setActiveOffer: (state: OffersState, action: PayloadAction<Offer['id']>) => {
      state.activeOfferId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadOffers.pending, (state) => {
      state.isOffersLoading = true;
    }).addCase(loadOffers.fulfilled, (state, action) => {
      const offers = groupOffersByCity(action.payload.map(mapDtoToOffer));
      state.isOffersLoading = false;
      state.cities = extractCities(action.payload);
      state.offers = offers;
      state.favoriteOffersCount = action.payload.filter((offer) => offer.isFavorite).length;
      state.currentCityOffers = offers[state.currentCity.name] ?? [];
    }).addCase(loadOffers.rejected, (state) => {
      state.isOffersLoading = false;
    });
  },
});

export const offersReducer = offersSlice.reducer;
export const {setCity, setActiveOffer} = offersSlice.actions;
