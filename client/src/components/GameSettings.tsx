import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startRace } from '../actions';
import { getRaceState } from '../selectors';

export default function GameSettings(): JSX.Element {
  const dispatch = useDispatch();
  const { initialized } = useSelector(getRaceState);
  return (
    <div>
      <button disabled={initialized} onClick={() => dispatch(startRace())} type="button">
        {initialized ? 'starting...' : 'Start game'}
      </button>
    </div>
  );
}
