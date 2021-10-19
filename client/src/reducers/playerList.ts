import { AnyAction } from 'redux';
import { SET_PLAYER_LIST, PLAYER_JOINED, PLAYER_QUIT } from '../constants/actionTypes';

const initialState: Set<string> = new Set();

export default function playerListReducer(
  state: typeof initialState = initialState,
  action: AnyAction = { type: '' },
): typeof initialState {
  switch (action.type) {
    case SET_PLAYER_LIST: {
      return new Set(action.payload);
    }
    case PLAYER_JOINED: {
      return new Set([...state, action.playerName]);
    }
    case PLAYER_QUIT: {
      return new Set([...state].filter((name) => name === action.playerName));
    }
  }
  return state;
}
