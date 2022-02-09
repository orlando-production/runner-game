import {
  Button, TextField
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from 'selectors/profile';
import commonStyles from 'components/common.module.css';
import { UserResult } from 'services/Profile';
import { getMessagesData } from 'selectors/message';
import { fetchGetMessage, fetchSetMessage } from 'thunks/message';
import styles from './Topic.module.css';

export type TopicProps = {
  title?: string;
  id: string;
}

const Topic = (props?: TopicProps) => {
  const { id } = props;
  const user = useSelector(getUserData) as UserResult;
  const messages = useSelector(getMessagesData);
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const resources = {
    button: 'ADD'
  };

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onAddButtonClick = () => {
    dispatch(fetchSetMessage({ id, author: user.login, text }));
  };

  useEffect(() => {
    dispatch(fetchGetMessage({ id }));
  }, [id, dispatch]);

  return (
    <>
      {/* eslint-disable-next-line no-shadow */}
      {messages.map(({ id, author, text }) => (
        <div className={styles['message-box']} key={id}>
          <div className={styles['message-author']}>{author}</div>
          <div className={styles['message-text']}>{text}</div>
        </div>
      ))}
      <div className={styles['new-message-panel']}>
        <TextField
          onChange={handleText}
          placeholder="Message..."
          multiline
          rows={2}
          className={styles['new-message-input']}
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
