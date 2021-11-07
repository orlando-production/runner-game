import React from 'react';
import { Icon } from '@iconify/react';
import styles from './Footer.module.css';

type FooterProps = {
  shouldRender?: boolean;
}

const Footer = ({ shouldRender = true }: FooterProps) => {
  const resources = {
    rights: '© 2021 - All Rights Lecensed',
    commercial: 'For commercial inquiries'
  };

  const iconButtons = [
    { name: 'akar-icons:twitter-fill' },
    { name: 'akar-icons:vk-fill' },
    { name: 'bx:bxl-telegram' }
  ];

  return shouldRender
  && (
  <div className={styles.footer}>
    <div className={styles.icons}>
      {iconButtons.map(({ name }) => <Icon icon={name} className={styles.icon} key={name} />)}
    </div>
    <div>{resources.rights}</div>
    <div>{resources.commercial}</div>
  </div>
  );
};

export default Footer;
