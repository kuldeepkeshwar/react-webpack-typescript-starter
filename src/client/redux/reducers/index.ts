import { combineReducers } from 'redux';
import {
  reducer as counterReducer,
  IState as ICounterReducerState
} from 'routes/Counter/reducer';

export const rootReducer = combineReducers({
  counter: counterReducer
});

export interface IAppState {
  counter: ICounterReducerState;
}
