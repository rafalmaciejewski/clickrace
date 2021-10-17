import { AnyAction } from 'redux';
import { ASSIGN_ADMIN_ROLE, JOIN, JOIN_FAIL, JOINED } from '../constants/actionTypes';

const initialState = {
  name: '',
  isAdmin: false,
  joined: false,
  isJoining: false,
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
  }
  return state;
}
