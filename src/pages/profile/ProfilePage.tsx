/* eslint-disable no-console */
import {
  Box
} from '@mui/material';
import classNames from 'classnames';
import React from 'react';
import Footer from '../../components/footer/Footer';
import styles from './ProfilePage.module.css';

const ProfilePage = () => (
  <div className={styles['profile-page']}>
    <div className={styles['profile-container']}>
      <Box className={classNames(styles['profile-box'], styles['profile-avatar'])}>
        raz
      </Box>
      <Box className={classNames(styles['profile-box'], styles['profile-settings'])}>
        dva
      </Box>
      <Box className={classNames(styles['profile-box'], styles['profile-scores'])}>
        hui
      </Box>
    </div>
    <Footer />
  </div>
);

export default ProfilePage;
