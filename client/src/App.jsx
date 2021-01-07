import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter, 
  // Route, 
  // Switch 
} from 'react-router-dom';
import Grid from './components/structure/Grid/Grid';
// import Navigation from './components/Navigation';
// import ProtectedRoute from './components/ProtectedRoute';
import { loadToken } from './store/authentication';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from './components/structure/AppBar/AppBar';
import SplashPage from './components/SplashPage/SplashPage';
import NavDrawer from './components/structure/NavDrawer/NavDrawer';



const App = () => {
  // *** Redux ***
  const token = useSelector(state => state.authentication.token);
  const dispatch = useDispatch();
  
  
  // *** Local State ***
  const [loaded, setLoaded] = useState(false);
  
  
  // *** Use Effect Hooks ***
  useEffect(() => {
    setLoaded(true);
    dispatch(loadToken());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {}, [token])
  
  
  if (!loaded) return null;
  
  
  // *** JSX ***
  return (
  <BrowserRouter>
    <div className='app-wrapper'>
      {
        token  
          ? <>
              <AppBar />
              <NavDrawer />
              <Grid />
            </>
          :  <SplashPage />
      }
    </div>
  </BrowserRouter>
  )
}


export default App;
