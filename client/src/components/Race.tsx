/* eslint-disable react/jsx-no-bind,@typescript-eslint/no-magic-numbers */
import React from 'react';
import { Button, Typography } from '@mui/material';
import Countdown from 'react-countdown';
import { useDispatch, useSelector } from 'react-redux';
import { restartRace } from '../actions';
import { getPlayer, getRaceState } from '../selectors';
import Arena from './Arena';
import { Leaderboard } from './Leaderboard';
import styles from './Race.module.css';

export default function Race(): JSX.Element {
  const dispatch = useDispatch();
  const { started, finished, startDate } = useSelector(getRaceState);
  const { isAdmin, joined } = useSelector(getPlayer);

  if (!started) {
    return (
      <React.Fragment>
        <Typography>Get ready...</Typography>
        {startDate && (
          <Countdown
            date={Number(startDate)}
            intervalDelay={0}
            precision={2}
            renderer={({ completed, seconds }) => (
              <Typography className={styles.countdownText}>
                {completed ? (
                  <span>starting now!</span>
                ) : (
                  <span>
                    starting in <strong>{seconds + 1}</strong>
                  </span>
                )}
              </Typography>
            )}
          />
        )}
      </React.Fragment>
    );
  }

  if (finished) {
    return (
      <div className={styles.race}>
        <Typography marginBottom={1}>Race finished!</Typography>
        {isAdmin && (
          <Button variant="outlined" onClick={() => dispatch(restartRace())} type="button">
            Restart
          </Button>
        )}
        <Leaderboard />
      </div>
    );
  }

  if (!joined) {
    return (
      <div className={styles.race}>
        <Typography marginBottom={1}>Race in progress...</Typography>
        <Leaderboard />
      </div>
    );
  }

  return (
    <div className={styles.race}>
      <Arena />
      <Leaderboard />
    </div>
  );
}
