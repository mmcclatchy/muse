import { SET_CHARACTERS } from '../constants/constants';

export default function characterReducer(state = {}, { type, payload }) {
  Object.freeze(state);
  
  switch (type) {
    case SET_CHARACTERS:
      return { ...state, ...payload };  
    
    default:
      return state
  }
}