import { 
  API, 
  TOKEN_KEY,
  SET_CHARACTERS,
  POST_CHARACTER,
  SET_SUCCESS,
  CLEAR_FORM,
  PUT_CHARACTER,
} from '../constants/constants';
import { baseApiUrl } from '../../config/config';


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


export const setSuccess = success => async dispatch => {
  dispatch({ type: SET_SUCCESS, payload: { success }})
}


export const postCharacter = character => async dispatch => {
  const token = localStorage.getItem(TOKEN_KEY);
  
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
    dispatch({ type: SET_CHARACTERS, payload });
    dispatch(setSuccess(true));
    dispatch({ type: CLEAR_FORM })
  }
  
  
  
  dispatch({ type: POST_CHARACTER, payload: character })
}


export const putCharacter = character => {
  return {
    type: API,
    payload: {
      endpoint: `/characters/${character.id}`,
      method: 'PUT',
      body: JSON.stringify(character),
      actionConst: PUT_CHARACTER,
    }
  }
}