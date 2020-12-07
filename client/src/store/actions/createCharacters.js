import { API, CREATE_CHARACTER, TOKEN_KEY } from '../constants/constants';
import { baseApiUrl } from '../../config/config'


export const setFormTrait = trait => async dispatch => {
  console.log('SET FORM TRAIT: ', trait)
  dispatch({ type: CREATE_CHARACTER, payload: trait })
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
        //       actionConst: CREATE_CHARACTER,
        //     }
        //   }
        // }
        
export const postFormTrait = trait => async dispatch => {
  const token = localStorage.getItem(TOKEN_KEY);
  console.log('POST FORM TRAIT!')
  const response = await fetch(`${baseApiUrl}/traits`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: trait
  });
  
  if (response.ok) {
    const payload = response.json()
    dispatch({ type: CREATE_CHARACTER, payload })
  }
}