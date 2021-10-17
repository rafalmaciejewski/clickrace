import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import playerReducer from './reducers/player';
import raceReducer from './reducers/race';
import scoresReducer from './reducers/scores';

const store = createStore(
  combineReducers({
    race: raceReducer,
    scores: scoresReducer,
    player: playerReducer,
  }),
  applyMiddleware(logger),
);

export type AppState = ReturnType<typeof store.getState>;

export default store;
