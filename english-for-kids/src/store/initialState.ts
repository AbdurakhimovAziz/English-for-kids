import { CardsState, GlobalState } from './types';

const InitialState: GlobalState & CardsState = {
  isMenuVisible: false,
  isPlayMode: false,
  cardCategories: []
};

export default InitialState;
