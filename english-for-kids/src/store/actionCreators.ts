import { Dispatch } from 'react';
import { ICard } from '../models/ICard';
import { ICategory } from '../models/ICategory';
import IToken from '../models/IToken';
import { SERVER_URL } from '../shared/constants';
import ActionTypes from './actionTypes';
import { IAction } from './types';

export const toggleMenu = (): IAction => {
  return {
    type: ActionTypes.TOGGLE_MENU
  };
};
export const closeMenu = (): IAction => {
  return {
    type: ActionTypes.HIDE_MENU
  };
};

export const toggleAppMode = (): IAction => {
  return {
    type: ActionTypes.TOGGLE_APP_MODE
  };
};

export const fetchCards = () => {
  return async (dispatch: Dispatch<IAction>): Promise<void> => {
    try {
      const response = await fetch(`${SERVER_URL}/`);
      const data: ICategory[] = await response.json();
      dispatch({ type: ActionTypes.FETCH_CARDS, data });
    } catch (e) {
      console.log(e);
    }
  };
};

export const addCorrectMove = (): IAction => {
  return {
    type: ActionTypes.ADD_CORRECT
  };
};

export const addWrongMove = (): IAction => {
  return {
    type: ActionTypes.ADD_WRONG
  };
};

export const setCurrentCard = (card: ICard) => {
  return async (dispatch: Dispatch<IAction>): Promise<void> => {
    dispatch({
      type: ActionTypes.SET_CURRENT_CARD,
      data: card
    });
  };
};

export const setGameCards = (cards: ICard[]): IAction => {
  return {
    type: ActionTypes.SET_GAME_CARDS,
    data: cards
  };
};

export const startGame = (): IAction => {
  return {
    type: ActionTypes.START_GAME
  };
};

export const stopGame = (): IAction => {
  return {
    type: ActionTypes.STOP_GAME
  };
};

export const setToken = (userToken: IToken): IAction => {
  localStorage.setItem('token', JSON.stringify(userToken));
  return {
    type: ActionTypes.SET_TOKEN,
    data: userToken.token
  };
};
