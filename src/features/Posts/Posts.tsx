import React, {
  useCallback,
  useMemo,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';

import { useAppSelector } from '../../app/hooks';
import { Post } from 'components';
import { selectUserPosts } from './store/selectors';
import { IPost } from './Posts.types';
import {  selectUserName } from 'pages/Login/store/selectors';
import styles from './Posts.module.css';

export function Posts() {
  const userPosts = useAppSelector(selectUserPosts);
  const userName = useAppSelector(selectUserName);
  const [visiblePosts, setVisiblePosts] = useState<typeof userPosts>(userPosts);
  const [searchValue, setSearchValue] = useState<string>('');
  const [sortByRecent, setSortByRecent] = useState<boolean>(true);

  const sortPosts = useCallback((posts: IPost[]) => {
    const copiedPosts = [...posts];

    if (sortByRecent) {
      copiedPosts.sort((a, b) => new Date(b.created_time).getTime() - new Date(a.created_time).getTime());
    } else {
      copiedPosts.sort((a, b) => new Date(a.created_time).getTime() - new Date(b.created_time).getTime());
    }

    return copiedPosts;
  }, [sortByRecent])

  const filteredPosts = useMemo(() => {
    const posts = [...userPosts];
    const filteredPosts = posts.filter((post) => post.message.includes(searchValue))

    return filteredPosts;
  }, [userPosts, searchValue])

  const onClickCallback = useCallback((sortByRecent: boolean) => {
    const posts = [...visiblePosts];

    setVisiblePosts(sortPosts(posts));
    setSortByRecent(sortByRecent);
  }, [visiblePosts, setVisiblePosts, sortPosts])

  const onChangeCallback = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const posts = [...userPosts];
    const filteredPosts = posts.filter((post) => post.message.includes(value));

    setSearchValue(value);
    setVisiblePosts(filteredPosts);
  }, [setSearchValue, setVisiblePosts, userPosts])

  useEffect(() => {
    if (userPosts) {
      const posts = searchValue ? filteredPosts : userPosts;

      setVisiblePosts(sortPosts(posts));
    }
  }, [userPosts, setVisiblePosts, searchValue, filteredPosts, sortPosts])

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div
          className={styles.arrow}
          title="Most recent first"
          onClick={() => onClickCallback(true)}
        >
          &#5169;
        </div>
        <div
          className={styles.arrow}
          title="Most recent last"
          onClick={() => onClickCallback(false)}
        >
          &#5167;
        </div>
        <input
          type="text"
          placeholder="Search posts"
          value={searchValue}
          className={styles.postSearch}
          onChange={onChangeCallback}
        />
        <div className={styles.username}>{userName}</div>
      </div>
      <div className={styles.postList}>
        {visiblePosts?.map((post) => (
          <Post
            key={post.id}
            text={post.message}
            date={post.created_time}
            searchValue={searchValue}
          />
        ))}
      </div>
    </div>
  );
}
