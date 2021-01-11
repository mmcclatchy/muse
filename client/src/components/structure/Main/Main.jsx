import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './main.css'
import CreateCharacter from '../../Characters/CreateCharacter';
import ModifyCharacter from '../../Characters/ModifyCharacter';



export default function Main() {
  
  
  
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