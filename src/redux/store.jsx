import { createStore, combineReducers } from 'redux';
import { favReducer } from './reducers/favReducer';

const rootReducer = combineReducers({
  fav: favReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__?.()
);

export default store;