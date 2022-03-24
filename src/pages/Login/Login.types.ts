export type IStatus = 'idle' | 'loading' | 'failed';

export interface ILogin {
  client_id: string;
  name: string;
  email: string;
}

export interface ILoginState {
  sl_token: string;
  client_id: string;
  name: string;
  email: string;
  status: IStatus;
}
