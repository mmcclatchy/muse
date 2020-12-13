import { DRAWER_OPEN } from "../constants/constants";



const initialState = {
  drawerOpen: false,
}

export default function navigationReducer(state = initialState, { type, payload }) {
  Object.freeze(state);
  
  switch(type) {
    case DRAWER_OPEN:
      return { ...state, ...payload };
      
    default:
      return state
  }
}