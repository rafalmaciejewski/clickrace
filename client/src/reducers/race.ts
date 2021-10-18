import { AnyAction } from 'redux';
import {
  RACE_FINISHED,
  RACE_INITIALIZED,
  RACE_RESTARTED,
  RACE_STARTED,
  RESTART_RACE,
  SET_RACE_STATE,
  START_RACE,
} from '../constants/actionTypes';

const initialState = {
  initialized: false,
  started: false,
  finished: false,
  startDate: null,
  finishDate: null,
};

export default function raceReducer(
  state: typeof initialState = initialState,
  action: AnyAction = { type: '' },
): typeof initialState {
  switch (action.type) {
    case SET_RACE_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case START_RACE:
    case RACE_INITIALIZED: {
      return {
        ...state,
        initialized: true,
        startDate: action.startDate,
        finishDate: action.finishDate,
        started: false,
        finished: false,
      };
    }
    case RACE_STARTED: {
      return {
        ...state,
        started: true,
        finished: false,
      };
    }
    case RACE_FINISHED: {
      return {
        ...state,
        finished: true,
      };
    }
    case RACE_RESTARTED:
    case RESTART_RACE: {
      return {
        ...state,
        initialized: false,
        started: false,
        startDate: null,
        finishDate: null,
        finished: false,
      };
    }
  }
  return state;
}
