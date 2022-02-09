import {
  Box, Button, Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import Footer from '../../components/footer/Footer';
import styles from './MainPage.module.css';
import commonStyles from '../../components/common.module.css';
import img from '../../assets/bg.jpeg';
import ThemeSwitcherComponent from '../../components/themeSwitcher/themeSwitcher';
import Loader from '../../components/loader/Loader';
import Toolbar from '../../components/toolbar';

const MainPage = () => {
  const [isLoading, setLoading] = useState(true);

  const history = useHistory();

  const onLinkClickGame = () => {
    history.push('/game');
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    isLoading
      ? <Loader />
      : (
        <Box className={classNames(commonStyles.page, styles['main-page'])}>
          <Toolbar />
          <Box className={styles['main-container']}>
            <ThemeSwitcherComponent />
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
