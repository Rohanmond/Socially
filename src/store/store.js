import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from '../components/Nav/ThemeSlice';
import { authenticationReducer } from '../features/Authentication';

import { postReducer } from '../features/PostFeedPage/PostsSlice';
import { toggleEditPostModalReducer } from '../features/PostFeedPage/toggleEditPostModalSlice';
import { usersReducer } from '../features/PostFeedPage/UserSlice';
import { postIndividualReducer } from '../features/PostIndividualPage/PostIndividualSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    posts: postReducer,
    toggleEditPostModal: toggleEditPostModalReducer,
    users: usersReducer,
    postIndividual: postIndividualReducer,
    theme: themeReducer,
  },
});
