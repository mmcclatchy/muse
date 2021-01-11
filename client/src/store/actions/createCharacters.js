import {
  // API,
  SET_IMAGE_URL,
  SET_CHARACTER_TRAIT,
  SET_BIO,
  TOKEN_KEY,
  SET_NEW_TRAIT,
  CLEAR_CHARACTER_TRAIT,
  CLEAR_FORM,
  CLEAR_CHARACTERS,
  // SET_SUCCESS,
} from '../constants/constants';
import { baseApiUrl } from '../../config/config';

export const setFormTrait = (trait) => async (dispatch) => {
  if (!trait) return;
  dispatch({ type: SET_CHARACTER_TRAIT, payload: trait });
};

export const clearFormTrait = traitType => async dispatch => {
  if (!traitType) return;
  
  dispatch({ type: CLEAR_CHARACTER_TRAIT, payload: traitType })
}

export const setImageUrl = (imageUrl) => async (dispatch) => {
  dispatch({ type: SET_IMAGE_URL, payload: imageUrl });
};

export const setBio = (bio) => async (dispatch) => {
  dispatch({ type: SET_BIO, payload: bio });
};

export const clearForm = () => async dispatch => {
  dispatch({ type: CLEAR_FORM })
}

export const clearCharacters = () => async dispatch => {
  dispatch({ type: CLEAR_CHARACTERS })
}

// export const postFormTrait = trait => dispatch => {
// const token = localStorage.get(TOKEN_KEY);

//   return {
//     type: API,
//     payload: {
//       endpoint: 'traits',
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`
//       },
//       body: trait,
//       actionConst: SET_CHARACTER_TRAIT,
//     }
//   }
// }

export const postFormTrait = (trait) => async (dispatch) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const response = await fetch(`${baseApiUrl}/traits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(trait),
  });

  if (response.ok) {
    const payload = await response.json();
    dispatch({ type: SET_CHARACTER_TRAIT, payload });
    dispatch({ type: SET_NEW_TRAIT, payload });
  }
};
