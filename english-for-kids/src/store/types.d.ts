import { ICard } from '../models/ICard';
import { ICategory } from '../models/ICategory';

type IAction = {
  type: string;
  data?: ICategory[];
};

type GameAction = {
  type: string;
  card?: ICard;
  cards?: ICard[];
};

type CardsState = {
  cardCategories: ICategory[];
};

type GlobalState = {
  isMenuVisible: boolean;
  isPlayMode: boolean;
};

type GameState = {
  gameStarted: bool;
  gameCards: ICard[];
  currentCard: ICard | null;
  correct: number;
  wrong: number;
};

type DispatchType = (args: IAction) => IAction;
