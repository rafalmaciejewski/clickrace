/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { useDispatch, useSelector } from 'react-redux';
import { restartRace } from '../actions';
import { getPlayer, getRaceState } from '../selectors';
import socket from '../socket';
import { Leaderboard } from './Leaderboard';
import styles from './Race.module.css';

export default function Race(): JSX.Element {
  const dispatch = useDispatch();
  const { started, finished, startDate } = useSelector(getRaceState);
  const { isAdmin, joined } = useSelector(getPlayer);
  const [score, setScore] = useState(0);

  function handleClick(): void {
    socket.emit('click');
    setScore(score + 1);
  }

  if (finished) {
    return (
      <div>
        Race finished!
        {isAdmin && (
          <button onClick={() => dispatch(restartRace())} type="button">
            Restart
          </button>
        )}
        <Leaderboard />
      </div>
    );
  }

  if (!joined) {
    return (
      <div>
        Race in progress...
        <Leaderboard />
      </div>
    );
  }

  return (
    <div>
      {started ? (
        <React.Fragment>
          <button className={styles.clickHere} type="button" onClick={handleClick}>
            Click here!
          </button>
          <div>Result: {score}</div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div>Get ready...</div>
          {startDate && (
            <Countdown
              date={Number(startDate as any)}
              intervalDelay={0}
              precision={2}
              overtime={true}
              renderer={({ seconds }) => <div>starting in {seconds + 1}s</div>}
            />
          )}
        </React.Fragment>
      )}

      <Leaderboard />
    </div>
  );
}
