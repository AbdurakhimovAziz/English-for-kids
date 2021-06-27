import { ICategory } from '../models/ICategory';

type IAction = {
  type: string;
  data?: ICategory[];
};

type CardsState = {
  cardCategories: ICategory[];
};

type GlobalState = {
  isMenuVisible: boolean;
  isPlayMode: boolean;
};

type DispatchType = (args: IAction) => IAction;
