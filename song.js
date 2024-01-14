import React from 'react';
import styles from './styles.module.scss';

const Song = ({ title, artist }) => {
  return (
    <div className={styles.song}>
      <h2>{title}</h2>
      <p>{artist}</p>
    </div>
  );
};

export default Song;
