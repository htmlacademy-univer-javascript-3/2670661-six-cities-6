import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {DEFAULT_CITY} from '../../../entities/city/model/constants.ts';
import {extractCities} from '../../../entities/city/model/data-mappers.ts';
import {CitiesMap, City} from '../../../entities/city/model/types.ts';
import {OfferSortOption} from '../../../entities/offer/model/constants.ts';
import {applySortToOffers, groupOffersByCity, mapDtoToOffer} from '../../../entities/offer/model/data-mappers.ts';
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
  sortOption: OfferSortOption;
  isOffersLoading: boolean;
};

const initialState: OffersState = {
  cities: {},
  currentCity: DEFAULT_CITY,
  offers: {},
  favoriteOffersCount: 0,
  currentCityOffers: [],
  activeOfferId: null,
  sortOption: OfferSortOption.popular,
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
      state.sortOption = OfferSortOption.popular;
    },
    setActiveOffer: (state: OffersState, action: PayloadAction<Offer['id']>) => {
      state.activeOfferId = action.payload;
    },
    setOffersSort: (state: OffersState, action: PayloadAction<OfferSortOption>) => {
      const sort = action.payload;
      state.sortOption = sort;
      if (sort === OfferSortOption.popular) {
        state.currentCityOffers = state.offers[state.currentCity.name];
      } else {
        state.currentCityOffers = applySortToOffers(state.currentCityOffers, sort);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadOffers.pending, (state) => {
      state.isOffersLoading = true;
      state.sortOption = OfferSortOption.popular;
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
export const {setCity, setActiveOffer, setOffersSort} = offersSlice.actions;
