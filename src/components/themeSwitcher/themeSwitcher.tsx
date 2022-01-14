import React, { useState, useEffect } from 'react';
import { Switch } from '@mui/material';
import commonStyles from 'components/common.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from 'selectors/profile';
import { UserResult } from 'services/Profile';
import { fetchSetThemes } from 'thunks/themes';
import { getThemeId } from 'selectors/themes';
import { setTheme } from './themesSlice';

const THEMES = {
  1: 'light',
  2: 'dark'
};

export default function ThemeSwitcherComponent() {
  const user = useSelector(getUserData) as UserResult;
  const themeId = useSelector(getThemeId);
  console.log('THEMEID', themeId);
  const [state, setState] = useState(false);

  const dispatch = useDispatch();

  const getTheme = (b: boolean) => (b ? 2 : 1);

  const handleSwitch = (_e: any, checked: boolean) => {
    const theme = getTheme(checked);
    setState(checked);
    dispatch(setTheme(themeId));
    if (user.id) {
      dispatch(fetchSetThemes({ id: user.id, themeId: theme }));
    }
    document.documentElement.setAttribute('theme', THEMES[theme]);
  };

  useEffect(() => {
    document.documentElement.setAttribute('theme', THEMES[themeId] || 'light');
  }, [state]);

  return (
    <Switch
      className={commonStyles.switch}
      checked={state}
      onChange={handleSwitch}
    />
  );
}
