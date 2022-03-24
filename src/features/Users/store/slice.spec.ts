import usersReducer, { setUsers, setActiveUser } from './slice';
import { IUserState } from '../Users.types';

describe('users reducer', () => {
  const initialState: IUserState = {
    entities: {
      sefsfk59688getg345yh453: {
        id: 'sefsfk59688getg345yh453',
        name: 'John',
        posts: ['post2', 'post3']
      }
    },
    ids: ['sefsfk59688getg345yh453'],
    activeUserId: 'sefsfk59688getg345yh453',
  };

  it('should handle initial state', () => {
    expect(usersReducer(initialState, { type: 'unknown' })).toEqual({
      entities: {
        sefsfk59688getg345yh453: {
          id: 'sefsfk59688getg345yh453',
          name: 'John',
          posts: ['post2', 'post3']
        }
      },
      ids: ['sefsfk59688getg345yh453'],
      activeUserId: 'sefsfk59688getg345yh453',
    });
  });

  it('should set username', () => {
    const actual = usersReducer(initialState, setUsers({
      llookf98477wshgh5eh66rf: {
        id: 'llookf98477wshgh5eh66rf',
        name: 'Mark',
        posts: ['post4', 'post5']
      }
    }));

    expect(actual.entities).toEqual({
      sefsfk59688getg345yh453: {
        id: 'sefsfk59688getg345yh453',
        name: 'John',
        posts: ['post2', 'post3']
      },
      llookf98477wshgh5eh66rf: {
        id: 'llookf98477wshgh5eh66rf',
        name: 'Mark',
        posts: ['post4', 'post5']
      },
    });
  });

  it('should set active user', () => {
    const actual = usersReducer(initialState, setActiveUser('llookf98477wshgh5eh66rf'));

    expect(actual.activeUserId).toEqual('llookf98477wshgh5eh66rf');
  });
});
