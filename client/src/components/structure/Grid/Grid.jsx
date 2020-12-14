import React from 'react';
import './grid.css'
import CreateCharacter from '../../CreateCharacter';
import DisplayCharacter from '../../DisplayCharacter/DisplayCharacter';
import NavListDivider from '../../Material-UI/NavListDivider'
import ResponsiveDrawer from '../../Material-UI/ResponsiveDrawer';

export default function Grid() {
  
  
  return (
    <div>
      <div className="grid">
        <div className="grid_nav">
          {/* <ResponsiveDrawer /> */}
          <NavListDivider />
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