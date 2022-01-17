/* eslint-disable no-console */
import {
  Button, TextField
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from 'selectors/profile';
import { getMessages, setMessage } from 'services/Topic';
import commonStyles from 'components/common.module.css';
import { UserResult } from 'services/Profile';
import styles from './Topic.module.css';

export type TopicProps = {
  title?: string;
  id: string;
}

const Topic = (props?: TopicProps) => {
  const { title, id } = props;
  const user = useSelector(getUserData) as UserResult;
  const [login, setLogin] = useState('');
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const resources = {
    button: 'ADD',
    title
  };

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onAddButtonClick = async () => {
    const { data } = await setMessage({ id, author: login, text });
    setMessages([
      ...messages,
      data
    ]);
  };

  useEffect(() => {
    setLogin(user.login);

    async function fetchGetMessages() {
      const { data } = await getMessages({ id });
      setMessages(data);
    }
    fetchGetMessages();
  }, [id, user, setLogin, setMessages]);

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
