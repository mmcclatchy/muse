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
      console.log('REDUCER PAYLOAD: ', payload)
      newState[payload.type] = payload
      console.log('newState: ', newState)
      return newState
    
    case SET_IMAGE_URL:
      console.log('SET_IMAGE_URL: ', payload)
      return { ...state, imageUrl: payload }
    
    case SET_BIO:
      console.log('SET_BIO: ', payload)
      return { ...state, bio: payload }
      
    default:
      return state
  }
}