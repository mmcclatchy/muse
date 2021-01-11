import { 
  SET_CHARACTERS, 
  SET_SUCCESS, 
  CLEAR_CHARACTERS,
  SET_MODIFY_CHARACTER
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
    
    case SET_MODIFY_CHARACTER:
      return { ...state, modifyCharacter: payload }
      
    default:
      return state
  }
}