import { AnyAction } from 'redux';
import {
  ASSIGN_ADMIN_ROLE,
  JOIN,
  JOIN_FAIL,
  JOINED,
  WITHDRAW_ADMIN_ROLE,
  YOU_CHEATED,
} from '../constants/actionTypes';

const initialState = {
  name: '',
  isAdmin: false,
  joined: false,
  isJoining: false,
  cheater: false,
};

export default function playerReducer(
  state: typeof initialState = initialState,
  action: AnyAction = { type: '' },
): typeof initialState {
  switch (action.type) {
    case ASSIGN_ADMIN_ROLE: {
      return {
        ...state,
        isAdmin: true,
      };
    }
    case WITHDRAW_ADMIN_ROLE: {
      return {
        ...state,
        isAdmin: false,
      };
    }
    case JOIN: {
      return {
        ...state,
        name: action.playerName,
        joined: false,
        isJoining: true,
      };
    }
    case JOINED: {
      return {
        ...state,
        joined: true,
        isJoining: false,
      };
    }
    case JOIN_FAIL: {
      return {
        ...state,
        joined: false,
        isJoining: false,
      };
    }
    case YOU_CHEATED: {
      return {
        ...state,
        cheater: true,
        joined: false,
        isJoining: false,
        name: '',
      };
    }
  }
  return state;
}
