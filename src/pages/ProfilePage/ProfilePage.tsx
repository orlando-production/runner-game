/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import {
  Box, Button, Avatar, TextField, Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import { useHistory } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import classNames from 'classnames';
import { UserResult } from 'services/Profile';
import Footer from '../../components/footer/Footer';
import styles from './ProfilePage.module.css';
import commonStyles from '../../components/common.module.css';
import { fetchLogout } from '../../thunks/logout';

import {
  fetchAvatar, fetchPassword, fetchProfile, fetchUser
} from '../../thunks/profile';
import {
  getAvatarSrc, getUserData, getStatusProfile, getMessageProfile, getMessagePassword, getStatusPassword
} from '../../selectors/profile';

import { isAllFieldsValid } from '../SignUpPage/checkValidation';

type Status = 'invisible' | 'error' | 'success';

const ProfilePage = () => {
  const user = useSelector(getUserData);
  const avatarSrc = useSelector(getAvatarSrc);
  const statusProfile = useSelector(getStatusProfile);
  const messagePassword = useSelector(getMessagePassword);
  const messageProfile = useSelector(getMessageProfile);
  const statusPassword = useSelector(getStatusPassword);

  const [avatar, setAvatar] = useState<string>();

  const [oldPassword, setOldPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();

  const [statusProfilePage, setStatusProfilePage] = useState<Status>('invisible');
  const [messageProfilePage, setMessageProfilePage] = useState<string>('');

  const [statusPasswordPage, setStatusPasswordPage] = useState<Status>('invisible');
  const [messagePasswordPage, setMessagePasswordPage] = useState<string>('');

  const [formData, setFormData] = useState<UserResult>(user);

  const [cookies, setCookie, removeCookie] = useCookies(['auth']);
  const history = useHistory();

  const dispatch = useDispatch();

  const handleChangeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileData = new FormData() as any;
    const file = event.target.files[0];
    fileData.append('avatar', file);

    if (file) {
      dispatch(fetchAvatar(fileData));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value.trim()
    });
  };

  const handleOldPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value);
  };

  const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleSubmitPasswords = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(fetchPassword({ oldPassword, newPassword }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    /* eslint-disable-next-line */
    for (const [key, value] of data.entries()) {
      setFormData({
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
      dispatch(fetchProfile({ ...formData, display_name: formData.login }));
    } else {
      setStatusProfilePage('error');
      setMessageProfilePage(warning);
    }
  };

  const gotToSignIn = () => {
    history.push('/sign-in');
  };

  const onLogoutClick = () => {
    dispatch(fetchLogout({
      removeCookie, navigate: gotToSignIn
    }));
  };

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  useEffect(() => {
    setFormData(user);
    setAvatar(avatarSrc);
    setStatusProfilePage(statusProfile);
    setStatusPasswordPage(statusPassword);
    setMessagePasswordPage(messagePassword);
    setMessageProfilePage(messageProfile);
  }, [user, avatarSrc, statusProfile, statusPassword, messagePassword, messageProfile]);

  return (
    <div className={commonStyles.page}>
      <div className={styles['profile-container']}>
        <Box className={classNames(commonStyles.box, styles['profile-box'], styles['profile-box_avatar'])}>
          <div className={styles['profile-avatar']}>
            <Avatar
              sx={{ width: 156, height: 156 }}
              src={avatar && `http://ya-praktikum.tech/api/v2/resources${avatar}`}
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
                  [commonStyles['invisible-message']]: statusProfilePage === 'invisible',
                  [commonStyles['warning-message']]: statusProfilePage === 'error',
                  [commonStyles['success-message']]: statusProfilePage === 'success'
                }
              )}
            >
              {messageProfilePage}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 1, mb: 2 }}
            >
              Save Profile
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
                  [commonStyles['invisible-message']]: statusPasswordPage === 'invisible',
                  [commonStyles['warning-message']]: statusPasswordPage === 'error',
                  [commonStyles['success-message']]: statusPasswordPage === 'success'
                }
              )}
            >
              {messagePasswordPage}
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
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={onLogoutClick}
            sx={{ mt: 1, mb: 2 }}
          >
            Logout
          </Button>
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
