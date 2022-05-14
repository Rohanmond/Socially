import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostByIdService } from '../../Services/postServices';
import { ToastHandler, ToastType } from '../../utils/toastUtils';

export const getPostById = createAsyncThunk(
  'post/getPostById',
  async ({ postId }, thunkAPI) => {
    try {
      const response = await getPostByIdService(postId);
      return response.data;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  post: {},
  isLoading: false,
};

const postIndividualSlice = createSlice({
  name: 'postIndividual',
  initialState,
  reducers: {},
  extraReducers: {
    [getPostById.pending]: (state) => {
      state.isLoading = true;
    },
    [getPostById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload?.post;
    },
    [getPostById.rejected]: (state, action) => {
      state.isLoading = false;
      ToastHandler(ToastType.Error, action.payload);
    },
  },
});

export const postIndividualReducer = postIndividualSlice.reducer;
