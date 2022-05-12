import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addPostService,
  deletePostService,
  editPostService,
  getAllPostsService,
} from '../../Services/postServices';

export const getAllPosts = createAsyncThunk(
  'posts/getAllPosts',
  async (_, thunkAPI) => {
    try {
      const response = await getAllPostsService();
      return response.data.posts;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async ({ postData, authToken }, thunkAPI) => {
    try {
      console.log(postData, authToken, 'inside add post');
      const response = await addPostService(postData, authToken);
      return response.data.posts;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ postData, authToken }, thunkAPI) => {
    try {
      const response = await editPostService(postData, authToken);
      return response.data.posts;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async ({ postId, authToken }, thunkAPI) => {
    try {
      const response = await deletePostService(postId, authToken);
      return response.data.posts;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  allPosts: [],
  userPosts: [],
  isLoading: false,
};
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    },

    [addPost.pending]: (state) => {
      state.isLoading = true;
      console.log('pemding');
    },
    [addPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
      console.log('ful', action.payload);
    },
    [addPost.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    },

    [editPost.pending]: (state) => {
      state.isLoading = true;
    },
    [editPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
    },
    [editPost.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    },

    [deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
    },
    [deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    },
  },
});

export const postReducer = postsSlice.reducer;
