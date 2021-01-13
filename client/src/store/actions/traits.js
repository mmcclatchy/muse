import { 
  API, 
  SET_TRAITS, 
  SET_MODIFY_TRAIT,
  SET_NEW_TRAIT,
} from '../constants/constants';


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

export const postModTrait = trait => {
  return {
    type: API,
    payload: {
      method: 'POST',
      endpoint: '/traits',
      body: JSON.stringify(trait),
      actionConst: SET_MODIFY_TRAIT,
      secondActionConst: SET_NEW_TRAIT,
    }
  }
}


// ********************************************************


export const setModTrait = (traitType, id) => {
  console.log('SET MOD TRAIT: ', )
  return { type: SET_MODIFY_TRAIT, payload: { traitType, id }}
}