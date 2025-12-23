import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {extractCities} from '../../../entities/city/model/data-mappers.ts';
import {CitiesMap, City, CityName} from '../../../entities/city/model/types.ts';
import {OfferSortOption} from '../../../entities/offer/model/constants.ts';
import {applySortToOffers, groupOffersByCity, mapDtoToOffer} from '../../../entities/offer/model/data-mappers.ts';
import {Offer, OfferDto, OffersByCity} from '../../../entities/offer/model/types.ts';
import {ReducerName} from '../../../shared/enums/reducer-names.ts';
import {createAppThunk} from '../../../shared/redux-helpers/typed-thunk.ts';
import {offersUrl} from '../../../shared/server-interaction/constants.ts';

type OffersState = {
  cities: CitiesMap;
  currentCity: City['name'];
  offers: OffersByCity;
  favoriteOffersCount: number;
  currentCityOffers: Offer[];
  activeOfferId: Offer['id'] | null;
  sortOption: OfferSortOption;
  isOffersLoading: boolean;
};

const initialState: OffersState = {
  cities: {},
  currentCity: CityName.Amsterdam,
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
    setCity: (state: OffersState, action: PayloadAction<City['name']>) => {
      const city = action.payload;
      state.currentCity = city;
      state.currentCityOffers = state.offers[city] ?? [];
      state.sortOption = OfferSortOption.popular;
    },
    setActiveOffer: (state: OffersState, action: PayloadAction<Offer['id']>) => {
      state.activeOfferId = action.payload;
    },
    setOffersSort: (state: OffersState, action: PayloadAction<OfferSortOption>) => {
      const sort = action.payload;
      state.sortOption = sort;
      if (sort === OfferSortOption.popular) {
        state.currentCityOffers = state.offers[state.currentCity] ?? [];
      } else {
        state.currentCityOffers = applySortToOffers(state.currentCityOffers, sort);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadOffers.pending, (state) => {
      state.isOffersLoading = true;
      state.sortOption = OfferSortOption.popular;
      state.offers = {};
      state.favoriteOffersCount = 0;
      state.currentCityOffers = [];
      state.activeOfferId = null;
    }).addCase(loadOffers.fulfilled, (state, action) => {
      const offers = groupOffersByCity(action.payload.map(mapDtoToOffer));
      state.isOffersLoading = false;
      state.cities = extractCities(action.payload);
      state.offers = offers;
      state.favoriteOffersCount = action.payload.filter((offer) => offer.isFavorite).length;
      state.currentCityOffers = offers[state.currentCity] ?? [];
    }).addCase(loadOffers.rejected, (state) => {
      state.isOffersLoading = false;
    });
  },
});

export const offersReducer = offersSlice.reducer;
export const {setCity, setActiveOffer, setOffersSort} = offersSlice.actions;
