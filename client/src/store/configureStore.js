import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import authentication from './authentication';
import api from './middleware/api';
import traits from './reducer/traits';
import characters from './reducer/characters';
import createCharacters from './reducer/createCharacters';
import navigation from './reducer/navigation';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  // TODO: Add Reducers here
  authentication,
  characters,
  traits,
  createCharacters,
  navigation,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authentication', 'createCharacters'],
  stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig, reducer);

export default () => {
  const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk, api)));
  const persistor = persistStore(store);
  return { store, persistor }
}


// const configureStore = (initialState) => {
//   // console.log('INSIDE CONFIGURE STORE')
//   return createStore(
//     reducer,
//     initialState,
//     composeEnhancers(applyMiddleware(thunk, api))
//   );
// };

// export default configureStore;
