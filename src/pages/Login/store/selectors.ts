import { RootState } from 'app/store';

export const selectToken = (state: RootState) => state.auth.sl_token;

export const selectStatus = (state: RootState) => state.auth.status;

export const selectUserName = (state: RootState) => state.auth.name;
