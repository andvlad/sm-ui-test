import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { selectActiveUser } from '../../Users/store/selectors';
import { RootState } from 'app/store';
import { postsAdapter } from './slice';

const { selectAll, selectById } = postsAdapter.getSelectors((state: RootState) => state.posts);

const selectPage = (state: RootState) => state.posts.page;

const selectStatus = (state: RootState) => state.posts.status;

const selectUserPosts = createDraftSafeSelector(
  selectAll,
  selectActiveUser,
  (posts, activeUser) => posts.filter(({ id }) => activeUser?.posts.includes(id))
)

export { selectAll as selectPosts, selectPage, selectStatus, selectUserPosts };
