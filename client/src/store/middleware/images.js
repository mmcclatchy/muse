import { baseApiUrl } from '../../config/config';
import { IMAGES } from '../constants/constants';



const images = ({ dispatch, getState }) => next => async action => {
  
  if (action.type !== IMAGES) return next(action);
  
  
  const { authentication: { token } } = getState();
  
  const { endpoint, method, body, actionConst } = action.payload;
  
  
  const fetchInfo = { 
    method, 
    body, 
    headers: { 
      Authorization: `Bearer ${token}`,
      // 'Content-Type': 'multipart/form-data'
  }};
  
  const response = await fetch(`${baseApiUrl}${endpoint}`, fetchInfo);
  
  
  if (response.ok) {
    const { payload } = await response.json();
    
    await dispatch({ type: actionConst, payload });
  }
  
  next(action);
}


export default images;