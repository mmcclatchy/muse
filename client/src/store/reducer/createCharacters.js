import { CREATE_CHARACTER, SET_BIO, SET_IMAGE_URL } from '../constants/constants';

const initState = {
  firstName: '',
  lastName: '',
  physical: '',
  strengths: '',
  weaknesses: '',
  motivations: '',
  secrets: '',
  bio: '',
}


export default function characterReducer(state = initState, { type, payload }) {
  Object.freeze(state);
  
  switch (type) { 
    
    case CREATE_CHARACTER:
      const newState = { ...state }
      newState[payload.type] = payload
      return newState
    
    case SET_IMAGE_URL:
      return { ...state, imageUrl: payload }
    
    case SET_BIO:
      return { ...state, bio: payload }
      
    default:
      return state
  }
}