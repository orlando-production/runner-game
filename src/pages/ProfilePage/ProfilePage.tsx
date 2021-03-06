/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box, Button, Avatar, TextField, Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { UserResult } from 'services/Profile';
import { OWN_SERVER, OWN_SERVER_LOCAL_END_POINT, IS_DEV } from 'api';
import Footer from '../../components/footer/Footer';
import styles from './ProfilePage.module.css';
import commonStyles from '../../components/common.module.css';
import { fetchLogout } from '../../thunks/logout';
import { fetchUserInfo } from '../../thunks/authentication';
import {
  fetchAvatar, fetchPassword, fetchProfile
} from '../../thunks/profile';
import {
  getAvatarSrc, getUserData, getStatusProfile, getMessageProfile, getMessagePassword, getStatusPassword
} from '../../selectors/profile';

import { isAllFieldsValid } from '../SignUpPage/checkValidation';
import Loader from '../../components/loader/Loader';
import Toolbar from '../../components/toolbar';

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

  const [formData, setFormData] = useState<UserResult>(user as UserResult);
  const [isLoading, setLoading] = useState(true);

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
      navigate: gotToSignIn
    }));
  };

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserInfo());
    }
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    setFormData(user as UserResult);
    setAvatar(avatarSrc);
    setStatusProfilePage(statusProfile);
    setStatusPasswordPage(statusPassword);
    setMessagePasswordPage(messagePassword);
    setMessageProfilePage(messageProfile);
  }, [user, avatarSrc, statusProfile, statusPassword, messagePassword, messageProfile]);

  return (
    isLoading
      ? <Loader />
      : (
        <div className={commonStyles.page}>
          <Toolbar />
          <div className={styles['profile-container']}>
            <Box className={classNames(commonStyles.box, styles['profile-box'], styles['profile-box_avatar'])}>
              <div className={styles['profile-avatar']}>
                <Avatar
                  sx={{ width: 156, height: 156 }}
                  src={avatar && `${IS_DEV ? OWN_SERVER_LOCAL_END_POINT : OWN_SERVER}avatar${avatar}`}
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
                ???????????????????????? ????????????
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
                  onChange={handleChange}
                  margin="normal"
                  required
                  fullWidth
                  id="second_name"
                  label="Last name"
                  value={formData.second_name}
                  name="second_name"
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
                  onChange={handleNewPassword}
                  margin="normal"
                  name="newPassword"
                  type="password"
                  fullWidth
                  id="newPassword"
                  label="New password"
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
          </div>
          <Footer />
        </div>
      )
  );
};

export default ProfilePage;
