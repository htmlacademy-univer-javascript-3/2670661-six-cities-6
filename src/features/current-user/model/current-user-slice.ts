import {createSlice} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';
import {AuthErrorResultDto, AuthSuccessResultDto, LoginRequestBody, UserData} from '../../../entities/user/model/types.ts';
import {ReducerName} from '../../../shared/enums/reducer-names.ts';
import {createAppThunk} from '../../../shared/redux-helpers/typed-thunk.ts';
import {userUrl} from '../../../shared/server-interaction/constants.ts';

type CurrentUserState = {
  isAuthInPending: boolean;
  authorizationError: string | null;
  userData: UserData | null;
};

const initialState: CurrentUserState = {
  isAuthInPending: false,
  authorizationError: null,
  userData: null,
};

export const userLogin = createAppThunk(
  ReducerName.currentUser + '/login',
  async (body: LoginRequestBody, thunkApi) => {
    try {
      const response = await thunkApi.extra.axios.post<AuthSuccessResultDto>(userUrl.login, body);
      return response.data satisfies UserData;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const currentUserSlice = createSlice({
  name: ReducerName.offers,
  initialState,
  reducers: {
    logout: (state: CurrentUserState) => {
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.isAuthInPending = true;
      state.authorizationError = null;
      state.userData = null;
    }).addCase(userLogin.fulfilled, (state, action) => {
      state.isAuthInPending = false;
      state.userData = action.payload;
    }).addCase(userLogin.rejected, (state, {payload}) => {
      const error = (payload as AxiosError<AuthErrorResultDto>)?.response?.data?.details[0].messages[0] ?? 'Some error occurred';
      state.isAuthInPending = false;
      state.authorizationError = error;
    });
  },
});

export const currentUserReducer = currentUserSlice.reducer;
export const {logout} = currentUserSlice.actions;
