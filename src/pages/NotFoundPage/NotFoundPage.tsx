/* eslint-disable no-console */
import {
  Box, Typography
} from '@mui/material';
import React from 'react';
import Footer from '../../components/footer/Footer';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const resources = {
    title: 'Page not found'
  };

  return (
    <div className={styles['notfound-page']}>
      <div className={styles['notfound-container']}>
        <Box
          className={styles['notfound-content']}
        >
          <Typography
            component="h1"
            variant="h5"
            mb={5}
          >
            {resources.title}

          </Typography>
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
