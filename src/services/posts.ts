import { createAsyncThunk } from '@reduxjs/toolkit';

import { setUsers } from '../features/Users/store/slice';
import { IUserList } from '../features/Users/Users.types';
import { IPostsRequest, IPostsResponse, IPostList, IAdaptedPosts } from '../features/Posts/Posts.types';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (data: IPostsRequest, { dispatch }) => {
    const response = await fetch(`https://api.supermetrics.com/assignment/posts?sl_token=${data.sl_token}&page=${data.page}`);
    const result = await response.json();
    const { posts, users, page } = adapter(result.data);

    dispatch(setUsers(users));

    return {
      posts,
      page,
    };
  }
);

function adapter(data: IPostsResponse): IAdaptedPosts {
  let users = {} as IUserList;
  let posts = {} as IPostList;

  data.posts.forEach((element) => {
    const postId = element.id;
    const userId = element.from_id;
    const user = {
      id: userId,
      name: element.from_name,
      posts: [postId],
    }
    const post = {
      id: postId,
      created_time: element.created_time,
      from_id: userId,
      message: element.message,
    }

    if (users[userId]) {
      users[userId].posts = users[userId].posts.concat(user.posts);
    } else {
      users[userId] = user;
    }

    posts[postId] = post;
  })

  return {
    posts,
    users,
    page: data.page,
  };
}
