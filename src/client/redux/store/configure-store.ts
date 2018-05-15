import { createStore } from 'redux';
import { rootReducer, IAppState } from 'redux/reducers';

export default function configureStore(initialState?: IAppState) {
  const store = createStore(rootReducer, initialState);
  return store;
}
