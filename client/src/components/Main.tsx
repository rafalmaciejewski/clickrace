import { Typography } from '@mui/material';
import React from 'react';
import Game from './Game';
import styles from './Main.module.css';

export default function Main(): JSX.Element {
  return (
    <main className={styles.main}>
      <div className={styles.heading}>
        <Typography variant="h1" className={styles.title}>
          ClickRace!
        </Typography>
        <Typography variant="subtitle1" className={styles.subtitle}>
          Who is the fastest clicker?
        </Typography>
      </div>
      <Game />
    </main>
  );
}
