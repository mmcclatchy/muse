import {
  // API,
  SET_IMAGE_URL,
  SET_CHARACTER_TRAIT,
  SET_BIO,
  TOKEN_KEY,
  SET_NEW_CHARACTER_TRAIT,
  SET_NEW_TRAIT,
} from '../constants/constants';
import { baseApiUrl, originUrl } from '../../config/config';

export const setFormTrait = (trait) => async (dispatch) => {
  if (!trait) return;
  dispatch({ type: SET_CHARACTER_TRAIT, payload: trait });
};

export const setImageUrl = (imageUrl) => async (dispatch) => {
  dispatch({ type: SET_IMAGE_URL, payload: imageUrl });
};

export const setBio = (bio) => async (dispatch) => {
  dispatch({ type: SET_BIO, payload: bio });
};

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
    console.log('POST FORM TRAIT RESPONSE: ', payload);
    dispatch({ type: SET_CHARACTER_TRAIT, payload });
    dispatch({ type: SET_NEW_TRAIT, payload })
  }
};
