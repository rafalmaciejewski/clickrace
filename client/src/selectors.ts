/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { AppState } from './store';

export const getLeaderboard = (state: AppState): Array<[string, number]> =>
  Object.entries(state.scores).sort((a, b) => (a[1] < b[1] ? 1 : -1));

export const getPlayerNames = (state: AppState): string[] => Object.keys(state.scores);

export const getRaceState = (state: AppState) => state.race;

export const getPlayer = (state: AppState) => state.player;

export const getPlayerList = (state: AppState): string[] => [...state.playerList];
