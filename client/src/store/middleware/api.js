import { baseApiUrl } from '../../config/config';
import { API, CLEAR_FORM, CLEAR_MODIFIED } from '../constants/constants';
import { setStatus } from '../actions/characters';


// API Middleware receives an action object and parses the data to make a specific fetch request
const api = ({ dispatch, getState }) => next => async action => {
  
  
  if (action.type !== API) return next(action);
  
  const { authentication: { token } } = getState();
  
  
  // Payload will determine the fetch call and what is being dispatched
  const { endpoint, method, body, actionConst, secondActionConst } = action.payload;
  

  
  const response = await fetch(`${baseApiUrl}${endpoint}`, {
    method: method,
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: body
  });
  
  
  if (response.ok) {
    const { payload, status } = await response.json();
    
    
    if (status) {
      dispatch(setStatus(status));
      if (status === 'success') dispatch({ type: CLEAR_FORM });
      if (status === 'deleted') dispatch({ type: CLEAR_MODIFIED });
    }
    
    await dispatch({ type: actionConst, payload });
    
    if (secondActionConst) dispatch({ type: secondActionConst, payload })
  }
  next(action);
};

export default api;