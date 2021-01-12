import { 
  SET_CHARACTERS, 
  SET_SUCCESS, 
  CLEAR_CHARACTERS,
  SET_MODIFY_CHARACTER,
  SET_MODIFY_IMG_URL,
  SET_MODIFY_BIO,
  SET_MODIFY_TRAIT,
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
      
    case SET_MODIFY_IMG_URL:
      const modImgUrl = { ...state.modifyCharacter, imageUrl: payload }
      return { ...state, modifyCharacter: modImgUrl };
      
    case SET_MODIFY_BIO:
      const modBio = { ...state.modifyCharacter, bio: payload }
      return { ...state, modifyCharacter: modBio };
      
    case SET_MODIFY_TRAIT:
      const modTrait = { ...state.modifyCharacter, [payload.trait]: payload.id };
      return { ...state, modifyCharacter: modTrait };
      
    
      
    default:
      return state
  }
}