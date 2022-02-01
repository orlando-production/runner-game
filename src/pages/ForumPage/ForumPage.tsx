/* eslint-disable no-console */
import {
  Box, Button, Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getTopicsData } from 'selectors/topic';
import { fetchGetTopicAll } from 'thunks/topic';
import { PageMeta } from '../../components/PageMeta/PageMeta';
import Footer from '../../components/footer/Footer';
import NewTopic from '../../components/newTopic';
import type { TopicProps } from '../../components/topic/Topic';
import Widget from '../../components/widget';
import styles from './ForumPage.module.css';
import commonStyles from '../../components/common.module.css';
import ThemeSwitcherComponent from '../../components/themeSwitcher/themeSwitcher';
import Loader from '../../components/loader/Loader';

const ForumPage = () => {
  const topics = useSelector(getTopicsData);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const history = useHistory();
  const dispatch = useDispatch();

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
    dispatch(fetchGetTopicAll());
    setLoading(false);
  }, [dispatch]);

  return (
    isLoading
      ? <Loader />
      : (
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
      )
  );
};

export default ForumPage;
