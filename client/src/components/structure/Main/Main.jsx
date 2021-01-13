import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './main.css'
import CreateCharacter from '../../Characters/CreateCharacter';
import ModifyCharacter from '../../Characters/ModifyCharacter';
import { getTraits } from '../../../store/actions/traits';


export default function Main() {
  const dispatch = useDispatch();
  
  // Fetch Character Traits on init render of component
  useEffect(() => {
    dispatch(getTraits());
  }, []);
  
  
  
  return (
    <div className="main">
      <Switch>
      
        <Route path='/create-character'>
          <CreateCharacter />
        </Route>
      
        <Route path='/modify-character'>
          <ModifyCharacter />
        </Route>
      
      </Switch>
    </div>
  )
}