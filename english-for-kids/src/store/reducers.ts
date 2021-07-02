import { combineReducers } from 'redux';
import ActionTypes from './actionTypes';
import { cardsInitialState, gameInitialState, globalInitialState } from './initialState';
import { CardsState, GameAction, GameState, GlobalState, IAction } from './types';

const globalReducer = (state: GlobalState = globalInitialState, action: IAction): GlobalState => {
  switch (action.type) {
    case ActionTypes.TOGGLE_MENU:
      document.body.classList.toggle('locked');
      return {
        ...state,
        isMenuVisible: !state.isMenuVisible
      };
    case ActionTypes.HIDE_MENU:
      document.body.classList.remove('locked');
      return {
        ...state,
        isMenuVisible: false
      };
    case ActionTypes.TOGGLE_APP_MODE:
      return {
        ...state,
        isPlayMode: !state.isPlayMode
      };
    default:
      return state;
  }
};

const categoriesReducer = (state: CardsState = cardsInitialState, action: IAction): CardsState => {
  switch (action.type) {
    case ActionTypes.FETCH_CARDS:
      return action.data
        ? {
            ...state,
            cardCategories: [...action.data]
          }
        : state;
    default:
      return state;
  }
};

const gameReducer = (state: GameState = gameInitialState, action: GameAction): GameState => {
  switch (action.type) {
    case ActionTypes.ADD_CORRECT:
      return {
        ...state,
        correct: ++state.correct
      };
    case ActionTypes.SET_CURRENT_CARD:
      return action.card
        ? {
            ...state,
            currentCard: action.card
          }
        : state;
    case ActionTypes.START_GAME:
      return {
        ...state,
        gameStarted: true
      };
    case ActionTypes.STOP_GAME:
      return {
        gameCards: [],
        currentCard: null,
        correct: 0,
        wrong: 0,
        gameStarted: false
      };
    case ActionTypes.SET_GAME_CARDS:
      return action.cards
        ? {
            ...state,
            gameCards: action.cards
          }
        : state;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  global: globalReducer,
  categories: categoriesReducer,
  game: gameReducer
});

export type RootState = ReturnType<typeof rootReducer>;
