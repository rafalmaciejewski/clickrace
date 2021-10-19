import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayerList, setRaceState, setScores } from '../actions';
import { getPlayer, getPlayerList, getRaceState } from '../selectors';
import GameSettings from './GameSettings';
import Race from './Race';
import { RegistrationForm } from './RegistrationForm';
import styles from './Game.module.css';

function getWaitingListMessage(playerList: string[]): React.ReactNode {
  if (playerList.length === 0) {
    return null;
  }
  if (playerList.length === 1) {
    return 'There is one other player waiting...';
  }
  return (
    <span>
      There are <strong>{playerList.length}</strong> players waiting...
    </span>
  );
}

export default function Game(): JSX.Element {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<any>(null);
  const { isAdmin } = useSelector(getPlayer);
  const { initialized } = useSelector(getRaceState);
  const playerList = useSelector(getPlayerList);

  useEffect(() => {
    axios
      .get<any>('http://localhost:3001/race')
      .then((res) => {
        dispatch(setScores(res.data.scoreboard));
        dispatch(setRaceState(res.data.race));
        dispatch(setPlayerList(res.data.players));
        setIsLoaded(true);
      })
      .catch((err) => setError(err?.response?.data || err?.message || 'unknown error'));
  }, []);

  if (error) {
    return <div>Error :( {error?.toString()}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (initialized) {
    return <Race />;
  }

  return (
    <div className={styles.gameContainer}>
      <RegistrationForm />
      {isAdmin && <GameSettings />}
      <div className={styles.waitingList}>{getWaitingListMessage(playerList)}</div>
    </div>
  );
}
