import { Dispatch } from 'react';
import { ICard } from '../models/ICard';
import { ICategory } from '../models/ICategory';
import IToken from '../models/IToken';
import { SERVER_URL } from '../shared/constants';
import ActionTypes from './actionTypes';
import { IAction } from './types';

export const toggleMenu = (): IAction => ({ type: ActionTypes.TOGGLE_MENU });
export const closeMenu = (): IAction => ({ type: ActionTypes.HIDE_MENU });

export const toggleAppMode = (): IAction => ({ type: ActionTypes.TOGGLE_APP_MODE });

export const fetchCards =
  () =>
  async (dispatch: Dispatch<IAction>): Promise<void> => {
    try {
      const response = await fetch(`${SERVER_URL}/categories`);
      const data: ICategory[] = await response.json();

      dispatch({ type: ActionTypes.FETCH_CARDS, data });
    } catch (e) {
      console.log(e);
    }
  };

export const addCorrectMove = (): IAction => ({ type: ActionTypes.ADD_CORRECT });

export const addWrongMove = (): IAction => ({ type: ActionTypes.ADD_WRONG });

export const setCurrentCard = (card: ICard): IAction => ({ type: ActionTypes.SET_CURRENT_CARD, data: card });

export const setGameCards = (cards: ICard[]): IAction => ({ type: ActionTypes.SET_GAME_CARDS, data: cards });

export const startGame = (): IAction => ({ type: ActionTypes.START_GAME });

export const stopGame = (): IAction => ({ type: ActionTypes.STOP_GAME });

export const setToken = (userToken: IToken): IAction => {
  localStorage.setItem('token', JSON.stringify(userToken));
  return {
    type: ActionTypes.SET_TOKEN,
    data: userToken.token
  };
};

export const createCategory =
  (category: ICategory) =>
  async (dispatch: Dispatch<IAction>): Promise<void> => {
    try {
      const response = await fetch(`${SERVER_URL}/categories/`, {
        method: 'POST',
        body: JSON.stringify(category),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data: ICategory[] = await response.json();

      dispatch({ type: ActionTypes.CREATE_CATEGORY, data });
    } catch (e) {
      console.log(e);
    }
  };

export const updateCategory =
  (id: string, category: ICategory) =>
  async (dispatch: Dispatch<IAction>): Promise<void> => {
    try {
      const response = await fetch(`${SERVER_URL}/categories/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(category),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data: ICategory[] = await response.json();

      dispatch({ type: ActionTypes.UPDATE_CATEGORY, data });
    } catch (e) {
      console.log(e);
    }
  };

export const deleteCategory =
  (id: string) =>
  async (dispatch: Dispatch<IAction>): Promise<void> => {
    try {
      await fetch(`${SERVER_URL}/categories/${id}`, {
        method: 'DELETE'
      });

      dispatch({ type: ActionTypes.DELETE_CATEGORY, data: id });
    } catch (e) {
      console.log(e);
    }
  };

export const createWord =
  (id: string, newWord: ICard) =>
  async (dispatch: Dispatch<IAction>): Promise<void> => {
    try {
      const response = await fetch(`${SERVER_URL}/words/${id}`, {
        method: 'POST',
        body: JSON.stringify(newWord),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      dispatch({ type: ActionTypes.CREATE_WORD, data, categoryId: id });
    } catch (error) {
      console.log(error);
    }
  };

export const deleteWord =
  (wordId: string, categoryId: string) =>
  async (dispatch: Dispatch<IAction>): Promise<void> => {
    try {
      const response = await fetch(`${SERVER_URL}/words/${wordId}`, {
        method: 'DELETE'
      });
      const data = await response.json();

      dispatch({ type: ActionTypes.DELETE_WORD, data, categoryId });
    } catch (e) {
      console.log(e);
    }
  };

export const updateWord =
  (categoryId: string, wordId: string, updatedWord: ICard) =>
  async (dispatch: Dispatch<IAction>): Promise<void> => {
    try {
      const response = await fetch(`${SERVER_URL}/words/${wordId}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedWord),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data: ICategory[] = await response.json();

      dispatch({ type: ActionTypes.UPDATE_WORD, data, categoryId });
    } catch (e) {
      console.log(e);
    }
  };
