import ActionTypes from './actionTypes';
import InitialState from './initialState';

const rootReducer = (state: AppState = InitialState, action: IAction): AppState => {
  switch (action.type) {
    case ActionTypes.TOGGLE_MENU:
      return {
        ...state,
        isMenuVisible: !state.isMenuVisible
      };
    case ActionTypes.HIDE_MENU:
      return {
        ...state,
        isMenuVisible: false
      };
    default:
      return state;
  }
};

export default rootReducer;
