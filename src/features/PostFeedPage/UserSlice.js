import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  followUserService,
  getAllUsersService,
  unFollowUserService,
} from '../../Services/userServices';
import { ToastHandler, ToastType } from '../../utils/toastUtils';

const initialState = {
  allUsers: [],
  isLoading: false,
};

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_, thunkAPI) => {
    try {
      const response = await getAllUsersService();
      return response.data.users;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const followUser = createAsyncThunk(
  'users/followUser',
  async ({ followUserId, token, dispatch, userUpdateHandler }, thunkAPI) => {
    try {
      console.log(followUserId, token, dispatch, userUpdateHandler);
      const response = await followUserService(followUserId, token);
      dispatch(userUpdateHandler({ userData: response.data.user, token }));
      return response.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const unFollowUser = createAsyncThunk(
  'users/unFollowUser',
  async ({ followUserId, token, dispatch, userUpdateHandler }, thunkAPI) => {
    try {
      const response = await unFollowUserService(followUserId, token);
      dispatch(userUpdateHandler({ userData: response.data.user, token }));
      return response.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.isLoading = false;
      ToastHandler(ToastType.Error, action.payload);
    },

    [followUser.pending]: (state) => {
      state.isLoading = true;
    },
    [followUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.allUsers = action.payload.allUsers;
    },
    [followUser.rejected]: (state, action) => {
      state.isLoading = false;
      ToastHandler(ToastType.Error, action.payload);
    },

    [unFollowUser.pending]: (state) => {
      state.isLoading = true;
    },
    [unFollowUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.allUsers = action.payload.allUsers;
    },
    [unFollowUser.rejected]: (state, action) => {
      state.isLoading = false;
      ToastHandler(ToastType.Error, action.payload);
    },
  },
});

export const usersReducer = usersSlice.reducer;
