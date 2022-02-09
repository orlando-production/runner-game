import {
  Box, Button, Typography
} from '@mui/material';
import React from 'react';
import classNames from 'classnames';
import Footer from '../../components/footer/Footer';
import styles from './InternalErrorPage.module.css';
import commonStyles from '../../components/common.module.css';

type InternalErrorProps = {
  message?: string;
  reason?: string;
}

const InternalErrorPage = ({ message = 'Internal error', reason = 'Something went wrong' }: InternalErrorProps) => {
  const resources = {
    refresh: 'REFRESH'
  };

  return (
    <div className={commonStyles.page}>
      <div className={classNames(styles.content, styles['error-container'])}>
        <Box
          className={classNames(styles.box, styles['error-content'])}
        >
          <Typography
            component="h1"
            variant="h5"
            mb={5}
          >
            {message}

          </Typography>
          <Typography
            component="h1"
            variant="h5"
            mb={5}
          >
            {reason}

          </Typography>
          <Button type="button" variant="contained" className={styles['login-link']} onClick={() => window.location.reload()}>
            {resources.refresh}
          </Button>
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default InternalErrorPage;
