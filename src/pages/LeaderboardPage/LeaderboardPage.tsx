/* eslint-disable react/no-array-index-key */
import { Box, Avatar, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  getLeaderboardResults, LeaderboardGetResult
} from 'services/Leaderboard';
import { getList } from 'selectors/leaderboard';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../components/footer';
import commonStyles from '../../components/common.module.css';

import styles from './LeaderboardPage.module.css';
import { setLeaderboardList } from './leaderboardSlice';
import ThemeSwitcherComponent from '../../components/themeSwitcher/themeSwitcher';
import Loader from '../../components/loader/Loader';

export const LOAD_LIMIT = 20;

const LeaderboardPage = () => {
  const data: LeaderboardGetResult[] = useSelector(getList);
  const cursor = useRef<number>(0);
  const isLoad = useRef<boolean>(false);
  const dispatch = useDispatch();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setLoading] = useState(true);

  const fetchRating = () => {
    if (!isLoad.current) {
      isLoad.current = true;
      getLeaderboardResults({
        ratingFieldName: 'presents',
        cursor: cursor.current,
        limit: LOAD_LIMIT
      }).then((resData) => {
        const newData = resData.data;
        if (newData.length === 0) {
          setHasMore(false);
          return;
        }
        isLoad.current = false;
        cursor.current = data.length + newData.length;
        dispatch(setLeaderboardList([...data, ...newData]));
      });
    }
  };

  useEffect(() => {
    if (data?.length === 0) {
      fetchRating();
    }
    setLoading(false);
  }, []);

  return (
    isLoading
      ? <Loader />
      : (
        <div className={commonStyles.page}>
          <div
            className={classNames(
              commonStyles.content,
              styles['leaderboard-container']
            )}
          >
            <ThemeSwitcherComponent />

            <Typography
              component="h1"
              variant="h5"
              className={styles['leaderboard-title']}
              mb={5}
            >
              Leaderbord
            </Typography>
            <Box
              className={classNames(
                commonStyles.box,
                styles['leaderboard-content']
              )}
            >
              <div className={styles['leaderboard-field']}>
                <Typography variant="subtitle1">
                  Id
                </Typography>
                <Typography variant="subtitle1">
                  Name
                </Typography>
                <Typography variant="subtitle1">
                  Presents
                </Typography>
              </div>
              <InfiniteScroll
                dataLength={data.length}
                next={fetchRating}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
              >
                {data.map((field, index) => (
                  <div key={`${field.data.id}-${index}`} className={styles['leaderboard-field']}>
                    <Typography variant="body1">
                      {field.data.id}
                    </Typography>
                    <div className={styles['leaderboard-name']}>
                      <Avatar src={field.data.avatar} />
                      <Typography
                        sx={{ ml: 2 }}
                        variant="body1"
                      >
                        {field.data.name}
                      </Typography>
                    </div>
                    <Typography variant="body1">
                      {field.data.presents}
                    </Typography>
                  </div>
                ))}
              </InfiniteScroll>
            </Box>
          </div>
          <Footer />
        </div>
      )
  );
};

export default LeaderboardPage;
