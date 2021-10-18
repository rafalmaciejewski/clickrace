import React from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { startRace } from '../actions';
import { getRaceState } from '../selectors';
import styles from './GameSettings.module.css';

export default function GameSettings(): JSX.Element {
  const dispatch = useDispatch();
  const { initialized } = useSelector(getRaceState);
  return (
    <div className={styles.gameSettings}>
      <Button
        disabled={initialized}
        onClick={() => dispatch(startRace())}
        type="button"
        variant="contained"
      >
        {initialized ? 'starting...' : 'Start game'}
      </Button>
    </div>
  );
}
