import {configureStore} from '@reduxjs/toolkit';
import AppReducer from './slices/app.slice';
import UserReducer from './slices/user.slice';

export const store = configureStore({
  reducer: {
    appSlice: AppReducer,
    userSlice: UserReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
