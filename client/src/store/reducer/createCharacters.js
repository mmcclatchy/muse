import { CREATE_CHARACTER, SET_IMAGE_URL } from '../constants/constants';

const initState = {
  firstName: '',
  lastName: '',
  physical: '',
  strengths: '',
  weaknesses: '',
  motivations: '',
  secrets: '',
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
      return { ...state, imageUrl: payload }
      
    default:
      return state
  }
}