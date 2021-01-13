import { API, SET_TRAITS, SET_MODIFY_TRAIT } from '../constants/constants';


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


// ********************************************************


export const setModTrait = (traitType, id) => {
  return { type: SET_MODIFY_TRAIT, payload: { traitType, id }}
}