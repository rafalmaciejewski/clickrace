import React from 'react';
import { Table, TableRow, TableCell, TableBody } from '@mui/material';
import { useSelector } from 'react-redux';
import { getLeaderboard, getRaceState } from '../selectors';
import roundedToFixed from '../utils/roundToFixed';
import styles from './Leaderboard.module.css';

export function Leaderboard(): JSX.Element {
  const leaderboard = useSelector(getLeaderboard);
  const { startDate } = useSelector(getRaceState) || 0;
  const duration = (Date.now() - startDate!) / 1000;

  return (
    <div className={styles.leaderboard}>
      <Table sx={{ minWidth: 200 }} size="small">
        <TableBody>
          {leaderboard.map(([playerName, score], i) => (
            <TableRow key={playerName} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>
                {i + 1}. <strong>{playerName}</strong>
              </TableCell>
              <TableCell align="right">
                {roundedToFixed(score / duration, 1)}
                <span className={styles.metric}>cps</span>
              </TableCell>
              <TableCell align="right">
                <strong>{score}</strong>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
