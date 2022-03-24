import postsReducer, { setPosts, setPage } from './slice';
import { IPostsState } from '../Posts.types';

describe('users reducer', () => {
  const initialState: IPostsState = {
    entities: {
      post2: {
        id: 'post2',
        from_id: 'sefsfk59688getg345yh453',
        created_time: '2022-03-26T16:58:34+00:00',
        message: 'Hello',
      },
    },
    ids: ['post2'],
    page: 1,
    status: 'idle',
  };

  it('should handle initial state', () => {
    expect(postsReducer(initialState, { type: 'unknown' })).toEqual({
      entities: {
        post2: {
          id: 'post2',
          from_id: 'sefsfk59688getg345yh453',
          created_time: '2022-03-26T16:58:34+00:00',
          message: 'Hello',
        },
      },
      ids: ['post2'],
      page: 1,
      status: 'idle',
    });
  });

  it('should set post', () => {
    const actual = postsReducer(initialState, setPosts({
      post4: {
        id: 'post4',
        from_id: 'llookf98477wshgh5eh66rf',
        created_time: '2022-03-24T07:39:39+00:00',
        message: 'Bye',
      },
    }));

    expect(actual.entities).toEqual({
      post2: {
        id: 'post2',
        from_id: 'sefsfk59688getg345yh453',
        created_time: '2022-03-26T16:58:34+00:00',
        message: 'Hello',
      },
      post4: {
        id: 'post4',
        from_id: 'llookf98477wshgh5eh66rf',
        created_time: '2022-03-24T07:39:39+00:00',
        message: 'Bye',
      },
    });
  });

  it('should set page', () => {
    const actual = postsReducer(initialState, setPage(2));

    expect(actual.page).toEqual(2);
  });
});
