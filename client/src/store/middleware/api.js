import { baseApiUrl } from '../../config/config';
import { API, CLEAR_FORM, CLEAR_MODIFIED } from '../constants/constants';
import { setSuccess, setDeleted } from '../actions/characters';


// API Middleware receives an action object and parses the data to make a specific fetch request
const api = ({ dispatch, getState }) => next => async action => {
  
  // console.log('PASSING THROUGH API MIDDLEWARE: ', action)
  
  if (action.type !== API) return next(action);
  // console.log('PICKED UP BY API MIDDLEWARE')
  
  const { authentication: { token } } = getState();
  
  // console.log('API: ', token)
  
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
    const { payload, success, deleted } = await response.json();
    
    console.log('PAYLOAD: ', actionConst, payload)

    if (deleted) {
      dispatch(setDeleted(true));
      dispatch({ type: CLEAR_MODIFIED })
    }
    
    if (success) {
      dispatch(setSuccess(true));
      dispatch({ type: CLEAR_FORM });
    }
    
    dispatch({ type: actionConst, payload });
    if (secondActionConst) dispatch({ type: secondActionConst, payload })
  }
  next(action);
};

export default api;