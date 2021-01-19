import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './main.css'
import ProtectedRoute from '../../ProtectedRoute';
import CreateCharacter from '../../Characters/CreateCharacter';
import ModifyCharacter from '../../Characters/ModifyCharacter';
import IntroPage from '../../IntroPage/IntroPage';
import { getTraits } from '../../../store/actions/traits';
import lightBlurImg from '../../open_landscape_light_blur.jpg';


export default function Main() {
  const loggedIn = useSelector(state => state.authentication.user?.id);
  const dispatch = useDispatch();
  
  // Fetch Character Traits on init render of component
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { dispatch(getTraits()) }, []);
  
  
  return (
    <div className="main" style={{ backgroundImage: lightBlurImg }}>
      <Switch>
      
        <Route exact path='/' >
          <IntroPage />
        </Route>
      
        <ProtectedRoute path='/create-character' isLoggedIn={loggedIn} >
          <CreateCharacter />
        </ProtectedRoute>
      
        <ProtectedRoute path='/modify-character' isLoggedIn={loggedIn} >
          <ModifyCharacter />
        </ProtectedRoute>
      
      </Switch>
    </div>
  )
}