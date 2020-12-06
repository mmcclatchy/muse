import { baseApiUrl } from '../../config/config';
import { API, SET_TRAIT_TYPES } from '../constants/constants';


// API Middleware receives an action object and parses the data to make a specific fetch request
const api = ({ dispatch, getState }) => next => async action => {
  if (action.type !== API) return next(action);
  
  const { authentication: { token } } = getState();

  // Payload will determine the fetch call and what is being dispatched
  const { endpoint, method, body, actionConst } = action.payload;
  
  const response = await fetch(`${baseApiUrl}${endpoint}`, {
    method: method,
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: body
  });

  if (response.ok) {
    const { payload, traitTypes } = await response.json();
    
    if (traitTypes) dispatch({ type: SET_TRAIT_TYPES, payload: traitTypes })
    
    dispatch({ type: actionConst, payload });
  }
  next(action);
};

export default api;