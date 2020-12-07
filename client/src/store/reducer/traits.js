import { SET_TRAITS } from "../constants/constants";


export default function traitsReducer (state = {}, { type, payload }) {
  Object.freeze(state)
  // console.log('PASSING THROUGH TRAITS REDUCER')
  
  switch(type) {
    case SET_TRAITS:
      // console.log('PICKED UP BY SET_TRAITS')
      return { ...state, ...payload };
    
    default:
      return state;
  }
}