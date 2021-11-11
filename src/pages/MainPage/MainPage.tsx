/* eslint-disable no-console */
// import {
//   Box, Button, TextField, Typography
// } from '@mui/material';
import React, { useState } from 'react';
import Footer from '../../components/footer/Footer';
import styles from './MainPage.module.css';

const MainPage = () => {

  return (
    <div className={styles['main-page']}>
      <div className={styles['main-container']}>
        <h1>Hui</h1>
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;
