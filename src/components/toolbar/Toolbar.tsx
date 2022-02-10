import { Icon } from '@iconify/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Toolbar.module.css';
import ThemeSwitcherComponent from '../themeSwitcher/themeSwitcher';

type ToolbarProps = {
  shouldRender?: boolean;
}

const Toolbar = ({ shouldRender = true }: ToolbarProps) => {
  const iconButtons = [
    { name: 'mdi:home-outline', route: '/' },
    { name: 'ion:game-controller-outline', route: '/game' },
    { name: 'mdi:clipboard-account-outline', route: '/profile' },
    { name: 'mdi:forum-outline', route: '/forum' },
    { name: 'mdi:clipboard-list-outline', route: '/leaderboard' }
  ];

  const history = useHistory();

  const onClick = (path: string) => {
    history.push(path);
  };

  return shouldRender
  && (
  <div className={styles.toolbar}>
      {iconButtons.map(({ name, route }) => (
        <div className={styles['icon-wrap']} key={name}>
          <Icon
            icon={name}
            key={name}
            height={24}
            color="rgb(var(--icon-color))"
            onClick={() => onClick(route)}
          />
        </div>
      ))}
    <ThemeSwitcherComponent />
  </div>
  );
};

export default Toolbar;
