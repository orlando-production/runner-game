/* eslint-disable no-console */
import {
  Box, Typography
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import Footer from '../../components/footer/Footer';
import Topic from '../../components/topic/Topic';
import styles from './ForumTopicPage.module.css';
import commonStyles from '../../components/common.css';

type RouteParams = {
  [key: string] : string
}

const ForumTopicPage = () => {
  const resources = {
    forum: 'Forum'
  };

  // TODO Get title and other data from api by topicId
  const title = 'Awesome title';

  const { topicId }: RouteParams = useParams();

  return (
    <div className={classNames(commonStyles.page)}>
      <div className={classNames(commonStyles.content, styles['forum-container'])}>
        <Typography
          component="h1"
          variant="h5"
          className={styles['forum-title']}
          mb={5}
        >
          {resources.forum}

        </Typography>
        <Box
          className={classNames(commonStyles.box, styles['forum-content'])}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'flex-start'
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            mb={5}
          >
            {title}

          </Typography>
          <Topic title={title} key={topicId} id={topicId} />
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default ForumTopicPage;
