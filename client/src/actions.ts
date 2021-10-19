import { AnyAction } from 'redux';
import {
  JOIN,
  JOINED,
  PLAYER_JOINED,
  PLAYER_QUIT,
  JOIN_FAIL,
  START_RACE,
  ASSIGN_ADMIN_ROLE,
  SET_SCORES,
  SET_RACE_STATE,
  RACE_INITIALIZED,
  RACE_STARTED,
  RACE_FINISHED,
  RESTART_RACE,
  RACE_RESTARTED,
  SET_PLAYER_LIST,
  YOU_CHEATED,
  WITHDRAW_ADMIN_ROLE,
} from './constants/actionTypes';
import socket from './socket';

export function join(playerName: string): AnyAction {
  socket.emit('join', playerName);
  return {
    type: JOIN,
    playerName,
  };
}

export function joined(): AnyAction {
  return {
    type: JOINED,
  };
}

export function joinFail(message: string): AnyAction {
  return {
    type: JOIN_FAIL,
    message,
  };
}

export function setPlayerList(list: string[]): AnyAction {
  return {
    type: SET_PLAYER_LIST,
    payload: list,
  };
}

export function playerJoined(playerName: string): AnyAction {
  return {
    type: PLAYER_JOINED,
    playerName,
  };
}

export function playerQuit(playerName: string): AnyAction {
  return {
    type: PLAYER_QUIT,
    playerName,
  };
}

export function startRace(): AnyAction {
  socket.emit('start-race');
  return {
    type: START_RACE,
  };
}

export function restartRace(): AnyAction {
  socket.emit('restart-race');
  return {
    type: RESTART_RACE,
  };
}

export function assignAdminRole(): AnyAction {
  return {
    type: ASSIGN_ADMIN_ROLE,
  };
}

export function withdrawAdminRole(): AnyAction {
  return {
    type: WITHDRAW_ADMIN_ROLE,
  };
}

export function setScores(scores: any): AnyAction {
  return {
    type: SET_SCORES,
    payload: scores,
  };
}

export function setRaceState(raceState: any): AnyAction {
  return {
    type: SET_RACE_STATE,
    payload: raceState,
  };
}

export function raceInitialized({ startDate, finishDate }: any): AnyAction {
  return {
    type: RACE_INITIALIZED,
    startDate,
    finishDate,
  };
}

export function raceStarted(): AnyAction {
  return {
    type: RACE_STARTED,
  };
}

export function raceFinished(scores: any): AnyAction {
  return {
    type: RACE_FINISHED,
    result: scores,
  };
}

export function raceRestarted(): AnyAction {
  return {
    type: RACE_RESTARTED,
  };
}

export function youCheated(): AnyAction {
  return {
    type: YOU_CHEATED,
  };
}
