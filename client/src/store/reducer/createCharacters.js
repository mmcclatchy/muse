import {
  SET_CHARACTER_TRAIT,
  SET_BIO,
  SET_IMAGE_URL,
  CLEAR_CHARACTER_TRAIT,
} from '../constants/constants';

const initState = {
  firstName: '',
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

  switch (type) {
    case SET_CHARACTER_TRAIT:
      console.log('SET_CHARACTER_TRAIT: ', payload);

      const newState = { ...state };
      newState[payload.type] = payload;
      return newState;
    
    case CLEAR_CHARACTER_TRAIT:
      const newStateClear = { ...state };
      newStateClear[payload] = '';
      return newStateClear

    case SET_IMAGE_URL:
      return { ...state, imageUrl: payload };

    case SET_BIO:
      return { ...state, bio: payload };

    default:
      return state;
  }
}
