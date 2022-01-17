/* eslint-disable no-console */
import {
  Box, Button, Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { getForums } from 'services/Forum';
import { PageMeta } from '../../components/PageMeta/PageMeta';
import Footer from '../../components/footer/Footer';
import NewTopic from '../../components/newTopic';
import type { TopicProps } from '../../components/Topic/Topic';
import Widget from '../../components/widget';
import styles from './ForumPage.module.css';
import commonStyles from '../../components/common.module.css';
import ThemeSwitcherComponent from '../../components/themeSwitcher/themeSwitcher';

const ForumPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [topics, setTopics] = useState([]);
  const history = useHistory();

  const resources = {
    forum: 'Forum',
    button: 'ADD'
  };

  const onWidgetClick = (data: TopicProps) => {
    history.push(`/forum/${data.id}`);
  };

  const onAddButtonClick = () => {
    setModalOpen(true);
  };

  const onModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    async function fetchGetTopics() {
      const { data } = await getForums();
      setTopics(data);
    }
    if (!topics.length) {
      fetchGetTopics();
    }
  }, [setTopics]);

  return (
    <div className={commonStyles.page}>
      <ThemeSwitcherComponent />
      <PageMeta title="Forum page" description="New topics everyday" />
      <div className={classNames(commonStyles.content, styles['forum-container'])}>
        <Typography
          component="h1"
          variant="h5"
          className={styles['forum-title']}
          mb={5}
        >
          {resources.forum}

        </Typography>
        {isModalOpen && <NewTopic onClose={onModalClose} />}
        <Box
          className={classNames(commonStyles.box, styles['forum-content'])}
        >
          <div className={styles.topics}>
            {topics.map((el: TopicProps) => <Widget title={el.title} key={el.title} onClick={() => onWidgetClick(el)} />)}
          </div>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="info"
            onClick={onAddButtonClick}
            sx={{
              mt: 2, mb: 2, ml: 2, width: '100px', alignSelf: 'flex-end'
            }}
          >
            {resources.button}
          </Button>
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default ForumPage;
