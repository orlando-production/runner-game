/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box, Button, TextField, Typography
} from '@mui/material';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import commonStyles from '../../components/common.module.css';
import Footer from '../../components/footer/Footer';
import styles from './SignUpPage.module.css';
import { isAllFieldsValid } from './checkValidation';
import { fetchSignUp } from '../../thunks/registration';
import { getRegistrationError } from '../../selectors/registration';
import ThemeSwitcherComponent from '../../components/themeSwitcher/themeSwitcher';

type SignUpProps = {
  title?: string;
};

const SignUpPage = ({ title = 'Sign Up' }: SignUpProps) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validationError, setWarning] = useState<boolean>(false);
  const [warningText, setWarningText] = useState<string>('');

  const history = useHistory();
  const dispatch = useDispatch();
  const requestError = useSelector(getRegistrationError);

  const resources = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    login: 'Login',
    password: 'Password',
    signIn: title,
    signUp: 'Already have an account? Sign in',
    requestWarningText: 'Data is incorrect'
  };

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(event.target.value);
  };

  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const goToMain = () => {
    history.push('/');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isValid, warning = '' } = isAllFieldsValid({
      firstName,
      lastName,
      email,
      phone,
      login,
      password
    });

    if (isValid) {
      dispatch(fetchSignUp({
        first_name: firstName,
        second_name: lastName,
        email,
        phone,
        login,
        password,
        navigate: goToMain
      }));
    } else {
      setWarning(true);
      setWarningText(warning);
    }
  };

  const onLinkClick = () => {
    history.push('/sign-in');
  };

  return (
    <div className={commonStyles.page}>
      <div className={commonStyles.container}>
        <ThemeSwitcherComponent />
        <Box
          className={classNames(commonStyles.box, styles['signup-content'])}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Typography component="h1" variant="h5" mt={3}>
            {resources.signIn}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            className={styles['signup-form']}
          >
            <div className={styles['names-ribbon']}>
              <TextField
                onChange={handleFirstName}
                autoComplete="given-name"
                name="firstName"
                className={styles['name-block']}
                required
                fullWidth
                id="firstName"
                label={resources.firstName}
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
                onChange={handleLastName}
                required
                fullWidth
                id="lastName"
                className={styles['name-block']}
                label={resources.lastName}
                name="lastName"
                autoComplete="family-name"
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
            </div>
            <TextField
              onChange={handleEmail}
              margin="normal"
              required
              fullWidth
              id="email"
              label={resources.email}
              name="email"
              autoComplete="email"
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
              onChange={handlePhone}
              margin="normal"
              required
              fullWidth
              id="phone"
              label={resources.phone}
              name="phone"
              autoComplete="phone"
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
                requestError || validationError
                  ? commonStyles['warning-message']
                  : commonStyles['invisible-message']
              }
            >
              {validationError ? warningText : resources.requestWarningText}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 1, mb: 2 }}
            >
              {resources.signIn}
            </Button>
            <Button
              type="button"
              variant="text"
              className={styles['login-link']}
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

export default SignUpPage;
