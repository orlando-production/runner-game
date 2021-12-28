/* eslint-disable no-console */
import {
  Box, Button, TextField, Typography
} from '@mui/material';
import React, { useState } from 'react';
import styles from './NewTopic.module.css';

type NewTopicProps = {
  onClose: () => void;
};

const NewTopic = ({ onClose }: NewTopicProps) => {
  const [, setTopic] = useState<string>('');
  const [, setDescription] = useState<string>('');

  console.log(topic);
  console.log(description);

  const resources = {
    buttonSave: 'SAVE',
    buttonCancel: 'CANCEL',
    topic: 'Topic',
    description: 'Description',
    newTitle: 'New topic'
  };

  const handleTopic = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTopic(event.target.value);
  };

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose();
  };

  const onCancelClick = () => {
    onClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className={styles['new-topic']}
    >
      <Typography component="h1" variant="h5" mb={5}>
        {resources.newTitle}
      </Typography>
      <TextField
        onChange={handleTopic}
        margin="normal"
        fullWidth
        id="topic"
        label={resources.topic}
        name="topic"
        autoComplete="topic"
        autoFocus
        sx={{ width: '80%' }}
      />
      <TextField
        onChange={handleDescription}
        margin="normal"
        fullWidth
        id="login"
        label={resources.description}
        name="description"
        autoComplete="description"
        autoFocus
        sx={{ width: '80%' }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 3, width: '150px' }}
      >
        {resources.buttonSave}
      </Button>
      <Button
        type="button"
        onClick={onCancelClick}
        variant="contained"
        color="primary"
        sx={{ width: '150px' }}
      >
        {resources.buttonCancel}
      </Button>
    </Box>
  );
};

export default NewTopic;
