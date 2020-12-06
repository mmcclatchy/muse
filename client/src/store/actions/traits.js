import { API, SET_TRAITS } from '../constants/constants';


export const getTraits = () => {
  return {
    type: API,
    payload: {
      endpoint: `/traits`,
      method: 'GET',
      actionConst: SET_TRAITS,
    },
  }
}