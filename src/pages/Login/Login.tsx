import React, { useCallback, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { CLIENT_ID, Status } from 'app/constants';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { register } from 'services/auth';
import { selectStatus } from './store/selectors';
import { setUsername, setStatus } from './store/slice';
import { ILogin } from './Login.types';
import styles from './Login.module.css';

function Login() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmitCallback = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(setStatus(Status.IDLE));

    const currentTarget = event.currentTarget;
    const username = currentTarget.username.value;
    const data: ILogin = {
      client_id: CLIENT_ID,
      name: username,
      email: currentTarget.email.value,
    }

    dispatch(register(data)).unwrap().then((response) => {
      if (!response.error) {
        dispatch(setUsername(username))
        // @ts-ignore: Unknown state error
        navigate(location.state?.from, { replace: true })
      }
    });
  }, [dispatch, navigate, location])

  return (
    <form
      onSubmit={onSubmitCallback}
      className={styles.root}
    >
      <p className={styles.title}>Login</p>
      <label
        htmlFor="username"
        className={styles.usernameLabel}
      >
        Name
      </label>
      <input
        id="username"
        name="username"
        type="text"
        className={styles.usernameInput}
      />
      <label
        htmlFor="email"
        className={styles.emailLabel}
      >
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        className={styles.emailInput}
      />
      <div className={styles.footer}>
        {status === 'failed' && (
          <span className={styles.error}>Error</span>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          className={styles.submitButton}
        >
          Go
        </button>
      </div>
    </form>
  );
}

export default Login;
