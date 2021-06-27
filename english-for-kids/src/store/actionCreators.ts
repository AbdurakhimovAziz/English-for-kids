import ActionTypes from './actionTypes';

export const toggleMenu = (): IAction => {
  const action: IAction = {
    type: ActionTypes.TOGGLE_MENU
  };
  return action;
};
export const closeMenu = (): IAction => {
  const action: IAction = {
    type: ActionTypes.HIDE_MENU
  };
  return action;
};
