import React, { useState, useEffect } from 'react';
import {
  Switch
} from '@mui/material';
import commonStyles from 'components/common.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme, getUserData } from 'selectors/profile';
import { UserResult } from 'services/Profile';
import { fetchSetThemes } from 'thunks/themes';

export default function ThemeSwitcherComponent() {
  const user = useSelector(getUserData) as UserResult;
  const themes = useSelector(getTheme) as string | null;
  const [state, setState] = useState(false);

  const dispatch = useDispatch();

  const themeString = (b: boolean) => (b ? 'dark' : 'light');

  const handleSwitch = (_e: any, checked: boolean) => {
    const theme = themeString(checked);
    setState(checked);
    if (user.id) {
      dispatch(fetchSetThemes({ id: user.id, theme }));
    }
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('theme', theme);
  };

  useEffect(() => {
    let currentTheme = localStorage.getItem('theme');
    if (themes) {
      currentTheme = themes;
    }
    setState(currentTheme === 'dark');
    document.documentElement.setAttribute('theme', currentTheme || 'light');
  }, [themes]);

  return (
    <Switch
      className={commonStyles.switch}
      checked={state}
      onChange={handleSwitch}
    />
  );
}
