import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { loginService, signUpService } from '../../Services/services';

const initialState = {
  token: JSON.parse(localStorage.getItem('loginItems'))?.token,
  user: JSON.parse(localStorage.getItem('loginItems'))?.user,
  isLoading: false,
};

export const loginHandler = createAsyncThunk(
  'authentication/loginHandler',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await loginService({ email, password });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('username or password is incorrect');
    }
  }
);

export const signupHandler = createAsyncThunk(
  'authentication/signupHandler',
  async ({ email, password, firstName, lastName }, thunkAPI) => {
    try {
      const response = await signUpService({
        email,
        password,
        firstName,
        lastName,
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('Email already exist');
    }
  }
);

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logoutHandler: (state) => {
      localStorage.removeItem('loginItems');
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: {
    [loginHandler.pending]: (state) => {
      state.isLoading = true;
    },
    [loginHandler.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.foundUser;
      state.token = action.payload.encodedToken;
      localStorage.setItem(
        'loginItems',
        JSON.stringify({
          token: action.payload.encodedToken,
          user: action.payload.foundUser,
        })
      );
    },
    [loginHandler.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action);
    },
    [signupHandler.pending]: (state) => {
      state.isLoading = true;
    },
    [signupHandler.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.createdUser;
      state.token = action.payload.encodedToken;
      localStorage.setItem(
        'loginItems',
        JSON.stringify({
          token: action.payload.encodedToken,
          user: action.payload.createdUser,
        })
      );
    },
    [signupHandler.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action);
    },
  },
});

export const { logoutHandler } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
