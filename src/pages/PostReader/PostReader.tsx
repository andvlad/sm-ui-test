import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';

import { Users, Posts } from 'features';
import { IPostsRequest } from 'features/Posts/Posts.types';
import { fetchPosts } from 'services/posts';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectToken } from '../Login/store/selectors';
import styles from './PostReader.module.css';

function PostReader() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const data: IPostsRequest = {
      sl_token: token,
      page: params.get('page') || 1,
    }

    dispatch(fetchPosts(data));
  }, [dispatch, token, location])

  return (
    <div className={styles.root}>
      <Users />
      <Posts />
    </div>
  );
}

export default PostReader;
