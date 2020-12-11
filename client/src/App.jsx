import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Grid from './components/structure/Grid/Grid';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import { loadToken } from './store/authentication';
import { useSelector, useDispatch } from 'react-redux';
import AppBar from './components/Material-UI/AppBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import theme from './components/theme';
import SplashPage from './components/SplashPage/SplashPage';


const useStyles = makeStyles(theme => ({
  main: {
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
  }
}))



const App = () => {
  const token = useSelector(state => state.authentication.token);
  // const token = false
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles(theme)
  
  useEffect(() => {
    setLoaded(true);
    dispatch(loadToken());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    
  }, [token])
  
  
  if (!loaded) return null;
  
  return (
  <BrowserRouter>
    <main className={classes.main}>
      {/* <Switch> */}
        {/* <ProtectedRoute 
          isLoggedIn={token} 
          path='/' 
          exact={ true } 
          component={ Grid } />
        
        <Route 
          path='/' 
          exact={true} 
          component={SplashPage} /> */}
          
      {/* </Switch> */}
      {token  ?  <Grid />  :  <SplashPage />}
    </main>
  </BrowserRouter>
  )
}


export default App;
