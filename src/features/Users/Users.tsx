import React, {
  useCallback,
  useMemo,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { User } from 'components';
import { selectUsers, selectActiveUserId } from './store/selectors';
import { selectPage } from '../Posts/store/selectors';
import { setActiveUser } from './store/slice';
import { Pagination } from '../Pagination';
import styles from './Users.module.css';

export function Users() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const activeUserId = useAppSelector(selectActiveUserId);
  const page = useAppSelector(selectPage);
  const [searchValue, setSearchValue] = useState<string>('');
  const [visibleUsers, setVisibleUsers] = useState<typeof users>(users);

  const filteredUsers = useMemo(() => {
    const copiedUsers = [ ...users ];
    const filteredUsers = copiedUsers.filter((user) => user.name.toLowerCase().includes(searchValue.toLowerCase()))

    return filteredUsers;
  }, [users, searchValue])

  const onSearchCallback = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    setSearchValue(value)
  }, [users, setVisibleUsers])

  const onClickCallback = useCallback((userId) => {
    dispatch(setActiveUser(userId))

    navigate(`?page=${page}&user=${userId}`)
  }, [dispatch, setActiveUser, page])

  useEffect(() => {
    if (users) {
      setVisibleUsers(searchValue ? filteredUsers : users)
    }
  }, [users, setVisibleUsers, searchValue, filteredUsers])

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const userParameter = params.get('user');

    if (!activeUserId && (userParameter || users[0])) {
      dispatch(setActiveUser(userParameter || users[0].id))
    }
  }, [activeUserId, dispatch, setActiveUser, users])

  return (
    <div className={styles.root}>
      <input
        type="text"
        placeholder="Search user"
        value={searchValue}
        onChange={onSearchCallback}
        className={styles.userSearch}
      />
      <div className={styles.userList}>
        {visibleUsers.map((user) => (
          <User
            key={user.id}
            name={user.name}
            postsCount={user.posts.length}
            active={user.id === activeUserId}
            onClick={() => onClickCallback(user.id)}
          />
        ))}
      </div>
      <Pagination />
    </div>
  );
}
