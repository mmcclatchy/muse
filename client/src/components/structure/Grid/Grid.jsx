import React from 'react';
import './grid.css'
import CreateCharacter from '../../CreateCharacter';
import DisplayCharacter from '../../DisplayCharacter/DisplayCharacter';
import AppBar from '../../Material-UI/AppBar';

export default function Grid() {
  
  
  return (
    <div className='background'>
      <AppBar className='app-bar' />
      <div className="grid">
        <div className="grid_nav">
          
        </div>
        
        <div className="grid_photo">
          <DisplayCharacter />
        
        </div>
        
        <div className="grid_form">
          <CreateCharacter />
          
        </div>
        
        <div className="grid_display">
          
        </div>
        
        <div className="grid_footer">
          
        </div>
      </div>
    </div>
  )
}