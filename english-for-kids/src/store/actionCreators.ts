import { Dispatch } from 'react';
import { ICategory } from '../models/ICategory';
import ActionTypes from './actionTypes';
import { IAction } from './types';

export const toggleMenu = (): IAction => {
  const action: IAction = {
    type: ActionTypes.TOGGLE_MENU
  };
  return action;
};
export const closeMenu = (): IAction => {
  const action: IAction = {
    type: ActionTypes.HIDE_MENU
  };
  return action;
};

export const toggleAppMode = (): IAction => {
  return {
    type: ActionTypes.TOGGLE_APP_MODE
  };
};

export const fetchCards = () => {
  return async (dispatch: Dispatch<IAction>): Promise<void> => {
    try {
      const response = await fetch('./public/cards.json');
      const data: ICategory[] = await response.json();
      dispatch({ type: ActionTypes.FETCH_CARDS, data });
    } catch (e) {
      console.log(e);
    }
  };
};
