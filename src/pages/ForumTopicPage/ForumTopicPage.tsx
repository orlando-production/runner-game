/* eslint-disable no-console */
import {
  Box, Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getForums } from 'services/Forum';
import Footer from '../../components/footer/Footer';
import Topic from '../../components/topic/Topic';
import commonStyles from '../../components/common.module.css';
import styles from './ForumTopicPage.module.css';
import ThemeSwitcherComponent from '../../components/themeSwitcher/themeSwitcher';

type RouteParams = {
  [key: string] : string
}

const ForumTopicPage = () => {
  const [topic, setTopic] = useState([]);

  const { topicId }: RouteParams = useParams();

  useEffect(() => {
    async function fetchGetTopics() {
      const { data } = await getForums({ id: topicId });
      setTopic(data);
    }
    fetchGetTopics();
  }, [topicId, setTopic]);

  return (
    <div className={commonStyles.page}>
      <div className={classNames(commonStyles.content, styles['forum-container'])}>
        <ThemeSwitcherComponent />

        <Typography
          component="h1"
          variant="h5"
          className={styles['forum-title']}
        >
          {topic.title}

        </Typography>
        <Typography
          component="h4"
          variant="h5"
          className={styles['forum-subtitle']}
        >
          {topic.text}

        </Typography>
        <Box
          className={classNames(commonStyles.box, styles['forum-content'])}
        >
          <Topic title={topic.title} key={topicId} id={topicId} />
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default ForumTopicPage;
