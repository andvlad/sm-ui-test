import { IUser } from '../Users/Users.types';
import { EntityState } from "@reduxjs/toolkit";

export interface IPost {
  created_time: string;
  from_id: string;
  id: string;
  message: string;
}

export interface IPostResponse extends IPost {
  from_name: string;
  type: string;
}

export interface IPostList {
  [key: string]: IPost;
}

export interface IPostsRequest {
  sl_token: string;
  page: string | number;
}

export interface IPostsResponse {
  posts: IPostResponse[];
  page: number;
}

export interface IAdaptedPosts {
  posts: Record<string, IPost>;
  users: Record<string, IUser>;
  page: number;
}

export type IPostsState = EntityState<IPost> & {
  page: number,
  status: string,
};
