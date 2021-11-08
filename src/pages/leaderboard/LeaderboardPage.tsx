import {
    Box, Divider, Link, Avatar, Typography
} from '@mui/material';
import React from 'react';
import Footer from "../../components/footer";
import styles from './LeaderboardPage.module.css';

const LeaderboardPage = () => {

    return (
        <div className={styles['leaderboard-page']}>
            <div className={styles['leaderboard-container']}>
                <Typography component="h1" variant="h5" className={styles['leaderboard-title']} mb={5}>Leaderbord</Typography>
                <Box
                    className={styles['leaderboard-content']}
                >
                    <div className={styles['leaderboard-field']}>
                        <span>Name</span>
                        <span>Positions</span>
                        <span>Scores</span>
                    </div>

                    <div className={styles['leaderboard-field']}>
                        <div className={styles['leaderboard-name']}>
                            <Avatar src="/broken-image.jpg" />
                            <span>nickname</span>
                        </div>
                        <span>1</span>
                        <span>1</span>
                    </div>

                </Box>
            </div>
            <Footer/>
        </div>
    );
};

export default LeaderboardPage;
