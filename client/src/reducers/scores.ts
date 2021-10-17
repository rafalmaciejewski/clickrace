import { AnyAction } from 'redux';
import {
  PLAYER_JOINED,
  PLAYER_QUIT,
  RACE_FINISHED,
  RACE_RESTARTED,
  RACE_STARTED,
  SET_SCORES,
} from '../constants/actionTypes';

const initialState: Record<string, number> = {};

export default function scoresReducer(
  state: typeof initialState = initialState,
  action: AnyAction = { type: '' },
): typeof initialState {
  switch (action.type) {
    case PLAYER_JOINED: {
      return {
        ...state,
        [action.playerName]: 0,
      };
    }
    case PLAYER_QUIT: {
      const { [action.playerName]: _, ...newState } = state;
      return newState;
    }
    case SET_SCORES: {
      return action.payload;
    }
    case RACE_FINISHED: {
      return action.result;
    }
    case RACE_RESTARTED:
    case RACE_STARTED: {
      return {};
    }
  }
  return state;
}
