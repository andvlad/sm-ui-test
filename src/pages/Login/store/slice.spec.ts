import { CLIENT_ID, Status } from 'app/constants';
import authReducer, { setUsername, setStatus } from './slice';
import { ILoginState } from '../Login.types';

describe('counter reducer', () => {
  const initialState: ILoginState = {
    sl_token: '8743b52063cd84097a65d1633f5c74f5',
    client_id: CLIENT_ID,
    name: 'John',
    email: 'test@test.com',
    status: 'idle',
  };

  it('should handle initial state', () => {
    expect(authReducer(initialState, { type: 'unknown' })).toEqual({
      sl_token: '8743b52063cd84097a65d1633f5c74f5',
      client_id: CLIENT_ID,
      name: 'John',
      email: 'test@test.com',
      status: 'idle',
    });
  });

  it('should set username', () => {
    const actual = authReducer(initialState, setUsername('Mark'));

    expect(actual.name).toEqual('Mark');
  });

  it('should set status', () => {
    const actual = authReducer(initialState, setStatus(Status.LOADING));

    expect(actual.status).toEqual(Status.LOADING);
  });
});
