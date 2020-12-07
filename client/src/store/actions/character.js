import { API, SET_CHARACTERS, CREATE_CHARACTER } from '../constants/constants';


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