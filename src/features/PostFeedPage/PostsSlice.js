import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  addPostService,
  deletePostService,
  dislikePostService,
  editPostService,
  getAllPostsService,
  likePostService,
} from '../../Services/postServices';
import { ToastHandler, ToastType } from '../../utils/toastUtils';

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

export const likePost = createAsyncThunk(
  'post/likePost',
  async ({ postId, authToken }, thunkAPI) => {
    try {
      const response = await likePostService(postId, authToken);
      return response.data.posts;
    } catch (err) {
      thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const dislikePost = createAsyncThunk(
  'post/dislikePost',
  async ({ postId, authToken }, thunkAPI) => {
    try {
      const response = await dislikePostService(postId, authToken);
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
      ToastHandler(ToastType.Error, action.payload);
    },

    [addPost.pending]: (state) => {
      state.isLoading = true;
    },
    [addPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
      ToastHandler(ToastType.Success, 'Post created successfully');
    },
    [addPost.rejected]: (state, action) => {
      state.isLoading = false;
      ToastHandler(ToastType.Error, action.payload);
    },

    [editPost.pending]: (state) => {
      state.isLoading = true;
    },
    [editPost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
      ToastHandler(ToastType.Success, 'Post updated successfully');
    },
    [editPost.rejected]: (state, action) => {
      state.isLoading = false;
      ToastHandler(ToastType.Error, action.payload);
    },

    [deletePost.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
      ToastHandler(ToastType.Success, 'Post deleted successfully');
    },
    [deletePost.rejected]: (state, action) => {
      state.isLoading = false;
      ToastHandler(ToastType.Error, action.payload);
    },
    [likePost.pending]: (state) => {},
    [likePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
    },
    [likePost.rejected]: (state, action) => {
      state.isLoading = false;
      ToastHandler(ToastType.Error, action.payload);
    },
    [dislikePost.pending]: (state) => {},
    [dislikePost.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.allPosts = action.payload;
      console.log(action);
    },
    [dislikePost.rejected]: (state, action) => {
      state.isLoading = false;
      ToastHandler(ToastType.Error, action.payload);
    },
  },
});

export const postReducer = postsSlice.reducer;
