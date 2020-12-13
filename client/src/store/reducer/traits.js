import { SET_TRAITS, SET_NEW_TRAIT } from '../constants/constants';

export default function traitsReducer(state = {}, { type, payload }) {
  Object.freeze(state);

  switch (type) {
    case SET_TRAITS:

      return { ...state, ...payload };

    case SET_NEW_TRAIT:

      const newState = { ...state };
      newState[payload.type][payload.id] = payload
      return newState

    default:
      return state;
  }
}
