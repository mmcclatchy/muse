import { API, SET_CHARACTERS } from '../constants/constants';


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