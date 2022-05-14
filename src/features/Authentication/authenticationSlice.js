import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  loginService,
  signUpService,
  userUpdateService,
} from '../../Services/authServices';
import {
  postBookmarkService,
  removeBookmarkService,
} from '../../Services/userServices';

import { ToastHandler, ToastType } from '../../utils/toastUtils';

const initialState = {
  token: JSON.parse(localStorage.getItem('loginItems'))?.token,
  user: JSON.parse(localStorage.getItem('loginItems'))?.user,
  isLoading: false,
};

export const loginHandler = createAsyncThunk(
  'authentication/loginHandler',
  async ({ username, password }, thunkAPI) => {
    try {
      const response = await loginService({ username, password });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('username or password is incorrect');
    }
  }
);

export const signupHandler = createAsyncThunk(
  'authentication/signupHandler',
  async ({ username, password, firstName, lastName }, thunkAPI) => {
    try {
      const response = await signUpService({
        username,
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

export const userUpdateHandler = createAsyncThunk(
  'authentication/userUpdateHandler',
  async ({ userData, token }, thunkAPI) => {
    try {
      const response = await userUpdateService({
        userData,
        encodedToken: token,
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        'There is some error while updating user',
        err
      );
    }
  }
);

export const postBookmark = createAsyncThunk(
  'authentication/postBookmark',
  async ({ postId, token }, thunkAPI) => {
    try {
      const response = await postBookmarkService(postId, token);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const removeBookmark = createAsyncThunk(
  'authentication/removeBookmark',
  async ({ postId, token }, thunkAPI) => {
    try {
      const response = await removeBookmarkService(postId, token);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
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
      ToastHandler(ToastType.Error, action.payload);
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
      ToastHandler(ToastType.Error, action.payload);
    },
    [userUpdateHandler.pending]: (state) => {
      state.isLoading = true;
    },
    [userUpdateHandler.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      localStorage.setItem(
        'loginItems',
        JSON.stringify({ token: state.token, user: action.payload.user })
      );
    },
    [userUpdateHandler.rejected]: (state, action) => {
      state.isLoading = false;
      ToastHandler(ToastType.Error, action.payload);
    },
    [postBookmark.pending]: (state) => {},
    [postBookmark.fulfilled]: (state, action) => {
      state.isLoading = false;
      const newUser = { ...state.user, bookmarks: action.payload.bookmarks };
      state.user = newUser;
      localStorage.setItem(
        'loginItems',
        JSON.stringify({ token: state.token, user: newUser })
      );
      ToastHandler(ToastType.Success, 'Bookmark added successfully');
    },
    [postBookmark.rejected]: (state, action) => {
      state.isLoading = false;
      ToastHandler(ToastType.Error, action.payload);
    },
    [removeBookmark.pending]: (state) => {},
    [removeBookmark.fulfilled]: (state, action) => {
      state.isLoading = false;
      const newUser = { ...state.user, bookmarks: action.payload.bookmarks };
      state.user = newUser;
      localStorage.setItem(
        'loginItems',
        JSON.stringify({ token: state.token, user: newUser })
      );
      ToastHandler(ToastType.Success, 'Removed successfully');
    },
    [removeBookmark.rejected]: (state, action) => {
      state.isLoading = false;
      ToastHandler(ToastType.Error, action.payload);
    },
  },
});

export const { logoutHandler } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
