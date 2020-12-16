import {
  SET_CHARACTER_TRAIT,
  SET_BIO,
  SET_IMAGE_URL,
  CLEAR_CHARACTER_TRAIT,
  CLEAR_FORM,
} from '../constants/constants';

const initState = {
  firstName: 'First',
  lastName: '',
  physical: '',
  strengths: '',
  weaknesses: '',
  motivations: '',
  secrets: '',
  bio: '',
};

export default function characterReducer(state = initState, { type, payload }) {
  Object.freeze(state);
  console.log('createCharacter Reducer: ', type, payload)
  switch (type) {
    case SET_CHARACTER_TRAIT:

      const newState = { ...state };
      newState[payload.type] = payload;
      return newState;
    
    case CLEAR_CHARACTER_TRAIT:
      const newStateClear = { ...state };
      newStateClear[payload] = '';
      return newStateClear
    
    case CLEAR_FORM:
      return initState

    case SET_IMAGE_URL:
      return { ...state, imageUrl: payload };

    case SET_BIO:
      return { ...state, bio: payload };

    default:
      return state;
  }
}
