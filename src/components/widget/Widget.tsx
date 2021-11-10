import { Button } from '@mui/material';
import React from 'react';
import styles from './Widget.module.css';

type WidgetProps = {
  title?: string;
  onClick: () => void;
}

const Widget = ({ title = '', onClick }: WidgetProps) => {
  const resources = {
    button: 'LEARN MORE'
  };

  return (
    <div className={styles.widget}>
      <div>{title}</div>
      <Button
        type="button"
        fullWidth
        variant="text"
        onClick={onClick}
        color="info"
        sx={{ mt: 2, mb: 2, width: '80%' }}
      >
        {resources.button}
      </Button>
    </div>
  );
};

export default Widget;
