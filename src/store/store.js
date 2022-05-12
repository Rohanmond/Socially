import { configureStore } from '@reduxjs/toolkit';
import { authenticationReducer } from '../features/Authentication';

import { postReducer } from '../features/PostFeedPage/PostsSlice';
import { toggleEditPostModalReducer } from '../features/PostFeedPage/toggleEditPostModalSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    posts: postReducer,
    toggleEditPostModal: toggleEditPostModalReducer,
  },
});
