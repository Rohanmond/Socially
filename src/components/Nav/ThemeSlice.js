import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    darkThemeHandler: (state) => {
      localStorage.setItem('theme', 'dark');
      state.theme = 'dark';
    },
    lightThemeHandler: (state) => {
      localStorage.setItem('theme', 'light');
      state.theme = 'light';
    },
  },
});

export const { darkThemeHandler, lightThemeHandler } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
