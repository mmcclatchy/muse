import { 
  API, 
  TOKEN_KEY,
  SET_CHARACTERS,
  SET_CHARACTER,
  POST_CHARACTER,
  SET_SUCCESS,
  CLEAR_FORM,
  SET_DELETED,
  SET_MODIFY_CHARACTER,
  SET_MODIFY_IMG_URL,
  SET_MODIFY_BIO,
  SET_MODIFY_TRAIT,
  CLEAR_MODIFIED,
  DELETE_CHARACTER
} from '../constants/constants';
import { baseApiUrl } from '../../config/config';

// ********************************************************

export const setSuccess = success => async dispatch => {
  dispatch({ type: SET_SUCCESS, payload: { success }});
}

export const setDeleted = deleted => async dispatch => {
  console.log("SET DELETED")
  dispatch({ type: SET_DELETED, payload: { deleted }});
}

export const setModifyCharacter = character => {
  return { type: SET_MODIFY_CHARACTER, payload: character };
}

export const setModImgUrl = imgUrl => {
  return { type: SET_MODIFY_IMG_URL, payload: imgUrl };
}

export const setModBio = bio => {
  return { type: SET_MODIFY_BIO, payload: bio };
}


// **********************************************************

export const getCharacters = () => {
  return {
    type: API,
    payload: {
      endpoint: `/characters`,
      method: 'GET',
      actionConst: SET_CHARACTERS,
    },
  };  
}


export const postCharacter = character => {
  return {
    type: API,
    payload: {
      method: 'POST',
      endpoint: `/characters`,
      body: JSON.stringify(character),
      actionConst: 'DO_NOTHING'
    }
  }
}

// export const postCharacter = character => async dispatch => {
//   const token = localStorage.getItem(TOKEN_KEY);
  
//   const response = await fetch(`${baseApiUrl}/characters`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(character)
//   });
  
//   if (response.ok) {
//     const payload = await response.json();
//     dispatch({ type: SET_CHARACTERS, payload });
//     dispatch(setSuccess(true));
//     dispatch({ type: CLEAR_FORM })
//   }
// }


export const putCharacter = character => {
  return {
    type: API,
    payload: {
      endpoint: `/characters/${character.id}`,
      method: 'PUT',
      body: JSON.stringify(character),
      actionConst: SET_CHARACTERS,
    }
  }
}


export const deleteCharacter = characterId => {
  return {
    type: API,
    payload: {
      endpoint: `/characters/${characterId}`,
      method: 'DELETE',
      actionConst: DELETE_CHARACTER,
    }
  }
}