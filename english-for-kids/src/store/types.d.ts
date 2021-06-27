type IAction = {
  type: string;
};

type AppState = {
  isMenuVisible: boolean;
  isPlayMode: boolean;
};

type DispatchType = (args: IAction) => IAction;
