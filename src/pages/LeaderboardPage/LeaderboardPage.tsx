import { Box, Avatar, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Footer from '../../components/footer';
import commonStyles from '../../components/common.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './LeaderboardPage.module.css';
import {
  getLeaderboardResults,
  LeaderboardGetResult
} from 'services/Leaderboard';

const LOAD_LIMIT = 30;

const LeaderboardPage = () => {
  const [data, setData] = useState<LeaderboardGetResult[]>([]);
  const cursor = useRef<number>(0);
  const isLoad = useRef<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchRating = () => {
    if (!isLoad.current) {
      isLoad.current = true;
      getLeaderboardResults({
        ratingFieldName: 'presents',
        cursor: cursor.current,
        limit: LOAD_LIMIT
      }).then((res) => {
        if (res.length === 0) {
          setHasMore(false);
          return;
        }
        setData((prev) => {
          isLoad.current = false;
          cursor.current = prev.length + res.length;
          return [...prev, ...res];
        });
      });
    }
  };

  useEffect(() => {
    fetchRating();
  }, []);

  return (
    <div className={commonStyles.page}>
      <div
        className={classNames(
          commonStyles.content,
          styles['leaderboard-container']
        )}
      >
        <Typography
          component='h1'
          variant='h5'
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
            <Typography color='text.secondary' variant='subtitle1'>
              Id
            </Typography>
            <Typography color='text.secondary' variant='subtitle1'>
              Name
            </Typography>
            <Typography color='text.secondary' variant='subtitle1'>
              Presents
            </Typography>
          </div>
          <InfiniteScroll
            dataLength={data.length}
            next={fetchRating}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            {data.map((field) => (
              <div key={field.data.id} className={styles['leaderboard-field']}>
                <Typography color='text.secondary' variant='body1'>
                  {field.data.id}
                </Typography>
                <div className={styles['leaderboard-name']}>
                  <Avatar src={field.avatar} />
                  <Typography
                    sx={{ ml: 2 }}
                    color='text.secondary'
                    variant='body1'
                  >
                    {field.data.name}
                  </Typography>
                </div>
                <Typography color='text.secondary' variant='body1'>
                  {field.data.presents}
                </Typography>
              </div>
            ))}
          </InfiniteScroll>
        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
