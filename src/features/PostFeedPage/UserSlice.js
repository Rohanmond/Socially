import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUsersService } from '../../Services/userServices';
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
  },
});

export const usersReducer = usersSlice.reducer;
