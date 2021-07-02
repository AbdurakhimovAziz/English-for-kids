import { Dispatch } from 'react';
import { ICard } from '../models/ICard';
import { ICategory } from '../models/ICategory';
import ActionTypes from './actionTypes';
import { GameAction, IAction } from './types';

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
      const response = await fetch('./public/cards.json');
      const data: ICategory[] = await response.json();
      dispatch({ type: ActionTypes.FETCH_CARDS, data });
    } catch (e) {
      console.log(e);
    }
  };
};

export const addCorrectMove = (): GameAction => {
  return {
    type: ActionTypes.ADD_CORRECT
  };
};

export const setCurrentCard = (card: ICard) => {
  return async (dispatch: Dispatch<GameAction>): Promise<void> => {
    dispatch({
      type: ActionTypes.SET_CURRENT_CARD,
      card
    });
  };
};

export const setGameCards = (cards: ICard[]): GameAction => {
  return {
    type: ActionTypes.SET_GAME_CARDS,
    cards
  };
};

export const startGame = (): GameAction => {
  return {
    type: ActionTypes.START_GAME
  };
};

export const stopGame = (): GameAction => {
  return {
    type: ActionTypes.STOP_GAME
  };
};
