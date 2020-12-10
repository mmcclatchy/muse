import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import authentication from './authentication';
import api from './middleware/api';
import traits from './reducer/traits';
import characters from './reducer/characters';
import createCharacters from './reducer/createCharacters'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  // TODO: Add Reducers here
  authentication,
  characters,
  traits,
  createCharacters,
});

const configureStore = initialState => {
  // console.log('INSIDE CONFIGURE STORE')
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, api)),
  );
};

export default configureStore;