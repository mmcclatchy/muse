import { 
  SET_CHARACTERS, 
  SET_SUCCESS, 
  CLEAR_CHARACTERS 
} from '../constants/constants';

const initialState = {
  allCharacters: {},
  modifyCharacter: {},
  success: false,
}

export default function characterReducer(state = initialState, { type, payload }) {
  Object.freeze(state);
  
  switch (type) {
    case SET_CHARACTERS:
      return { ...state, allCharacters: { ...payload } };
    
    case SET_SUCCESS:
      return { ...state, ...payload };
      
    case CLEAR_CHARACTERS:
      return initialState;
    
    default:
      return state
  }
}