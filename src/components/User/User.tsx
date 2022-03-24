import React from 'react';

import { IUser } from './User.types';
import styles from './User.module.css';

export function User({
  name,
  postsCount,
  onClick,
  active,
}: IUser) {
  return (
    <div
      onClick={onClick}
      className={`${styles.root} ${active ? styles.active : ''}`}
    >
      <div
        title={name}
        className={styles.name}
      >
        {name}
      </div>
      <div className={styles.postsCount}>
        {postsCount}
      </div>
    </div>
  );
}
