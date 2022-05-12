import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openModal: false,
  postData: null,
};

const toggleEditPostModalSlice = createSlice({
  name: 'openEditPostModal',
  initialState,
  reducers: {
    openEditPostHandler: (state, action) => {
      state.postData = action.payload.postData;
      state.openModal = true;
    },
    closeEditPostHandler: (state) => {
      state.openModal = false;
      state.postData = null;
    },
  },
});
export const { openEditPostHandler, closeEditPostHandler } =
  toggleEditPostModalSlice.actions;
export const toggleEditPostModalReducer = toggleEditPostModalSlice.reducer;
