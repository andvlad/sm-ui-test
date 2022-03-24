import { RootState } from 'app/store';
import { usersAdapter } from './slice';

const { selectAll, selectById } = usersAdapter.getSelectors((state: RootState) => state.users);

const selectActiveUserId = (state: RootState) => state.users.activeUserId;

const selectActiveUser = (state: RootState) => selectById(state, state.users.activeUserId);

export { selectAll as selectUsers, selectActiveUserId, selectActiveUser };
