import { SET_TRAITS } from "../constants/constants";


export default function traitsReducer (state = {}, { type, payload }) {
  Object.freeze(state)
  
  switch(type) {
    case SET_TRAITS:
      return { ...state, ...payload };
    
    default:
      return state;
  }
}