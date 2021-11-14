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
import { requestGetData, requestPutData } from '../../services/RequestData';
import commonStyles from '../../components/common.css';

const initialFormData = {
  id: '',
  first_name: '',
  second_name: '',
  email: '',
  phone: '',
  login: ''
};

const ProfilePage = () => {
  const [avatar, setAvatar] = useState<string>();
  const [isError, setWarning] = useState<boolean>(false);
  const [warningText, setWarningText] = useState<string>('');
  const [formData, updateFormData] = useState<object>(initialFormData);

  const handleChangeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileData = new FormData();
    const file = event.target.files[0];
    fileData.append('avatar', file);

    if (file) {
      requestPutData('/user/profile/avatar', fileData)
        .then((res) => {
          setAvatar(res.data.avatar);
        });
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

  const fetchGetDataUser = () => {
    requestGetData('auth/user')
      .then((res) => {
        updateFormData(res.data);
        setAvatar(res.data.avatar);
      })
      .catch(showWarnings);
  };

  const fetchDataSave = ({
    first_name, second_name, email, phone, login
  }) => {
    requestPutData('user/profile', ({
      first_name, second_name, email, phone, display_name: login, login
    }))
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
      fetchDataSave(formData);
    } else {
      setWarning(true);
      setWarningText(warning);
    }
  };

  useEffect(() => {
    fetchGetDataUser();
  }, []);

  return (
    <div className={commonStyles.page}>
      <div className={styles['profile-container']}>
        <Box className={classNames(commonStyles.box, styles['profile-box'], styles['profile-box_avatar'])}>
          <div className={styles['profile-avatar']}>
            <Avatar
              sx={{ width: 156, height: 156 }}
              src={`http://ya-praktikum.tech/api/v2/resources${avatar}`}
            />
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
        <Box className={classNames(commonStyles.box, styles['profile-box'], styles['profile-box_settings'])}>
          <Typography
            component="h1"
            variant="h5"
            className={styles['leaderboard-title']}
            mb={5}
          >
            Персональные данные
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            className={styles['signup-form']}
          >
            <TextField
              onChange={handleChange}
              margin="normal"
              autoComplete="given-name"
              name="first_name"
              required
              fullWidth
              id="first_name"
              value={formData.first_name}
              label="First name"
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="second_name"
              label="Last name"
              value={formData.second_name}
              name="second_name"
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

            <div
              className={isError ? classNames['warning-message'] : classNames['invisible-message']}
            >
              {warningText}
            </div>
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
        <Box className={classNames(commonStyles.box, styles['profile-box'], styles['profile-box_scores'])}>
          <div className={styles['profile-scores_left']}>
            <Icon icon="mdi:account-cowboy-hat" height={24} color="#A86CE4" />
          </div>
          <div className={styles['profile-scores_right']}>
            <Typography
              className={styles['profile-scores_count']}
              variant="h6"
              sx={{ lineHeight: 1 }}
            >
              123
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
