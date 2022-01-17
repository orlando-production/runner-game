import React, { useState, useEffect } from 'react';
import { Switch } from '@mui/material';
import commonStyles from 'components/common.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTheme, getUserData } from 'selectors/profile';
import { UserResult } from 'services/Profile';
import { fetchSetThemes } from 'thunks/themes';

const THEMES = {
  1: 'light',
  2: 'dark'
};

export default function ThemeSwitcherComponent() {
  const user = useSelector(getUserData) as UserResult;
  const themes = useSelector(getTheme) as string | null;
  const [state, setState] = useState(false);

  const dispatch = useDispatch();

  const getThemeId = (b: boolean) => (b ? 2 : 1);

  const handleSwitch = (_e: any, checked: boolean) => {
    const themeId = getThemeId(checked);
    setState(checked);
    if (user.id) {
      dispatch(fetchSetThemes({ id: user.id, themeId }));
    }
    document.documentElement.setAttribute('theme', THEMES[themeId]);
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
    <div className={commonStyles.switch}>
      <Switch
        checked={state}
        onChange={handleSwitch}
      />
    </div>
  );
}
