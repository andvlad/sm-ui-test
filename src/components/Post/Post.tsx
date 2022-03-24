import React from 'react';

import { IPost } from './Post.types';
import styles from './Post.module.css';

export function Post({
  text,
  date,
  searchValue,
}: IPost) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const formatDate = new Date(date).toLocaleString(undefined, options);
  const message = searchValue
    ? text.replace(new RegExp(searchValue, 'g'),(match) => `<span class=${styles.highlighted}>${match}</span>`)
    : text;

  return (
    <div className={styles.root}>
      <div className={styles.date}>
        {formatDate}
      </div>
      {searchValue ? (
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      ) : (
        <div className={styles.text}>
          {message}
        </div>
      )}
    </div>
  );
}
