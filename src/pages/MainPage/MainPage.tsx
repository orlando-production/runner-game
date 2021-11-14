/* eslint-disable no-console */
import {
  Box, Button, Typography
} from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from '@iconify/react';
import classNames from 'classnames';
import Footer from '../../components/footer/Footer';
import styles from './MainPage.module.css';
import commonStyles from '../../components/common.css';

import img from '../../assets/bg.jpeg';

const MainPage = () => {
  const history = useHistory();

  const onLinkClickProfile = () => {
    history.push('/profile');
  };

  const onLinkClickLeaderBoard = () => {
    history.push('/leaderboard');
  };

  const onLinkClickGame = () => {
    history.push('/game');
  };

  return (
    <Box className={classNames(commonStyles.page, styles['main-page'])}>
      <Box className={classNames(styles['main-container'])}>
        <Box className={classNames(commonStyles.box, styles['main-icons'])}>
          <div className={styles['main-icon-wrap']}>
            <Icon
              onClick={onLinkClickProfile}
              icon="mdi:clipboard-account-outline"
              height={24}
              color="rgb(var(--icon-color))"
            />
          </div>
          <div className={styles['main-icon-wrap']}>
            <Icon
              onClick={onLinkClickLeaderBoard}
              icon="mdi:clipboard-list-outline"
              height={24}
              color="rgb(var(--icon-color))"
            />
          </div>
        </Box>
        <Box className={classNames(commonStyles.box, styles['main-img'])} style={{ backgroundImage: `url(${img})` }} />
        <Box className={classNames(commonStyles.box, styles['main-text'])}>
          <Typography
            variant="body1"
            mb={3}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
          <Button
            onClick={onLinkClickGame}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Играть
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default MainPage;
