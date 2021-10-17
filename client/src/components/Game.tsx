import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRaceState, setScores } from '../actions';
import { getPlayer, getRaceState } from '../selectors';
import GameSettings from './GameSettings';
import Race from './Race';
import { RegistrationForm } from './RegistrationForm';

export default function Game(): JSX.Element {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<any>(null);
  const { isAdmin } = useSelector(getPlayer);
  const { initialized } = useSelector(getRaceState);

  useEffect(() => {
    axios
      .get<any>('http://localhost:3001/race')
      .then((res) => {
        dispatch(setScores(res.data.scoreboard));
        dispatch(setRaceState(res.data.race));
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
    <div>
      <RegistrationForm />
      {isAdmin && <GameSettings />}
    </div>
  );
}
