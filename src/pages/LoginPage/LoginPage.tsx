/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import {
  Box, Button, TextField, Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSignIn } from '../../thunks/authentication';
import Footer from '../../components/footer/Footer';
import commonStyles from '../../components/common.module.css';
import styles from './LoginPage.module.css';
import { getAuthError } from '../../selectors/authentication';
import yandexImg from '../../assets/yandex.png';
import { getServiceId } from '../../services/Auth';
import ThemeSwitcherComponent from '../../components/themeSwitcher/themeSwitcher';
import Loader from '../../components/loader/Loader';

type LoginProps = {
  title?: string;
};

const LoginPage = ({ title = 'Sign In' }: LoginProps) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setLoading] = useState(true);

  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector(getAuthError);

  const resources = {
    login: 'Login',
    password: 'Password',
    signIn: title,
    signUp: "Don't have an account? Sign Up",
    warning: 'Login or password is incorrect'
  };

  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const alternAuthHandler = () => {
    const redirectUri = window.origin;
    getServiceId(redirectUri).then((response) => {
      // eslint-disable-next-line no-restricted-globals
      location.href = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${response}&redirect_uri=${redirectUri}`;
    });
  };

  const goToGame = () => {
    history.push('/game');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      fetchSignIn({
        login,
        password,
        navigate: goToGame
      })
    );
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    isLoading
      ? <Loader />
      : (
        <div className={commonStyles.page}>
          <div className={commonStyles.container}>
            <ThemeSwitcherComponent />
            <Box
              className={classNames(commonStyles.box, styles['login-content'])}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography component="h1" variant="h5" mt={5}>
                {resources.signIn}
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
                className={styles['login-form']}
              >
                <TextField
                  onChange={handleLogin}
                  margin="normal"
                  required
                  fullWidth
                  id="login"
                  label={resources.login}
                  name="login"
                  autoComplete="login"
                  autoFocus
                  InputProps={{
                    classes: {
                      root: commonStyles.input
                    }
                  }}
                  InputLabelProps={{
                    classes: {
                      root: commonStyles.input
                    }
                  }}
                />
                <TextField
                  onChange={handlePassword}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={resources.password}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    classes: {
                      root: commonStyles.input
                    }
                  }}
                  InputLabelProps={{
                    classes: {
                      root: commonStyles.input
                    }
                  }}
                />
                <div
                  className={
                error
                  ? commonStyles['warning-message']
                  : commonStyles['invisible-message']
              }
                >
                  {resources.warning}
                </div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, mb: 2 }}
                >
                  {resources.signIn}
                </Button>
                <Button type="button" variant="text" component={Link} to="/sign-up">
                  {resources.signUp}
                </Button>
                <button
                  type="button"
                  className={styles['login-altern-auth-button']}
                  onClick={alternAuthHandler}
                >
                  <img
                    src={yandexImg}
                    className={styles['login-altern-auth-icon']}
                    alt="yandex-auth"
                  />
                </button>
              </Box>
            </Box>
          </div>
          <Footer />
        </div>
      )
  );
};

export default LoginPage;
