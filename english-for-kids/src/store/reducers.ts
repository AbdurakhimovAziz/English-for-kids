import { combineReducers } from 'redux';
import ActionTypes from './actionTypes';
import InitialState from './initialState';
import { CardsState, GlobalState, IAction } from './types';

const globalReducer = (state: GlobalState = InitialState, action: IAction): GlobalState => {
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
    default:
      return state;
  }
};

const categoriesReducer = (state: CardsState = InitialState, action: IAction): CardsState => {
  switch (action.type) {
    case ActionTypes.FETCH_CARDS:
      return action.data
        ? {
            ...state,
            cardCategories: [...state.cardCategories, ...action.data]
          }
        : state;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  global: globalReducer,
  categories: categoriesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
