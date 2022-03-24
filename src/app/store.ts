import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../pages/Login/store/slice';
import postsReducer from '../features/Posts/store/slice';
import usersReducer from '../features/Users/store/slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
