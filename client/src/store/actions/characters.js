import { 
  API, 
  TOKEN_KEY,
  SET_CHARACTERS, 
  CREATE_CHARACTER, 
  POST_CHARACTER } from '../constants/constants';
import { baseApiUrl } from '../../config/config'


export const getCharacters = () => {
  return {
    type: API,
    payload: {
      endpoint: `/characters`,
      method: 'GET',
      body: '',
      actionConst: SET_CHARACTERS,
    },
  }
}


export const setFormTrait = trait => async dispatch => {
  console.log('SET FORM TRAIT: ', trait)
  dispatch({ type: CREATE_CHARACTER, payload: trait })
}


export const postCharacter = character => async dispatch => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  
  const response = await fetch(`${baseApiUrl}/characters`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(character)
  });
  
  if (response.ok) {
    const payload = await response.json();
    dispatch({ type: SET_CHARACTERS, payload })
  }
  
  
  
  dispatch({ type: POST_CHARACTER, payload: character })
}