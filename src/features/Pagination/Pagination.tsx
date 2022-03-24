import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectActiveUserId } from '../Users/store/selectors';
import { selectPage, selectStatus } from '../Posts/store/selectors';
import { IPostsRequest } from '../Posts/Posts.types';
import { fetchPosts } from 'services/posts';
import { selectToken } from 'pages/Login/store/selectors';
import styles from './Pagination.module.css';

export function Pagination() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const activeUserId = useAppSelector(selectActiveUserId);
  const page = useAppSelector(selectPage);
  const status = useAppSelector(selectStatus);
  const token = useAppSelector(selectToken);

  const onPageChangeCallback = useCallback((forward: boolean) => {
    const nextPage = forward ? page + 1 : page - 1
    const data: IPostsRequest = {
      sl_token: token,
      page: nextPage,
    }

    dispatch(fetchPosts(data));

    navigate(`?page=${nextPage}&user=${activeUserId}`)
  }, [dispatch, token, page, navigate, activeUserId])

  return (
    <div className={styles.root}>
      {status === 'loading' ? (
        <div className={styles.spinner}>&#11118;</div>
      ) : (
        <>
          <div
            onClick={() => onPageChangeCallback(false)}
            className={`${styles.arrow} ${page === 1 ? styles.disabled : ''}`}
          >
            &#10094;
          </div>
          <div className={styles.page}>{page}</div>
          <div
            onClick={() => onPageChangeCallback(true)}
            className={`${styles.arrow} ${page === 10 ? styles.disabled : ''}`}
          >
            &#10095;
          </div>
        </>
      )}
    </div>
  );
}
