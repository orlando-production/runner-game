import React, { memo } from 'react';
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

  return shouldRender
  && (
  <div className={styles.footer}>
    <div className={styles.icons}>
      <Icon icon="akar-icons:twitter-fill" className={styles.icon} />
      <Icon icon="akar-icons:vk-fill" className={styles.icon} />
      <Icon icon="bx:bxl-telegram" className={styles.icon} />
    </div>
    <div>{resources.rights}</div>
    <div>{resources.commercial}</div>
  </div>
  );
};

export default memo(Footer);
