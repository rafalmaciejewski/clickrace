import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { useSelector } from 'react-redux';
import { getRaceState } from '../selectors';
import socket from '../socket';
import roundedToFixed from '../utils/roundToFixed';
import styles from './Arena.module.css';

export default function Arena(): JSX.Element {
  const { finishDate } = useSelector(getRaceState);
  const [score, setScore] = useState(0);

  function handleClick(): void {
    socket.emit('click', Date.now());
    setScore(score + 1);
  }

  return (
    <div className={styles.arena}>
      <div className={styles.arenaContent}>
        <button className={styles.clickHere} type="button" onClick={handleClick}>
          Click here!
        </button>
        <div className={styles.score}>
          score: <strong>{score}</strong>
        </div>
        {finishDate && (
          <Countdown
            date={Number(finishDate)}
            intervalDelay={0}
            precision={2}
            overtime={true}
            renderer={({ total }) => (
              <div className={styles.timeLeft}>time left: {roundedToFixed(total / 1000, 1)}s</div>
            )}
          />
        )}
      </div>
    </div>
  );
}
