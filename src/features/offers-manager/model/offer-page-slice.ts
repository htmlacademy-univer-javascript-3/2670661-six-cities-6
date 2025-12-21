import {createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {mapDtoToOffer} from '../../../entities/offer/model/data-mappers.ts';
import {Offer, OfferDto, OfferErrorResultDto, OfferExtendedDto} from '../../../entities/offer/model/types.ts';
import {ReducerName} from '../../../shared/enums/reducer-names.ts';
import {createAppThunk} from '../../../shared/redux-helpers/typed-thunk.ts';
import {offersUrl} from '../../../shared/server-interaction/constants.ts';

type OffersState = {
  isOfferLoading: boolean;
  offerData: OfferExtendedDto | null;
  offersLoadingError: OfferErrorResultDto | null;

  isNearbyLoading: boolean;
  nearbyOffers: Offer[];
  nearbyLoadingError: OfferErrorResultDto | null;
};

const initialState: OffersState = {
  isOfferLoading: false,
  offerData: null,
  offersLoadingError: null,

  isNearbyLoading: false,
  nearbyOffers: [],
  nearbyLoadingError: null,
};

export const loadOffer = createAppThunk(ReducerName.offerPage + '/loadOffer', async (offerId: string, thunkApi) => {
  try {
    const response = await thunkApi.extra.axios.get<OfferExtendedDto>(offersUrl.offer(offerId));
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const loadNearbyOffers = createAppThunk(ReducerName.offerPage + '/loadNearby', async (offerId: string, thunkApi) => {
  try {
    const response = await thunkApi.extra.axios.get<OfferDto[]>(offersUrl.nearby(offerId));
    return response.data;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const offerPageSlice = createSlice({
  name: ReducerName.offerPage,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadOffer.pending, (state) => {
      state.isOfferLoading = true;
      state.offerData = null;
      state.offersLoadingError = null;
    }).addCase(loadOffer.fulfilled, (state, action) => {
      state.isOfferLoading = false;
      state.offerData = action.payload;
    }).addCase(loadOffer.rejected, (state, {payload}) => {
      const error = (payload as AxiosError<OfferErrorResultDto>).response?.data;
      state.isOfferLoading = false;
      state.offersLoadingError = error as OfferErrorResultDto;
    }).addCase(loadNearbyOffers.pending, (state) => {
      state.isNearbyLoading = true;
      state.nearbyOffers = [];
      state.nearbyLoadingError = null;
    }).addCase(loadNearbyOffers.fulfilled, (state, action) => {
      state.isNearbyLoading = false;
      state.nearbyOffers = action.payload.map(mapDtoToOffer);
    }).addCase(loadNearbyOffers.rejected, (state, {payload}) => {
      const error = (payload as AxiosError<OfferErrorResultDto>).response?.data;
      state.isNearbyLoading = false;
      state.nearbyLoadingError = error as OfferErrorResultDto;
    });
  },
});

export const offerPageReducer = offerPageSlice.reducer;
// export const {setCity, setActiveOffer} = offerPageSlice.actions;
