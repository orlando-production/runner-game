import React from 'react';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.loader}>
    <div className={styles['loader-container']}>
      <div className={styles['loader-dot']} />
      <div className={styles['loader-dot']} />
      <div className={styles['loader-dot']} />
      <div className={styles['loader-dot']} />
      <div className={styles['loader-dot']} />
    </div>
  </div>
);

export default Loader;
