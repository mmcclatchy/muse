import { 
  SET_CHARACTERS, 
  SET_CHARACTER, 
  SET_SUCCESS, 
  CLEAR_CHARACTERS,
  SET_MODIFY_CHARACTER,
  SET_MODIFY_IMG_URL,
  SET_MODIFY_BIO,
  SET_MODIFY_TRAIT,
  DELETE_CHARACTER,
  SET_DELETED,
  CLEAR_MODIFIED,
} from '../constants/constants';

const initialState = {
  allCharacters: {},
  modifyCharacter: {},
  success: false,
  deleted: false,
}

export default function characterReducer(state = initialState, { type, payload }) {
  Object.freeze(state);
  
  switch (type) {
    case SET_CHARACTER:
      return { ...state, allCharacters: { ...state.allCharacters, payload }};
      
    case SET_CHARACTERS:
      return { ...state, allCharacters: { ...state.allCharacters, ...payload } };
    
    case SET_SUCCESS:
      return { ...state, ...payload };
      
    case SET_DELETED:
      return { ...state, ...payload };
      
    case CLEAR_CHARACTERS:
      return initialState;
      
    case CLEAR_MODIFIED:
      return { ...state, modifiedCharacter: {} }
    
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
      
    case DELETE_CHARACTER:
      const allCharacters = { ...state.allCharacters };
      delete allCharacters[payload];
      return { ...state, allCharacters }
      
    default:
      return state
  }
}