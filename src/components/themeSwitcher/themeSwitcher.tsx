import React, { useEffect } from 'react';
import { Switch } from '@mui/material';
import commonStyles from 'components/common.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from 'selectors/profile';
import { UserResult } from 'services/Profile';
import { fetchSetTheme } from 'thunks/themes';
import { getAllThemes, getThemeId } from 'selectors/themes';
import { setThemeId } from './themesSlice';

export default function ThemeSwitcherComponent() {
  const user = useSelector(getUserData) as UserResult;
  const themeId = useSelector(getThemeId);
  const allThemes = useSelector(getAllThemes);

  const dispatch = useDispatch();

  const handleSwitch = (_e: any, checked: boolean) => {
    const theme = checked ? allThemes[1].themeId : allThemes[0].themeId;
    localStorage.setItem('theme', String(theme));
    dispatch(setThemeId(theme));
    if (user.id) {
      dispatch(fetchSetTheme({ id: user.id, themeId: theme }));
    }
    document.documentElement.setAttribute(
      'theme',
      allThemes.find((item) => item.themeId === theme).themeName
    );
  };

  useEffect(() => {
    if (allThemes?.length) {
      localStorage.setItem('theme', String(themeId));
      document.documentElement.setAttribute(
        'theme',
        allThemes.find((item) => item.themeId === themeId).themeName
      );
    }
  }, [themeId, allThemes]);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (!user.id && theme) {
      dispatch(setThemeId(parseInt(theme, 10)));
    }
  }, [user]);

  return (
    allThemes?.length > 1 && (
      <div className={commonStyles.switch}>
        <Switch
          checked={themeId !== allThemes[0].themeId}
          onChange={handleSwitch}
        />
      </div>
    )
  );
}
