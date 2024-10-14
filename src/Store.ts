// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import communitiesReducer from './reducers/CommunitiesReducer';

const store = configureStore({
  reducer: {
    communities: communitiesReducer,
    // posts: postsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
