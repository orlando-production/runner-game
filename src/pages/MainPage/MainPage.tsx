/* eslint-disable no-console */
import {
  Box, Button, Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from '@iconify/react';
import classNames from 'classnames';
import Footer from '../../components/footer/Footer';
import styles from './MainPage.module.css';
import commonStyles from '../../components/common.module.css';
import img from '../../assets/bg.jpeg';
import ThemeSwitcherComponent from '../../components/themeSwitcher/themeSwitcher';
import Loader from '../../components/loader/Loader';

const MainPage = () => {
  const [isLoading, setLoading] = useState(true);

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

  const onLinkClickForum = () => {
    history.push('/forum');
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    isLoading
      ? <Loader />
      : (
        <Box className={classNames(commonStyles.page, styles['main-page'])}>
          <Box className={styles['main-container']}>
            <ThemeSwitcherComponent />
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
              <div className={styles['main-icon-wrap']}>
                <Icon
                  onClick={onLinkClickForum}
                  icon="mdi:forum-outline"
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
                Запасайся мандаринками и скорей иди помогать Санте!
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
      )
  );
};

export default MainPage;
