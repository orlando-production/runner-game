import {
  Box, Typography
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector, RootStateOrAny } from 'react-redux';
import { TopicResult } from 'services/Topic';
import Footer from '../../components/footer/Footer';
import Topic from '../../components/topic/Topic';
import commonStyles from '../../components/common.module.css';
import styles from './ForumTopicPage.module.css';
import Toolbar from '../../components/toolbar';

type RouteParams = {
  [key: string] : string
}

const ForumTopicPage = () => {
  const { topicId }: RouteParams = useParams();
  const currentTopic = useSelector((state: RootStateOrAny) => state.topics.topics.find((topic: TopicResult) => topic.id === +topicId)) as TopicResult;

  return (
    <div className={commonStyles.page}>
      <Toolbar />

      <div className={classNames(commonStyles.content, styles['forum-container'])}>

        <Typography
          component="h1"
          variant="h2"
          mb={2}
          className={styles['forum-title']}
        >
          {currentTopic.title}

        </Typography>
        <Typography
          component="h4"
          variant="h5"
          mb={6}
          className={styles['forum-subtitle']}
        >
          {currentTopic.text}

        </Typography>
        <Box
          className={classNames(commonStyles.box, styles['forum-content'])}
        >
          <Topic key={topicId} id={topicId} />
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default ForumTopicPage;
