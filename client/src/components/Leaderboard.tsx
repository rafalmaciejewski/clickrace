import React from 'react';
import { useSelector } from 'react-redux';
import { getLeaderboard } from '../selectors';

export function Leaderboard(): JSX.Element {
  const leaderboard = useSelector(getLeaderboard);

  return (
    <div>
      <div>Leaderboard</div>
      <ul>
        {leaderboard.map(([playerName, score], i) => (
          <li key={playerName}>
            {i + 1}. {playerName}: {score}
          </li>
        ))}
      </ul>
    </div>
  );
}
