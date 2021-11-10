/* eslint-disable no-console */
import {
  Button, TextField
} from '@mui/material';
import React from 'react';
import styles from './Topic.module.css';

export type TopicProps = {
  title?: string;
  id: string;
}

const Topic = (props: TopicProps) => {
  const resources = {
    button: 'ADD'
  };

  // TODO Get real messages
  const oldMessages = [
    { user: 'Ann', content: 'First msg' },
    { user: 'Dan', content: 'Second msg' },
    { user: 'Pam', content: 'Third msg' }
  ];

  const onAddButtonClick = () => {
    console.log(props);
    console.log('Add Text to topic');
  };

  return (
    <>
      {oldMessages.map(({ user, content }) => (
        <div className={styles['message-box']} key={user}>
          <div>{user}</div>
          <div>{content}</div>
        </div>
      ))}
      <div className={styles['new-message-panel']}>
        <TextField
          placeholder="Message..."
          multiline
          rows={2}
          className={styles['new-message-input']}
        />
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="info"
          onClick={onAddButtonClick}
          sx={{
            mt: 2, mb: 2, ml: 2, width: '100px'
          }}
        >
          {resources.button}
        </Button>
      </div>
    </>
  );
};

export default Topic;
