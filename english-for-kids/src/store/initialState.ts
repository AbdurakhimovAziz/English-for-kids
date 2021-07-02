import { CardsState, GameState, GlobalState } from './types';

export const globalInitialState: GlobalState = {
  isMenuVisible: false,
  isPlayMode: false
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
