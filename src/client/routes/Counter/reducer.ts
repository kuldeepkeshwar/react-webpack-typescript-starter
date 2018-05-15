import { actionCreator } from 'utils/reducer';

const PREFIX_COUNTER = 'COUNTER';
const types = {
  [PREFIX_COUNTER]: {
    UPDATE: 'UPDATE',
    RESET: 'RESET'
  }
};

export interface IState {
  counter: number;
}

const INITIAL_STATE: IState = {
  counter: 0
};

const reducer = (state: IState = INITIAL_STATE, action: any): IState => {
  const { type, payload } = action;

  switch (type) {
    case types[PREFIX_COUNTER].UPDATE: {
      return {
        ...state,
        counter: payload
      };
    }

    case types[PREFIX_COUNTER].RESET: {
      return {
        ...INITIAL_STATE
      };
    }

    default:
      return state;
  }
};

const actions = {
  update: actionCreator(types[PREFIX_COUNTER].UPDATE),
  reset: actionCreator(types[PREFIX_COUNTER].RESET)
};

export { actions, types, PREFIX_COUNTER, reducer };
