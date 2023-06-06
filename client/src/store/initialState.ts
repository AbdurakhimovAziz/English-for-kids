import getToken from '../shared/getToken';
import { CardsState, GameState, GlobalState } from './types';

export const globalInitialState: GlobalState = {
  isMenuVisible: false,
  isPlayMode: false,
  token: getToken()
};

export const cardsInitialState: CardsState = {
  cardCategories: [],
  loading: false
};

export const gameInitialState: GameState = {
  gameCards: [],
  currentCard: null,
  correct: 0,
  wrong: 0,
  gameStarted: false
};
