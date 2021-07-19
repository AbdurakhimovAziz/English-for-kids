import { ICard } from '../models/ICard';
import { ICategory } from '../models/ICategory';

type IAction = {
  type: string;
  data?: any;
  categoryId?: string;
};

type CardsState = {
  cardCategories: ICategory[];
};

type GlobalState = {
  isMenuVisible: boolean;
  isPlayMode: boolean;
  token: string | null;
};

type GameState = {
  gameStarted: bool;
  gameCards: ICard[];
  currentCard: ICard | null;
  correct: number;
  wrong: number;
};

type DispatchType = (args: IAction) => IAction;
