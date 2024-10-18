// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import communityListReducer from './reducers/CommunityListSlice';
import communityReducer from './reducers/CommunitiesSlice';
import topicReducer from './reducers/TopicsSlice';
import postReducer from './reducers/PostsSlice'

const store = configureStore({
  reducer: {
    communityList: communityListReducer,
    communities: communityReducer,
    topics: topicReducer,
    posts: postReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;