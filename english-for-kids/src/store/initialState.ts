import getToken from '../hooks/useToken';
import IToken from '../models/IToken';
import { CardsState, GameState, GlobalState } from './types';

export const globalInitialState: GlobalState = {
  isMenuVisible: false,
  isPlayMode: false,
  token: getToken()
};

export const cardsInitialState: CardsState = {
  cardCategories: []
};

export const gameInitialState: GameState = {
  gameCards: [],
  currentCard: null,
  correct: 0,
  wrong: 0,
  gameStarted: false
};
