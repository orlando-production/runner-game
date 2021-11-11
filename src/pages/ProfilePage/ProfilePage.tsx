/* eslint-disable no-console */
import {
  Box, Button, Avatar, TextField, Typography
} from '@mui/material';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import type { AxiosError } from 'axios';
import { Icon } from '@iconify/react';
import Footer from '../../components/footer/Footer';
import styles from './ProfilePage.module.css';
import { isAllFieldsValid } from '../SignUpPage/checkValidation';
import { requestPostData } from '../../services/RequestData';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  login: '',
  password: ''
};

const ProfilePage = () => {
  const [avatarBase64, setBase64] = useState<string>();

  const [isError, setWarning] = useState<boolean>(false);
  const [warningText, setWarningText] = useState<string>('');
  const [formData, updateFormData] = useState<object>(initialFormData);
  const resources = {
    id: 1,
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'email@gmail.com',
    phone: '+79111111111',
    login: 'Login',
    password: '123123',
    position: 2123
  };

  useEffect(() => {
    /* Todo тут получаем данные профиля */
    updateFormData(resources);
  }, []);

  const handleReaderLoaded = (readerEvt: Event) => {
    const binaryString = readerEvt.target.result;
    setBase64(`data:image/png;base64,${btoa(binaryString)}`);
    /* Todo где то тут отправляем на сервер картинку */
  };
  const handleChangeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = handleReaderLoaded;
      reader.readAsBinaryString(file);
    }
  };

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    updateFormData({
      ...formData,
      [event.target.name]: event.target.value.trim()
    });
    setWarning(false);
  };

  const showWarnings = (reason: AxiosError) => {
    if (reason?.response?.status === 401) {
      setWarning(true);
    }
  };

  const fetchData = ({
    firstName, lastName, email, phone, login, password
  }) => {
    requestPostData('auth/signup', ({
      first_name: firstName, second_name: lastName, email, phone, login, password
    }))
      .then()
      .catch(showWarnings);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    /* eslint-disable-next-line */
    for (const [key, value] of data.entries()) {
      updateFormData({
        ...formData,
        [key]: value
      });
    }

    const { isValid, warning = '' } = isAllFieldsValid(formData);

    if (isValid) {
      fetchData(formData);
    } else {
      setWarning(true);
      setWarningText(warning);
    }
  };

  return (
    <div className={styles['profile-page']}>
      <div className={styles['profile-container']}>
        <Box className={classNames(styles['profile-box'], styles['profile-box_avatar'])}>
          <div className={styles['profile-avatar']}>
            <Avatar sx={{ width: 156, height: 156 }} src={avatarBase64} />
          </div>
          <div className={styles['profile-upload']}>

            <label htmlFor="raised-button-file">
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleChangeUpload}
              />
              <Button
                fullWidth
                component="span"
                variant="contained"
                color="primary"
              >
                + Upload new photo
              </Button>
            </label>
          </div>
        </Box>
        <Box className={classNames(styles['profile-box'], styles['profile-box_settings'])}>
          <Typography
            component="h1"
            variant="h5"
            className={styles['leaderboard-title']}
            mb={5}
          >
            Персональные данные
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className={styles['signup-form']}>
            <TextField
              onChange={handleChange}
              margin="normal"
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              value={formData.firstName}
              label="First name"
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last name"
              value={formData.lastName}
              name="lastName"
              autoComplete="family-name"
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              value={formData.email}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              value={formData.phone}
              name="phone"
              autoComplete="phone"
              autoFocus
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              value={formData.login}
              name="login"
              autoComplete="login"
              autoFocus
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={formData.password}
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <div className={isError ? styles['warning-message'] : styles['invisible-message']}>{warningText}</div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 1, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
        <Box className={classNames(styles['profile-box'], styles['profile-box_scores'])}>
          <div className={styles['profile-scores_left']}>
            <Icon icon="mdi:account-cowboy-hat" height={24} color="#A86CE4" />
          </div>
          <div className={styles['profile-scores_right']}>
            <Typography
              className={styles['profile-scores_count']}
              variant="h6"
              sx={{ lineHeight: 1 }}
            >
              {resources.position}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ lineHeight: 1 }}
            >
              Ваша позиция в рейтинге
            </Typography>
          </div>
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
