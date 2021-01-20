import { baseApiUrl } from '../../config/config';
import { IMAGES } from '../constants';



const images = ({ dispatch, getState }) => next => async action => {
  
  if (action.type !== IMAGES) return next(action);
  
  const { authentication: { token } } = getState();
  
  const { endpoint, method, body, actionConst } = action.payload;
  
  
  const response = await fetch(`${baseApiUrl}${endpoint}`, {
    method,
    body,
    headers: { Authorization: `Bearer ${token}` },
  });
  
  
  if (response.ok) {
    const { payload } = await response.json();
    
    await dispatch({ type: actionConst, payload });
  }
  
  next(action);
}


export default images;