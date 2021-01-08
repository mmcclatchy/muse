import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './main.css'
import CreateCharacter from '../../CreateCharacter/CreateCharacter';
import DisplayCharacter from '../../DisplayCharacter/DisplayCharacter';



export default function Main() {
  
  
  
  return (
    <div className="main">
      <Switch>
      
        <Route path='/create-character'>
          <CreateCharacter />
        </Route>
      
        <Route path='/modify-character'>
          
        </Route>
      
      </Switch>
    </div>
  )
}