import { SET_TRAITS, SET_NEW_TRAIT } from '../constants/constants';

export default function traitsReducer(state = {}, { type, payload }) {
  Object.freeze(state);

  switch (type) {
    case SET_TRAITS:
      console.log('SET_TRAITS: ', payload);

      return { ...state, ...payload };

    case SET_NEW_TRAIT:
      console.log('SET_NEW_TRAITS: ', payload);

      const newState = { ...state };
      newState[payload.type] = payload;
      return newState;

    default:
      return state;
  }
}
