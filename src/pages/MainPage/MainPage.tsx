/* eslint-disable no-console */
import {
    Box, IconButton
} from '@mui/material';
import React, {useState} from 'react';
import Footer from '../../components/footer/Footer';
import {Icon} from "@iconify/react";
import styles from './MainPage.module.css';

const MainPage = () => {

    return (
        <Box className={styles['main-page']}>
            <Box className={styles['main-container']}>
                <Box className={styles['icons']}>
                    <div className={styles['icon-wrap']}>
                        <Icon icon="mdi:clipboard-account-outline" height={24} color="rgb(var(--icon-color))"/>
                    </div>

                    <div className={styles['icon-wrap']}>
                        <Icon icon="mdi:clipboard-account-outline" height={24} color="rgb(var(--icon-color))"/>
                    </div>
                </Box>
                <Box className={styles['block-img']}>
                    <div>Привет</div>
                </Box>
                <Box className={styles['block-content']}>
                    <div>Привет</div>
                </Box>
            </Box>
            <Footer/>
        </Box>
    );
};

export default MainPage;
