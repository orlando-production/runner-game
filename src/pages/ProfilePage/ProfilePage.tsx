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
import { requestGetData, requestPutData } from '../../api';
import commonStyles from '../../components/common.module.css';

type InitialFormData = {
  id: string,
  first_name: string,
  second_name: string,
  email: string,
  phone: string,
  login: string,
  avatar?: string
};

type Status = 'invisible' | 'error' | 'success';

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
  const [oldPassword, setOldPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [status, setStatus] = useState<Status>('invisible');
  const [statusPassword, setStatusPassword] = useState<Status>('invisible');
  const [warningText, setWarningText] = useState<string>('');
  const [warningTextPassword, setWarningTextPassword] = useState<string>('');
  const [formData, updateFormData] = useState<InitialFormData>(initialFormData);

  const handleChangeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileData = new FormData() as Record<string, any>;
    const file = event.target.files[0];
    fileData.append('avatar', file);

    if (file) {
      requestPutData('user/profile/avatar', fileData)
        .then((payload: InitialFormData) => {
          setAvatar(payload.avatar);
        });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      ...formData,
      [event.target.name]: event.target.value.trim()
    });
    setStatus('invisible');
  };

  const showWarnings = (reason: AxiosError) => {
    if (reason?.response?.status === 401) {
      setStatus('error');
    }
  };

  const fetchGetDataUser = () => {
    requestGetData('auth/user')
      .then((payload: InitialFormData) => {
        updateFormData(payload);
        setAvatar(payload.avatar);
      })
      .catch(showWarnings);
  };

  const fetchDataSave = ({
    first_name, second_name, email, phone, login
  }: InitialFormData) => {
    requestPutData('user/profile', ({
      first_name, second_name, email, phone, display_name: login, login
    }))
      .then(() => {
        setStatus('success');
        setWarningText('Данные сохранены');
      })
      .catch(showWarnings);
  };

  const handleOldPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value);
    setStatusPassword('invisible');
  };

  const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
    setStatusPassword('invisible');
  };

  const handleSubmitPasswords = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    requestPutData('user/password', { oldPassword, newPassword })
      .then(() => {
        setStatusPassword('success');
        setWarningTextPassword('Пароль сохранен');
      })
      .catch((err) => {
        const { reason } = err?.response?.data || {};
        setStatusPassword('error');
        setWarningTextPassword(reason);
      });
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

    const { isValid, warning = '' } = isAllFieldsValid({
      firstName: formData.first_name,
      lastName: formData.second_name,
      email: formData.email,
      phone: formData.phone,
      login: formData.login
    });

    if (isValid) {
      fetchDataSave(formData);
    } else {
      setStatus('error');
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
              className={classNames(
                {
                  [commonStyles['success-message']]: status === 'success',
                  [commonStyles['invisible-message']]: status === 'invisible',
                  [commonStyles['warning-message']]: status === 'error'
                }
              )}
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
          <Box
            component="form"
            onSubmit={handleSubmitPasswords}
            noValidate
            sx={{ mt: 1 }}
            className={styles['password-form']}
          >
            <TextField
              onChange={handleOldPassword}
              margin="normal"
              name="oldPassword"
              type="password"
              fullWidth
              id="oldPassword"
              label="Old password"
            />
            <TextField
              onChange={handleNewPassword}
              margin="normal"
              name="newPassword"
              type="password"
              fullWidth
              id="newPassword"
              label="New password"
            />
            <div
              className={classNames(
                {
                  [commonStyles['success-message']]: statusPassword === 'success',
                  [commonStyles['invisible-message']]: statusPassword === 'invisible',
                  [commonStyles['warning-message']]: statusPassword === 'error'
                }
              )}
            >
              {warningTextPassword}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 1, mb: 2 }}
            >
              Save Password
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
