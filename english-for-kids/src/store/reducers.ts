import { combineReducers } from 'redux';
import ActionTypes from './actionTypes';
import { cardsInitialState, gameInitialState, globalInitialState } from './initialState';
import { CardsState, GameState, GlobalState, IAction } from './types';

const globalReducer = (state: GlobalState = globalInitialState, action: IAction): GlobalState => {
  switch (action.type) {
    case ActionTypes.TOGGLE_MENU:
      return {
        ...state,
        isMenuVisible: !state.isMenuVisible
      };
    case ActionTypes.HIDE_MENU:
      return {
        ...state,
        isMenuVisible: false
      };
    case ActionTypes.TOGGLE_APP_MODE:
      return {
        ...state,
        isPlayMode: !state.isPlayMode
      };
    case ActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.data || ''
      };
    case ActionTypes.CLEAR_TOKEN:
      return { ...state, token: null };
    default:
      return state;
  }
};

const categoriesReducer = (state: CardsState = cardsInitialState, action: IAction): CardsState => {
  switch (action.type) {
    case ActionTypes.FETCH_CARDS:
      return {
        cardCategories: [...action.data]
      };
    case ActionTypes.CREATE_CATEGORY:
      return { ...state, cardCategories: [...state.cardCategories, action.data] };
    case ActionTypes.UPDATE_CATEGORY:
      return {
        cardCategories: state.cardCategories.map((category) =>
          category._id === action.data._id ? action.data : category
        )
      };
    case ActionTypes.DELETE_CATEGORY:
      return { cardCategories: state.cardCategories.filter((category) => category._id !== action.data) };
    case ActionTypes.CREATE_WORD:
    case ActionTypes.UPDATE_WORD:
    case ActionTypes.DELETE_WORD:
      return {
        cardCategories: state.cardCategories.map((category) =>
          category._id === action.categoryId ? action.data : category
        )
      };
    default:
      return state;
  }
};

const gameReducer = (state: GameState = gameInitialState, action: IAction): GameState => {
  switch (action.type) {
    case ActionTypes.ADD_CORRECT:
      return {
        ...state,
        correct: ++state.correct
      };
    case ActionTypes.ADD_WRONG:
      return {
        ...state,
        wrong: ++state.wrong
      };
    case ActionTypes.SET_CURRENT_CARD:
      return {
        ...state,
        currentCard: action.data
      };
    case ActionTypes.START_GAME:
      return {
        ...state,
        gameStarted: true
      };
    case ActionTypes.STOP_GAME:
      return gameInitialState;
    case ActionTypes.SET_GAME_CARDS:
      return {
        ...state,
        gameCards: action.data
      };
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
