import {
  Box, Typography
} from '@mui/material';
import React from 'react';
import classNames from 'classnames';
import Footer from '../../components/footer/Footer';
import styles from './NotFoundPage.module.css';
import commonStyles from '../../components/common.module.css';
import ThemeSwitcherComponent from '../../components/themeSwitcher/themeSwitcher';

const NotFoundPage = () => {
  const resources = {
    title: 'Page not found'
  };

  return (
    <div className={commonStyles.page}>
      <div className={classNames(styles['notfound-container'], commonStyles.content)}>
        <ThemeSwitcherComponent />
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
