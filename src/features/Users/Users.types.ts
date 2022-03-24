import { EntityState } from '@reduxjs/toolkit';

export interface IUser {
  id: string;
  name: string;
  posts: string[];
}

export interface IUserList {
  [key: string]: IUser;
}

export type IUserState = EntityState<IUser> & { activeUserId: string; };
