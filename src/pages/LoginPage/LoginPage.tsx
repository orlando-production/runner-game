/* eslint-disable no-console */
import {
  Box, Button, TextField, Typography
} from '@mui/material';
import React, { useState } from 'react';
import type { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import Footer from '../../components/footer/Footer';
import { requestPostData } from '../../services/RequestData';
import styles from './LoginPage.module.css';

type LoginProps = {
  title?: string;
}

const LoginPage = ({ title = 'Sign In' }: LoginProps) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isError, setWarning] = useState<boolean>(false);

  const history = useHistory();

  const handleError = useErrorHandler();

  const resources = {
    login: 'Login',
    password: 'Password',
    signIn: title,
    signUp: "Don't have an account? Sign Up",
    warning: 'Login or password is incorrect'
  };

  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
    setWarning(false);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setWarning(false);
  };

  const goToGame = () => {
    // TODO
    // Add routing
    console.log('goToGame');
  };

  const showWarnings = (reason: AxiosError) => {
    const { status } = reason?.response || {};
    if (status === 400 || status === 401) {
      setWarning(true);
    } else {
      handleError(reason);
    }
  };

  const fetchData = () => {
    requestPostData('auth/signin', ({ login, password }))
      .then(goToGame)
      .catch(showWarnings);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData();
  };

  const onLinkClick = () => {
    history.push('/sign-up');
  };

  return (
    <div className={styles['login-page']}>
      <div className={styles['login-container']}>
        <Box
          className={styles['login-content']}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h5" mt={5}>{resources.signIn}</Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className={styles['login-form']}>
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
            />
            <div className={isError ? styles['warning-message'] : styles['invisible-message']}>{resources.warning}</div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 2 }}
            >
              {resources.signIn}
            </Button>
            <Button type="button" variant="text" className={styles['login-sign-up-link']} onClick={onLinkClick}>
              {resources.signUp}
            </Button>
          </Box>
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
