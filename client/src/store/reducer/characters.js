import { SET_CHARACTERS, SET_SUCCESS } from '../constants/constants';

export default function characterReducer(state = {}, { type, payload }) {
  Object.freeze(state);
  
  switch (type) {
    case SET_CHARACTERS:
      return { ...state, ...payload };  
    
    case SET_SUCCESS:
      console.log('SET_SUCCESS: ', payload)
      return { ...state, ...payload }
    
    default:
      return state
  }
}