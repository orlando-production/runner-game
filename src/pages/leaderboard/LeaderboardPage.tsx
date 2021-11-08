import {
  Box, Avatar, Typography
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Footer from '../../components/footer';
import styles from './LeaderboardPage.module.css';

const LeaderboardPage = () => {
  const [data, setData] = useState([]);

  const plugs = [
    {
      id: 1, nick: 'Volodya777', avatar: '', position: '10', scores: '1000'
    },
    {
      id: 2, nick: 'Volodya777', avatar: '', position: '10', scores: '1000'
    },
    {
      id: 3, nick: 'Volodya777', avatar: '', position: '10', scores: '1000'
    }];

  useEffect(() => {
    /* Todo тут получаем список участников */
    setData(plugs);
  }, []);

  return (
    <div className={styles['leaderboard-page']}>
      <div className={styles['leaderboard-container']}>
        <Typography
          component="h1"
          variant="h5"
          className={styles['leaderboard-title']}
          mb={5}
        >
          Leaderbord
        </Typography>
        <Box className={styles['leaderboard-content']}>
          <div className={styles['leaderboard-field']}>
            <Typography color="text.secondary" variant="subtitle1">
              Name
            </Typography>
            <Typography color="text.secondary" variant="subtitle1">
              Positions
            </Typography>
            <Typography color="text.secondary" variant="subtitle1">
              Scores
            </Typography>
          </div>

          {data.map((field) => (
            <div key={field.id} className={styles['leaderboard-field']}>
              <div className={styles['leaderboard-name']}>
                <Avatar src={field.avatar} />
                <Typography sx={{ ml: 2 }} color="text.secondary" variant="body1">
                  {field.nick}
                </Typography>
              </div>
              <Typography color="text.secondary" variant="body1">
                {field.position}
              </Typography>
              <Typography color="text.secondary" variant="body1">
                {field.scores}
              </Typography>
            </div>
          ))}

        </Box>
      </div>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
