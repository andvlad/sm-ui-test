import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { IUser } from '../Users.types';

export const usersAdapter = createEntityAdapter<IUser>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    activeUserId: '',
  }),
  reducers: {
    setUsers: usersAdapter.setMany,
    setActiveUser: (state, { payload }) => {
      state.activeUserId = payload;
    },
  },
});

export const { setUsers, setActiveUser } = usersSlice.actions;

export default usersSlice.reducer;
