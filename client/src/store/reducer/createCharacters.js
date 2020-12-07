import { CREATE_CHARACTER } from '../constants/constants';

export default function characterReducer(state = {}, { type, payload }) {
  Object.freeze(state);
  
  switch (type) { 
    
    case CREATE_CHARACTER:
      const newState = { ...state }
      newState[payload.type] = payload
      console.log('newState: ', newState)
      return newState
    
    default:
      return state
  }
}