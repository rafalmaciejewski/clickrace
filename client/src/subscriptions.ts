import {
  assignAdminRole,
  joined,
  joinFail,
  playerJoined,
  playerQuit,
  raceFinished,
  raceInitialized,
  raceRestarted,
  raceStarted,
  setScores,
} from './actions';
import socket from './socket';
import store from './store';

socket.on('player-joined', (playerName) => {
  store.dispatch(playerJoined(playerName));
});

socket.on('player-quit', (playerName) => {
  store.dispatch(playerQuit(playerName));
});

socket.on('name-in-use', () => {
  store.dispatch(joinFail('please choose different name'));
});

socket.on('joined', () => {
  store.dispatch(joined());
});

socket.on('admin', () => {
  store.dispatch(assignAdminRole());
});

socket.on('race-initialized', ({ startDate }) => {
  store.dispatch(raceInitialized(startDate));
});

socket.on('race-started', () => {
  store.dispatch(raceStarted());
});

socket.on('race-finished', (scores) => {
  store.dispatch(raceFinished(scores));
});

socket.on('race-restarted', () => {
  store.dispatch(raceRestarted());
});

socket.on('sync-scores', (scores) => {
  store.dispatch(setScores(scores));
});
