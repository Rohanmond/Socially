import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allPosts: [],
  userPosts: [],
  isLoading: false,
};
const postsSlice = createSlice({
  name: 'posts',
});
