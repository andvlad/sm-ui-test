import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { IPost } from '../Posts.types';
import { fetchPosts } from 'services/posts';

export const postsAdapter = createEntityAdapter<IPost>({
  sortComparer: (a, b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime(),
})

export const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState({
    page: 0,
    status: '',
  }),
  reducers: {
    setPosts: postsAdapter.setMany,
    setPage: (state, { payload }) => {
      state.page = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.status = 'idle';

        postsAdapter.setMany(state, payload.posts);

        state.page = payload.page;
      });
  },
});

export const { setPosts, setPage } = postsSlice.actions;

export default postsSlice.reducer;
