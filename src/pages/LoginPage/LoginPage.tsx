/* eslint-disable no-console */
import {
  Box, Button, TextField, Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import type { ErrorType } from 'api';
import Footer from 'components/footer/Footer';
import commonStyles from 'components/common.module.css';
import { fetchSignIn } from 'thunks/authentication';
import { getAuthError } from 'selectors/authentication';
import styles from './LoginPage.module.css';

type LoginProps = {
  title?: string;
};

const LoginPage = ({ title = 'Sign In' }: LoginProps) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const history = useHistory();
  const dispatch = useDispatch();

  const error = useSelector<ErrorType>(getAuthError);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchSignIn({ login, password }));
  };

  const onLinkClick = () => {
    history.push('/sign-up');
  };

  return (
    <div className={commonStyles.page}>
      <div className={commonStyles.container}>
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
            <Button
              type="button"
              variant="text"
              className={styles['login-sign-up-link']}
              onClick={onLinkClick}
            >
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
