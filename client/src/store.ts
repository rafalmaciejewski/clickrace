import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';
import playerReducer from './reducers/player';
import playerListReducer from './reducers/playerList';
import raceReducer from './reducers/race';
import scoresReducer from './reducers/scores';

const store = createStore(
  combineReducers({
    race: raceReducer,
    scores: scoresReducer,
    player: playerReducer,
    playerList: playerListReducer,
  }),
  applyMiddleware(logger),
);

export type AppState = ReturnType<typeof store.getState>;

export default store;
